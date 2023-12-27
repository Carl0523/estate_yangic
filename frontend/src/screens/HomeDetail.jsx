import { ThreeDots } from "react-loader-spinner";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import { FaHome, FaBath, FaParking, FaCouch, FaShare } from "react-icons/fa";
import { FaLocationDot, FaPhone, FaCheck } from "react-icons/fa6";
import { IoBedSharp } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { BiDotsHorizontalRounded } from "react-icons/bi";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import IconWithText from "../components/IconWithText";
import Overlay from "../components/utils/Overlay";
import ContactModal from "../components/home_detail/ContactModal";

export default function HomeDetail() {
  const [homeDetail, setHomeDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const params = useParams();
  const homeId = params.id;

  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/homes/home/${homeId}`)
      .then((res) => {
        setHomeDetail(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.response.data.message);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading && (
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
      )}
      {error && <span>{error}</span>}
      {!isLoading && !error && homeDetail && (
        <div className="mt-24">
          {/* 1. The images slider of the house */}
          <Swiper
            loop={true}
            style={{
              "--swiper-navigation-color": "#000",
              "--swiper-pagination-color": "#000",
            }}
            lazy="true"
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
          >
            {homeDetail.imageUrls.map((url, index) => {
              return (
                <SwiperSlide key={index} className="w-full bg-gray-100">
                  <img
                    loading="lazy"
                    src={url}
                    alt="house images"
                    className="w-2/3 sm:h-[27rem] h-[22rem] select-none mx-auto"
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* 2. The information of the house */}
          <div className="flex flex-col gap-2 lg:px-24 sm:px-10 px-5 py-10 mb-10">
            {/* 2A. The name + numOfBedrooms and numOfBathrooms */}
            <div className="flex sm:justify-between sm:flex-row flex-col sm:items-center sm:mb-0 mb-5">
              {/* 2Aa. The name of home */}
              <IconWithText
                text={homeDetail.name}
                textSize="3xl"
                icon={<FaHome className="text-3xl" />}
                customCss="mb-3"
              />
              {/* 2Ab. The number of bedrooms and bathrooms */}
              <div className="flex gap-5">
                <div className="flex items-center gap-3 sm:font-semibold font-light sm:text-black text-gray-500">
                  <IoBedSharp className="sm:text-3xl text-xl" />
                  <p className="sm:text-2xl text-md">
                    {homeDetail.numOfBedrooms}
                    <span className="font-light"> beds</span>
                  </p>
                </div>
                <div className="flex items-center gap-3 sm:font-semibold font-light sm:text-black text-gray-500">
                  <FaBath className="sm:text-3xl text-xl" />
                  <p className="sm:text-2xl text-md">
                    {homeDetail.numOfBathrooms}
                    <span className="font-light"> baths</span>
                  </p>
                </div>
              </div>
            </div>
            {/* 2B. The price*/}
            <h1 className="text-3xl font-semibold">
              ${homeDetail.price.toLocaleString("en-US")}
              <span className="text-base">
                {homeDetail.type === "rent" ? "/month" : ""}
              </span>
            </h1>
            {/* 2C. The address */}
            <IconWithText
              text={homeDetail.address}
              icon={<FaLocationDot />}
              customCss="text-gray-500"
            />
            {/* 2D. The type of the house */}
            <IconWithText
              icon={
                <BiDotsHorizontalRounded
                  className={`text-3xl ${
                    homeDetail.type === "sale"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                />
              }
              text={`House for ${homeDetail.type}`}
              textSize="s"
              gap="1"
              customCss="font-light"
            />
            {/* 2E. Other info about the house */}
            <div className="flex flex-wrap gap-10 py-5">
              <div className="w-1/4 flex justify-between items-center bg-gray-100 py-2 px-3 rounded-buttonRadius">
                <IconWithText
                  text="Parking"
                  icon={<FaParking className="text-xl" />}
                />
                {homeDetail.parking ? <FaCheck /> : <IoMdClose />}
              </div>

              <div className="w-1/4 flex justify-between items-center bg-gray-100 py-2 px-3 rounded-buttonRadius">
                <IconWithText
                  text="Furnished"
                  icon={<FaCouch className="text-xl" />}
                />
                {homeDetail.furnished ? <FaCheck /> : <IoMdClose />}
              </div>
            </div>

            {/* 2F. The description of the home */}
            <div>
              <h1 className="text-xl font-semibold mt-5 mb-2">
                About the {homeDetail.name}
              </h1>
              <p className="font-light">{homeDetail.description}</p>
            </div>
          </div>

          {/**
           * 3. Contact the landlord button fixed at the middle bottom of the page
           * The button can only been seen by other users
           */}
          {(!userInfo || (userInfo && userInfo._id !== homeDetail.userRef)) && (
            <button
              onClick={() => {
                setIsModalOpen(true);
              }}
              className="fixed bottom-2 left-1/2 transform -translate-x-1/2 bg-black text-white py-2 px-4 rounded-buttonRadius hover:scale-105 hover:opacity-95 active:scale-95"
            >
              <IconWithText text="Contact the owner" icon={<FaPhone />} />
            </button>
          )}

          {/**
           * The Modal to send message to the owner
           */}
          {isModalOpen && (
            <Overlay>
              <ContactModal
                userId={homeDetail.userRef}
                homeName={homeDetail.name}
                onClose={() => setIsModalOpen(false)}
              />
            </Overlay>
          )}

          {/* 4. The share button: copy the current URL */}
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              setIsCopied(true);
              setTimeout(() => {
                setIsCopied(false);
              }, 2000);
            }}
            className="absolute top-28 right-10 z-10 text-white bg-black p-3 rounded-full hover:scale-105"
          >
            <FaShare />
          </button>

          {/* OPTIONAL: Link copy notification */}
          {isCopied && (
            <div className="absolute bottom-36 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 rounded-md bg-transparentBg p-2">
              <IconWithText
                text="Link copied!"
                icon={<FaCheck className="text-green-500" />}
                customCss="text-white"
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}
