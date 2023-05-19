'use client';

import { FC } from "react";
import { User } from "@prisma/client";
import Modal from "@/app/components/modals/Modal";
import Avatar from "@/app/components/avatars/Avatar";

interface ConfirmModalProps {
  isOpen?: boolean;
  onClose: () => void;
  users: User[];
}

const SeenUsersModal: FC<ConfirmModalProps> = ({ isOpen, onClose, users }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <div>
        <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
          Seen by
        </dt>
        <dd className="mt-3 text-sm text-gray-900 flex flex-col space-y-3">
          {
            users.map((user) => (
              <div className="flex space-x-2 items-center">
                <Avatar user={ user } small noStatus/>
                <div>
                  <p>{ user.name }</p>
                  <p className="text-gray-500 text-xs">{ user.email }</p>
                </div>
              </div>
            ))
          }
        </dd>
      </div>
    </Modal>
  );
}
export default SeenUsersModal;