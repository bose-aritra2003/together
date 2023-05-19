'use client';

import { useRouter } from "next/navigation";
import useConversation from "@/app/hooks/useConversation";
import { FC, useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Modal from "@/app/components/modals/Modal";
import { FiAlertTriangle } from "react-icons/fi";
import { Dialog } from "@headlessui/react";
import Button from "@/app/components/buttons/Button";
import Spinner from "@/app/components/loading/Spinner";

interface ConfirmModalProps {
  isOpen?: boolean;
  onClose: () => void;
}

const ConfirmModal: FC<ConfirmModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { conversationId } = useConversation();
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = useCallback(async () => {
    setIsLoading(true);
    try {
      await axios.delete(`/api/conversations/${conversationId}`);
      toast.success('Conversation deleted successfully');
      onClose();
      router.push('/conversations');
      router.refresh();
    } catch (error: any) {
      toast.error("Unable to delete conversation");
    } finally {
      setIsLoading(false);
    }
  }, [conversationId, router, onClose]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="sm:flex sm:items-center">
        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-rose-100 sm:mx-0">
          <FiAlertTriangle className="h-6 w-6 text-rose-500" />
        </div>
        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
          <Dialog.Title
            as="h3"
            className="text-base font-semibold leading-6 text-gray-900"
          >
            Delete conversation
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Are you sure you want to delete this conversation? This action cannot be undone.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-8 sm:mt-5 flex items-center justify-end gap-x-2">
        <Button
          secondary
          disabled={isLoading}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          danger
          disabled={isLoading}
          onClick={onDelete}
        >
          {isLoading && <Spinner />}
          Delete
        </Button>
      </div>
    </Modal>
  );
}
export default ConfirmModal;