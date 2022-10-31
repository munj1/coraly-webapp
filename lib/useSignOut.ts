import { Auth, AuthError } from "firebase/auth";
import { useMemo, useState } from "react";

// https://github.com/CSFrequency/react-firebase-hooks/blob/master/auth/useSignOut.ts#L1

export type SignOutHook = [
  () => Promise<void>,
  boolean,
  AuthError | Error | undefined
];

const useSignOut = (auth: Auth): SignOutHook => {
  const [error, setError] = useState<AuthError>();
  const [loading, setLoading] = useState<boolean>(false);

  const signOut = async () => {
    setLoading(true);
    setError(undefined);
    try {
      await auth.signOut();
    } catch (err) {
      setError(err as AuthError);
    } finally {
      setLoading(false);
    }
  };

  const resArray: SignOutHook = [signOut, loading, error];
  return useMemo<SignOutHook>(() => resArray, resArray);
};

export default useSignOut;
