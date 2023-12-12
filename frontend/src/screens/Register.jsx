import { registerHouse } from "../assets";
import { blackLogo } from "../assets";
import { FcGoogle } from "react-icons/fc";
import Divider from "../components/Divider";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const inputContainer = "flex flex-col gap-1 lg:w-4/6 w-4/5 text-base";

export default function Register() {
  return (
    <div className="flex h-screen">
      {/* 1. The register section */}
      <div className="flex-1 p-5">
        {/* a. The logo and logo name */}

        <Link to="/">
          <div className="flex items-center">
            <img
              src={blackLogo}
              alt="logo"
              className="object-contain w-[3.5rem]"
            />
            <h1 className="text-xl italic font-bold tracking-tight">
              HomeYonder
            </h1>
          </div>
        </Link>

        {/* b. The register section */}
        <div className="flex flex-col gap-2 items-center justify-center text-center lg:w-4/5 w-full mx-auto my-10">
          {/* b1. The heading text */}
          <h1 className="text-2xl mb-4 font-semibold">
            Sign Up For a New Account
          </h1>

          {/* b2. Sign up with google button */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center lg:w-4/6 w-4/5 gap-2 px-5 py-3 border-2 border-slate-400 rounded-md cursor-pointer"
          >
            <FcGoogle className="text-xl" />
            <h1 className="font-semibold text-l">Sign up with Google</h1>
          </motion.div>

          {/* b3. Divider line */}
          <Divider text="OR" />

          {/* b4. The register form */}
          <form className="flex flex-col gap-1 justify-center items-center w-full">
            {/* b4-1. Username label and input */}
            <div className={inputContainer}>
              <label htmlFor="username" className="text-left font-semibold">
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="Please enter username"
                className="outline outline-gray-400 px-5 py-3 rounded-sm focus:outline-blue-500 focus:outline-2"
              />
            </div>

            {/* b4-2. Email label and input */}
            <div className={inputContainer}>
              <label htmlFor="email" className="text-left font-semibold">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Please enter email"
                className="outline outline-gray-400 px-5 py-3 rounded-sm focus:outline-blue-500 focus:outline-2"
              />
            </div>

            {/* b4-3. Password label and input */}
            <div className={inputContainer}>
              <label htmlFor="password" className="text-left font-semibold">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Create your password"
                className="outline outline-gray-400 px-5 py-3 rounded-sm focus:outline-blue-500 focus:outline-2"
              />
            </div>

            {/* b4-4. Register button */}
            <motion.button
              whileHover={{ scale: 1.03, opacity: 0.9 }}
              whileTap={{ scale: 0.95 }}
              className="lg:w-4/6 w-4/5 bg-black text-white px-5 py-3 mt-2 rounded-md"
            >
              Create account
            </motion.button>
          </form>

          {/* b5. User Already have an account text */}
          <div className="w-full flex flex-col items-center gap-1 text-font mt-4 text-lg">
            <h1>
              Already have an account?{" "}
              <Link to="/login" className="text-center text-primary">
                Login in
              </Link>
            </h1>
          </div>
        </div>
      </div>
      {/* 2. The image of neighborhood */}
      <div className="md:flex-1 hidden md:block">
        <img
          src={registerHouse}
          alt="houses"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
