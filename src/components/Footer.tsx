import Image from "next/image";
import Logo from "/public/logo.png";

import { AiOutlineTwitter } from "react-icons/ai";
import { GrFacebookOption, GrLinkedinOption } from "react-icons/gr";

const Footer = () => {
  return (
    <div className="flex w-full flex-wrap justify-center mx-auto text-gray-500 py-12 md:px-16">
      <div className="w-full md:w-[40%] px-16 mb-10">
        <Image src={Logo} alt="Logo" className="mr-5" />
        <p className="py-10 w-4/5">
          Small, artisan label that offers a thoughtfully curated collection of
          high quality everyday essentials made.
        </p>
        <div className="flex text-black space-x-2">
          <div className="text-2xl bg-gray-200 p-2 rounded-lg">
            <AiOutlineTwitter />
          </div>
          <div className="text-2xl bg-gray-200 p-2 rounded-lg">
            <GrFacebookOption />
          </div>
          <div className="text-2xl bg-gray-200 p-2 rounded-lg">
            <GrLinkedinOption />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap md:w-[60%]">
        <div className="w-1/2 md:w-1/3 space-y-4">
          <h2 className="font-bold">Comapny</h2>
          <p>About</p>
          <p>Terms of Use</p>
          <p>Privacy Policy</p>
          <p>How it Works</p>
          <p>Contact Us</p>
        </div>
        <div className="w-1/2 md:w-1/3 space-y-4">
          <h2 className="font-bold">Support</h2>
          <p>Support Carrer</p>
          <p>24h Service</p>
          <p>Quick Chat</p>
        </div>
        <div className="w-1/2 md:w-1/3 space-y-4 mt-8 md:mt-0">
          <h2 className="font-bold">Contact</h2>
          <p>Whatsapp</p>
          <p>Support 24h</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
