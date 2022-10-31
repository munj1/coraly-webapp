import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Skeleton,
  Spacer,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  useAddress,
  useNetworkMismatch,
  useMetamask,
  useWalletConnect,
  useCoinbaseWallet,
  useNetwork,
  ChainId,
  useSDK,
  useContract,
  useTokenBalance,
} from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import { getPricesFromBinance, USDT_ADDRESS } from "../utils/consts";
import { Matic, Usdc, Usdt, Eth } from "@web3uikit/icons";

const Wallet = () => {
  const address = useAddress();
  const isMimatch = useNetworkMismatch();
  const connectWithMetamask = useMetamask();
  const connectWithWalletConnect = useWalletConnect();
  const connectWithCoinbaseWallet = useCoinbaseWallet();
  const [, switchNetwork] = useNetwork();
  const [maticBalance, setMaticBalance] = useState({ balance: "", usd: "" });
  const [usdtBalance, setUsdtBalance] = useState({ balance: "", usd: "" });
  const [totalBalance, setTotalBalance] = useState("");
  const sdk = useSDK();
  const [shortenedAddress, setShortenedAddress] = useState("");

  const { contract: usdtContract } = useContract(USDT_ADDRESS);
  const {
    data: usdt,
    isLoading: isLoadingUsdt,
    error: isErrorUsdt,
  } = useTokenBalance(usdtContract, address);

  const getBalances = async () => {
    const { ethPrice, maticPrice } = await getPricesFromBinance();

    // MATIC (native token)
    const balance = await sdk.getBalance(address);
    const matic = parseFloat(balance.displayValue);
    const maticUsd = matic * maticPrice;
    setMaticBalance({ balance: matic.toFixed(2), usd: maticUsd.toFixed(2) });
    // USDT
    if (usdt) {
      //!isErrorUsdt && !isLoadingUsdt &&
      const usdtBalance = parseFloat(usdt.displayValue);
      setUsdtBalance({
        balance: usdtBalance.toFixed(2),
        usd: usdtBalance.toFixed(2),
      });
      setTotalBalance((maticUsd + usdtBalance).toFixed(2));
    }
    // WETH (wrapped ETH) - LATER
    // USDC - LATER
  };

  const [isMinting, setIsMinting] = useState(false);
  const mintDummyUsdt = async () => {
    // send GET request to /api/mint/usdt with address
    setIsMinting(true);

    try {
      const res = await fetch(`/api/mint/usdt?address=${address}`);
      const data = await res.json();
      console.log(data);
    } catch (e) {
      console.log(e);
      alert("Error minting USDT. Please try again.");
    }
    setIsMinting(false);
  };

  useEffect(() => {
    if (!address) return;
    if (isLoadingUsdt) return;
    if (isErrorUsdt) return;
    getBalances();
    setShortenedAddress(address.slice(0, 6) + "..." + address.slice(-4));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, usdt, isLoadingUsdt, isErrorUsdt]);

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
    <VStack w="full" spacing={"6"}>
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
          {totalBalance ? (
            <Heading size={"lg"} textAlign={"center"}>
              {totalBalance} USD
            </Heading>
          ) : (
            <Spinner />
          )}
        </Center>
      </VStack>

      <HStack align={"center"} w={"200px"} justify={"space-between"}>
        <Matic fontSize="24px" color="#000000" title="Matic" />
        {maticBalance?.balance ? (
          <VStack spacing={"2"} align="flex-end">
            <Text textAlign={"left"}>{maticBalance.balance} MATIC</Text>
            <Text textAlign={"left"}>{maticBalance.usd} $</Text>
          </VStack>
        ) : (
          <Spinner />
        )}
      </HStack>

      <HStack align={"center"} w={"200px"} justify={"space-between"}>
        <Usdt fontSize="24px" color="#000000" title="USDT" />
        {usdtBalance?.balance ? (
          <VStack spacing={"2"} align="flex-end">
            <Text textAlign={"left"}>{usdtBalance.balance} USDT</Text>
            <Text textAlign={"left"}>{usdtBalance.usd} $</Text>
          </VStack>
        ) : (
          <Spinner />
        )}
      </HStack>

      <HStack align={"center"} w={"200px"} justify={"space-between"}>
        <Eth fontSize="24px" color="#000000" title="ETH" />
        <VStack spacing={"2"} align="flex-end">
          <Text textAlign={"left"}>0 WETH</Text>
          <Text align={"left"}>0 $</Text>
        </VStack>
      </HStack>

      <HStack align={"center"} w={"200px"} justify={"space-between"}>
        <Usdc fontSize="24px" color="#000000" title="USDC" />
        <VStack spacing={"2"} align="flex-end">
          <Text textAlign={"left"}>0 USDC</Text>
          <Text textAlign={"left"}>0 $</Text>
        </VStack>
      </HStack>
      <Button size="xs" onClick={mintDummyUsdt} disabled={isMinting}>
        Claim test USDT (made by Hongjun)
      </Button>
    </VStack>
  );
};

export default Wallet;
