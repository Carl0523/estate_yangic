import { loginMansion } from "../assets";
import { blackLogo } from "../assets";
import ErrorMessage from "../components/ErrorMessage";
import Divider from "../components/Divider";
import GoogleAuth from "../components/GoogleAuth";

import { useDispatch, useSelector } from "react-redux";
import { setCredential } from "../redux/slices/userSlice";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const inputContainer = `flex flex-col gap-1 lg:w-4/6 w-4/5 text-base`;

export default function Login() {

  // the state that store the email and password
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Navigate function
  const dispatch = useDispatch(); // Dispatch the action to update the state

  const { userInfo } = useSelector((state) => state.user) ?? {};

  useEffect(()=>{
    if (userInfo)
    {
      navigate("/")
    }
  }, [userInfo])

  // Update the form when input changed
  const handleFormChange = (event) => {
    setForm((prevForm) => {
      return {
        ...prevForm,
        [event.target.id]: event.target.value,
      };
    });
  };

  // When user submit, it trigger this function
  const submitHandler = async (event) => {
    event.preventDefault();

    // Check empty fields
    if (form.email.trim() === "" || form.password.trim() === "") {
      setError("Please fill out everything");
      return;
    }
    axios
      .post("http://localhost:3000/api/auth/signin", form, {withCredentials: true})
      .then((res) => {
        dispatch(setCredential(res.data));
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.response.data.message;
        setError(errorMessage);
        setForm({ email: "", password: "" });
      });
  };

  return (
    <motion.div
      className="flex min-h-screen"
      initial={{ opacity: 0}}
      animate={{ opacity: 1}}
      exit={{ opacity: 0 }}
      transition={{duration: 0.5}}
    >
      {/* 1. The image of neighborhood */}
      <div className="md:flex-3 hidden md:block">
        <img
          src={loginMansion}
          alt="houses"
          className="w-full h-full object-cover"
        />
      </div>

      {/* 2. The login section */}
      <div className="flex-2 p-5">
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

        {/* b. The login form */}
        <div className="flex flex-col gap-2 items-center justify-center text-center w-full mx-auto my-20">
          {/* b1. The heading text */}
          <h1 className="text-2xl mb-4 font-semibold">Login to your account</h1>

          {/* OPTIONAL: error message --> display when error happen */}
          {error && <ErrorMessage errorMessage={error} />}

          {/* b2. Sign up with google button */}
          <GoogleAuth/>
          

          {/* b3. Divider line */}
          <Divider text="OR" />

          {/* b4. The register form */}
          <form
            className="flex flex-col gap-1 justify-center items-center w-full"
            onSubmit={submitHandler}
          >
            {/* b4-1. Email label and input */}
            <div className={inputContainer}>
              <label htmlFor="email" className="text-left font-semibold">
                Email
              </label>
              <input
                type="email"
                id="email"
                autoComplete="off"
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

            {/* b4-2. Password label and input */}
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

            {/* b4-3. Login button */}
            <motion.button
              whileHover={{ scale: 1.03, opacity: 0.9 }}
              whileTap={{ scale: 0.95 }}
              className="lg:w-4/6 w-4/5 bg-black text-white px-5 py-3 mt-2 rounded-buttonRadius"
            >
              Sign in
            </motion.button>
          </form>

          {/* b5. User Already have an account text */}
          <div className="w-full flex flex-col items-center gap-1 text-font mt-4 text-lg">
            <h1>
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-center text-primary hover:opacity-80"
              >
                Register
              </Link>
            </h1>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
