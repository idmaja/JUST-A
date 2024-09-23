import Link from "next/link";
import Image from "next/image";
import InputSearch from "./InputSearch";
import { ArrowsInCardinal } from "@phosphor-icons/react/dist/ssr";
import UserActionButton from "./UserActionButton";

const Navbar = () => {
  return (
    <header className="bg-color-accent">
      <div className="flex flex-col justify-between gap-2 p-4 md:items-center md:flex-row">
        <Link href="/" className="text-2xl font-bold">
          <div className="flex items-center">
            {/* JUST-A */}
            <Image src="/just-a-logo.svg" alt="..." width={500} height={500} className="object-cover w-full h-28 rounded"/>
            {/* <ArrowsInCardinal size={60} className="text-color-primary"/> */}
            {/* <span className="font-bold text-color-primary">JUST-A</span> */}
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <InputSearch />
          <UserActionButton />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
