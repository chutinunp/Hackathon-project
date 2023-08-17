import Link from "next/link";
import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import Router from "next/router";
import Image from "next/image";
import { useAccount } from "wagmi";
import ConnectButtonCustom from "../ConnectButton";

const Topbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { address } = useAccount();

  const handleLogout = async () => {
    localStorage.removeItem("user");
    Router.push("/signin");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white w-full">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap sm:flex-nowrap h-16 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12 ">
            <Link href="/">
              <Image
                className="object-cover"
                src="/assets/logo.png"
                alt="img"
                priority
                width={90}
                height={90}
              />
            </Link>
          </div>
          <div className="md:flex md:items-center md:gap-12">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  {address && (
                    <p className="text-[#D98703] link link-underline link-underline-black text-base">
                      {address?.substring(0, 6)}...
                      {address?.substring(address?.length - 4)}
                    </p>
                  )}
                  {!address && <ConnectButtonCustom />}
                </li>
                <li>
                  <button onClick={handleLogout}>
                    <p className="text-[#D98703] link link-underline link-underline-black text-base">
                      Logout
                    </p>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
          {/* Responsive Hamburger Menu */}
          <button
            type="button"
            className="md:hidden block text-[#D98703] transition p-2 rounded hover:text-[#d8ab62]"
            onClick={toggleMobileMenu}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-label="Menu"
            >
              <path d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>

        {/* Responsive Mobile Menu */}

        <Transition show={isMobileMenuOpen}>
          <Transition.Child
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <nav className="md:hidden">
              <ul className="flex flex-col  gap-4 pb-4">
                <li>
                  {address && (
                    <p className="text-[#D98703] link link-underline link-underline-black">
                      {address?.substring(0, 6)}...
                      {address?.substring(address?.length - 4)}
                    </p>
                  )}
                  {!address && <ConnectButtonCustom />}
                </li>
                <li>
                  <button onClick={handleLogout}>
                    <p className="text-[#D98703] transition hover:text-[#d8ab62]">
                      Sign Out
                    </p>
                  </button>
                </li>
              </ul>
            </nav>
          </Transition.Child>
        </Transition>
      </div>
    </header>
  );
};

export default Topbar;
