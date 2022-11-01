import { useState } from "react";
import { Button, Container, Heading, Text, VStack } from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";
import { useRouter } from "next/router";

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
        <Heading>---TEST---</Heading>
        {address && (
          <Button onClick={mintDummyUsdt} disabled={isMinting}>
            MINT FREE USDT FOR TEST
          </Button>
        )}
        <Text textAlign={"center"}>
          Coraly Share Certificate - ERC1155 Contract address:
          0x48e4b6dcdb5981d0a17C7E19F8f1a18a6d397438
        </Text>
        <Text textAlign={"center"}>
          Coraly NFT - ERC721 Contract Address:
          0xd837a8bAADdEc64C4F84bb5321aD1410BcCf8146
        </Text>
        <Text textAlign={"center"}>
          용어정리 : Share = ERC1155 , NFT = ERC721
        </Text>
      </VStack>
    </Container>
  );
};

export default Faucet;
