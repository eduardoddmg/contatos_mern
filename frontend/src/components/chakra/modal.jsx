import {
  useDisclosure,
  Modal as ModalChakra,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";

export const Modal = ({ children, title, onOpen, isOpen, onClose }) => {
  return (
    <>
      <ModalChakra isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
        </ModalContent>
      </ModalChakra>
    </>
  );
};
