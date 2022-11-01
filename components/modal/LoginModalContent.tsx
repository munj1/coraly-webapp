import { useAddress } from "@thirdweb-dev/react";
import {
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Center,
  VStack,
  Heading,
  Spinner,
  Text,
} from "@chakra-ui/react";
import WalletButtons from "../auth/WalletButtons";
import LogInButton from "../auth/LogInButton";
import { useContext, useEffect } from "react";
import { FirebaseContext } from "../../context/FirebaseContext";
import { useAuthState } from "react-firebase-hooks/auth";

const LoginModalContent = ({ onClose }) => {
  const address = useAddress();
  const firebaseCtx = useContext(FirebaseContext);
  const { auth } = firebaseCtx;
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (address && user) {
      onClose();
    }
  }, [address, user, onClose]);

  return (
    <ModalContent>
      <ModalHeader>Connect Wallet & Login</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        {loading && <Spinner />}
        {error && <Text>Error fetching user from auth</Text>}
        {!address && (
          <Center w="full" p="12">
            <WalletButtons
              text={"Please Connect Wallet & Login"}
              textSize="xl"
              mt={0}
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
      </ModalBody>

      {/* <ModalFooter>
        <Button onClick={onClose}>Close</Button>
      </ModalFooter> */}
    </ModalContent>
  );
};

export default LoginModalContent;
