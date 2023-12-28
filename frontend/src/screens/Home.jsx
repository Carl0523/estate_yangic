import { motion } from "framer-motion";
import Hero from "../components/homepage/Hero";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{duration: 0.5}}
    >
      <Hero/>
    </motion.div>
  );
}
