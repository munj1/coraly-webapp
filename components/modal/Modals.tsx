import { Modal, ModalOverlay } from "@chakra-ui/react";
import LoginModalContent from "./LoginModalContent";
import { MyModalContext } from "../../context/MyModalContext";
import { useContext } from "react";
import SetClaimingConditionModal from "./SetClaimingConditionModal";

const Modals = () => {
  const { isOpenModal, onCloseModal, modalStatus, targetERC1155, modalSize } =
    useContext(MyModalContext);

  return (
    <Modal isOpen={isOpenModal} onClose={onCloseModal} size={modalSize}>
      <ModalOverlay />
      {modalStatus == "login" && <LoginModalContent onClose={onCloseModal} />}
      {modalStatus == "setClaimingCondition" && (
        <SetClaimingConditionModal
          onClose={onCloseModal}
          targetERC1155={targetERC1155}
        />
      )}
    </Modal>
  );
};

export default Modals;
