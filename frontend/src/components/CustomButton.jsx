import { motion } from "framer-motion";

export default function CustomButton({
  type = "button",
  text,
  bgColor = "black",
  textColor = "white",
  responsiveWidth = "",
  buttonHandler = null,
  margin = "mt-3",
  padding = "p-3",
}) {
  return (
    <motion.button
      type={type}
      whileHover={{ scale: 1.03, opacity: 0.9 }}
      whileTap={{ scale: 0.95 }}
      onClick={buttonHandler || (() => {})}
      className={`${responsiveWidth} bg-${bgColor} text-${textColor} ${margin} ${padding} rounded-buttonRadius`}
    >
      {text}
    </motion.button>
  );
}
