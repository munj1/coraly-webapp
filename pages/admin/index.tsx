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
import RoleTab from "../../components/admin/RoleTab";
import Navbar from "../../components/navwallet/Navbar";

const AdminPage = () => {
  return (
    <Box w={"full"}>
      <Navbar />
      <Heading>Admin Page</Heading>
      <Tabs>
        <TabList>
          <Tab>Roles</Tab>
          <Tab>Share 등록</Tab>
          <Tab>Share 목록</Tab>
          <Tab>NFT 등록</Tab>
          <Tab>NFT 목록</Tab>
          <Tab>Sales(db)</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <RoleTab />
          </TabPanel>

          <TabPanel>
            <Text>LazyMint ERC1155</Text>
          </TabPanel>

          <TabPanel>
            <Text>Shares will be displayed here</Text>
          </TabPanel>

          <TabPanel>
            <Text>LazyMint ERC721</Text>
          </TabPanel>

          <TabPanel>
            <Text>NFTs will be displayed here</Text>
          </TabPanel>

          <TabPanel>
            <Text>firebase db에 등록하기</Text>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default AdminPage;
