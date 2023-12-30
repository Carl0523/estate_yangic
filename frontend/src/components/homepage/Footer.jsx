import { FaDiscord, FaLinkedin, FaPhone } from "react-icons/fa";
import { IoMailSharp } from "react-icons/io5";
import { AiOutlineInstagram, AiFillGithub } from "react-icons/ai";
import { whiteLogo } from "../../assets";
import IconWithText from "../IconWithText";
import LinkText from "../utils/LinkText";
import { footerArt } from "../../assets";

export default function Footer() {
  return (
    <footer className="flex flex-col gap-7 items-center justify-center mt-20 pt-16 text-white bg-neutral-800 cursor-default">
      {/* 1. The logo name */}
      <img src={whiteLogo} alt="logo" className="w-40" />
      {/* 2. Some navigation links */}
      <ul className="flex gap-5">
        <LinkText path="/search?type=sale" text="Sale" />
        <LinkText path="/search?type=rent" text="Rent" />
        <LinkText path="/your-homes" text="Your Homes" />
      </ul>
      {/* 3. Social Media links */}
      <ul className="flex gap-7 text-2xl">
        <a
          href="https://discordapp.com/users/626906285279019008"
          target="_blank"
          className="hover:text-primary"
        >
          <FaDiscord />
        </a>

        <a
          href="https://www.linkedin.com/in/hong-yang-3b63b9203/"
          target="_blank"
          className="hover:text-blue-600"
        >
          <FaLinkedin />
        </a>

        <a
          href="https://www.instagram.com/hong_y_02/"
          target="_blank"
          className="hover:text-[#d62976]"
        >
          <AiOutlineInstagram />
        </a>

        <a
          href="https://github.com/Carl0523?tab=repositories"
          target="_blank"
          className="hover:text-black"
        >
          <AiFillGithub />
        </a>
      </ul>
      {/* 4. The phone and email */}
      <div className="flex gap-10">
        <IconWithText
          text="+1-804-549-3635"
          icon={<FaPhone />}
          textSize="base"
        />
        <IconWithText
          text="aa200205233@gmail.com"
          icon={<IoMailSharp className="text-xl" />}
          textSize="base"
        />
      </div>
      {/* 5. Copy Right statement */}
      <p className="w-1/2 mt-5 text-center text-sm text-gray-400">
        Copyright © 2023 HomeYonder. All rights reserved.
      </p>
      <img src={footerArt} className="w-full "/>
    </footer>
  );
}
