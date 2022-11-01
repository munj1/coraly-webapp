import {
  Box,
  Center,
  Flex,
  SimpleGrid,
  Spinner,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useContract, ThirdwebNftMedia, useNFTs } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import { ShareTableContainer } from "../table/ShareTableContainer";
import { ShareTable } from "../table/ShareTable";
import { CoralyERC1155 } from "../../utils/types";

export default function List1155() {
  const [shares, setShares] = useState<CoralyERC1155[]>([]);
  // Get your NFT Collection using it's contract address
  const { contract } = useContract(
    "0x48e4b6dcdb5981d0a17C7E19F8f1a18a6d397438",
    "edition-drop"
  );

  // Load (and cache) the metadata for the NFT with token ID 0
  const {
    data: nfts,
    isLoading,
    error,
  } = useNFTs(contract, { start: 0, count: 100 });
  const toast = useToast();

  useEffect(() => {
    if (nfts) {
      nfts.forEach((nft) => {
        const share: CoralyERC1155 = {
          id: nft.metadata.id,
          name: (nft.metadata?.name as string) ?? "",
          description: nft.metadata?.description ?? "",
          image: nft.metadata?.image ?? "",
          supply: nft.supply,
          targetNftAddress: (nft.metadata?.targetNftAddress as string) ?? "",
          targetNftTokenId: (nft.metadata?.targetNftTokenId as string) ?? "",
        };
        setShares((shares) => [...shares, share]);
      });
    }
  }, [nfts]);

  if (isLoading || !nfts || shares.length == 0) {
    return <Spinner />;
  }

  if (error) return <Text>Error!</Text>;

  return (
    <ShareTableContainer title={"Coraly Share Certificate (ERC1155)"}>
      <ShareTable shares={shares} />
    </ShareTableContainer>
  );
}
