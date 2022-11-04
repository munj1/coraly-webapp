import { VStack, Text, Spinner, Image, Heading } from "@chakra-ui/react";
import {
  useAddress,
  useContract,
  useOwnedNFTs,
  useSDK,
} from "@thirdweb-dev/react";
import {
  ERC1155_ADDRESS,
  getPercentage,
  parseBignuberToNumber,
} from "../../utils/consts";
import { SHARE_ABI, NFT_ABI } from "../../utils/abi";
import { useEffect, useState } from "react";
import {
  FetchedCoralyERC1155,
  CoralyERC1155,
  FetchedCoralyERC721,
} from "../../utils/types";

type OwnedNFT = {
  address: string;
  tokenId: string;
  amount: number;
  percentage: string;
  name: string;
  description: string;
  image: string;
};

const MyNFTBalance = () => {
  const [ownedNFTs, setOwnedNFTs] = useState<OwnedNFT[]>();
  const address = useAddress();
  const { contract: shareContract } = useContract(ERC1155_ADDRESS, SHARE_ABI);
  const {
    data: fetchedShare,
    isLoading,
    error,
  } = useOwnedNFTs(shareContract, address);
  const sdk = useSDK();

  useEffect(() => {
    if (!shareContract) return;
    if (!fetchedShare) return;
    //type cast ownedShare to array of FetchedCoralyERC1155
    const ownedShares = fetchedShare as FetchedCoralyERC1155[];

    ownedShares.forEach(async (share) => {
      try {
        // get balance from share contract
        const balanceBig = await shareContract.erc1155.balanceOf(
          address,
          share.metadata?.id
        );
        const balance = balanceBig.toNumber();

        // get nft contract and fetch data
        const nftcontract = await sdk.getContract(
          share.metadata?.targetNftAddress,
          NFT_ABI
        );
        const nft = (await nftcontract.erc721.get(
          share.metadata?.targetNftTokenId
        )) as FetchedCoralyERC721;

        const ownedNFT = {
          address: share.metadata?.targetNftAddress,
          tokenId: share.metadata?.targetNftTokenId,
          amount: balance,
          percentage: getPercentage(balance, share?.supply).toFixed(2),
          name: nft.metadata?.name ?? "",
          description: nft.metadata?.description ?? "",
          image: nft.metadata?.image ?? "",
        };

        setOwnedNFTs((prev) => [...(prev ?? []), ownedNFT]);
      } catch (e) {
        console.error(e);
      }
    });

    return () => {
      setOwnedNFTs(undefined);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, fetchedShare]);

  return (
    <VStack>
      <Text size="xs">1안. DB에서 로딩하기</Text>
      <Text size="xs">
        ✅ 2안. 보유중인 share nft를 읽어온 뒤, 해당 share의 메타데이터에서 nft
        address/id 를 읽어와서 로딩하기
      </Text>
      {!ownedNFTs && <Spinner />}
      {ownedNFTs &&
        ownedNFTs?.map((nft) => (
          <VStack key={nft.tokenId}>
            <Image
              src={nft.image}
              alt={nft.name}
              width="300px"
              height="300px"
              objectFit={"cover"}
            />
            <Heading>name: {nft.name}</Heading>
            <Text>amount: {nft.amount}</Text>
            <Text>percentage: {nft.percentage}</Text>

            <Text>description: {nft.description}</Text>
            <Text>address: {nft.address}</Text>
            <Text>tokenId: {nft.tokenId}</Text>
          </VStack>
        ))}
    </VStack>
  );
};

export default MyNFTBalance;
