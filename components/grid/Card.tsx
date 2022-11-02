import {
  Badge,
  Box,
  Flex,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

export type CardProps = {
  status: string;
  title: string;
  imageUrl: string;
  id: string;
  price: string;
  amount: string;
  currency: string;
  name: string;
};

const Card = ({
  status,
  imageUrl,
  title,
  id,
  price,
  amount,
  currency,
  name,
}: CardProps) => {
  const router = useRouter();

  return (
    <Box
      border={"2px"}
      borderColor="blackAlpha.600"
      height={[200, 300, 400]}
      cursor={"pointer"}
      rounded={"md"}
      onClick={() => router.push(`/sales/${id}`)}
    >
      <Flex height={"70%"}>
        <Image src={imageUrl} alt={title} objectFit={"cover"} w="full" />
      </Flex>
      <VStack align={"flex-end"} pt="2" px="6">
        <Flex justify={"space-between"} align={"center"} w="full">
          <Badge size={["xs", "sm"]}>{status}</Badge>
          <Heading size={["xs", "sm"]} textAlign="right">
            {name}
          </Heading>
        </Flex>
        <Text size={["xs", "sm"]} textAlign="end">
          {price} {currency}
        </Text>
        <Text size={["xs", "sm"]}>{amount} piece sold</Text>
      </VStack>
    </Box>
  );
};

export default Card;
