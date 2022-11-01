import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
} from "@chakra-ui/react";
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
          <Text>보유 NFT 목록 - Coraly에서 구매한 것만</Text>
          <Text>지분증명 NFT, Merge된 NFT 모두 출력</Text>
        </TabPanel>
        <TabPanel>
          <Text>구매내역</Text>
          <Text>DB에서 꺼내오면됨</Text>
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
