import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import Faucet from "../components/Faucet";
import Sales from "../components/grid/Sales";
import Navbar from "../components/navwallet/Navbar";

const Home: NextPage = () => {
  return (
    <Box w={"full"}>
      <Navbar />
      <Sales />
      <Faucet />
    </Box>
  );
};

export default Home;
