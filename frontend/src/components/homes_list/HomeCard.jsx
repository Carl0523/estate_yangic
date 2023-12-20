import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaMoneyBill, FaLocationDot } from "react-icons/fa6";
import { FaParking, FaCouch, FaShare, FaCheck } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { MdOutlineEditNote } from "react-icons/md";
import { IoBedOutline } from "react-icons/io5";
import { LuBath } from "react-icons/lu";

import IconWithText from "../IconWithText";
import { Link } from "react-router-dom";

export default function HomeCard({
  homeId,
  date,
  coverImage,
  price,
  numOfBedrooms,
  numOfBathrooms,
  address,
  type,
  parking,
  furnished,
  onDelete,
}) {
  const formattedPrice = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(price);
  const [isCopied, setIsCopied] = useState(false);

  /**
   * Copy the current link to the clipboard and then display the
   * notification for 2 second
   */
  const handleLinkCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="w-[23rem] border flex flex-col gap-3 p-4 bg-white shadow-lg rounded-md"
    >
      {/* 1. The delete button */}
      <motion.div
        className="self-end"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          onDelete(homeId);
        }}
      >
        <IoIosClose className="text-3xl cursor-pointer" />
      </motion.div>

      {/* 2. The image and other info */}
      <Link to={`/homes/${homeId}`}>
        <div className="flex relative flex-col h-96 gap-2 border rounded-md shadow-md">
          {/* The share button on the top right of the image */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleLinkCopy();
            }}
            className="absolute top-2 right-2 text-white bg-transparentBg p-3 rounded-full hover:scale-105"
          >
            <FaShare />
          </button>

          {/* Display the message of link copied */}
          {isCopied && (
            <div className="absolute top-2 right-14 z-10 rounded-md bg-transparentBg p-2">
              <IconWithText
                text="Link copied!"
                icon={<FaCheck className="text-green-500 text-sm" />}
                customCss="text-white"
                textSize="sm"
              />
            </div>
          )}

          {/* 2A. the cover image */}
          <img
            src={coverImage}
            className="w-full h-48 object-cover rounded-md"
          />

          {/* 2B. The information: price, bedroom, bathroom, type, address */}
          <div className="w-full flex flex-col gap-1 px-3 py-2 mb-10">
            {/* 2B-a. The dollar icon and price + The date created */}
            <div className="flex justify-between items-center">
              <IconWithText
                icon={<FaMoneyBill className="text-xl" />}
                text={formattedPrice + (type === "rent" ? "/month" : "")}
                textSize="xl"
                customCss="font-semibold"
              />
              <span className="text-sm text-gray-400">{date}</span>
            </div>

            {/* 2B-b. The bedroom, bathroom number, and type */}
            <div className="flex gap-1 items-center mt-1">
              <IconWithText
                icon={<IoBedOutline className="text-2xl" />}
                text={`${numOfBedrooms} bds`}
                textSize="s"
                gap="1"
                customCss="font-light"
              />
              <IconWithText
                icon={<LuBath className="text-2xl" />}
                text={`${numOfBathrooms} ba`}
                textSize="s"
                gap="1"
                customCss="font-light"
              />
              <IconWithText
                icon={
                  <BiDotsHorizontalRounded
                    className={`text-3xl ${
                      type === "sale" ? "text-green-500" : "text-red-500"
                    }`}
                  />
                }
                text={`House for ${type}`}
                textSize="s"
                gap="1"
                customCss="font-light"
              />
            </div>
            {/* 2B.c. The address icon and address */}
            <IconWithText
              icon={<FaLocationDot className="text-xl" />}
              text={address}
              textSize="sm"
              gap="2"
              customCss="font-light mt-1"
            />
          </div>
        </div>
      </Link>

      {/* 3. The other info */}
      <div className="flex flex-wrap justify-around my-5">
        <div className="flex gap-2 items-center">
          <FaParking className="text-xl" />
          <div className="flex flex-col">
            <h2>Parking</h2>
            <span className="text-gray-500 text-sm">
              {parking ? "yes" : "no"}
            </span>
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <FaCouch className="text-xl" />
          <div className="flex flex-col">
            <h2>Furnished</h2>
            <span className="text-gray-500 text-sm">
              {furnished ? "yes" : "no"}
            </span>
          </div>
        </div>
      </div>

      <hr className="border w-full border-gray-300" />
      {/* 4. The Edit button */}
      <Link to={`/update-home/${homeId}`} className="w-1/3 self-center">
        <motion.button
          whileHover={{ scale: 1.05, opacity: 0.9 }}
          whileTap={{ scale: 0.95 }}
          className="w-full flex gap-2 justify-center my-2 py-2 px-4 bg-black text-white rounded-buttonRadius"
        >
          <MdOutlineEditNote className="text-2xl" />
          <span>Edit</span>
        </motion.button>
      </Link>
    </motion.div>
  );
}
