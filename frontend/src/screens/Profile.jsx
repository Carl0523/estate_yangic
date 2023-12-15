import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useRef, useState, useEffect } from "react";
import { app } from "../firebase";

const inputContainer = `flex flex-col gap-1 lg:w-3/4 w-4/5 text-base`;

export default function Profile() {
  const fileRef = useRef(null);

  const [form, setForm] = useState({});
  const [file, setFile] = useState(undefined);
  const [isFileUploadSuccess, setIsFileUploadSuccess] = useState(true);
  const [uploadProcess, setUploadProcess] = useState(0);

  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

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

  return (
    <div className="flex flex-col mx-auto my-3 p-3">
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
        <div className="h-20 w-20 border rounded-full cursor-pointer hover:shadow-md relative">
          <img
            src={form.avatar || userInfo.avatar}
            onClick={() => {
              fileRef.current.click();
            }}
            className={`h-20 w-20 border rounded-full object-cover ${
              ((uploadProcess > 0 && uploadProcess < 100) ||
                !isFileUploadSuccess) &&
              "blur-sm"
            }`}
          />
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

        {/* 1A. The avatar */}

        {/* 1B. The username and email */}
        <div className="flex flex-col gap-2">
          {/* a. The username */}
          <h1 className="text-xl">{userInfo.username}</h1>
          {/* b. The email */}
          <p className="text-sm text-gray-500">{userInfo.email}</p>
        </div>
      </div>

      {/* 2. The form */}
      <form className="sm:grid grid-rows-3 grid-cols-2 flex flex-col w-4/6 place-items-center gap-x-3 sm:gap-y-10 gap-y-5 mt-10 mx-auto">
        <div className={inputContainer}>
          <label htmlFor="username" className="text-left font-semibold">
            Username
          </label>
          <input
            type="text"
            id="username"
            autoComplete="new-password"
            className={`outline outline-gray-500 px-5 py-3 rounded-inputRadius focus:outline-blue-500 focus:outline-2`}
          />
        </div>
        <div className={inputContainer}>
          <label htmlFor="email" className="text-left font-semibold">
            Email
          </label>
          <input
            type="email"
            id="email"
            autoComplete="new-password"
            className={`outline outline-gray-500 px-5 py-3 rounded-inputRadius focus:outline-blue-500 focus:outline-2`}
          />
        </div>
        <div className={inputContainer}>
          <label htmlFor="password" className="text-left font-semibold">
            Password
          </label>
          <input
            type="password"
            id="password"
            autoComplete="new-password"
            className={`outline outline-gray-500 px-5 py-3 rounded-inputRadius focus:outline-blue-500 focus:outline-2`}
          />
        </div>
        <div className={inputContainer}>
          <label htmlFor="confirmPassword" className="text-left font-semibold">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
            className={`outline outline-gray-500 px-5 py-3 rounded-inputRadius focus:outline-blue-500 focus:outline-2`}
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.03, opacity: 0.9 }}
          whileTap={{ scale: 0.95 }}
          className="w-11/12 col-span-2 py-3 rounded-buttonRadius bg-black text-white"
        >
          Update
        </motion.button>
      </form>
    </div>
  );
}
