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
} from "@chakra-ui/react";
import { BsWallet2 } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { useEffect, useRef, useState } from "react";
import Wallet from "./Wallet";
import { useRouter } from "next/router";
import { useAddress, useDisconnect } from "@thirdweb-dev/react";
import { useContext } from "react";
import { FirebaseContext } from "../context/FirebaseContext";
import { useAuthState } from "react-firebase-hooks/auth";
import LogOutButton from "./auth/LogOutButton";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const address = useAddress();
  const disconnect = useDisconnect();
  const router = useRouter();
  const [shortenedAddress, setShortenedAddress] = useState("");

  useEffect(() => {
    if (address) {
      setShortenedAddress(address.slice(0, 6) + "..." + address.slice(-4));
    }
    setShortenedAddress("");
  }, [address]);

  // auth
  const firebaseCtx = useContext(FirebaseContext);
  const { auth, db } = firebaseCtx;
  const [user, loading, error] = useAuthState(auth);

  return (
    <Flex
      minWidth="max-content"
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
          onClick={() => router.push("/profile")}
        />
        <IconButton
          aria-label="Connect Wallet"
          icon={<BsWallet2 />}
          background="blackAlpha.800"
          color="white"
          onClick={onOpen}
          ref={btnRef}
        />
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
              {user && <Text>user Logged In</Text>}
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
