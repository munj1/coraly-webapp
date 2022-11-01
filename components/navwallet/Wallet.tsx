import {
  Center,
  Heading,
  HStack,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  useAddress,
  useNetworkMismatch,
  useSDK,
  useContract,
  useTokenBalance,
} from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import { getPricesFromBinance, USDT_ADDRESS } from "../../utils/consts";
import { Matic, Usdc, Usdt, Eth } from "@web3uikit/icons";
import LogInButton from "../auth/LogInButton";
import { Auth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import WalletButtons from "../auth/WalletButtons";
import NetworkMismatch from "../auth/NetworkMismatch";

const Wallet = ({ auth }: { auth: Auth }) => {
  const address = useAddress();
  const isMimatch = useNetworkMismatch();

  const [maticBalance, setMaticBalance] = useState({ balance: "", usd: "" });
  const [usdtBalance, setUsdtBalance] = useState({ balance: "", usd: "" });
  const [totalBalance, setTotalBalance] = useState("");
  const sdk = useSDK();

  //auth
  const [user, loading, error] = useAuthState(auth);

  const { contract: usdtContract } = useContract(USDT_ADDRESS);
  const {
    data: usdt,
    isLoading: isLoadingUsdt,
    error: isErrorUsdt,
  } = useTokenBalance(usdtContract, address);

  /** get Balance from user's wallet, fetch data from binance api, calculate price, set price states*/
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

  useEffect(() => {
    if (!address) return;
    if (isLoadingUsdt) return;
    if (isErrorUsdt) return;
    getBalances();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, usdt, isLoadingUsdt, isErrorUsdt]);

  if (!address) {
    return (
      <WalletButtons
        text={"Connect your wallet to buy NFTs in our platform"}
        textSize="xs"
        mt={8}
      />
    );
  }

  if (isMimatch) return <NetworkMismatch />;

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
      {/* if user not logged in, then display login button  */}
      {!user && <LogInButton />}

      {/* <LogOutButton /> */}
    </VStack>
  );
};

export default Wallet;
