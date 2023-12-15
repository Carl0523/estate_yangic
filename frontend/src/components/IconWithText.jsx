import React from "react";

export default function IconWithText({ icon, text, textSize="lg", customCss=""}) {
  return (
    <div className={`flex items-center gap-3 ${customCss}`}>
      {icon}
      <p className={`font-normal text-${textSize}`}>{text}</p>
    </div>
  );
}
