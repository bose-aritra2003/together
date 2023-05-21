'use client';
import Brand from "@/app/components/home/Brand";
import Button from "@/app/components/buttons/Button";
import {useRouter} from "next/navigation";
import HamburgerMenu from "@/app/components/home/HamburgerMenu";

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="flex justify-between bg-emerald-50 items-center py-5 sm:py-7 xl:py-10 px-4 sm:px-10 xl:px-16 2xl:px-36">
      <Brand />
      <HamburgerMenu />
      <div className="hidden text-xl sm:flex justify-between items-center space-x-3">
        <button
          className="flex items-center justify-center text-emerald-900 rounded-lg px-3 py-2 text-md font-semibold hover:bg-emerald-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all ease-in-out"
          onClick={() => router.push('/auth?variant=login')}
        >
          Sign in
        </button>
        <Button onClick={() => router.push('/auth?variant=register')}>
          Register
        </Button>
      </div>
    </nav>
  );
};
export default Navbar;