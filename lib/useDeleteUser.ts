import { Auth, AuthError } from "firebase/auth";
import { useMemo, useState } from "react";

// https://github.com/CSFrequency/react-firebase-hooks/blob/master/auth/useDeleteUser.ts

export type DeleteUserHook = [
  () => Promise<void>,
  boolean,
  AuthError | Error | undefined
];

const useDeleteUser = (auth: Auth): DeleteUserHook => {
  const [error, setError] = useState<AuthError>();
  const [loading, setLoading] = useState<boolean>(false);

  const deleteUser = async () => {
    setLoading(true);
    setError(undefined);
    try {
      if (auth.currentUser) {
        await auth.currentUser.delete();
      } else {
        setError(new Error("No user is logged in") as AuthError);
      }
    } catch (err) {
      setError(err as AuthError);
    } finally {
      setLoading(false);
    }
  };

  const resArray: DeleteUserHook = [deleteUser, loading, error];
  return useMemo<DeleteUserHook>(() => resArray, resArray);
};

export default useDeleteUser;
