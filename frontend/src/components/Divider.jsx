import React from "react";

export default function Divider({ text, width = "lg:w-4/6 w-4/5" }) {
  return (
    <div className={`flex gap-1 ${width} items-center`}>
      <hr className="border w-2/4 border-gray-300" />
      <h1 className="text-gray-500">{text}</h1>
      <hr className="border w-2/4 border-gray-300" />
    </div>
  );
}
