import { MdNightlife } from "react-icons/md";
import { MdAddBusiness } from "react-icons/md";
import { IoFastFood } from "react-icons/io5";
import { IoGameController } from "react-icons/io5";
import { FaMasksTheater } from "react-icons/fa6";

interface Category {
  icon: JSX.Element;
  title: string;
  path: string;
}

export const categories: Category[] = [
  {
    icon: <MdNightlife />,
    title: "Nightlife",
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
    icon: <FaMasksTheater />,
    title: "Performing & Visual Arts",
    path: "/",
  },
];
