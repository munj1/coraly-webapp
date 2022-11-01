import { useState, useContext } from "react";
import { Button, Container, Text } from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";
import { MyModalContext } from "../context/MyModalContext";

const Faucet = () => {
  const [isMinting, setIsMinting] = useState(false);
  const address = useAddress();
  const { setModalStatus, onOpenModal } = useContext(MyModalContext);

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
      <Text>USDT Faucet {!address && " - connect wallet first"}</Text>
      {address && (
        <Button onClick={mintDummyUsdt} disabled={isMinting}>
          MINT FREE USDT FOR TEST
        </Button>
      )}
      <Button
        onClick={() => {
          setModalStatus("login");
          onOpenModal();
        }}
      >
        Open Login Modal
      </Button>
    </Container>
  );
};

export default Faucet;
