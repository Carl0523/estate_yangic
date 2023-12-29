import { avatar } from "../../assets";
import CustomButton from "../utils/CustomButton";


  
export default function About() {
  return (

    <div className="w-full flex flex-col md:flex-row justify-between md:space-y-0 space-y-10 md:space-x-40 space-x-0 items-center my-20 px-10 py-24 bg-purple-100">
      {/* 1. The big avatar of me on the left */}
      <a
        
        href="https://carl0523.github.io/hongyang-portfolio/"
        target="_blank"
        className="rounded-full shadow-avatar hover:shadow-avatarHover hover:-translate-x-5 duration-200"
      >
        <img
          src={avatar}
          alt="Avatar"
          className="border rounded-full h-80 w-80 cursor-pointer"
        />
      </a>
      {/* 2. The brief introduction section */}
      <div className="flex flex-1 flex-col gap-3 space-y-5 md:text-left text-center cursor-default">
        {/* 2A. The Header Text */}
        <h1 className="text-5xl font-bold text-black">
          Know <span className="text-primary">About Me</span>
        </h1>
        {/* 2B. The Header Subtext */}
        <p className="text-gray-500">
          I am a Computer Science major at{" "}
          <a
            href="https://www.vt.edu/"
            target="_blank"
            className="text-[#CF4420] font-bold text-lg hover:text-[#630031] underline"
          >
            Virginia Tech
          </a>{" "}
          with a passion for technology and a strong ambition to become a Full
          Stack Software Engineer. I am dedicated to learn more cutting-edge
          skill sets that spans both frontend and backend development. Eager to
          contribute my skills and creativity to the industry. Excited about the
          ever-evolving landscape of technology, I am committed to continuous
          learning and growth on my path to becoming a proficient{" "}
          <span className="text-primary font-bold text-lg">
            Full Stack Software Engineer
          </span>
          .
        </p>
        {/* 2C. The Learn More button */}
        <a
          href="https://carl0523.github.io/hongyang-portfolio/"
          target="_blank"
        >
          <CustomButton text="Learn More" responsiveWidth="md:w-1/5 w-full" />
        </a>
      </div>
    </div>

  );
}
