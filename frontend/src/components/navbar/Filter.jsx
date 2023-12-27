import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setFilter } from "../../redux/slices/filterSlice";
import Select from "react-dropdown-select";
import CustomButton from "../utils/CustomButton";

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
    value: "price_desc",
  },
  {
    label: "Price - Low to High",
    value: "price_asc",
  },
  {
    label: "Newest",
    value: "createdAt_desc",
  },
  {
    label: "Oldest",
    value: "createdAt_asc",
  },
];

export default function Filter({ searchWords }) {
  // The state for filter
  const [filterData, setFilterData] = useState({
    searchWords,
    type: "all",
    parking: "false",
    furnished: "false",
    sort: "createdAt",
    order: "desc",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  /**
   * Update the filterData based on the filter changed
   * @param e the event listener object
   */
  const handleFilterChange = (e) => {
    // Case 1: the value of checkbox changed - parking or furnished
    if (
      e.target &&
      (e.target.id === "parking" || e.target.id === "furnished")
    ) {
      setFilterData({
        ...filterData,
        [e.target.id]: e.target.checked ? "true" : "false",
      });
    }
    // Case 2: The value of house type and sort by changed
    else {
      const value = e[0].value;
      // Distinguish the sort by and house type
      if (value.includes("asc") || value.includes("desc")) {
        const sort = value.split("_")[0];
        const order = value.split("_")[1];
        setFilterData({ ...filterData, sort, order });
      } else {
        const id = e[0].label.toLowerCase();
        setFilterData({ ...filterData, type: id });
      }
    }
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(location.search);
    urlParams.set("parking", filterData.parking);
    urlParams.set("furnished", filterData.furnished);
    urlParams.set("type", filterData.type);
    urlParams.set("order", filterData.order);
    urlParams.set("sort", filterData.sort);
    navigate(`/search?${urlParams.toString()}`);
  };

  // Make sure the changes from url params will reflect the filter as well
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const urlSearchWords = urlParams.get("searchWords");
    const urlParking = urlParams.get("parking");
    const urlFurnished = urlParams.get("furnished");
    const urlType = urlParams.get("type");
    const urlOrder = urlParams.get("order");
    const urlSort = urlParams.get("sort");

    if (
      urlSearchWords ||
      urlParking ||
      urlFurnished ||
      urlType ||
      urlOrder ||
      urlSort
    ) {
      setFilterData({
        searchWords: urlSearchWords || "",
        type: urlType || "all",
        parking: urlParking || "false",
        furnished: urlFurnished || "false",
        sort: urlSort || "createdAt",
        order: urlOrder || "desc",
      });
    }

    dispatch(setFilter(urlParams.toString()));
  }, [location.search]);

  return (
    <form
      onSubmit={handleFilterSubmit}
      className="flex flex-wrap items-center sm:gap-10 gap-3 gap-y-5"
    >
      {/* 1. The Title of filter section */}
      <h2 className="md:text-xl text-base font-semibold">Filter: </h2>

      {/* 2. The drop down selector for house type */}
      <Select
        options={typeOptions}
        values={[typeOptions.find((type) => type.value === filterData.type)]}
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
        onChange={handleFilterChange}
      />

      {/* 3. sort by selector section */}
      <div className="flex items-center gap-2">
        <h2 className="md:text-xl text-base font-semibold">Sort by: </h2>
        <Select
          options={sortingOptions}
          values={[
            sortingOptions.find(
              (sorting) =>
                sorting.value === filterData.sort + "_" + filterData.order
            ),
          ]}
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
            fontSize: "0.9rem",
          }}
          onChange={handleFilterChange}
        />
      </div>

      {/* 4. The checkboxes for amenities */}
      <div className="flex items-center gap-3 ">
        <h2 className="md:text-xl text-base font-semibold">Amenities: </h2>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="parking"
            onChange={handleFilterChange}
            checked={filterData.parking === "true"}
          />
          <label htmlFor="parking" className="md:text-lg text-sm">
            Parking
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="furnished"
            onChange={handleFilterChange}
            checked={filterData.furnished === "true"}
          />
          <label htmlFor="furnished" className="md:text-lg text-sm">
            Furnished
          </label>
        </div>
      </div>

      <CustomButton
        text="Apply"
        margin="m-0"
        padding="py-2 px-8"
        responsiveWidth="md:text-base text-sm"
        customCss="justify-self-end"
        type="submit"
      />
    </form>
  );
}
