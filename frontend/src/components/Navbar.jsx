import { logo } from "../assets";
import { FaSearch } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="flex justify-between items-center xs:p-6 p-3 bg-white z-10">
      {/* 1. Logo and the Logo name */}
      <Link to="/">
        <div className="flex items-center gap-1 mr-1">
          <img src={logo} alt="logo" className="object-contain w-[4.5rem]" />
          <h1 className="text-2xl text-primary italic font-bold tracking-tight lg:flex hidden">
            HomeYonder
          </h1>
        </div>
      </Link>

      {/* 2. The middle search bar */}
      <form className="flex items-center p-3 bg-gray-100 rounded-md">
        <FaLocationDot className="mr-2 xs:text-base text-xs"/>
        <input
          type="text"
          placeholder="Enter an address or ZIP code"
          className="bg-transparent outline-none lg:w-[18rem] lg:focus:w-[30rem] 
            md:w-[16rem] md:focus:w-[24rem] sm:w-[12rem] sm:focus:w-[17rem] 
            xs:focus:w-[13rem] w-[10rem] xs:text-base text-xs duration-200"
        />
        <FaSearch className="text-primary cursor-pointer xs:text-base text-xs" />
      </form>

      {/* 3. The navigation links */}
      <ul className="flex items-center gap-5 font-semibold">
        <Link to="/login">
          <li className="hidden md:flex sm:text-base text-xs hover:scale-105">
            Login
          </li>
        </Link>
        <Link to="/register">
          <li className="px-4 py-2 bg-primary text-white rounded-md xs:text-base text-xs hover:scale-105">
            Register
          </li>
        </Link>
      </ul>
    </header>
  );
}
