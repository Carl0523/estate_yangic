import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { emptyList } from "../assets";
import CustomButton from "../components/utils/CustomButton";
import ErrorMessage from "../components/utils/ErrorMessage";
import ImageItem from "../components/ImageItem";
import axios from "axios";
import IconWithText from "../components/IconWithText";

export default function UpdateHome() {
  const [imgFiles, setImgFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    address: "",
    price: 0,
    numOfBedrooms: 1,
    numOfBathrooms: 1,
    furnished: false,
    parking: false,
    type: "sale",
    imageUrls: [],
  });

  const { userInfo } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const params = useParams();
  const homeId = params.id;

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/homes/home/${homeId}`, {
        withCredentials: true,
      })
      .then((res) => {
        setForm(res.data);
      });
  }, []);

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

  /**
   * Handle the value change for the entire form
   * @param e the event listener object
   */
  const handleFormChange = (e) => {
    // 1. Identify the rent and sale check boxes
    if (e.target.id === "rent" || e.target.id === "sale") {
      setForm({ ...form, type: e.target.id });
    }
    // 2. Identify the parking and furnished check boxes
    else if (e.target.id === "parking" || e.target.id === "furnished") {
      setForm({ ...form, [e.target.id]: e.target.checked });
    } else {
      setForm({ ...form, [e.target.id]: e.target.value });
    }
  };

  /**
   * Submit the form to the server side and store in the database
   * @param {*} e
   */
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (form.imageUrls.length === 0) {
      setError("Minimum of one image required");
      return;
    }
    axios
      .post(`http://localhost:3000/api/homes/update/${homeId}`, form, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        navigate("/your-homes");
      })
      .catch((error) => {
        setError(error.response.data.message);
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
      <h1 className="text-center text-2xl font-semibold mb-3">Update Home</h1>
      <span />

      {/* OPTIONAL: Error message */}
      {error && (
        <ErrorMessage
          errorMessage={error}
          customCss="mx-auto my-5 sm:w-1/2 w-full"
        />
      )}

      {/* 2. The form */}
      <form
        onSubmit={handleFormSubmit}
        className="sm:w-2/3 w-full flex flex-col gap-5 justify-center items-center mx-auto"
      >
        {/* 2a. The name of the home */}
        <div className="flex flex-col md:w-2/3 w-full gap-1">
          <label
            htmlFor="name"
            className="font-semibold after:content-['*'] after:text-red-500"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={form.name}
            placeholder="Squire Center"
            minLength="4"
            maxLength="100"
            className="outline outline-gray-500 focus:outline-blue-500 p-3 rounded-inputRadius focus:outline-2"
            required
            onChange={handleFormChange}
          />
        </div>

        {/* 2b. The address of the home */}
        <div className="flex flex-col md:w-2/3 w-full gap-1">
          <label
            htmlFor="address"
            className="font-semibold after:content-['*'] after:text-red-500"
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            value={form.address}
            placeholder="290 College Ave, Blacksburg, VA, 24060"
            minLength="4"
            maxLength="100"
            className="outline p-3 outline-gray-500 focus:outline-blue-500 rounded-inputRadius focus:outline-2"
            required
            onChange={handleFormChange}
          />
        </div>

        {/* 2c. The description of the home */}
        <div className="flex flex-col md:w-2/3 w-full gap-1">
          <label
            htmlFor="description"
            className="font-semibold after:content-['*'] after:text-red-500"
          >
            Description
          </label>
          <textarea
            type="text"
            id="description"
            value={form.description}
            rows="9"
            placeholder="Add description"
            minLength="1"
            className="outline p-3 outline-gray-500 focus:outline-blue-500 rounded-inputRadius focus:outline-2"
            required
            onChange={handleFormChange}
          />
        </div>

        {/* 2d. The checking boxes: rent, sale, parking, furnished */}
        <div className="md:w-2/3 w-full flex flex-wrap justify-center gap-5">
          <div className="flex gap-2">
            <input
              type="checkbox"
              id="sale"
              checked={form.type === "sale"}
              onChange={handleFormChange}
            />
            <label htmlFor="sale">Sale</label>
          </div>

          <div className="flex gap-2">
            <input
              type="checkbox"
              id="rent"
              checked={form.type === "rent"}
              onChange={handleFormChange}
            />
            <label htmlFor="rent">Rent</label>
          </div>

          <div className="flex gap-2">
            <input
              type="checkbox"
              id="parking"
              checked={form.parking}
              onChange={handleFormChange}
            />
            <label htmlFor="parking">Parking</label>
          </div>

          <div className="flex gap-2">
            <input
              type="checkbox"
              id="furnished"
              checked={form.furnished}
              onChange={handleFormChange}
            />
            <label htmlFor="furnished">Furnished</label>
          </div>
        </div>

        {/* 2e. The inputs for number of bedrooms and bathrooms and price */}
        <div className="md:w-2/3 w-full flex justify-center gap-2">
          <div className="flex gap-2 items-center justify-center">
            <input
              type="number"
              id="numOfBedrooms"
              value={form.numOfBedrooms}
              min="1"
              className="lg:w-1/3 w-1/2 outline outline-gray-500 focus:outline-blue-500 focus:outline-2 p-3 rounded-inputRadius"
              required
              onChange={handleFormChange}
            />
            <label htmlFor="numOfBedrooms">Beds</label>
          </div>

          <div className="flex gap-2 items-center justify-center">
            <input
              type="number"
              id="numOfBathrooms"
              value={form.numOfBathrooms}
              min="1"
              className="lg:w-1/3 w-1/2 outline outline-gray-500 focus:outline-blue-500 focus:outline-2 p-3 rounded-inputRadius"
              required
              onChange={handleFormChange}
            />
            <label htmlFor="numOfBathrooms">Baths</label>
          </div>

          <div className="flex gap-2 items-center justify-center">
            <input
              type="number"
              id="price"
              value={form.price}
              min="1"
              className="lg:w-2/3 w-full outline outline-gray-500 focus:outline-blue-500 focus:outline-2 p-3 rounded-inputRadius"
              required
              onChange={handleFormChange}
            />
            <div className="flex flex-col">
              <label htmlFor="price">Price</label>
              {form.type === "rent" && (
                <span className="md:text-sm text-xs text-gray-500">
                  {" "}
                  $ / month
                </span>
              )}
            </div>
          </div>
        </div>

        {/* 2f. The image upload session  */}
        <div className="md:w-2/3 w-full flex flex-col gap-2 items-center m-2">
          {/* Heading */}
          <h1 className="font-semibold">Upload image</h1>

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
              <CustomButton
                text={isUploading ? "Uploading.." : "Upload"}
                buttonHandler={handleImagesUpload}
                disabledCondition={isUploading}
              />
            </div>
            {form.imageUrls.length === 0 ? (
              <div className="flex flex-col gap-2 my-10 justify-center items-center">
                <img src={emptyList} className="w-24" />
                <p className="text-gray-400 text-center">
                  Add images here
                  <span className="text-xs block">
                    (Minimum one image required)
                  </span>
                </p>
              </div>
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
          text="Update"
          responsiveWidth="md:w-2/3 w-full"
        />
        <CustomButton
          text="Cancel"
          bgColor="red-500"
          margin="m-0"
          textColor="white"
          responsiveWidth="md:w-2/3 w-full"
          buttonHandler={() => {
            navigate("/your-homes");
          }}
        />
      </form>
    </motion.main>
  );
}
