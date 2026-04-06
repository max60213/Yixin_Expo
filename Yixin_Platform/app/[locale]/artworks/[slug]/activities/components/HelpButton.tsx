"use client";

import Modal from "@/app/components/modal/Modal";
import FinalAnchor from "@/app/components/modal/FinalAnchor";
import { useModal } from "@/app/hooks/useModal";

const HelpButton = ({ className }: { className?: string }) => {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <>
      <p onClick={openModal} className={className}>
        這是如何運作的？
      </p>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <FinalAnchor />
      </Modal>
    </>
  );
};

export default HelpButton;
