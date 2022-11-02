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
import ListSales from "../../components/admin2/ListSales";
import SetSalesAdmin from "../../components/admin2/SetSalesAdmin";
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
            {/* <SetSalesAdmin /> */}
            <Text>만들었지만 쓸데없음</Text>
          </TabPanel>

          <TabPanel>{/* <ListSales /> */}</TabPanel>
          <TabPanel></TabPanel>
          <TabPanel></TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default AdminDBPage;
