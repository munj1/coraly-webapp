import { useState } from "react";
import { Box, Button } from "@chakra-ui/react";
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
    <>
      {address && (
        <Button size="xs" onClick={mintDummyUsdt} disabled={isMinting}>
          Claim TEST USDT
        </Button>
      )}
    </>
  );
};

export default Faucet;
