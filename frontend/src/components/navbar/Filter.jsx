import { useState } from "react";
import Select from "react-dropdown-select";
import Multiselect from "multiselect-react-dropdown";
import CustomButton from "../utils/CustomButton";

export default function Filter() {
  const typeOptions = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Sale",
      value: "sale",
    },
    {
      label: "Rent",
      value: "rent",
    },
  ];

  const sortingOptions = [
    {
      label: "Price - High to Low",
      value: "highToLow",
    },
    {
      label: "Price - Low to High",
      value: "lowToHigh",
    },
    {
      label: "Newest",
      value: "newest",
    },
    {
      label: "Oldest",
      value: "oldest",
    },
  ];
  return (
    <form className="flex flex-wrap items-center sm:gap-10 gap-3 gap-y-5">
      {/* 1. The Title of filter section */}
      <h2 className="text-xl font-semibold">Filter: </h2>

      {/* 2. The drop down selector for house type */}
      <Select
        options={typeOptions}
        color="black"
        dropdownGap={0}
        placeholder="All"
        searchable={false}
        style={{
          height: "3rem",
          width: "6rem",
          padding: "0.5rem 0.5rem",
          borderRadius: "0.375rem",
          fontWeight: "600",
        }}
      />


      {/* 3. sort by selector section */}
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-semibold">Sort by: </h2>
        <Select
          options={sortingOptions}
          color="black"
          dropdownGap={0}
          placeholder="Newest"
          searchable={false}
          style={{
            width: "12rem",
            height: "3rem",
            padding: "0.5rem 0.5rem",
            borderRadius: "0.375rem",
            fontWeight: "600",
            fontSize: "0.9rem"
          }}
        />
      </div>
    
    {/* 4. The checkboxes for amenities */}
      <div className="flex items-center gap-3 ">
        <h2 className="text-xl font-semibold">Amenities: </h2>
        <div className="flex items-center gap-2">
            <input type="checkbox" id="parking"/>
            <label htmlFor="parking" className="text-lg">Parking</label>
        </div>

        <div className="flex items-center gap-2">
            <input type="checkbox" id="furnished"/>
            <label htmlFor="furnished" className="text-lg">Furnished</label>
        </div>
      </div>

      <CustomButton text="Apply" margin="m-0" padding="py-2 px-8" customCss="justify-self-end" type="submit"/>
    </form>
  );
}
