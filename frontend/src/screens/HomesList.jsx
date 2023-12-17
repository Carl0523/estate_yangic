import { FaHome } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import IconWithText from "../components/IconWithText";

export default function HomesList() {
  return (
    <div className="p-3">
      <div className="flex justify-between items-center">
        <div />
        <h1 className="text-3xl font-semibold self-center">Your Homes</h1>
        <Link to="/add-home">
          <motion.div
            whileHover={{ scale: 1.03, opacity: 0.9 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-3 py-2 bg-black text-white rounded-buttonRadius cursor-pointer "
          >
            <FaHome />
            <span>Add Home</span>
          </motion.div>
        </Link>
      </div>
    </div>
  );
}
