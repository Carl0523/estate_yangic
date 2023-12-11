import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App.jsx";
import Home from "./screens/Home.jsx";
import About from "./screens/About.jsx";
import Login from "./screens/Login.jsx";
import Register from "./screens/Register.jsx";
import Profile from "./screens/Profile.jsx";
import "./index.css";

const router = createBrowserRouter(
  createRoutesFromElements(<Route path="/" element={<App />}>

    {/* Default child route */}
    <Route index={true} path="/" element={<Home />}/> 
    <Route path="/about" element={<About />}/> 
    <Route path="/login" element={<Login />}/> 
    <Route path="/register" element={<Register />}/> 
    <Route path="/profile" element={<Profile />}/> 
  </Route>)
);

ReactDOM.createRoot(document.getElementById("root")).render(

  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
