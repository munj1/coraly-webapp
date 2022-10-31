import { useEffect } from "react";
import { useAddress } from "@thirdweb-dev/react";
import {
  Avatar,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  VStack,
  Text,
  useToast,
} from "@chakra-ui/react";
import {
  useWalletConnect,
  useMetamask,
  useCoinbaseWallet,
} from "@thirdweb-dev/react";

const WalletButtons = ({
  text,
  textSize,
}: {
  text: string;
  textSize: string;
}) => {
  const connectWithMetamask = useMetamask();
  const connectWithWalletConnect = useWalletConnect();
  const connectWithCoinbaseWallet = useCoinbaseWallet();
  const toast = useToast();
  const address = useAddress();

  useEffect(() => {
    if (address) {
      toast({
        title: `Wallet Connected to ${address}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [address]);

  return (
    <VStack spacing={"6"}>
      <Center h="28">
        <Text fontSize={textSize} align={"center"}>
          {text}
        </Text>
      </Center>
      <Flex justify={"space-between"} w="full">
        <HStack>
          <Avatar src="/metamask.png" size="xs" />
          <Heading size="sm">Metamask</Heading>
        </HStack>
        <Button size="sm" onClick={connectWithMetamask}>
          Connect
        </Button>
      </Flex>
      <Flex justify={"space-between"} w="full">
        <HStack>
          <Avatar src="/walletconnect.png" size="xs" />
          <Heading size="sm">Wallet Connect</Heading>
        </HStack>
        <Button size="sm" onClick={connectWithWalletConnect}>
          Connect
        </Button>
      </Flex>
      <Flex justify={"space-between"} w="full">
        <HStack>
          <Avatar src="/coinbase.svg" size="xs" />
          <Heading size="sm">Coinbase Wallet</Heading>
        </HStack>
        <Button size="sm" onClick={connectWithCoinbaseWallet}>
          Connect
        </Button>
      </Flex>
    </VStack>
  );
};

export default WalletButtons;
