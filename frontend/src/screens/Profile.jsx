import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const inputContainer = `flex flex-col gap-1 lg:w-3/4 w-4/5 text-base`;

export default function Profile() {
  const { userInfo } = useSelector((state) => state.user);

  return (
    <div className="flex flex-col mx-auto my-3 p-3">
      {/* 1. The avatar on the left, username and email on the right */}
      <div className="flex flex-row items-center gap-2 self-center">
        {/* 1A. The avatar */}
        <img src={userInfo.avatar} className="h-20 w-20 border rounded-full cursor-pointer hover:shadow-md" />

        {/* 1B. The username and email */}
        <div className="flex flex-col gap-2">
          {/* a. The username */}
          <h1 className="text-xl">{userInfo.username}</h1>
          {/* b. The email */}
          <p className="text-sm text-gray-500">{userInfo.email}</p>
        </div>
      </div>

      {/* 2. The form */}
      <form className="sm:grid grid-rows-3 grid-cols-2 flex flex-col w-4/6 place-items-center gap-x-3 sm:gap-y-10 gap-y-5 mt-10 mx-auto">
        <div className={inputContainer}>
          <label htmlFor="username" className="text-left font-semibold">
            Username
          </label>
          <input
            type="text"
            id="username"
            autoComplete="new-password"
            className={`outline outline-gray-500 px-5 py-3 rounded-inputRadius focus:outline-blue-500 focus:outline-2`}
          />
        </div>
        <div className={inputContainer}>
          <label htmlFor="email" className="text-left font-semibold">
            Email
          </label>
          <input
            type="email"
            id="email"
            autoComplete="new-password"
            className={`outline outline-gray-500 px-5 py-3 rounded-inputRadius focus:outline-blue-500 focus:outline-2`}
          />
        </div>
        <div className={inputContainer}>
          <label htmlFor="password" className="text-left font-semibold">
            Password
          </label>
          <input
            type="password"
            id="password"
            autoComplete="new-password"
            className={`outline outline-gray-500 px-5 py-3 rounded-inputRadius focus:outline-blue-500 focus:outline-2`}
          />
        </div>
        <div className={inputContainer}>
          <label htmlFor="confirmPassword" className="text-left font-semibold">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
            className={`outline outline-gray-500 px-5 py-3 rounded-inputRadius focus:outline-blue-500 focus:outline-2`}
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.03, opacity: 0.9 }}
          whileTap={{ scale: 0.95 }}
          className="w-10/12 col-span-2 py-3 rounded-buttonRadius bg-black text-white"
        >
          Update
        </motion.button>
      </form>
    </div>
  );
}
