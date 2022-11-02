import { Container, Heading, VStack } from "@chakra-ui/react";
import CardGrid from "./CardGrid";

//  status, title, imageUrl

const Sales = () => {
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
      </VStack>
    </VStack>
  );
};

export default Sales;
