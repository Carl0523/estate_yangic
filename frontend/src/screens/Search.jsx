import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import HomeCard from "../components/homes_list/HomeCard";
import Loading from "../components/utils/Loading";
import EmptyList from "../components/utils/EmptyList";
import { noResultFound } from "../assets";

export default function Search() {
  const [homeList, setHomeList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // urlParams state for filter
  const { urlParams } = useSelector((state) => state.filter);

  // Fetch the home list based on the filter provided in urlParams
  // Update the homeList state with retrieved data and set isLoading state to false
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/homes/list?${urlParams}`, {
        withCredentials: true,
      })
      .then((res) => {
        setHomeList(res.data);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, [urlParams]);

  return (
    <div className="pt-48">
      {isLoading ? (
        // 1. When loading, display a three dots animation in the middle of screen.
        <Loading />
      ) : homeList.length === 0 ? (
        // 2. When no homes found, display the not found text
        <EmptyList image={noResultFound} text="No Result Found"/>
      ) : (
        // 3. Display a list of home with matched names
        <div className="w-full flex flex-wrap gap-16 mx-1 mb-10">
          {homeList.map((home, index) => {
            // Convert the date info and formatted it
            const formattedDate = new Date(home.createdAt).toLocaleDateString(
              "en-US"
            );
            return (
              <HomeCard
                key={index}
                homeId={home._id}
                address={home.address}
                coverImage={home.imageUrls[0]}
                date={formattedDate}
                furnished={home.furnished}
                parking={home.parking}
                numOfBathrooms={home.numOfBathrooms}
                numOfBedrooms={home.numOfBedrooms}
                type={home.type}
                price={home.price}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
