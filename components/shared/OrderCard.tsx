import Image from "next/image";
import React from "react";
import { Badge } from "../ui/badge";
import { dateConverter, timeFormatConverter } from "@/lib/utils";
import Link from "next/link";
import LikeCartButton from "./LikeCartButton";

interface Props {
  event: any;
}

const OrderCard = ({ event }: Props) => {
  return (
    <div className="border h-96 w-96 rounded-md flex flex-col hover:scale-95 transition-all shadow-md relative">
      <Link href={`/event/${event.event._id}`} className="w-full h-1/2">
        <Image
          src={event.event.photo}
          alt={event.event._id}
          width={1920}
          height={1280}
          className="w-full h-full rounded-md hover:opacity-80 transition-all relative"
        />
      </Link>
      <Link
        href={`/event/${event.event._id}`}
        className="p-2 flex flex-col items-start gap-1 flex-1 font-medium"
      >
        <div className="w-full flex flex-wrap gap-2 justify-start items-center">
          <Badge variant="default">₹ {event.totalAmount}</Badge>
          <Badge variant="secondary">{`Tickets : ${event.totalTickets}`}</Badge>
          <Badge variant="secondary">
            {event.event.landmark ? event.event.landmark : "Online"}
          </Badge>
        </div>
        <div className="flex flex-col justify-around flex-1">
          <div className="flex flex-wrap gap-1">
            <p className="text-sm">
              {new Date(event.event.endDate) > new Date(event.event.startDate)
                ? `${dateConverter(event.event.startDate)} - ${dateConverter(
                    event.event.endDate
                  )} `
                : `${dateConverter(event.event.startDate)}`}
            </p>
            &nbsp;
            <p className="text-sm">
              {timeFormatConverter(event.event.startTime)} -{" "}
              {timeFormatConverter(event.event.endTime)}
            </p>
          </div>
          <h3 className="text-xl font-semibold">{event.event.title}</h3>
        </div>
      </Link>
      <Badge
        variant={"secondary"}
        className="m-1 w-fit"
      >{`${event.event.organizer.firstName} ${event.event.organizer.lastName}`}</Badge>
    </div>
  );
};

export default OrderCard;
