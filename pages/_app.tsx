import type { AppProps } from "next/app";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../utils/ui/theme";

// This is the chainId your dApp will work on.
const activeChainId = ChainId.Mumbai;

// auth
// authConfig={{
//   authUrl: "/api/auth",
//   domain: "example.org",
//   loginRedirect: "/",
// }}
// We can also use the useUser hook to get the currently authenticated user:
//  import { ConnectWallet, useUser } from "@thirdweb-dev/react";
//  const { user } = useUser();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider desiredChainId={activeChainId}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
