import { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FirebaseContext } from "../../context/FirebaseContext";
import {
  Avatar,
  Center,
  HStack,
  Image,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";

const MyProfile = () => {
  const firebaseCtx = useContext(FirebaseContext);
  const { auth } = firebaseCtx;
  const [user, loading, error] = useAuthState(auth);

  if (loading) return <Spinner />;
  if (error) return <Text>Error Loading User Profile</Text>;

  return (
    <VStack spacing={2} align="flex-start">
      {user && <Avatar src={user?.photoURL} size="xl" borderRadius="full" />}
      {user && <Text>Name: {user?.displayName ?? "unknown"}</Text>}
      {user && <Text>Wallet Address: {user?.uid}</Text>}
      {user?.email && <Text>Email: {user?.email}</Text>}
    </VStack>
  );
};

export default MyProfile;
