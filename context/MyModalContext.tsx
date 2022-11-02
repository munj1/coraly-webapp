import { useDisclosure } from "@chakra-ui/react";
import React, { createContext, useState } from "react";

type Modal = "login" | "payment" | "setClaimingCondition";

export const MyModalContext = createContext({
  isOpenModal: false,
  onOpenModal: () => {},
  onCloseModal: () => {},
  modalStatus: "login" as Modal,
  setModalStatus: (modalStatus: Modal) => {},
  targetERC1155: "0",
  setTargetERC1155: (targetERC1155: string) => {},
  modalSize: "md",
  setModalSize: (modalSize: "xs" | "sm" | "md" | "lg" | "xl" | "full") => {},
});

const MyModalContextProvider = ({ children }) => {
  const [targetERC1155, setTargetERC1155] = useState("0");
  const [modalSize, setModalSize] = useState<
    "xs" | "sm" | "md" | "lg" | "xl" | "full"
  >("md");
  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();
  const [modalStatus, setModalStatus] = useState<Modal>("login");
  const handlesetModalStatus = (modalStatus: Modal) => {
    setModalStatus(modalStatus);
  };
  const handleTargetERC1155 = (targetERC1155: string) => {
    setTargetERC1155(targetERC1155);
  };

  const handleModalSize = (
    modalSize: "xs" | "sm" | "md" | "lg" | "xl" | "full"
  ) => {
    setModalSize(modalSize);
  };

  const context = {
    isOpenModal,
    onOpenModal,
    onCloseModal,
    modalStatus,
    setModalStatus: handlesetModalStatus,
    targetERC1155,
    setTargetERC1155: handleTargetERC1155,
    modalSize,
    setModalSize: handleModalSize,
  };

  return (
    <MyModalContext.Provider value={context}>
      {children}
    </MyModalContext.Provider>
  );
};

export default MyModalContextProvider;
