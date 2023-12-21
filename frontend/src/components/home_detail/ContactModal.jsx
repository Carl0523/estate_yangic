import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { motion } from "framer-motion";
import CustomButton from "../utils/CustomButton";

export default function ContactModal({ userId, homeName, onClose }) {
  const [message, setMessage] = useState(
    `I would love to learn about ${homeName}!!`
  );
  const [userInfo, setUserInfo] = useState(null);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/user/userInfo/${userId}`, {
        withCredentials: true,
      })
      .then((res) => {
        setUserInfo(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {userInfo && (
        <motion.section
          initial={{ opacity: 0, translateY: "-100%", translateX: "-50%" }}
          animate={{ opacity: 1, translateY: "-50%", translateX: "-50%" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed md:w-[40%] w-[80%] h-[30rem] flex flex-col gap-2 top-1/2 left-1/2 z-50 bg-white shadow-card rounded-lg overflow-hidden"
        >
          {/* 1. The heading: House's name + close button */}
          <header className="relative flex items-center justify-between top-0 left-0 right-0 border-b p-5 bg-white rounded-t-lg">
            <span></span>
            <h1 className="text-2xl font-bold text-ellipsis overflow-hidden">
              {homeName}
            </h1>
            <IoMdClose className="text-2xl cursor-pointer" onClick={onClose} />
          </header>

          {/* 2. Avatar and email + message form session */}
          <div className="flex flex-col overflow-scroll px-7 py-5">
            {/* 2A. The avatar + email */}
            <div className="flex flex-col items-center gap-2 mb-2">
              <img
                src={userInfo.avatar}
                alt="owner avatar"
                referrerPolicy="no-referrer"
                className="h-20 w-20 border rounded-full"
              />
              <h3>{userInfo.email}</h3>
            </div>

            {/* 2C. The message form */}
            <div className="w-full flex flex-col gap-2 my-4">
              <h2 className="font-medium">Message</h2>
              <textarea
                rows="5"
                value={message}
                onChange={handleMessageChange}
                className="border-2 p-2 font-light"
              />
            </div>

            <p className="mt-5 text-xs text-center text-gray-400">
              By clicking below you agree to HomeYonder.com Privacy Statement,
              Terms of Service, and consent to be contacted by email, text
              message, or autodialer for any purpose by HomeYonder.com or real
              estate professionals. Consent is not a condition for services.
            </p>
          </div>

          {/* 3. The send message button */}
          <div className="w-full sticky bottom-0 left-0 p-3 border-t bg-white rounded-b-lg text-center">
            <Link
              to={`mailto:${userInfo.email}?subject=${homeName}&body=${message}`}
              onClick={() => {
                onClose();
              }}
            >
              <CustomButton
                text="Send message"
                padding="py-3 px-4"
                responsiveWidth="w-full"
              />
            </Link>
          </div>
        </motion.section>
      )}
    </>
  );
}
