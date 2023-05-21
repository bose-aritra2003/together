import { HiPaperAirplane } from "react-icons/hi2";
import { AiFillEdit, AiFillHome } from "react-icons/ai";
import { useMemo } from "react";

const useHamburgerRoutes = () => {
  return useMemo(() => [
    {
      label: 'Home',
      href: '/',
      icon: AiFillHome,
    },
    {
      label: 'Sign in',
      href: '/auth?variant=login',
      icon: HiPaperAirplane,
    },
    {
      label: 'Register',
      href: '/auth?variant=register',
      icon: AiFillEdit
    }
  ], []);
}

export default useHamburgerRoutes;