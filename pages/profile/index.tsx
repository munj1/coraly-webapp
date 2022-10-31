import {
  Box,
  Center,
  Container,
  Flex,
  Heading,
  VStack,
} from "@chakra-ui/react";
import Navbar from "../../components/Navbar";
import { useAddress } from "@thirdweb-dev/react";

//auth
import { useContext } from "react";
import { FirebaseContext } from "../../context/FirebaseContext";
import { useAuthState } from "react-firebase-hooks/auth";
import WalletButtons from "../../components/auth/WalletButtons";
import LogInButton from "../../components/auth/LogInButton";

const ProfilePage = () => {
  // if wallet is not connected => then connect wallet
  // if user is not logged in => then display login button at the center
  const address = useAddress();
  const firebaseCtx = useContext(FirebaseContext);
  const { auth } = firebaseCtx; // if need db, storage , then add them
  const [user, loading, error] = useAuthState(auth);

  return (
    <Flex align={"stretch"} flexDir="column" h={"max-content"}>
      <Navbar />
      {!address && (
        <Center w="full" p="12">
          <WalletButtons
            text={"Before login, You need to connect to the wallet"}
            textSize="2xl"
          />
        </Center>
      )}
      {address && !user && (
        <Center w="full" p="12">
          <VStack spacing={"10"}>
            <Heading>Sign In</Heading>
            <LogInButton />
          </VStack>
        </Center>
      )}
    </Flex>
  );
};

export default ProfilePage;
