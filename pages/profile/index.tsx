import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  VStack,
} from "@chakra-ui/react";
import Navbar from "../../components/navwallet/Navbar";
import { useAddress, useNetworkMismatch } from "@thirdweb-dev/react";

//auth
import { useContext } from "react";
import { FirebaseContext } from "../../context/FirebaseContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { MyModalContext } from "../../context/MyModalContext";
import MyPageTab from "../../components/mypage/MyPageTab";
import MyProfile from "../../components/mypage/MyProfile";
import LogOutButton from "../../components/auth/LogOutButton";
import NetworkMismatchCenter from "../../components/auth/NetworkMismatchCenter";

const ProfilePage = () => {
  // if wallet is not connected => then connect wallet
  // if user is not logged in => then display login button at the center
  const address = useAddress();
  const firebaseCtx = useContext(FirebaseContext);
  const { auth } = firebaseCtx; // if need db, storage , then add them
  const [user, loading, error] = useAuthState(auth);
  const { onOpenModal, setModalStatus } = useContext(MyModalContext);
  const isMimatch = useNetworkMismatch();

  if (isMimatch) return <NetworkMismatchCenter />;

  return (
    <Flex align={"stretch"} flexDir="column">
      <Navbar />
      {/* if user, wallet don't exist -> render open login modal button */}
      {(!address || !user) && (
        <Center w="full" p="10" h="full">
          <Button
            onClick={() => {
              setModalStatus("login");
              onOpenModal();
            }}
          >
            Connect Wallet & Login
          </Button>
        </Center>
      )}

      {address && user && (
        <Center w="full" h="full" p="6">
          <VStack spacing="6" align={"flex-start"}>
            <Heading>My Page</Heading>
            <MyProfile />
            <MyPageTab />
            <LogOutButton />
          </VStack>
        </Center>
      )}
    </Flex>
  );
};

export default ProfilePage;
