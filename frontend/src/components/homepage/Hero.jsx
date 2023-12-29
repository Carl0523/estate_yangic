import { useNavigate } from "react-router-dom";
import { landing } from "../../assets";
import CustomButton from "../utils/CustomButton";

import { motion } from "framer-motion";

export default function Hero() {
  const navigate = useNavigate();

  /**
   * navigate the user to search page
   */
  const handleExplore = () => {
    navigate("/search");
  };

  return (
    <div className="mt-24 mb-10 mx-5">
      <div className="sm:h-[500px] h-[600px] bg-purple-300 relative rounded-lg">
        {/* 1. The cover image */}
        <motion.img
          initial={{ translateY: "-100%" }}
          animate={{ translateY: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
          src={landing}
          alt="Cover House"
          draggable="false"
          className="md:w-1/2 w-full md:h-full h-1/2 absolute right-0 bottom-0"
        />
        {/* 2. The introduction text, subtext, and explore button */}
        <motion.div
          initial={{ translateX: "-100%" }}
          animate={{ translateX: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="flex flex-col gap-5 absolute md:top-[20%] top-[10%] xs:left-12 left-8 text-white"
        >
          {/* 2A. The header text */}
          <h1 className="md:text-5xl xs:text-4xl text-3xl font-bold">
            Best path to find you
            <span className="block mt-2">a sweet home</span>
          </h1>
          {/* 2B. The header subtext */}
          <p className="md:text-base text-sm">
            Discover the home that's right to you,
            <span className="block">
              Your journey to extraordinary living start here
            </span>
          </p>
          {/* 2C. The explore button */}
          <CustomButton
            text="Start Exploring"
            responsiveWidth="w-1/2"
            buttonHandler={handleExplore}
          />
        </motion.div>
      </div>
    </div>
  );
}
