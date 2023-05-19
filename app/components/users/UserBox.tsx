'use client';

import { User } from "@prisma/client";
import { FC, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Avatar from "@/app/components/avatars/Avatar";
import { toast } from "react-toastify";
import LoadingModal from "@/app/components/loading/LoadingModal";

interface UserBoxProps {
  data: User
}

const UserBox: FC<UserBoxProps> = ({ data }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(async () => {
    setIsLoading(true);

    try {
      const _data = await axios.post('/api/conversations', {
        userId: data.id
      });
      router.push(`/conversations/${_data.data.id}`);
    } catch (error: any) {
      toast.error("Unable to create conversation");
    } finally {
      setIsLoading(false);
    }

  }, [data, router]);

  return (
    <>
      { isLoading && <LoadingModal /> }
      <div
        onClick={handleClick}
        className="w-full relative flex items-center space-x-3 bg-white p-3 transition-all ease-in-out hover:bg-gray-100 rounded-lg cursor-pointer"
      >
        <Avatar user={data} />
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm font-medium text-gray-900">
                { data.name }
              </p>
            </div>
          </div>
        </div>
      </div>
    </>

  );
}
export default UserBox;