import React from "react";
import EventCard from "./EventCard";

interface Props {
  events: any;
}

const EventCards = async ({ events }: Props) => {
  return (
    <div className="flex justify-evenly items-center gap-10 flex-wrap">
      {events.map((event: any) => {
        return <EventCard key={event._id} event={event} />;
      })}
    </div>
  );
};

export default EventCards;
