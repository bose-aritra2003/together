'use client';

import useConversation from "@/app/hooks/useConversation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import MessageInput from "@/app/components/inputs/MessageInput";
import { CldUploadButton } from "next-cloudinary";

const Form = () => {
  const { conversationId } = useConversation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: {
      errors,
    }
  } = useForm<FieldValues>({
    defaultValues: {
      message: ''
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setValue('message', '', { shouldValidate: true });
    await axios.post('/api/messages', {
      ...data,
      conversationId
    })
  }

  const handleUpload = async (result: any) => {
    await axios.post('/api/messages', {
      image: result?.info?.secure_url,
      conversationId
    })
  }

  return (
    <div
      className="py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full"
    >
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={handleUpload}
        uploadPreset="ekgfqqsr"
      >
        <HiPhoto size={30} className="text-emerald-500 transition-all ease-in-out hover:text-emerald-600 cursor-pointer"/>
      </CldUploadButton>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="New message"
        />
        <button
          type="submit"
          className="rounded-full p-2 bg-emerald-500 cursor-pointer transition-all ease-in-out hover:bg-emerald-600"
        >
          <HiPaperAirplane size={18} className="text-white"/>
        </button>
      </form>
    </div>
  );
}
export default Form;