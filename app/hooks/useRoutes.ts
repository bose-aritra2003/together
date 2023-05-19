import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { BsFillChatDotsFill } from "react-icons/bs";
import { HiArrowLeftOnRectangle } from "react-icons/hi2";
import { FaUsers } from "react-icons/fa";
import { signOut } from "next-auth/react";
import useConversation from "@/app/hooks/useConversation";

const useRoutes = () => {
  const pathname = usePathname()
  const { conversationId } = useConversation();

  return useMemo(() => [
    {
      label: 'Chat',
      href: '/conversations',
      icon: BsFillChatDotsFill,
      active: pathname === '/conversations' || !!conversationId
    },
    {
      label: 'Users',
      href: '/users',
      icon: FaUsers,
      active: pathname === '/users'
    },
    {
      label: 'Sign out',
      href: '#',
      onClick: async () => await signOut(),
      icon: HiArrowLeftOnRectangle
    }
  ], [pathname, conversationId]);
}

export default useRoutes;