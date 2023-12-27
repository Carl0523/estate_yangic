import { registerHouse } from "../assets";
import { blackLogo } from "../assets";
import ErrorMessage from "../components/utils/ErrorMessage";
import Divider from "../components/utils/Divider";
import GoogleAuth from "../components/auth/GoogleAuth";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setCredential } from "../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

const inputContainer = `flex flex-col gap-1 lg:w-4/6 w-4/5 text-base`;

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo]);

  const handleFormChange = (event) => {
    setForm((prevForm) => {
      return {
        ...prevForm,
        [event.target.id]: event.target.value,
      };
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    // Check empty fields
    if (
      form.email.trim() === "" ||
      form.password.trim() === "" ||
      form.username.trim() === ""
    ) {
      setError("Please fill out everything");
      return;
    }
    axios
      .post("http://localhost:3000/api/auth/register", form, {
        withCredentials: true,
      })
      .then((res) => {
        dispatch(setCredential(res.data));
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.response.data.message;
        setError(errorMessage);
        setForm({ username: "", email: "", password: "" });
      });
  };

  return (
    <motion.div className="flex min-h-screen">
      {/* 1. The register section */}
      <motion.div
        initial={{ translateX: -400 }}
        animate={{ translateX: 0 }}
        transition={{ duration: 0.4 }}
        className="flex-2 p-5"
      >
        {/* a. The logo and logo name */}

        <Link to="/">
          <div className="flex items-center">
            <img
              src={blackLogo}
              alt="logo"
              className="object-contain w-[3.5rem]"
            />
            <h1 className="text-xl italic font-bold tracking-tight">
              HomeYonder
            </h1>
          </div>
        </Link>

        {/* b. The register section */}
        <div className="flex flex-col gap-2 items-center justify-center text-center w-full mx-auto my-10">
          {/* b1. The heading text */}
          <h1 className="text-2xl mb-4 font-semibold">
            Sign Up For a New Account
          </h1>

          {/* OPTIONAL: error message --> display when error happen */}
          {error && (
            <ErrorMessage errorMessage={error} customCss="lg:w-4/6 w-5/6" />
          )}

          {/* b2. Sign up with google button */}
          <GoogleAuth />

          {/* b3. Divider line */}
          <Divider text="OR" />

          {/* b4. The register form */}
          <form
            className="flex flex-col gap-1 justify-center items-center w-full"
            onSubmit={submitHandler}
          >
            {/* b4-1. Username label and input */}
            <div className={inputContainer}>
              <label htmlFor="username" className="text-left font-semibold">
                Username
              </label>
              <input
                type="text"
                id="username"
                autoComplete="new-password"
                value={form.username}
                placeholder="Please enter username"
                className={`outline ${
                  error && form.username === ""
                    ? "outline-red-500 outline-2"
                    : "outline-gray-400"
                } px-5 py-3 rounded-inputRadius focus:outline-blue-500 focus:outline-2`}
                onChange={handleFormChange}
              />
            </div>

            {/* b4-2. Email label and input */}
            <div className={inputContainer}>
              <label htmlFor="email" className="text-left font-semibold">
                Email
              </label>
              <input
                type="email"
                id="email"
                autoComplete="new-password"
                value={form.email}
                placeholder="Please enter email"
                className={`outline ${
                  error && form.email === ""
                    ? "outline-red-500 outline-2"
                    : "outline-gray-400"
                } px-5 py-3 rounded-inputRadius focus:outline-blue-500 focus:outline-2`}
                onChange={handleFormChange}
              />
            </div>

            {/* b4-3. Password label and input */}
            <div className={inputContainer}>
              <label htmlFor="password" className="text-left font-semibold">
                Password
              </label>
              <input
                type="password"
                id="password"
                autoComplete="new-password"
                value={form.password}
                placeholder="Create your password"
                className={`outline ${
                  error && form.password === ""
                    ? "outline-red-500 outline-2"
                    : "outline-gray-400"
                } px-5 py-3 rounded-inputRadius focus:outline-blue-500 focus:outline-2`}
                onChange={handleFormChange}
              />
            </div>

            {/* b4-4. Register button */}
            <motion.button
              whileHover={{ scale: 1.03, opacity: 0.9 }}
              whileTap={{ scale: 0.95 }}
              className="lg:w-4/6 w-4/5 bg-black text-white px-5 py-3 mt-2 rounded-buttonRadius"
            >
              Create account
            </motion.button>
          </form>

          {/* b5. User Already have an account text */}
          <div className="w-full flex flex-col items-center gap-1 text-font mt-4 text-lg">
            <h1>
              Already have an account?{" "}
              <Link to="/login" className="text-center text-primary">
                Login in
              </Link>
            </h1>
          </div>
        </div>
      </motion.div>
      {/* 2. The image of neighborhood */}
      <motion.div
        initial={{ translateX: 400 }}
        animate={{ translateX: 0 }}
        transition={{ duration: 0.4 }}
        className="md:flex-3 hidden md:block"
      >
        <img
          src={registerHouse}
          loading="lazy"
          alt="house"
          className="w-full h-full object-cover"
        />
      </motion.div>
    </motion.div>
  );
}
