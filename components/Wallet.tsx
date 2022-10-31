import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Highlight,
  HStack,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  useAddress,
  useNetworkMismatch,
  useMetamask,
  useWalletConnect,
  useCoinbaseWallet,
  useDisconnect,
  useNetwork,
  ChainId,
} from "@thirdweb-dev/react";

const Wallet = () => {
  const address = useAddress();
  const isMimatch = useNetworkMismatch();
  const connectWithMetamask = useMetamask();
  const connectWithWalletConnect = useWalletConnect();
  const connectWithCoinbaseWallet = useCoinbaseWallet();
  const [, switchNetwork] = useNetwork();
  const disconnect = useDisconnect();

  if (!address) {
    return (
      <VStack spacing={"6"}>
        <Center h="28">
          <Text fontSize={"xs"} align={"center"}>
            Connect your wallet to buy NFTs in our platform
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
  }

  if (isMimatch) {
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
  }

  return (
    <VStack spacing={"4"} w="full">
      <VStack w="full">
        <VStack
          spacing={"3"}
          background={"blackAlpha.200"}
          w="full"
          py="6"
          rounded={"md"}
        >
          <Center h="8">
            <Text fontSize={"sm"} align={"center"}>
              Total balance
            </Text>
          </Center>
          <Center h="12">
            <Heading size={"lg"} textAlign={"center"}>
              $33.46 USD
            </Heading>
          </Center>
        </VStack>
      </VStack>
    </VStack>
  );
};

export default Wallet;
