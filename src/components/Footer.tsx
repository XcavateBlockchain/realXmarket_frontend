import React from "react";
import Image from "next/image";
import logo from "@/assets/logo.png";
import {
  FaDiscord,
  FaTwitter,
  FaFacebook,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
const Footer = () => {
  return (
    <>
      <footer className="">
        <div className="mx-auto flex font-mona font-thin justify-center items-center max-w-screen-xl  px-4 mt-44 mb-8 sm:px-20 ">
          <a href="" className="mx-4">
            About Us
          </a>
          <a href="" className="-order-1 sm:order-none mx-4">
            FAQs
          </a>
          <a href="" className="mx-4">
            Team
          </a>
          <a href="" className="mx-4">
            Blog
          </a>
        </div>
        <div className="border-t">
          <div className="mx-auto flex max-w-screen-xl flex-col gap-y-4 px-1 py-3 text-center text-gray-500  lg:flex-row lg:justify-between lg:text-left ">
            <Image
              src={logo}
              width={120}
              height={120}
              alt="Picture of the author"
            />

            <p className="text-sm mt-3">
              © 2023 Xcavate. All rights reserved. | Terms of service and
              privacy policy
            </p>

            <p className="flex mt-3">
              <a className="" href="#">
                <FaDiscord className="mx-1 text-black" size={18} />
              </a>
              <a className="" href="#">
                <FaFacebook className="mx-1 text-black" size={18} />
              </a>
              <a className="" href="#">
                <FaTwitter className="mx-1 text-black" size={18} />
              </a>
              <a className="" href="#">
                <FaGithub className="mx-1 text-black" size={18} />
              </a>
              <a className="" href="#">
                <FaLinkedin className="mx-1 text-black" size={18} />
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
