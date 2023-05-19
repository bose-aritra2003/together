import useOnlineList from "@/app/hooks/useOnlineList";
import {useEffect, useState} from "react";
import {Channel, Members} from "pusher-js";
import {pusherClient} from "@/app/libs/pusher";

const useOnlineChannel = () => {
  const { add, remove, set } = useOnlineList();
  const [onlineChannel, setOnlineChannel] = useState<Channel | null>(null);

  useEffect(() => {
    let channel = onlineChannel;

    if (!channel) {
      channel = pusherClient.subscribe('presence-together');
      setOnlineChannel(channel);
    }

    channel.bind('pusher:subscription_succeeded', (members: Members) => {
      const initialMembers: string[] = [];

      // Here member.id is referring to email as we have set it in the pages/api/pusher/auth.ts
      members.each((member: Record<string, any>) => initialMembers.push(member.id));
      set(initialMembers);
    });

    channel.bind('pusher:member_added', (member: Record<string, any>) => {
      add(member.id);
    });

    channel.bind('pusher:member_removed', (member: Record<string, any>) => {
      remove(member.id);
    });

    return () => {
      if (onlineChannel) {
        pusherClient.unsubscribe('presence-together');
        setOnlineChannel(null);
      }
    }
  }, [onlineChannel, set, add, remove]);
};
export default useOnlineChannel;