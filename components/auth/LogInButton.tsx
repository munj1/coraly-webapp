import { useSDK } from "@thirdweb-dev/react";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { signInWithCustomToken } from "firebase/auth";
import { Button, useToast } from "@chakra-ui/react";
import { useContext } from "react";
import { FirebaseContext } from "../../context/FirebaseContext";
import { SiEthereum } from "react-icons/si";

const LogInButton = () => {
  const sdk = useSDK();
  const firebaseCtx = useContext(FirebaseContext);
  const { auth, db } = firebaseCtx;
  const toast = useToast();

  //   The signIn function:
  //     Makes a request to the api/auth/login endpoint to get a custom token from Firebase
  //     Signs the user in with the custom token
  //     Creates a user in Firestore with the verified user's address

  async function signIn() {
    const payload = await sdk?.auth.login("localhost:3000"); // payload = sign in with ethereum to this webpage

    // make a request to the api with the payload
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ payload }),
    }); // send signature -> get custom JWT auth token

    // get the returned JWT token to use it to sign in with
    const { token } = await response.json();

    signInWithCustomToken(auth, token)
      .then((userCredential) => {
        // On sucess, we have access to the user object
        const user = userCredential.user;

        // If this is a new user, we create a new document in the database
        const usersRef = doc(db, "users", user.uid!);
        if (!usersRef) {
          // User now has permission to update their own document outlined in the Firestore rules.
          setDoc(usersRef, { createdAt: serverTimestamp() }, { merge: true });
        }
        toast({
          title: "Logged in",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.error(error);
        toast({
          title: "Error",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  }

  return (
    <Button
      onClick={() => signIn()}
      colorScheme={"yellow"}
      leftIcon={<SiEthereum />}
    >
      Sign in with Ethereum
    </Button>
  );
};

export default LogInButton;
