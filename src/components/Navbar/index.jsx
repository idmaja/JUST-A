import Link from "next/link";
import Image from "next/image";
import InputSearch from "./InputSearch";
import UserActionButton from "./UserActionButton";

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 z-10 w-full">
      {/* Transparent Background */}
      <div className="absolute inset-0 bg-opacity-20 bg-gradient-to-b filter backdrop-blur-0 from-color-accent via-50% to-80%"></div>
        <div className="relative z-20 flex items-center justify-between p-2 sm:p-4">
          {/* Left side: Logo */}
          <Link href="/" className="text-2xl font-bold">
            <div className="flex items-center justify-start">
              <Image
                src="/just-a-logo-2.svg"
                alt="Logo"
                width={2536}
                height={1078}
                className="w-[90px] h-16 sm:w-20 sm:h-20 md:w-44 md:h-16"
              />
            </div>
          </Link>

        {/* Right side: InputSearch and UserActionButton */}
          <div className="flex items-center gap-2">
            <InputSearch />
            <UserActionButton />
          </div>
      </div>
    </header>
  );
};

export default Navbar;