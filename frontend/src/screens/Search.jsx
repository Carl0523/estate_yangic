import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import HomeCard from "../components/homes_list/HomeCard";
import Loading from "../components/utils/Loading";
import EmptyList from "../components/utils/EmptyList";
import CustomButton from "../components/utils/CustomButton";
import { noResultFound } from "../assets";

export default function Search() {
  const [homeList, setHomeList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showMoreButton, setShowMoreButton] = useState(false);

  // urlParams state for filter
  const { urlParams } = useSelector((state) => state.filter);

  const handleShowMore = () => {
    const startIndex = homeList.length;
    const newUrlParams = new URLSearchParams(urlParams);
    newUrlParams.set("startIndex", startIndex);
    axios
      .get(`http://localhost:3000/api/homes/list?${newUrlParams}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.length < 9) {
          setShowMoreButton(false);
        }
        setHomeList([...homeList, ...res.data]);
      })
      .catch((error) => console.log(error));

  }

  // Fetch the home list based on the filter provided in urlParams
  // Update the homeList state with retrieved data and set isLoading state to false
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/homes/list?${urlParams}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.length > 8) {
          setShowMoreButton(true);
        }
        else
        {
          setShowMoreButton(false);
        }
        setHomeList(res.data);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, [urlParams]);

  return (
    <div className="xl:pt-52 pt-72 px-5 h-full w-full">
      {isLoading ? (
        // 1. When loading, display a three dots animation in the middle of screen.
        <Loading />
      ) : homeList.length === 0 ? (
        // 2. When no homes found, display the not found text
        <EmptyList image={noResultFound} text="No Result Found" />
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
      {showMoreButton && (
        <div className="flex justify-center">
          <CustomButton text="Show More..." margin="m-8" padding="py-3 px-8" buttonHandler={handleShowMore}/>
        </div>
      )}
    </div>
  );
}
