import Image from "next/image";
import React from "react";
import { Badge } from "../ui/badge";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";

interface Event {
  _id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  date: string;
  location: string;
  address: string;
  price: string;
  organizer: string;
}

interface Props {
  event: Event;
}

const EventCard = ({ event }: Props) => {
  const like = false;

  return (
    <div className="border h-96 w-96 rounded-md flex flex-col hover:scale-105 transition-all shadow-md relative">
      <Image
        src={event.image}
        alt={event._id}
        width={1920}
        height={1280}
        className="w-full h-1/2 rounded-md hover:opacity-80 transition-all relative"
      />
      <div className="absolute bottom-1/2 right-1 flex justify-center items-center">
        <div className="border bg-secondary rounded-full m-1 h-7 w-7 flex justify-center items-center hover:scale-125">
          {!like && <FaRegHeart className="h-full w-full p-1 text-primary" />}
          {like && <FaHeart className="h-full w-full p-1 text-primary" />}
        </div>
        <div className="border bg-secondary rounded-full m-1 h-7 w-7 flex justify-center items-center hover:scale-125">
          <MdOutlineShoppingCart className="h-full w-full p-1 text-primary" />
        </div>
      </div>
      <div className="p-2 flex flex-col items-start gap-1 flex-1 font-medium">
        <div className="flex gap-2">
          <Badge variant="default">{event.price}</Badge>
          <Badge variant="secondary">{event.category}</Badge>
          <Badge variant="secondary">{event.location}</Badge>
        </div>
        <div className="flex flex-col justify-around flex-1">
          <p className="">{event.date}</p>
          <h3 className="text-xl font-semibold line-clamp-2">{event.title}</h3>
          <p className="font-normal text-xs line-clamp-2">
            {event.description}
          </p>
        </div>
      </div>
      <p className="m p-2">{event.organizer}</p>
    </div>
  );
};

export default EventCard;
