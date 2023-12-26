import React from "react";
import EventCard from "./EventCard";
import { getEvents } from "@/lib/actions/event.action";

const EventCards = async () => {
  const events = await getEvents();

  return (
    <div className="flex justify-evenly items-center gap-10 flex-wrap">
      {events.map((event: any) => {
        return <EventCard key={event._id} event={event} />;
      })}
    </div>
  );
};

export default EventCards;
