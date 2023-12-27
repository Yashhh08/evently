import Image from "next/image";
import React from "react";
import { Badge } from "../ui/badge";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { dateConverter, timeFormatConverter } from "@/lib/utils";
import Link from "next/link";

interface Props {
  event: any;
}

const EventCard = ({ event }: Props) => {
  const like = false;

  return (
    <Link
      href={`/event/${event._id}`}
      className="border h-96 w-96 rounded-md flex flex-col hover:scale-105 transition-all shadow-md relative"
    >
      <Image
        src={event.photo}
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
        <div className="w-full flex flex-wrap gap-2 justify-start items-center">
          <Badge variant="default">
            {event.isFree ? "Free" : `$ ${event.price}`}
          </Badge>
          <Badge variant="secondary">{event.category.name}</Badge>
          <Badge variant="secondary">
            {event.landmark ? event.landmark : "Online"}
          </Badge>
        </div>
        <div className="flex flex-col justify-around flex-1">
          <div className="flex flex-wrap gap-1">
            <p className="text-sm">
              {new Date(event.endDate) > new Date(event.startDate)
                ? `${dateConverter(event.startDate)} - ${dateConverter(
                    event.endDate
                  )} `
                : `${dateConverter(event.startDate)}`}
            </p>
            &nbsp;
            <p className="text-sm">
              {timeFormatConverter(event.startTime)} -{" "}
              {timeFormatConverter(event.endTime)}
            </p>
          </div>
          <h3 className="text-xl font-semibold line-clamp-1">{event.title}</h3>
          <p className="font-normal text-xs line-clamp-2">
            {event.description}
          </p>
        </div>
      </div>
      <Badge
        variant={"secondary"}
        className="m-1 w-fit"
      >{`${event.organizer.firstName} ${event.organizer.lastName}`}</Badge>
    </Link>
  );
};

export default EventCard;
