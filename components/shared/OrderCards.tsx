import React from "react";
import OrderCard from "./OrderCard";

interface Props {
  events: any;
}

const OrderCards = ({ events }: Props) => {
  return (
    <div className="flex justify-evenly items-center gap-10 flex-wrap">
      {events.map((event: any) => {
        return <OrderCard key={event._id} event={event} />;
      })}
    </div>
  );
};

export default OrderCards;
