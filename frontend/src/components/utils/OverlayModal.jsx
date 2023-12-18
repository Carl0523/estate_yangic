import { motion } from "framer-motion";
import { IoCloseCircleOutline } from "react-icons/io5";
export default function OverlayModal({
  isModalOpen,
  img,
  onCloseModal,
  modalButtonHandler,
  headerText,
  messageText = null,
}) {
  if (!isModalOpen) return null;
  return (
    <div className="fixed bg-overlay h-full w-full top-0 left-0 z-20">
      <motion.div
        initial={{ opacity: 0, translateY: "-100%", translateX: "-50%" }}
        animate={{ opacity: 1, translateY: "-50%", translateX: "-50%" }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-2 items-center fixed px-3 py-5 w-[40%] top-1/2 left-1/2 bg-white shadow-card rounded-lg z-30"
      >
        <IoCloseCircleOutline
          className="text-2xl self-end cursor-pointer"
          onClick={onCloseModal}
        />
        <img src={img} className="object-cover w-1/2" />
        <h1 className="text-2xl text-center font-semibold">{headerText}</h1>
        {messageText && <p>{messageText}</p>}
        <div className="flex justify-between w-10/12 box-border">
          <motion.button
            whileHover={{ scale: 1.03, opacity: 0.9 }}
            whileTap={{ scale: 0.95 }}
            onClick={onCloseModal}
            className="bg-gray-200 text-gray-700 rounded-2xl py-2 px-4"
          >
            Cancel
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03, opacity: 0.9 }}
            whileTap={{ scale: 0.95 }}
            onClick={modalButtonHandler}
            className="bg-red-500 text-white rounded-2xl py-2 px-4"
          >
            Delete
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
