import Link from "next/link";
import Image from "next/image";

const Brand = () => {
  return (
    <Link href="/" className="flex space-x-2 items-center">
      <Image
        width={48} height={48}
        src="/images/logo.svg"
        alt="logo"
      />
      <span className="sr-only">together</span>
      <span className="text-3xl font-bold tracking-tight text-emerald-900">Together</span>
    </Link>
  );
}
export default Brand;