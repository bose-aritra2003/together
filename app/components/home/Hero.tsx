'use client';

import Image from "next/image";
import { useRouter  } from "next/navigation";
import { HiChevronRight } from "react-icons/hi2";
import Link from "next/link";
import { AiFillGithub } from "react-icons/ai";

const Hero = () => {
  const router = useRouter();
  return (
    <div className="bg-emerald-50 py-24 sm:py-28 flex flex-col space-y-10 xl:flex-row xl:space-y-0 xl:justify-between items-center">
      <div className="space-y-10 sm:space-y-10 px-4 xl:px-0 xl:pl-16 2xl:pl-36">
        <div className="text-emerald-900 leading-20 text-center space-y-5 xl:space-y-3 text-5xl xl:text-left font-bold 2xl:text-6xl">
          <h1>Cultivating <span className="text-black">Conversations</span>,</h1>
          <h1>Crafting <span className="text-black">Connections</span></h1>
          <p className="text-xl 2xl:text-2xl text-gray-500 font-light xl:ml-2">Real time messaging with sentiments</p>
        </div>
        <div className="w-fit mx-auto xl:mx-0 xl:ml-1 flex flex-col items-center space-y-3 sm:space-y-0 sm:space-x-5 sm:flex-row">
          <button
            className="text-white flex items-center justify-center rounded-lg px-4 py-3 text-md font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-emerald-500 hover:bg-emerald-600 focus-visible:outline-emerald-600 transition-all ease-in-out"
            onClick={() => router.push('/auth?variant=register')}
          >
            <div className="flex space-x-1 items-center text-xl sm:text-2xl font-medium">
              <p>Get wired</p>
              <HiChevronRight />
            </div>
          </button>
          <Link
            target="_blank"
            className="flex space-x-1 items-center text-lg text-gray-500 transition-all ease-in-out hover:text-emerald-900"
            href="https://github.com/bose-aritra2003/together">
            <AiFillGithub />
            <p>View code on GitHub</p>
          </Link>
        </div>
      </div>

      <div className="w-fit px-2 xl:px-0 xl:pr-16 2xl:pr-36">
        <Image priority className="2xl:hidden" width={600} height={600} src="/images/hero.svg" alt="hro image" />
        <Image priority className="hidden 2xl:block" width={800} height={800} src="/images/hero.svg" alt="hro image" />
      </div>
    </div>
  );
}
export default Hero;