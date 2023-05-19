'use client';

import { User } from "@prisma/client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import Modal from "@/app/components/modals/Modal";
import Input from "@/app/components/inputs/Input";
import Select from "@/app/components/inputs/Select";
import Button from "@/app/components/buttons/Button";
import Spinner from "@/app/components/loading/Spinner";

interface GroupChatModalProps {
  isOpen?: boolean;
  onClose: () => void;
  users: User[];
}

const GroupChatModal: React.FC<GroupChatModalProps> = ({ isOpen, onClose, users }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors
    }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      members: []
    }
  });

  const members = watch('members');

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      await axios.post('/api/conversations', {
        ...data,
        isGroup: true
      });
      toast.success("Group created successfully")
      router.refresh();
      onClose();
    } catch (error: any) {
      toast.error("Too few members");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900 border-opacity-10 pb-10">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Create a group chat
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-500">
              Create a chat with 2 or more people.
            </p>
            <div className="mt-8 flex flex-col gap-y-8">
              <Input
                register={register}
                label="Name"
                id="name"
                disabled={isLoading}
                required
                errors={errors}
              />
              <Select
                disabled={isLoading}
                label="Members"
                options={
                  users.map((user) => ({
                    value: user.id,
                    label: user,
                  }))
                }
                onChange={(value) => setValue('members', value, {
                  shouldValidate: true
                })}
                value={members}
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-2">
          <Button
            type="button"
            secondary
            disabled={isLoading}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            disabled={isLoading}
            type="submit"
          >
            {isLoading && <Spinner />}
            Create
          </Button>
        </div>
      </form>
    </Modal>
  );
}
export default GroupChatModal;