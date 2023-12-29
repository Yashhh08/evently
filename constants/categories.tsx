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
    path: "?category=parties",
  },
  {
    icon: <MdAddBusiness />,
    title: "Business",
    path: "?category=business",
  },
  {
    icon: <IoFastFood />,
    title: "Food & Drink",
    path: "?category=food",
  },
  {
    icon: <IoGameController />,
    title: "Hobbies",
    path: "?category=hobbies",
  },
  {
    icon: <MdComputer />,
    title: "Tech and Innovation",
    path: "?category=tech",
  },
  {
    icon: <FaMasksTheater />,
    title: "Performing & Visual Arts",
    path: "?category=performing",
  },
  {
    icon: <MdEventNote />,
    title: "Exhibitions",
    path: "?category=exhibitions",
  },
  {
    icon: <MdSportsGymnastics />,
    title: "Sports & Fitness",
    path: "?category=sports",
  },
  {
    icon: <GrWorkshop />,
    title: "Seminars, Workshops and Conferences",
    path: "?category=seminars",
  },
  {
    icon: <FaMusic />,
    title: "Concerts and Music",
    path: "?category=concerts",
  },
  {
    icon: <MdOutlineHealthAndSafety />,
    title: "Health and Wellness",
    path: "?category=health",
  },
];
