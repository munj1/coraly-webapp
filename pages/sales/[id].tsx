import {
  Box,
  Button,
  HStack,
  Image,
  Spinner,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Navbar from "../../components/navwallet/Navbar";
import {
  calculatePercentage,
  ERC1155_ADDRESS,
  parseBigNumber,
} from "../../utils/consts";
import { NFT_ABI, SHARE_ABI } from "../../utils/abi";
import {
  useClaimNFT,
  useContract,
  useAddress,
  useNetworkMismatch,
} from "@thirdweb-dev/react";
import { FirebaseContext } from "../../context/FirebaseContext";
import { useContext } from "react";
import { incrementSupply } from "../../utils/firestore/updateSales";
import SliderInput from "../../components/details/SliderInput";
import { Condition } from "../../utils/types";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

const DetailPage = ({ nft, share, id, condition }) => {
  const address = useAddress();
  const isMismatch = useNetworkMismatch();

  const [amountToBuy, setAmountToBuy] = useState(0);
  const handleAmountChange = (amount) => setAmountToBuy(amount);
  const currentSupply: number = share?.supply;

  const toast = useToast();
  const { contract, isLoading, error } = useContract(
    ERC1155_ADDRESS,
    SHARE_ABI
  );
  const {
    mutate: claimNft,
    isLoading: isClaiming,
    error: errorClaiming,
  } = useClaimNFT(contract);

  const { db } = useContext(FirebaseContext);

  const handleClaim = async () => {
    try {
      claimNft({ to: address, tokenId: id, quantity: amountToBuy });

      // admin 단에서 처리해야할듯
      // 사실 db에 저장할 필요가 없을지도
      await incrementSupply({ db, id, amount: amountToBuy });
      console.log("incremented supply");
    } catch (e) {
      toast({
        title: "Claim failed",
        description: "Claim failed",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  if (nft == null || condition == null) {
    toast({
      title: "NFT not found",
      description: "NFT not found",
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  }

  if (!condition || isLoading) return <Spinner />;

  return (
    <Box w={"full"}>
      <Navbar />
      <VStack w="full">
        <Text>{nft.metadata?.name}</Text>
        <Text>{nft.metadata?.description}</Text>
        <Image
          src={nft.metadata?.image}
          alt={nft.metadata?.name}
          maxWidth="400px"
        />
        <Text>Amount Sold: {currentSupply}</Text>

        <Text>
          Price Per Unit: {condition?.currencyMetadata?.displayValue}{" "}
          {condition?.currencyMetadata?.symbol}
        </Text>
        <Text>Amount of Unit To Buy</Text>
        <SliderInput value={amountToBuy} handleChange={handleAmountChange} />
        <Text>
          You will buy {calculatePercentage(amountToBuy, currentSupply)}% of
          this NFT
        </Text>

        <Button onClick={handleClaim} isLoading={isClaiming}>
          Buy
        </Button>
      </VStack>
    </Box>
  );
};

// getStaticProps
export async function getStaticProps(context) {
  const { id } = context.params;

  const sdk = new ThirdwebSDK("mumbai");
  const share = await sdk.getContract(ERC1155_ADDRESS, SHARE_ABI);
  const shareData = await share.erc1155?.get(id);

  const claimCondition = await share.erc1155?.claimConditions?.getAll(id);
  let condition: Condition;
  if (claimCondition.length > 0) {
    condition = {
      currencyMetadata: {
        ...claimCondition[0]?.currencyMetadata,
        value: parseBigNumber(claimCondition[0]?.currencyMetadata?.value),
      },
    };
  }

  let nftData;
  if (
    shareData.metadata?.targetNftAddress &&
    shareData.metadata?.targetNftTokenId
  ) {
    const nftContract = await sdk.getContract(
      shareData.metadata?.targetNftAddress as string,
      NFT_ABI
    );
    nftData = await nftContract.erc721?.get(
      shareData.metadata?.targetNftTokenId as string
    );
  }

  return {
    props: {
      share: shareData ?? null,
      nft: nftData ?? null,
      id: id,
      condition: condition ?? null,
    },
    revalidate: 600,
  };
}

// getStaticPaths
export async function getStaticPaths() {
  const sdk = new ThirdwebSDK("mumbai");
  const contract = await sdk.getContract(ERC1155_ADDRESS, SHARE_ABI);
  const nfts = await contract.erc1155.getAll();

  const paths = nfts.map((nft) => ({
    params: { id: nft.metadata.id },
  }));

  return { paths, fallback: false };
}

export default DetailPage;
