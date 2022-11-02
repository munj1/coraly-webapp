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
import { ShareTableContainer } from "../table/share/ShareTableContainer";
import { ShareTable } from "../table/share/ShareTable";
import { CoralyERC721 } from "../../utils/types";
import { ERC721_ADDRESS } from "../../utils/consts";
import { NftTableContainer } from "../table/nft/NftTableContainer";
import { NftTable } from "../table/nft/NftTable";

export default function List721() {
  const [metadatas, setMetadatas] = useState<CoralyERC721[]>([]);
  // Get your NFT Collection using it's contract address
  const { contract } = useContract(ERC721_ADDRESS, "nft-collection");

  // Load (and cache) the metadata for the NFT with token ID 0
  const {
    data: nfts,
    isLoading,
    error,
  } = useNFTs(contract, { start: 0, count: 100 });
  const toast = useToast();

  useEffect(() => {
    if (nfts) {
      console.log("nfts", nfts);
      nfts.forEach((nft) => {
        const share: CoralyERC721 = {
          id: nft.metadata.id,
          name: (nft.metadata?.name as string) ?? "",
          description: nft.metadata?.description ?? "",
          image: nft.metadata?.image ?? "",
          owner: nft?.owner,
          shareAddress: (nft.metadata?.shareAddress as string) ?? "",
          shareTokenId: (nft.metadata?.shareTokenId as string) ?? "",
        };
        setMetadatas((metadatas) => [...metadatas, share]);
      });
    }
  }, [nfts]);

  if (isLoading || !nfts || metadatas.length == 0) {
    return <Spinner />;
  }

  if (error) return <Text>Error!</Text>;

  return (
    <NftTableContainer title={"Coraly Unique NFT Collection (ERC721)"}>
      <NftTable nfts={metadatas} />
    </NftTableContainer>
  );
}
