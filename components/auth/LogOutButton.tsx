import { useToast, Button } from "@chakra-ui/react";
import { useContext } from "react";
import { FirebaseContext } from "../../context/FirebaseContext";
import useSignOut from "../../lib/useSignOut";
import { useRouter } from "next/router";

const LogOutButton = () => {
  const firebaseCtx = useContext(FirebaseContext);
  const { auth } = firebaseCtx;
  const [signOut, loading, _] = useSignOut(auth);
  const toast = useToast();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Logged out",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      router.push("/");
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
    <Button onClick={handleLogout} isLoading={loading}>
      Log Out
    </Button>
  );
};

export default LogOutButton;
