'use client';

import Modal from "@/app/components/modals/Modal";
import Image from "next/image";
import { FC } from "react";

interface ImageModalProps {
  isOpen?: boolean;
  onClose: () => void;
  src?: string | null;
}

const ImageModal: FC<ImageModalProps> = ({ isOpen, onClose, src }) => {

  if (!src) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      hideClose
    >
      <div className="w-80 h-80 xl:w-96 xl:h-96">
        <Image
          fill
          alt="image"
          placeholder="blur"
          blurDataURL="/placeholders/image-placeholder.webp"
          src={src}
          className="object-contain"
        />
      </div>
    </Modal>
  );
}
export default ImageModal;