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
import LazyMintShareTab from "../../components/admin/LazyMintShareTab";
import List1155 from "../../components/admin/List1155";
import RoleTab from "../../components/admin/RoleTab";
import Navbar from "../../components/navwallet/Navbar";

const AdminPage = () => {
  return (
    <Box>
      <Navbar />
      <Heading>Admin Page</Heading>
      <Tabs>
        <TabList>
          <Tab>Role</Tab>
          <Tab>Share 등록</Tab>
          <Tab>Share 목록</Tab>
          <Tab>NFT 등록</Tab>
          <Tab>NFT 목록</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <RoleTab />
          </TabPanel>

          <TabPanel>
            <LazyMintShareTab />
          </TabPanel>

          <TabPanel>
            <List1155 />
          </TabPanel>

          <TabPanel>
            <Text>Mint 721</Text>
          </TabPanel>

          <TabPanel>
            <Text>721 List</Text>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default AdminPage;
