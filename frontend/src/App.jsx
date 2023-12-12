import {Outlet ,useLocation} from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {

  const location = useLocation();

  const path = location.pathname;
  return (
    <>
      {/* NOTICE: Hide navbar on register screen */}
      {path != "/register" && <Navbar/>}
      <Outlet/>
    </>
  );
}

export default App;
