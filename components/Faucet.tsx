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
          0xe4fEDd9cca4e4D157452297eDd3A4aF1Ca47e396
        </Text>
        <Text textAlign={"center"}>
          참고 - Gasless Transaction 하려면 ERC20으로만 결제를 받아야 함
        </Text>
      </VStack>
    </Container>
  );
};

export default Faucet;
