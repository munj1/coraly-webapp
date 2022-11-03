import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
} from "@chakra-ui/react";
import MyNFTBalance from "./MyNFTBalance";
import UpdateUser from "./UpdateUser";

const MyPageTab = () => {
  return (
    <Tabs>
      <TabList>
        <Tab>My NFTs</Tab>
        <Tab>Transactions</Tab>
        <Tab>Profile Setting</Tab>
        <Tab>Seller Setting</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <MyNFTBalance />
        </TabPanel>
        <TabPanel>
          <Text>구매내역</Text>
          <Text>DB에서 읽거나 또는, 체인에서 Event 읽어와도 될듯</Text>
        </TabPanel>
        <TabPanel>
          <UpdateUser />
        </TabPanel>
        <TabPanel>
          <Text>Seller setting</Text>
          <Text>아티스트로서 판매자 등록 등</Text>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default MyPageTab;
