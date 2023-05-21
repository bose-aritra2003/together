'use client';

import { User } from "@prisma/client";
import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import axios from "axios";
import {toast} from "react-toastify";
import Modal from "@/app/components/modals/Modal";
import Input from "@/app/components/inputs/Input";
import Image from "next/image";
import {CldUploadButton} from "next-cloudinary";
import Button from "@/app/components/buttons/Button";
import Spinner from "@/app/components/loading/Spinner";

interface SettingsModalProps {
  isOpen?: boolean;
  onClose: () => void;
  currentUser: User;
}

const SettingsModal: FC<SettingsModalProps> = ({ isOpen, onClose, currentUser }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors,
    }
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name,
      image: currentUser?.image
    }
  });

  const image = watch('image');

  const handleUpload = (result: any) => {
    setValue('image', result?.info?.secure_url, {
      shouldValidate: true
    })
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      await axios.post('/api/settings', data);
      toast.success("Saved details successfully");
      router.refresh();
      onClose();
    } catch (error: any) {
      toast.error("Unable to save details");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-5">
          <div className="border-b border-gray-900 border-opacity-10 pb-5">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Profile
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-500">
              Edit your public information
            </p>
            <div className="mt-8 flex flex-col gap-y-8">
              <Input
                label="Name"
                id="name"
                disabled={isLoading}
                register={register}
                errors={errors}
              />
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Photo
                </label>
                <div className="mt-2 flex items-center gap-x-2">
                  <div className="relative inline-block rounded-full overflow-hidden h-12 w-12">
                    <Image
                      fill
                      placeholder="blur"
                      blurDataURL="/placeholders/image-placeholder.webp"
                      className="rounded-full"
                      src={image || currentUser?.image || '/placeholders/profile-placeholder.png'}
                      alt="avatar"
                    />
                  </div>

                  <CldUploadButton
                    options={{ maxFiles: 1 }}
                    onUpload={handleUpload}
                    uploadPreset="ekgfqqsr"
                  >
                    <Button
                      disabled={isLoading}
                      secondary
                      type="button"
                    >
                      Change
                    </Button>
                  </CldUploadButton>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-x-2">
            <Button
              type="button"
              disabled={isLoading}
              secondary
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              type="submit"
            >
              {isLoading && <Spinner />}
              Save
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
export default SettingsModal;