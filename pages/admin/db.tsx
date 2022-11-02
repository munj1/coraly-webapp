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
import Navbar from "../../components/navwallet/Navbar";

const AdminDBPage = () => {
  return (
    <Box>
      <Navbar />
      <Heading>Admin Page - off chain </Heading>
      <Tabs>
        <TabList>
          <Tab>sales 등록</Tab>
          <Tab>sales</Tab>
          <Tab>users</Tab>
          <Tab>transactions</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Text>Sales 등록</Text>
          </TabPanel>

          <TabPanel></TabPanel>
          <TabPanel></TabPanel>
          <TabPanel></TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default AdminDBPage;
