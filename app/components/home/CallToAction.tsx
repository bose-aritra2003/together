'use client';
import {HiChevronRight} from "react-icons/hi2";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {AiFillGithub} from "react-icons/ai";

const CallToAction = () => {
  const router = useRouter();
  return (
    <div className="bg-emerald-50 text-center space-y-14 px-4 xl:px-16 2xl:px-36 py-20 sm:py-28">
      <div className="space-y-8">
        <h2 className="text-2xl sm:text-3xl 2xl:text-4xl font-medium text-gray-900">Ready to unlock a new dimension of expression?</h2>
        <h1 className="text-4xl sm:text-5xl 2xl:text-6xl font-bold text-emerald-900">Level up your conversations now!</h1>
        <p className="mx-auto text-lg 2xl:text-xl font-normal text-gray-700 sm:w-1/2">
          Join now to experience a new dimension of communication. Sign up today and unlock the magic!
        </p>
      </div>

      <div className="w-fit mx-auto flex flex-col items-center space-y-3 sm:space-y-0 sm:space-x-5 sm:flex-row">
        <button
          className="text-white flex items-center justify-center rounded-lg px-4 py-3 text-md font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-emerald-500 hover:bg-emerald-600 focus-visible:outline-emerald-600 transition-all ease-in-out"
          onClick={() => router.push('/auth?variant=register')}
        >
          <div className="flex space-x-1 items-center text-xl sm:text-2xl font-medium">
            <p>Join now</p>
            <HiChevronRight />
          </div>
        </button>
        <Link
          target="_blank"
          href="https://github.com/bose-aritra2003/together"
          className="flex space-x-1 items-center text-lg text-gray-500 transition-all ease-in-out hover:text-emerald-900">
          <AiFillGithub />
          <p>View code on GitHub</p>
        </Link>
      </div>
    </div>
  );
}
export default CallToAction;