import { Input, Text, VStack, useToast, Button, Image } from "@chakra-ui/react";
import { useContract, useContractWrite } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
// import { readFileSync } from "fs";

const LazyMintShareTab = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File>();
  const [targetNftAddress, setTargetNftAddress] = useState(
    "0xe4fEDd9cca4e4D157452297eDd3A4aF1Ca47e396"
  );
  const [targetNftTokenId, setTargetNftTokenId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    contract: share,
    isLoading: isLoadingShare,
    error: isErrorShare,
  } = useContract("0x48e4b6dcdb5981d0a17C7E19F8f1a18a6d397438", "edition-drop");

  const toast = useToast();

  const handleLazyMint = async () => {
    let metadata = [];
    if (targetNftAddress && targetNftTokenId) {
      metadata.push({
        name,
        description,
        image,
        targetNftAddress,
        targetNftTokenId,
      });
    } else {
      metadata.push({
        name,
        description,
        image,
      });
    }

    setIsLoading(true);
    try {
      const results = await share.createBatch(metadata);
      toast({
        title: "Success",
        description: "Lazy Mint Success",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      const tokenId = results[0]?.id;
      const nftDetails = results[0]?.data();
      console.log("tokenId", tokenId);
      console.log("nftDetails", nftDetails);
    } catch (e) {
      toast({
        title: "Error",
        description: "Lazy Mint Failed for some reason",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    setIsLoading(false);
  };

  return (
    <VStack>
      <Text fontWeight={"bold"}>LazyMint ERC1155 (Share)</Text>
      <Text>
        Sale에 올릴 NFT를 증명하는 코인(erc1155 nft) 를 등록(LazyMint) 합니다
      </Text>
      <Text>
        차례대로 name, description, image, target nft address, target nft
        tokenId 입니다.
      </Text>
      <Text>
        ERC1155는 LazyMint 후 각 tokenId 별로 claim condition을 설정해야 합니다
      </Text>

      <Input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      {image && (
        <Image
          src={URL.createObjectURL(image)}
          alt={"metadata"}
          width="300"
          height="300"
          objectFit="cover"
        />
      )}
      <Input
        type="file"
        placeholder="Media (image, video, audio or any type of file)"
        onChange={(e) => setImage(e.target?.files[0])}
      />
      <Input
        placeholder="Target NFT Address"
        value={targetNftAddress}
        onChange={(e) => setTargetNftAddress(e.target.value)}
      />
      <Input
        placeholder="Target NFT Token ID"
        value={targetNftTokenId}
        onChange={(e) => setTargetNftTokenId(e.target.value)}
      />
      <Button onClick={handleLazyMint} isLoading={isLoading}>
        Lazy Mint
      </Button>
    </VStack>
  );
};

export default LazyMintShareTab;

// image, audio, video, html, text, pdf, and 3d model files
