import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaHome } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import HomeCard from "../components/homes_list/HomeCard";
import { ThreeDots } from "react-loader-spinner";
import { emptyHomeList } from "../assets/index";
import axios from "axios";

export default function HomesList() {
  const [isLoading, setIsLoading] = useState(true);
  const [homeList, setHomeList] = useState([]);

  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/homes/list/${userInfo._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setHomeList(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="p-5 h-full w-full mb-20">
      {/* 1. The heading and add home button */}
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-3xl font-semibold self-center">Your Homes</h1>
        <Link to="/add-home">
          <motion.div
            whileHover={{ scale: 1.03, opacity: 0.9 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-3 py-2 bg-black text-white rounded-buttonRadius cursor-pointer "
          >
            <FaHome />
            <span>Add Home</span>
          </motion.div>
        </Link>
      </div>

      {isLoading ? (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="black"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </div>
      ) : homeList.length === 0 ? (
        <div className="flex flex-col justify-center items-center my-48 gap-4">
          <img src={emptyHomeList} className="h-40 w-40" />
          <span className="text-2xl text-gray-400">
            Add all your properties here
            <span className="block text-center text-base text-blue-400">
              Click Add Home
            </span>
          </span>
        </div>
      ) : (
        <div className="w-full flex flex-wrap justify-between gap-y-4">
          {homeList.map((home, index) => {
            return (
              <Link to={`/your-homes/${home._id}`}>
                <HomeCard
                  key={index}
                  coverImage={home.imageUrls[0]}
                  price={home.price}
                  numOfBedrooms={home.numOfBedrooms}
                  numOfBathrooms={home.numOfBathrooms}
                  address={home.address}
                  type={home.type}
                  furnished={home.furnished}
                  parking={home.parking}
                />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
