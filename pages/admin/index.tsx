import { Box, Heading, Text } from "@chakra-ui/react";
import Navbar from "../../components/navwallet/Navbar";

const AdminPage = () => {
  return (
    <Box w={"full"}>
      <Navbar />
      <Heading>Admin Page</Heading>
      <Text>TODOs: NFT 정보 등록하기</Text>
    </Box>
  );
};

export default AdminPage;
