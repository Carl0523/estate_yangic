import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import axios from "axios";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { app } from "../firebase";

import ErrorMessage from "../components/utils/ErrorMessage";
import { setCredential, logout } from "../redux/slices/userSlice";
import OverlayModal from "../components/utils/OverlayModal";
import { trashCan } from "../assets/index";

const inputContainer = `flex flex-col gap-1 lg:w-3/4 w-4/5 text-base`;

export default function Profile() {
  const fileRef = useRef(null);

  const [form, setForm] = useState({});
  const [error, setError] = useState(null);
  const [file, setFile] = useState(undefined);
  const [isFileUploadSuccess, setIsFileUploadSuccess] = useState(true);
  const [uploadProcess, setUploadProcess] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  /**
   * Close the overlay Modal
   */
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteAccount = () => {
    axios
      .delete(`http://localhost:5000/api/user/delete/${userInfo._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        dispatch(logout());
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };

  /**
   * Handle the file upload to the firebase storage and extract some related data
   * @param file the File object being uploaded
   */
  const handleFileUpload = (file) => {
    // 1. Connect the storage based on the app (basically containing account info to identify the storage)
    const storage = getStorage(app);

    // 2. Make sure the fileName is unique
    const fileName = new Date().getTime() + file.name;

    // 3. Return a storage reference
    const storageRef = ref(storage, fileName);

    // 4. Upload file to storage
    const uploadProcess = uploadBytesResumable(storageRef, file);

    // 5. Listen for this upload process
    uploadProcess.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProcess(Math.round(progress));
      },
      (error) => {
        setIsFileUploadSuccess(false);
      },
      () => {
        getDownloadURL(uploadProcess.snapshot.ref).then((avatarUrl) =>
          setForm({ ...form, avatar: avatarUrl })
        );
      }
    );
  };

  /**
   * When one of the input changed, update the form accordingly
   * @param e the event listener object
   */
  const inputChangeHandler = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  /**
   * Send the form data to the server side for user info update
   * @param e event listener object for form
   */
  const submitHandler = (e) => {
    e.preventDefault();

    if (form.password && form.password != form.confirmPassword) {
      setError("Please Make Sure the Password Matched");
      return;
    }

    const { confirmPassword, ...rest } = form;
    axios
      .post(`http://localhost:5000/api/user/update/${userInfo._id}`, rest, {
        withCredentials: true,
      })
      .then((res) => {
        // Clear the password and confirm Password after change made
        setForm({});

        setError(null);
        dispatch(setCredential(res.data));
      })
      .catch((error) => {
        setError(error.response.data.message);
        console.log(error.response.data.message);
      });
  };

  {
    /* --------------------------------- RETURN STATEMENT ---------------------------------*/
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, translateY: -200 }}
        animate={{ opacity: 1, translateY: 100 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col mx-auto my-3 p-3"
      >
        {/* This file accessor is connected with the avatar using useRef */}
        <input
          type="file"
          ref={fileRef}
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
          accept="image/*"
          className="hidden"
        />

        {/* 1. The avatar on the left, username and email on the right */}
        <div className="flex flex-row items-center gap-2 self-center">
          {/* 1A. The avatar and related image upload UI*/}
          <div className="h-20 w-20 border rounded-full cursor-pointer hover:shadow-md relative">
            <img
              src={form.avatar ? form.avatar : userInfo.avatar}
              onClick={() => {
                fileRef.current.click();
              }}
              className={`h-20 w-20 border rounded-full object-cover ${
                ((uploadProcess > 0 && uploadProcess < 100) ||
                  !isFileUploadSuccess) &&
                "blur-sm"
              }`}
            />

            {/**
             * 1. Display the upload process in the middle of avatar when uploading avatar
             * 2. Show error when there's one
             */}
            {!isFileUploadSuccess ? (
              <span className="absolute text-red-500 z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                Error
              </span>
            ) : uploadProcess > 0 && uploadProcess < 100 ? (
              <span className="absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                {uploadProcess}%
              </span>
            ) : (
              ""
            )}
          </div>

          {/* 1B. The username and email */}
          <div className="flex flex-col gap-2">
            {/* a. The username */}
            <h1 className="text-xl">{userInfo.username}</h1>
            {/* b. The email */}
            <p className="text-sm text-gray-500">{userInfo.email}</p>
          </div>
        </div>

        {/* Displaying error */}
        {error && (
          <ErrorMessage
            errorMessage={error}
            customCss="self-center lg:w-1/2 w-3/5"
          />
        )}

        {/* 2. The form */}
        <form
          onSubmit={submitHandler}
          className="sm:grid grid-rows-3 grid-cols-2 flex flex-col w-4/6 place-items-center gap-x-3 sm:gap-y-10 gap-y-5 mt-10 mx-auto"
        >
          {/* 2A. The username label and input */}
          <div className={inputContainer}>
            <label htmlFor="username" className="text-left font-semibold">
              Username
            </label>
            <input
              type="text"
              id="username"
              defaultValue={userInfo.username}
              autoComplete="new-password"
              onChange={inputChangeHandler}
              className={`outline outline-gray-500 px-5 py-3 rounded-inputRadius focus:outline-blue-500 focus:outline-2`}
            />
          </div>

          {/* 2B. The email label and input */}
          <div className={inputContainer}>
            <label htmlFor="email" className="text-left font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              defaultValue={userInfo.email}
              autoComplete="new-password"
              onChange={inputChangeHandler}
              className={`outline outline-gray-500 px-5 py-3 rounded-inputRadius focus:outline-blue-500 focus:outline-2`}
            />
          </div>

          {/* 2C. The password label and input */}
          <div className={inputContainer}>
            <label htmlFor="password" className="text-left font-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={form.password ? form.password : ""}
              autoComplete="new-password"
              onChange={inputChangeHandler}
              className={`outline outline-gray-500 px-5 py-3 rounded-inputRadius focus:outline-blue-500 focus:outline-2`}
            />
          </div>

          {/* 2D. The confirmed password label and input */}
          <div className={inputContainer}>
            <label
              htmlFor="confirmPassword"
              className="text-left font-semibold"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={form.confirmPassword ? form.confirmPassword : ""}
              disabled={!form.password || form.password == "" ? true : false}
              autoComplete="new-password"
              onChange={inputChangeHandler}
              className={`outline outline-gray-500 px-5 py-3 rounded-inputRadius focus:outline-blue-500 focus:outline-2 disabled:bg-gray-300 disabled:outline-gray-300`}
            />
          </div>

          {/**
           * 2E. The update button
           * disabled when form is unchanged
           * active the hover and tap effect only when button is able
           */}
          <motion.button
            whileHover={
              Object.keys(form).length === 0
                ? undefined
                : { scale: 1.03, opacity: 0.9 }
            }
            whileTap={
              Object.keys(form).length === 0 ? undefined : { scale: 0.95 }
            }
            className="w-3/4 col-span-2 py-3 rounded-buttonRadius bg-black text-white disabled:bg-gray-300 disabled:text-gray-500"
            disabled={Object.keys(form).length === 0}
          >
            Update
          </motion.button>
        </form>
        <motion.p
          whileHover={{ scale: 1.03, opacity: 0.9 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsModalOpen(true)}
          className="py-3 rounded-buttonRadius text-center text-red-400 cursor-pointer"
        >
          Delete Account
        </motion.p>
      </motion.div>

      <OverlayModal
        isModalOpen={isModalOpen}
        img={trashCan}
        onCloseModal={handleCloseModal}
        modalButtonHandler={handleDeleteAccount}
        headerText="Are you sure you want to leave us?"
      />
    </>
  );
}
