import {
  Badge,
  Box,
  Center,
  Flex,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

const Card = ({ status, imgUrl, title }) => {
  // status : onSale, soldOut, comingSoon
  // if status == onSale, get Amount of sold tokens
  const router = useRouter();

  const renderStatus = () => {
    return (
      <Flex w="full" justify={"space-between"} p="2" align={"center"}>
        <Badge size="sm">onSale</Badge>
        <Text size="sm">3188 piece solded</Text>
      </Flex>
    );
  };

  return (
    <Box
      border={"2px"}
      borderColor="blackAlpha.600"
      height="80"
      cursor={"pointer"}
      rounded={"md"}
      onClick={() => router.push("/detail")}
    >
      <Flex h="52">
        <Image src={imgUrl} alt={title} objectFit={"cover"} w="full" />
      </Flex>
      <VStack>{renderStatus()}</VStack>
    </Box>
  );
};

export default Card;
