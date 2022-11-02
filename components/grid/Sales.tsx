import { Container, Heading, Spinner, VStack, Text } from "@chakra-ui/react";
import CardGrid from "./CardGrid";
import { useContext, useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { FirebaseContext } from "../../context/FirebaseContext";
import { CardProps } from "./Card";

//  status, title, imageUrl

const Sales = () => {
  const { db } = useContext(FirebaseContext);
  const [sales, loading, error] = useCollectionData(collection(db, "sales"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  const [data, setData] = useState<CardProps[]>([]);

  useEffect(() => {
    if (sales) {
      console.log(sales);
    }
    if (sales) {
      const data = sales.map((sale) => ({
        id: sale?.erc1155tokenId as string,
        name: sale?.name as string,
        price: sale?.price as string,
        amount: sale?.amount as string,
        currency: sale?.currency as string,
        status: sale?.status as string,
        imageUrl: sale?.mediaUrl as string,
        title: sale?.title as string,
      }));

      setData(data);
    }
  }, [sales]);

  if (loading || data.length < 1) return <Spinner />;
  if (error) return <Text>Error Fetching Data From DB</Text>;

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
        <CardGrid data={data} />
      </VStack>
    </VStack>
  );
};

export default Sales;

// getStaticProps로 db에서 가져오는게 맞지만, 귀찮으므로 firebase 리액트훅을 사용했음
// 온체인으로 전부 처리해보려 했으나 너무 느려서 안하는게 좋을거같음 (온체인으로 하려면 무조건 static props로 가져와야함, 너무느림)
// 개별 페이지에서는 온체인으로 긁어오자
