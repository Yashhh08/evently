import React from "react";
import EventCard from "./EventCard";
import { getEvents } from "@/lib/actions/event.action";

interface Event {
  _id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  date: string;
  landmark: string;
  price: string;
  organizer: string;
}

const events = [
  {
    _id: "1",
    title:
      "Event 1 asd fawe fawef awef awefwae fasfa ewf wasefawefaw egaweg aewga ewfgaw",
    description:
      "Description 1 asdfaf qaf weafawegfaew fweag arrg aewrg awegaewf aew fawef awegawgf aewfawg aergaer gaergaergaer gwrta gaerg aerg aerghaergaerga ergae aer gaergarewga ergaer g",
    category: "Category 1",
    image:
      "https://images.pexels.com/photos/2608512/pexels-photo-2608512.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    date: "Date 1",
    landmark: "landmark 1",
    address: "Address 1",
    price: "Price 1",
    organizer: "Organizer 1",
  },
  {
    _id: "2",
    title: "Event 2",
    description: "Description 2",
    category: "Category 2",
    image:
      "https://images.pexels.com/photos/2608512/pexels-photo-2608512.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    date: "Date 2",
    landmark: "landmark 2",
    address: "Address 1",
    price: "Price 2",
    organizer: "Organizer 2",
  },
  {
    _id: "3",
    title: "Event 3",
    description: "Description 3",
    category: "Category 3",
    image:
      "https://images.pexels.com/photos/2608512/pexels-photo-2608512.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    date: "Date 3",
    landmark: "landmark 3",
    address: "Address 1",
    price: "Price 3",
    organizer: "Organizer 3",
  },
  {
    _id: "4",
    title: "Event 4",
    description: "Description 4",
    category: "Category 4",
    image:
      "https://images.pexels.com/photos/2608512/pexels-photo-2608512.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    date: "Date 4",
    landmark: "landmark 4",
    address: "Address 1",
    price: "Price 4",
    organizer: "Organizer 4",
  },
  {
    _id: "5",
    title: "Event 5",
    description: "Description 5",
    category: "Category 5",
    image:
      "https://images.pexels.com/photos/2608512/pexels-photo-2608512.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    date: "Date 5",
    landmark: "landmark 5",
    address: "Address 1",
    price: "Price 5",
    organizer: "Organizer 5",
  },
  {
    _id: "6",
    title: "Event 6",
    description: "Description 6",
    category: "Category 6",
    image:
      "https://images.pexels.com/photos/2608512/pexels-photo-2608512.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    date: "Date 6",
    landmark: "landmark 6",
    address: "Address 1",
    price: "Price 6",
    organizer: "Organizer 6",
  },
];

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
