import { Input, Text, VStack, useToast, Button, Image } from "@chakra-ui/react";
import { useContract } from "@thirdweb-dev/react";
import { useState } from "react";
import { ERC1155_ADDRESS, ERC721_ADDRESS } from "../../utils/consts";
import { NFT_ABI, SHARE_ABI } from "../../utils/abi";

const MintNFTTab = () => {
  const [mintTo, setMintTo] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File>();
  const [shareAddress, setShareAddress] = useState(ERC1155_ADDRESS);
  const [shareTokenId, setShareTokenId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    contract: nft,
    isLoading: isLoadingShare,
    error: isErrorShare,
  } = useContract(ERC721_ADDRESS, "nft-collection");

  const toast = useToast();

  type NftToUpload = {
    name: string;
    description: string;
    image: File;
    shareAddress?: string;
    shareTokenId?: string;
  };

  const handleMint = async () => {
    let metadata: NftToUpload = { name, description, image };
    if (shareAddress && shareTokenId) {
      metadata = { name, description, image, shareAddress, shareTokenId };
    }

    setIsLoading(true);
    try {
      const results = await nft.mintTo(mintTo, metadata);
      toast({
        title: "Success",
        description: "Mint Success",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      const tokenId = results?.id;
      const nftDetails = results?.data();
      console.log("tokenId", tokenId);
      console.log("nftDetails", nftDetails);
    } catch (e) {
      toast({
        title: "Error",
        description: "Mint Failed for some reason",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    setIsLoading(false);
  };

  return (
    <VStack>
      <Text fontWeight={"bold"}>Mint ERC721 (Unique NFT)</Text>
      <Text>Merge 후에 완성되는 단일 NFT를 Mint 합니다</Text>
      <Text>
        차례대로 mintTo, name, description, image, share address, share tokenId
        입니다.
      </Text>
      <Input
        placeholder="Mint To"
        value={mintTo}
        onChange={(e) => setMintTo(e.target.value)}
      />

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
        value={shareAddress}
        onChange={(e) => setShareAddress(e.target.value)}
      />
      <Input
        placeholder="Target NFT Token ID"
        value={shareTokenId}
        onChange={(e) => setShareTokenId(e.target.value)}
      />
      <Button onClick={handleMint} isLoading={isLoading}>
        Lazy Mint
      </Button>
    </VStack>
  );
};

export default MintNFTTab;
