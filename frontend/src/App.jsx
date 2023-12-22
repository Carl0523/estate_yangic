import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import { AnimatePresence } from "framer-motion";

function App() {
  const location = useLocation();

  const path = location.pathname;
  return (
    <>
      {/* NOTICE: Hide navbar on register screen */}
      {path !== "/register" && path !== "/login" && <Navbar />}

      <AnimatePresence mode="wait">
        <Outlet />
      </AnimatePresence>
    </>
  );
}

export default App;
