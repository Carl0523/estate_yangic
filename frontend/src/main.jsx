import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import App from "./App.jsx";
import Home from "./screens/Home.jsx";
import About from "./screens/About.jsx";
import Login from "./screens/Login.jsx";
import Register from "./screens/Register.jsx";
import Profile from "./screens/Profile.jsx";
import HomesList from "./screens/HomesList.jsx";
import AddHome from "./screens/AddHome.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import UpdateHome from "./screens/UpdateHome.jsx";
import "./index.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Default child route */}
      <Route index={true} path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* PRIVATE ROUTES */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/your-homes" element={<HomesList/>}/>
        <Route path="/add-home" element={<AddHome/>}/>
        <Route path="/update-home/:id" element={<UpdateHome/>}/>
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
