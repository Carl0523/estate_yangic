import React from "react";
import { motion } from "framer-motion";

export default function ImageItem({ imageUrl, index, onDelete }) {
  
  return (
    <motion.div
      initial={{ opacity: 0, translateY: -100 }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="w-full flex justify-between items-center border-2 p-2 rounded-md"
    >
      <img
        src={imageUrl}
        alt="image"
        className="object-cover h-28 w-28 rounded-md"
      />
      <motion.span
        whileHover={{ scale: 1.03, opacity: 0.9 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          onDelete(index);
        }}
        className="text-red-500 cursor-pointer"
      >
        Delete
      </motion.span>
    </motion.div>
  );
}
