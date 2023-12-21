import { MdNightlife } from "react-icons/md";
import { MdAddBusiness } from "react-icons/md";
import { IoFastFood } from "react-icons/io5";
import { IoGameController } from "react-icons/io5";
import { FaMasksTheater } from "react-icons/fa6";
import { MdComputer } from "react-icons/md";
import { MdEventNote } from "react-icons/md";
import { MdSportsGymnastics } from "react-icons/md";
import { GrWorkshop } from "react-icons/gr";
import { FaMusic } from "react-icons/fa6";
import { MdOutlineHealthAndSafety } from "react-icons/md";

interface Category {
  icon: JSX.Element;
  title: string;
  path: string;
}

export const categories: Category[] = [
  {
    icon: <MdNightlife />,
    title: "Parties",
    path: "/",
  },
  {
    icon: <MdAddBusiness />,
    title: "Business",
    path: "/",
  },
  {
    icon: <IoFastFood />,
    title: "Food & Drink",
    path: "/",
  },
  {
    icon: <IoGameController />,
    title: "Hobbies",
    path: "/",
  },
  {
    icon: <MdComputer />,
    title: "Tech and Innovation",
    path: "/",
  },
  {
    icon: <FaMasksTheater />,
    title: "Performing & Visual Arts",
    path: "/",
  },
  {
    icon: <MdEventNote />,
    title: "Exhibitions",
    path: "/",
  },
  {
    icon: <MdSportsGymnastics />,
    title: "Sports & Fitness",
    path: "/",
  },
  {
    icon: <GrWorkshop />,
    title: "Seminars, Workshops and Conferences",
    path: "/",
  },
  {
    icon: <FaMusic />,
    title: "Concerts and Music",
    path: "/",
  },
  {
    icon: <MdOutlineHealthAndSafety />,
    title: "Health and Wellness",
    path: "/",
  },
];
