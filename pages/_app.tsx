import type { AppProps } from "next/app";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../utils/ui/theme";
import FirebaseContextProvider from "../context/FirebaseContext";

// This is the chainId your dApp will work on.
const activeChainId = ChainId.Mumbai;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      desiredChainId={activeChainId}
      authConfig={{
        authUrl: "/api/auth",
        domain: "localhost:3000",
        loginRedirect: "/",
      }}
    >
      <FirebaseContextProvider>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </FirebaseContextProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
