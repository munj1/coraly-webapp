import { useDisclosure } from "@chakra-ui/react";
import React, { createContext, useState } from "react";

type Modal = "login" | "payment" | "setClaimingCondition";

export const MyModalContext = createContext({
  isOpenModal: false,
  onOpenModal: () => {},
  onCloseModal: () => {},
  modalStatus: "login" as Modal,
  setModalStatus: (modalStatus: Modal) => {},
});

const MyModalContextProvider = ({ children }) => {
  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();
  const [modalStatus, setModalStatus] = useState<Modal>("login");
  const handlesetModalStatus = (modalStatus: Modal) => {
    setModalStatus(modalStatus);
  };

  const context = {
    isOpenModal,
    onOpenModal,
    onCloseModal,
    modalStatus,
    setModalStatus: handlesetModalStatus,
  };

  return (
    <MyModalContext.Provider value={context}>
      {children}
    </MyModalContext.Provider>
  );
};

export default MyModalContextProvider;
