"use client";
import React from "react";
import { FaWallet } from "react-icons/fa";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { IoWalletOutline } from "react-icons/io5";
const Navbar = () => {
  return (
    <>
      <nav className="bg-white  w-full z-20 start-0 border-b  ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Image
              src={logo}
              width={150}
              height={150}
              alt="Picture of the author"
            />
           
          </a>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              type="button"
              className="text-black shadow-md font-light uppercase border focus:ring-4  rounded-2xl text-sm px-4 py-2.5 gradient-button text-center bg-gradient-to-r"
            >
              Connect <IoWalletOutline size={20} className="inline-block text-white ml-2" />
            </button>
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
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
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-DM font-normal border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ">
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-black  font-thin "
                  aria-current="page"
                >
                  MARKETPLACE
                </a>
              </li>
              <li>
                <a href="#" className="block py-2 px-3  text-black font-thin ">
                  LOANS
                </a>
              </li>
              <li>
                <a href="#" className="block py-2 px-3  text-black font-thin ">
                  STAKING
                </a>
              </li>
              <li>
                <a href="#" className="block py-2 px-3  text-black font-thin ">
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
