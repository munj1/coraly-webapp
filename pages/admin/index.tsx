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
          <Tab>등록-share</Tab>
          <Tab>등록-nft</Tab>
          <Tab>등록-db</Tab>
          <Tab>목록-share</Tab>
          <Tab>목록-nft</Tab>
          <Tab>목록-db</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <RoleTab />
          </TabPanel>

          <TabPanel>
            <LazyMintShareTab />
          </TabPanel>

          <TabPanel>
            <Text>Mint 721</Text>
          </TabPanel>

          <TabPanel>
            <Text>db에서 sales 등록</Text>
          </TabPanel>

          <TabPanel>
            <List1155 />
          </TabPanel>

          <TabPanel>
            <Text>721 List</Text>
          </TabPanel>

          <TabPanel>
            <Text>db에서 조회</Text>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default AdminPage;
