import { Center, VStack, Button, Text } from "@chakra-ui/react";
import { useNetwork } from "@thirdweb-dev/react";
import { ChainId } from "@thirdweb-dev/sdk";

const NetworkMismatch = () => {
  const [, switchNetwork] = useNetwork();

  return (
    <Center h="full">
      <VStack spacing={"8"}>
        <Text fontSize={"md"} align={"center"}>
          Please switch to Mumbai Testnet
        </Text>
        <Button onClick={() => switchNetwork(ChainId.Mumbai)}>
          Switch Network
        </Button>
      </VStack>
    </Center>
  );
};

export default NetworkMismatch;
