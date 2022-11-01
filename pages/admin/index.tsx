import {
  Box,
  Button,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import UpdateUser from "../../components/mypage/UpdateUser";
import Navbar from "../../components/navwallet/Navbar";

const AdminPage = () => {
  return (
    <Box w={"full"}>
      <Navbar />
      <Heading>Admin Page</Heading>
      <Tabs>
        <TabList>
          <Tab>Request Role </Tab>
          <Tab>lazymint(정보등록) Share (ERC1155)</Tab>
          <Tab>lazymint(정보등록) NFT (ERC721)</Tab>
          <Tab>Set Sales</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Button>Request MINTER ROLE</Button>
          </TabPanel>
          <TabPanel>
            <Text>LazyMint ERC1155</Text>
          </TabPanel>
          <TabPanel>
            <Text>LazyMint ERC721</Text>
          </TabPanel>
          <TabPanel>
            <Text>Seller setting</Text>
            <Text>아티스트로서 판매자 등록 등</Text>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default AdminPage;
