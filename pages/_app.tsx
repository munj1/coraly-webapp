import type { AppProps } from "next/app";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../utils/ui/theme";
import FirebaseContextProvider from "../context/FirebaseContext";
import Modals from "../components/modal/Modals";
import MyModalContextProvider from "../context/MyModalContext";

// This is the chainId your dApp will work on.
const activeChainId = ChainId.Mumbai;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      desiredChainId={activeChainId}
      authConfig={{
        authUrl: "/api/auth",
        domain: "coraly-webapp.vercel.app",
        loginRedirect: "/",
      }}
    >
      <FirebaseContextProvider>
        <MyModalContextProvider>
          <ChakraProvider theme={theme}>
            <Component {...pageProps} />
            <Modals />
          </ChakraProvider>
        </MyModalContextProvider>
      </FirebaseContextProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
