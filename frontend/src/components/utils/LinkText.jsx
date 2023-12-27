import { Link } from "react-router-dom";

export default function LinkText({path, text, customCss=""}) {
  return (
    <Link to={path} className={`hover:text-primary hover:scale-105 ${customCss}`}>
      <li className="font-normal">{text}</li>
    </Link>
  );
}
