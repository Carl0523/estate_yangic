import React from "react";

export default function EmptyList({ image, text, subtext = null }) {
  return (
    <div className="flex flex-col justify-center items-center my-48 gap-4">
      <img src={image} className="h-40 w-48" />
      <span className="text-2xl text-gray-400">
        {text}
        {subtext && (
          <span className="block text-center text-base text-blue-400">
            {subtext}
          </span>
        )}
      </span>
    </div>
  );
}
