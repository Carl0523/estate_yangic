import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaHome } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import HomeCard from "../components/homes_list/HomeCard";
import { emptyHomeList } from "../assets/index";
import axios from "axios";
import Loading from "../components/utils/Loading";
import EmptyList from "../components/utils/EmptyList";

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

  const deleteHandler = (homeId) => {
    axios
      .delete(`http://localhost:3000/api/homes/delete/${homeId}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setHomeList((prevHomes) => {
          return prevHomes.filter((home) => {
            return home._id !== homeId;
          });
        });
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="p-5 h-full w-full my-20">
      {/* 1. The heading and add home button */}
      <div className="flex justify-between items-center mb-5">
        <h1 className="sm:text-3xl text-xl font-semibold self-center">
          Your Homes
        </h1>
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
        <Loading/>
      ) : homeList.length === 0 ? (
        <EmptyList image={emptyHomeList} text="Add all your properties here" subtext="Click Add Home"/>
      ) : (
        <div className="w-full flex flex-wrap gap-16 mx-1 my-10">
          {homeList.map((home, index) => {
            // Convert the date info and formatted it
            const formattedDate = new Date(home.createdAt).toLocaleDateString(
              "en-US"
            );
            return (
              <HomeCard
                key={index}
                homeId={home._id}
                date={formattedDate}
                coverImage={home.imageUrls[0]}
                price={home.price}
                numOfBedrooms={home.numOfBedrooms}
                numOfBathrooms={home.numOfBathrooms}
                address={home.address}
                type={home.type}
                furnished={home.furnished}
                parking={home.parking}
                onDelete={deleteHandler}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
