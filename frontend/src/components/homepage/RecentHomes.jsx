import { useEffect, useState } from "react";
import axios from "axios";
import HomeCard from "../homes_list/HomeCard";

export default function RecentHomes() {
  const [recentHomes, setRecentHomes] = useState([]);

  useEffect(() => {
    axios
      .get("https://home-yonder.onrender.com/api/homes/list", {
        withCredentials: true,
      })
      .then((res) => {
        setRecentHomes(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="flex flex-col gap-5 my-20 mx-10">
      {/* 1. The header text */}
      <h1 className="text-4xl font-bold">Recent Offers</h1>

      {/* 2. The list of recent offer */}
      <div className="flex gap-5 overflow-x-auto flex-nowrap scroll-smooth p-5 border rounded-md">
        {recentHomes.map((home, index) => {
          const formattedDate = new Date(home.createdAt).toLocaleDateString(
            "en-US"
          );
          return (
            <HomeCard
              key={index}
              price={home.price}
              homeId={home._id}
              address={home.address}
              coverImage={home.imageUrls[0]}
              date={formattedDate}
              furnished={home.furnished}
              numOfBathrooms={home.numOfBathrooms}
              numOfBedrooms={home.numOfBathrooms}
              parking={home.parking}
              type={home.type}
              showExtraInfo={false}
            />
          );
        })}
      </div>
    </div>
  );
}
