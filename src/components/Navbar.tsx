'use client';
import React from 'react';
import { FaWallet } from 'react-icons/fa';
import Image from 'next/image';
import logo from '@/assets/logo.png';
import { IoWalletOutline } from 'react-icons/io5';
const Navbar = () => {
  return (
    <>
      <nav className="start-0 z-20 w-full border-b bg-white">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <Image src={logo} width={150} height={150} alt="Picture of the author" />
          </a>
          <div className="flex space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
            <button
              type="button"
              className="gradient-button rounded-2xl border bg-gradient-to-r px-4 py-2.5 text-center text-sm font-light uppercase text-black shadow-md focus:ring-4"
            >
              Connect <IoWalletOutline size={20} className="ml-2 inline-block text-white" />
            </button>
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-5 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div className="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto">
            <ul className="font-DM mt-4 flex flex-col rounded-lg border border-gray-100 p-4 font-normal md:mt-0 md:flex-row md:space-x-8 md:border-0 md:p-0 rtl:space-x-reverse">
              <li>
                <a
                  href="#"
                  className="block px-3 py-2 font-thin text-black"
                  aria-current="page"
                >
                  MARKETPLACE
                </a>
              </li>
              <li>
                <a href="#" className="block px-3 py-2 font-thin text-black">
                  LOANS
                </a>
              </li>
              <li>
                <a href="#" className="block px-3 py-2 font-thin text-black">
                  STAKING
                </a>
              </li>
              <li>
                <a href="#" className="block px-3 py-2 font-thin text-black">
                  DOCUMENTS
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
