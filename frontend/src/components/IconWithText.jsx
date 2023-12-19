import React from "react";

export default function IconWithText({ icon, text, textSize="lg", customCss="", gap=3}) {
  return (
    <div className={`flex items-center gap-${gap} ${customCss}`}>
      {icon}
      <p className={`text-${textSize}`}>{text}</p>
    </div>
  );
}
