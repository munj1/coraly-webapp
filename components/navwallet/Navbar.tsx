import {
  Flex,
  Box,
  Button,
  Heading,
  Spacer,
  ButtonGroup,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Center,
  Text,
  VStack,
  Avatar,
} from "@chakra-ui/react";
import { BsWallet2 } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { useEffect, useRef, useState, useContext } from "react";
import Wallet from "./Wallet";
import { useRouter } from "next/router";
import { useAddress, useDisconnect } from "@thirdweb-dev/react";
import { FirebaseContext } from "../../context/FirebaseContext";
import { useAuthState } from "react-firebase-hooks/auth";
import LogOutButton from "../auth/LogOutButton";
import { MyModalContext } from "../../context/MyModalContext";
import NavMenu from "./NavMenu";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const address = useAddress();
  const disconnect = useDisconnect();
  const router = useRouter();
  const [shortenedAddress, setShortenedAddress] = useState("");

  // get shortened address
  useEffect(() => {
    if (address) {
      setShortenedAddress(address.slice(0, 6) + "..." + address.slice(-4));
    } else {
      setShortenedAddress("");
    }
  }, [address]);

  // auth
  const firebaseCtx = useContext(FirebaseContext);
  const { auth, db } = firebaseCtx;
  const [user, loading, error] = useAuthState(auth);
  useEffect(() => {
    if (loading) return;
    if (error) console.log(error);
    if (user) {
      console.log("user", user);
    }
  }, [user, error, loading]);

  // handle Click Profile Button
  const { setModalStatus, onOpenModal, setModalSize } =
    useContext(MyModalContext);

  const handleClickProfile = () => {
    if (!address || !user) {
      setModalStatus("login");
      setModalSize("md");
      onOpenModal();
    } else {
      router.push("/profile");
    }
  };

  return (
    <Flex
      minWidth="max-content"
      // w="calc(100vw)"
      alignItems="center"
      gap="2"
      p="3"
      bg="blackAlpha.200"
    >
      <Box p="2" onClick={() => router.push("/")} cursor={"pointer"}>
        <Heading size="md">Coraly</Heading>
      </Box>
      <Spacer />
      <ButtonGroup gap="2">
        <IconButton
          aria-label="User"
          icon={<AiOutlineUser />}
          onClick={handleClickProfile}
        />
        <IconButton
          aria-label="Connect Wallet"
          icon={<BsWallet2 />}
          background="blackAlpha.800"
          color="white"
          onClick={onOpen}
          ref={btnRef}
        />
        <NavMenu isAdmin={true} />
      </ButtonGroup>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>My Wallet</DrawerHeader>

          <DrawerBody>
            <Wallet auth={auth} />
          </DrawerBody>

          <DrawerFooter>
            <VStack w="full" alignItems={"flex-end"}>
              {user && (
                <Text>Hello! {user?.displayName ?? "unknown user"}</Text>
              )}
              {shortenedAddress && (
                <Text size="xs" textAlign={"right"}>
                  Connected to : {shortenedAddress}
                </Text>
              )}
              {address && <Button onClick={disconnect}>Disconnect</Button>}
              {!address && user && <LogOutButton />}
            </VStack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default Navbar;
