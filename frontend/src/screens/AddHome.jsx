import { useState } from "react";
import { motion } from "framer-motion";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { emptyList } from "../assets";
import CustomButton from "../components/CustomButton";
import ImageItem from "../components/ImageItem";

export default function AddHome() {
  const [imgFiles, setImgFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [form, setForm] = useState({
    imageUrls: [],
  });

  /**
   * Upload the images to firebase storage and store the downloaded URLs into form
   */
  const handleImagesUpload = () => {
    if (imgFiles.length > 0 && imgFiles.length < 11) {
      const promises = [];

      setIsUploading(true);
      for (let i = 0; i < imgFiles.length; i++) {
        promises.push(storeImg(imgFiles[i]));
      }
      // Execute only after all image resolved
      Promise.all(promises).then((urls) => {
        setForm((prevForm) => {
          return { ...prevForm, imageUrls: prevForm.imageUrls.concat(urls) };
        });
        setIsUploading(false);
      });
    }
  };

  /**
   * Remove the specific image from the imageUrls
   * @param index the index of item to be deleted
   */
  const handleDeleteImage = (index) => {
    setForm((prevForm) => {
      return {
        ...prevForm,
        imageUrls: prevForm.imageUrls.filter((_, i) => i !== index),
      };
    });
  };

  /**
   * Upload the process and return the img URL
   * @param image the image file
   * @returns the img URL
   */
  const storeImg = async (image) => {
    return new Promise((resolve, reject) => {
      // 1. Find the storage through app (store account info to identify)
      const storage = getStorage(app);

      // 2. The name for the upload file
      const fileName = new Date().getTime() + image.name;

      // 3. The storage reference
      const storageRef = ref(storage, fileName);

      // 4. Start the upload process
      const uploadProcess = uploadBytesResumable(storageRef, image);

      // 5. Track the upload process
      uploadProcess.on(
        "state_changed",
        null,
        (error) => reject(error),
        () => {
          getDownloadURL(uploadProcess.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  return (
    <motion.main
      initial={{ opacity: 0, translateY: "-200" }}
      animate={{ opacity: 1, translateY: "0" }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-full p-3 mx-auto my-7"
    >
      {/* 1. Header text */}
      <h1 className="mb-3 text-center text-2xl font-semibold">Add New Home</h1>

      {/* 2. The form */}
      <form className="sm:w-2/3 2-full flex flex-col gap-5 justify-center items-center mx-auto">
        {/* 2a. The name of the home */}
        <div className="flex flex-col md:w-2/3 w-full gap-1">
          <label htmlFor="name" className="font-semibold">
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Shawnee Department"
            minLength="4"
            maxLength="50"
            className="outline outline-gray-500 focus:outline-blue-500 p-3 rounded-inputRadius focus:outline-2"
            required
          />
        </div>

        {/* 2b. The address of the home */}
        <div className="flex flex-col md:w-2/3 w-full gap-1">
          <label htmlFor="address" className="font-semibold">
            Address
          </label>
          <input
            type="text"
            id="address"
            placeholder="Enter your home address"
            minLength="4"
            maxLength="50"
            className="outline p-3 outline-gray-500 focus:outline-blue-500 rounded-inputRadius focus:outline-2"
            required
          />
        </div>

        {/* 2c. The description of the home */}
        <div className="flex flex-col md:w-2/3 w-full gap-1">
          <label htmlFor="description" className="font-semibold">
            Description
          </label>
          <textarea
            type="text"
            id="description"
            placeholder="Add description"
            minLength="1"
            className="outline p-3 outline-gray-500 focus:outline-blue-500 rounded-inputRadius focus:outline-2"
            required
          />
        </div>

        {/* 2d. The checking boxes: rent, sale, parking, furnished */}
        <div className="md:w-2/3 w-full flex flex-wrap justify-center gap-5">
          <div className="flex gap-2">
            <input type="checkbox" id="sale" />
            <label htmlFor="sale">Sale</label>
          </div>

          <div className="flex gap-2">
            <input type="checkbox" id="rent" />
            <label htmlFor="rent">Rent</label>
          </div>

          <div className="flex gap-2">
            <input type="checkbox" id="parking" />
            <label htmlFor="parking">Parking</label>
          </div>

          <div className="flex gap-2">
            <input type="checkbox" id="furnished" />
            <label htmlFor="furnished">Furnished</label>
          </div>
        </div>

        {/* 2e. The inputs for number of bedrooms and bathrooms and price */}
        <div className="md:w-2/3 w-full flex justify-center gap-2">
          <div className="flex gap-2 items-center justify-center">
            <input
              type="number"
              id="numOfBedrooms"
              min="1"
              className="lg:w-1/3 w-1/2 outline outline-gray-500 focus:outline-blue-500 focus:outline-2 p-3 rounded-inputRadius"
              required
            />
            <label htmlFor="numOfBedrooms">Beds</label>
          </div>

          <div className="flex gap-2 items-center justify-center">
            <input
              type="number"
              id="numOfBathrooms"
              min="1"
              className="lg:w-1/3 w-1/2 outline outline-gray-500 focus:outline-blue-500 focus:outline-2 p-3 rounded-inputRadius"
              required
            />
            <label htmlFor="numOfBathrooms">Baths</label>
          </div>

          <div className="flex gap-2 items-center justify-center">
            <input
              type="number"
              id="price"
              min="1"
              className="lg:w-1/3 w-1/2 outline outline-gray-500 focus:outline-blue-500 focus:outline-2 p-3 rounded-inputRadius"
              required
            />
            <div className="flex flex-col">
              <label htmlFor="price">Price</label>
              <span className="md:text-sm text-xs text-gray-500">
                {" "}
                $ / month
              </span>
            </div>
          </div>
        </div>

        {/* 2f. The image upload session  */}
        <div className="md:w-2/3 w-full flex flex-col gap-2 items-center m-2">
          {/* Heading */}
          <h1 className="font-semibold">Upload images</h1>

          {/* The images upload section and images are display in this container */}
          <div className="w-full max-h-96 flex flex-col gap-2 justify-between items-center border border-gray-500 p-3 rounded-lg overflow-scroll">
            {/* The image upload area and upload button */}
            <div className="w-full flex justify-between items-center">
              <input
                type="file"
                id="images"
                accept="image/*"
                onChange={(e) => setImgFiles(e.target.files)}
                multiple
              />
              <CustomButton text={isUploading ? "Uploading.." : "Upload"} buttonHandler={handleImagesUpload} />
            </div>
            {form.imageUrls.length === 0 ? (
              <img src={emptyList} className="w-24 my-10" />
            ) : (
              form.imageUrls.map((url, index) => {
                return (
                  <ImageItem
                    key={index}
                    imageUrl={url}
                    onDelete={handleDeleteImage}
                    index={index}
                  />
                );
              })
            )}
          </div>
        </div>
        <CustomButton
          type="submit"
          text="Create"
          responsiveWidth="md:w-2/3 w-full"
        />
      </form>
    </motion.main>
  );
}
