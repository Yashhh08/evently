import { HomeIcon, PersonIcon } from "@radix-ui/react-icons";
import { CgProfile } from "react-icons/cg";
import { FaRegHeart } from "react-icons/fa";
import { TfiTicket } from "react-icons/tfi";

interface SidebarLink {
  image: JSX.Element;
  label: string;
  path: string;
}

export const sidebarLinks: SidebarLink[] = [
  {
    image: <HomeIcon />,
    label: "Home",
    path: "/",
  },
  {
    image: <PersonIcon />,
    label: "Create Event",
    path: "/create-event",
  },
  {
    image: <FaRegHeart />,
    label: "Likes",
    path: "/likes",
  },
  {
    image: <TfiTicket />,
    label: "Tickets",
    path: "/tickets",
  },
  {
    image: <CgProfile />,
    label: "Profile",
    path: "/profile",
  },
];
