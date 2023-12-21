import React from "react";

export default function Overlay({ children }) {
  return (
    <div className="fixed bg-overlay h-full w-full top-0 left-0 z-40">
      {children}
    </div>
  );
}
