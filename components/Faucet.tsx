import { useState } from "react";
import { Button, Container, Text, VStack } from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";

const Faucet = () => {
  const [isMinting, setIsMinting] = useState(false);
  const address = useAddress();

  /** mint dummy Usdt for testing, will be depricated before launch */
  const mintDummyUsdt = async () => {
    // send GET request to /api/mint/usdt with address
    setIsMinting(true);

    try {
      const res = await fetch(`/api/mint/usdt?address=${address}`);
      const data = await res.json();
      console.log(data);
    } catch (e) {
      console.log(e);
      alert("Error minting USDT. Please try again.");
    }
    setIsMinting(false);
  };

  return (
    <Container p="10">
      <VStack spacing={"3"}>
        <Text>USDT Faucet {!address && " - connect wallet first"}</Text>
        {address && (
          <Button onClick={mintDummyUsdt} disabled={isMinting}>
            MINT FREE USDT FOR TEST
          </Button>
        )}
        <Text textAlign={"center"}>
          Coraly Share Certificate - ERC1155 Contract address:
          0x9e0D40764763341df8B15647da9D1EDe7040A19c
        </Text>
        <Text textAlign={"center"}>
          Coraly NFT - ERC721 Contract Address:
          0xd837a8bAADdEc64C4F84bb5321aD1410BcCf8146
        </Text>
      </VStack>
    </Container>
  );
};

export default Faucet;
