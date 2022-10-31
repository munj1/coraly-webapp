import { Container, Heading, VStack } from "@chakra-ui/react";
import CardGrid from "./CardGrid";

const dummyData = [
  // status : onSale or soldOut or comingSoon
  // title: random text
  // imgUrl: random image
  // generate random data
  {
    status: "onSale",
    title: "title1",
    imgUrl:
      "https://lh3.googleusercontent.com/Nw5lNA_hJ-RowHudCzBrjwEIDhUbh9RU_oOHMuV2emFz4c4YF5sw4D80Xowry_CQoqMPfDpWuUkfZDCWvds1Q1Sl81oNMzZh23Jgxg=s400",
  },
  {
    status: "soldOut",
    title: "title2",
    imgUrl: "https://via.placeholder.com/500",
  },
  {
    status: "comingSoon",
    title: "title3",
    imgUrl: "https://via.placeholder.com/500",
  },
  {
    status: "onSale",
    title: "title4",
    imgUrl:
      "https://lh3.googleusercontent.com/xI8S9n2r6U6qEC5sOro2etFSXzOvLxlyn5KPRcSJuuxTeC8SNGODnyhYYuz6eWj91mSIJKonvNTLzSvm_bFekp2Flsi82evlIAdN=s400",
  },
  {
    status: "soldOut",
    title: "title5",
    imgUrl: "https://via.placeholder.com/500",
  },
  {
    status: "comingSoon",
    title: "title6",
    imgUrl: "https://via.placeholder.com/500",
  },
  {
    status: "onSale",
    title: "title7",
    imgUrl:
      "https://assets.raribleuserdata.com/prod/v1/image/t_image_preview/aHR0cHM6Ly9kaWdpZGFpZ2FrdS5jb20vaW1hZ2UvMTk4MC5wbmc=",
  },
  {
    status: "soldOut",
    title: "title8",
    imgUrl: "https://via.placeholder.com/500",
  },
  {
    status: "comingSoon",
    title: "title9",
    imgUrl: "https://via.placeholder.com/500",
  },
];

const Sales = () => {
  const onSale = dummyData.filter((data) => data.status === "onSale");
  const soldOut = dummyData.filter((data) => data.status === "soldOut");
  const comingSoon = dummyData.filter((data) => data.status === "comingSoon");

  return (
    <VStack
      spacing={5}
      w="full"
      p="5"
      border={"1px"}
      borderColor="blackAlpha.50"
    >
      <VStack spacing={2} w="full" p="3" align={"flex-start"}>
        <Heading>On Sale</Heading>
        <CardGrid data={onSale} />
      </VStack>

      {/* <VStack spacing={2} w="full" p="3" align={"flex-start"}>
        <Heading>Sold Out</Heading>
        <CardGrid data={soldOut} />
      </VStack>

      <VStack spacing={2} w="full" p="3" align={"flex-start"}>
        <Heading>Comming Soon</Heading>
        <CardGrid data={comingSoon} />
      </VStack> */}
    </VStack>
  );
};

export default Sales;
