import {
  useUpdateProfile,
  useUpdateEmail,
  useAuthState,
} from "react-firebase-hooks/auth";
import { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../../context/FirebaseContext";
import { Button, Input, useToast, VStack, Text } from "@chakra-ui/react";

const UpdateUser = () => {
  const firebaseCtx = useContext(FirebaseContext);
  const { auth } = firebaseCtx;
  const [user, loading, error] = useAuthState(auth);

  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  const [updateProfile, updatingProfile, errorProfile] = useUpdateProfile(auth);
  const [updateEmail, updatingEmail, errorEmail] = useUpdateEmail(auth);
  const toast = useToast();

  useEffect(() => {
    if (loading) return;
    if (error) {
      toast({
        title: "Error loading user",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    if (user) {
      setEmail(user?.email ?? "");
      setDisplayName(user?.displayName ?? "");
      setPhotoURL(user?.photoURL ?? "");
    }
  }, [user, loading, error, toast]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile({ displayName, photoURL });
      //   await updateEmail(email);
      toast({
        title: "Profile updated",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack spacing="2" align="flex-start">
      <Text>Email</Text>
      <Input
        // value={email}
        disabled
        placeholder="Set Email, Currently not working"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Text>Display Name</Text>
      <Input
        value={displayName}
        type="text"
        onChange={(e) => setDisplayName(e.target.value)}
      />
      <Text>Photo URL</Text>
      <Input
        value={photoURL}
        type="text"
        onChange={(e) => setPhotoURL(e.target.value)}
      />
      <Button onClick={handleSubmit}>Update</Button>
      {updatingProfile && <Text>Updating profile...</Text>}
      {updatingEmail && <Text>Updating email...</Text>}
      {errorProfile && <Text>{errorProfile.message}</Text>}
      {errorEmail && <Text>{errorEmail.message}</Text>}
    </VStack>
  );
};

export default UpdateUser;
