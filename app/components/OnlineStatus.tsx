'use client';

import useOnlineChannel from "@/app/hooks/useOnlineChannel";

const OnlineStatus = () => {
  useOnlineChannel();

  return null;
}

export default OnlineStatus;