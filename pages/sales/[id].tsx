import { Box, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../../components/navwallet/Navbar";
import { ERC1155_ADDRESS, ERC721_ADDRESS } from "../../utils/consts";
import { useContract, useNFT } from "@thirdweb-dev/react";
import { NFT_ABI, SHARE_ABI } from "../../utils/abi";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

const DetailPage = ({ nft, share }) => {
  console.log(nft, share);

  // TODO:

  if (nft == null) return <Text>Error Fetching NFT</Text>;
  return (
    <Box w={"full"}>
      <Navbar />
      <Text>Detail Page is under construction. Please come back later.</Text>
    </Box>
  );
};

// getStaticProps
export async function getStaticProps(context) {
  const { id } = context.params;

  const sdk = new ThirdwebSDK("mumbai");
  const share = await sdk.getContract(ERC1155_ADDRESS, SHARE_ABI);
  const shareData = await share.erc1155.get(id);

  if (shareData.metadata?.targetNftAddress || shareData.metadata?.targetNftId) {
    const nft = await sdk.getContract(
      shareData.metadata?.targetNftAddress as string,
      NFT_ABI
    );
    const nftData = await nft.erc721.get(
      shareData.metadata?.targetNftTokenId as string
    );
    return {
      props: {
        share: shareData,
        nft: nftData,
      },
      revalidate: 600,
    };
  }

  return {
    props: {
      share: shareData,
      nft: null,
    },
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

// {
//   owner: '0x0000000000000000000000000000000000000000',
//   metadata: {
//     name: 'Awesome Merge#1',
//     description: 'This is Awesome Merge#1 NFT',
//     image: 'https://gateway.ipfscdn.io/ipfs/QmbAPDwwgWB8EAdH8C3Ysr9PJwWasgzDJgdcfoyNBXYCC1/1.png',
//     id: '1',
//     uri: 'ipfs://QmS3CxcQeu6qqNgpG2sfn17eHcpY2o2ddmhetBLZ2egjcb/1',
//     nftAddress: '0x48e4b6dcdb5981d0a17C7E19F8f1a18a6d397438',
//     nftTokenId: '1'
//   },
//   type: 'ERC721',
//   supply: 1
// } {
//   owner: '0x0000000000000000000000000000000000000000',
//   metadata: {
//     name: 'Awesome Merge#1 NFT Share Certificate',
//     description: 'This token entitles the holder to a share of the Awesome Merge#1 NFT',
//     image: 'https://gateway.ipfscdn.io/ipfs/QmNUk6uHbi7EE38eyKff7Eh8AKduYkpvppoZriy6V3rE32/1.png',
//     id: '1',
//     uri: 'ipfs://QmcDkmrwFtzEJstXsfJPKgseLepABLdZ5gjoyTynNDHWuP/1',
//     targetNftAddress: '0xd837a8bAADdEc64C4F84bb5321aD1410BcCf8146',
//     targetNftTokenId: '1'
//   },
//   type: 'ERC1155',
//   supply: 0
// }
