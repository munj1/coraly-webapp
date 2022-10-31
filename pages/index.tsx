import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import Sales from "../components/grid/Sales";
import Navbar from "../components/Navbar";

const Home: NextPage = () => {
  return (
    <Box w={"full"}>
      <Navbar />
      <Sales />
    </Box>
  );
};

export default Home;
