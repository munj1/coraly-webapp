import { Firestore } from "firebase/firestore";
import { Auth } from "firebase/auth";
import { FirebaseStorage } from "firebase/storage";
import React, { createContext, useState } from "react";
import initializeFirebaseClient from "../lib/initFirebase";

const {
  db: dbInit,
  auth: authInit,
  storage: storageInit,
} = initializeFirebaseClient();

// client - auth, db, storage를 관리해야함 (firebase)
export const FirebaseContext = createContext({
  auth: authInit,
  db: dbInit,
  storage: storageInit,
  setAuth: (auth: Auth) => {},
  setDb: (db: Firestore) => {},
  setStorage: (storage: FirebaseStorage) => {},
});

const FirebaseContextProvider = ({ children }) => {
  const [auth, setAuth] = useState<Auth>(authInit);
  const [db, setDb] = useState<Firestore>(dbInit);
  const [storage, setStorage] = useState<FirebaseStorage>(storageInit);

  function setAuthHandler(auth: Auth) {
    setAuth(auth);
  }

  function setDbHandler(db: Firestore) {
    setDb(db);
  }

  function setStorageHandler(storage: FirebaseStorage) {
    setStorage(storage);
  }

  const context = {
    auth,
    db,
    storage,
    setAuth: setAuthHandler,
    setDb: setDbHandler,
    setStorage: setStorageHandler,
  };

  return (
    <FirebaseContext.Provider value={context}>
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseContextProvider;
