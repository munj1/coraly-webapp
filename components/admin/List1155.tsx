import { Spinner, useToast } from "@chakra-ui/react";
import { useContract, useNFT, ThirdwebNftMedia } from "@thirdweb-dev/react";
import { useEffect } from "react";
export default function List1155() {
  // Get your NFT Collection using it's contract address
  const { contract } = useContract(
    "0x48e4b6dcdb5981d0a17C7E19F8f1a18a6d397438",
    "edition-drop"
  );

  // Load (and cache) the metadata for the NFT with token ID 0
  const { data: nft, isLoading, error } = useNFT(contract, 0);
  const toast = useToast();

  useEffect(() => {
    if (nft) {
      console.log(nft);
    }
    if (error) {
      toast({
        title: "Error",
        description: "Error loading NFT",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [nft, isLoading, contract, toast, error]);

  return (
    <div>
      {!isLoading && nft ? (
        <ThirdwebNftMedia
          metadata={nft.metadata}
          controls={true}
          height="200px"
          width="200px"
        />
      ) : (
        <Spinner />
      )}
    </div>
  );
}
