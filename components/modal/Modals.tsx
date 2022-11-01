import { Modal, ModalOverlay } from "@chakra-ui/react";
import LoginModalContent from "./LoginModalContent";
import { MyModalContext } from "../../context/MyModalContext";
import { useContext } from "react";

const Modals = () => {
  const { isOpenModal, onCloseModal, modalStatus } = useContext(MyModalContext);

  return (
    <Modal isOpen={isOpenModal} onClose={onCloseModal}>
      <ModalOverlay />
      {modalStatus == "login" && <LoginModalContent onClose={onCloseModal} />}
    </Modal>
  );
};

export default Modals;
