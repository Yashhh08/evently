import EventCards from "@/components/shared/EventCards";
import LikeCartButton from "@/components/shared/LikeCartButton";
import NoResults from "@/components/shared/NoResults";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getEventById, getRelatedEvents } from "@/lib/actions/event.action";
import { getUserByClerkId } from "@/lib/actions/user.action";
import { dateConverter, timeFormatConverter } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";

export interface IEvent {
  title: string;
  description: string;
  photo: string;
  isOnline?: boolean;
  location?: string;
  landmark?: string;
  startDate: Date;
  endDate: Date;
  startTime: Date;
  endTime: Date;
  duration?: number;
  isMultipleDays: boolean;
  totalCapacity: number;
  availableTickets: number;
  dailyCapacity?: number;
  dailyAvailableTickets?: number;
  isFree: boolean;
  price?: number;
  category: string;
  tags?: string[];
  organizer: string;
  attendees?: string[];
  ageRestriction?: number;
  url?: string;
}

interface Props {
  params: { id: string };
}

const Page = async ({ params }: Props) => {
  const { userId } = auth();

  let user = null;
  let likedEvent = null;

  // if (!userId) {
  //   redirect("/sign-in");
  // }

  if (userId) {
    user = await getUserByClerkId(userId);

    likedEvent = await user.likedEvents.includes(params.id);
  }

  const event = await getEventById(params.id);

  const relatedEvents = await getRelatedEvents(params.id);

  return (
    <div className="font-medium md:mx-24">
      <div className="rounded-md md:h-[500px] flex justify-center items-center">
        <Image
          src={event.photo}
          alt={event.title}
          width={1920}
          height={1800}
          priority={true}
          className="rounded-md w-full h-full object-contain"
        />
      </div>
      <div className="flex flex-col gap-5">
        <h2 className="text-4xl max-sm:text-2xl mt-3">{event.title}</h2>

        <div className="flex max-sm:flex-wrap justify-left max-sm:justify-betwee items-center gap-3">
          <Badge className="text-base">
            {event.isFree ? `Free` : `₹ ${event.price}`}
          </Badge>
          <Badge className="text-base" variant={"secondary"}>
            {event.category.name}
          </Badge>
          <Badge
            className="text-base"
            variant={"secondary"}
          >{`By ${event.organizer?.firstName} ${event.organizer?.lastName}`}</Badge>
        </div>

        {/* <div className="flex flex-wrap gap-3">
          <Button
            variant={"secondary"}
            className="flex gap-1 rounded-full hover:scale-105 transition-all"
          >
            {!likedEvent && <FaRegHeart className="h-5 w-5 text-primary" />}
            {likedEvent && <FaHeart className="h-full w-full text-primary" />}
            Like
          </Button>
          <Button
            variant={"secondary"}
            className="flex gap-1 rounded-full hover:scale-105 transition-all"
          >
            <MdOutlineShoppingCart className="h-5 w-5 text-primary" />
            Book Now
          </Button>
        </div> */}

        <LikeCartButton
          event={event}
          user={user}
          likedEvent={likedEvent}
          option="eventPage"
        />

        <div className="flex flex-wrap gap-3">
          <div>
            {new Date(event.endDate) > new Date(event.startDate)
              ? `${dateConverter(event.startDate)} - ${dateConverter(
                  event.endDate
                )}`
              : `${dateConverter(event.startDate)}`}
          </div>
          &nbsp;
          <div>
            {timeFormatConverter(event.startTime)} -{" "}
            {timeFormatConverter(event.endTime)}
          </div>
        </div>

        <div>{event.isOnline ? "Online Event" : `${event.location}`}</div>

        <div>{event.description}</div>

        <Link href={event.url} className="text-blue-700 ">
          {event.url}
        </Link>

        <div className="flex flex-wrap gap-3">
          {event.tags?.map((tag: any) => {
            return (
              <Badge key={tag.name} variant={"secondary"} className="">
                {tag.name}
              </Badge>
            );
          })}
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-4xl max-sm:text-2xl mt-3 text-center bg-gradient-to-r from-violet-600 to-primary bg-clip-text text-transparent font-bold">
          Related Events
        </h2>
        <br />
        {relatedEvents.length > 0 ? (
          <EventCards events={relatedEvents} />
        ) : (
          <NoResults
            title={"No Related Events Found"}
            desc={""}
            link={"/#categories"}
            linkTitle={"Explore Events"}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
