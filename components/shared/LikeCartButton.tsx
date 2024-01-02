"use client";

import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { MdOutlineDoNotDisturbOn, MdOutlineShoppingCart } from "react-icons/md";
import { useToast } from "../ui/use-toast";
import { likeEvent } from "@/lib/actions/user.action";
import { Button } from "../ui/button";
import { loadStripe } from "@stripe/stripe-js";
import { checkoutOrder } from "@/lib/actions/order.action";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
interface Props {
  event: any;
  user: any;
  likedEvent: boolean;
  option?: string;
}

const LikeCartButton = ({ event, user, likedEvent, option }: Props) => {
  const { toast } = useToast();

  const disableCart =
    new Date(event.startDate) < new Date() || event.soldOut || event.ticketsLeft
      ? event.ticketsLeft <= 0
      : false;

  const [totalTickets, setTotalTickets] = useState(1);

  const maxTickets = event.ticketsLeft;

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);

  const handleCheckout = async () => {
    try {
      if (!user) {
        toast({
          variant: "destructive",
          title: "You must be logged in to book event.",
        });
        return;
      }

      const order = {
        totalTickets: totalTickets,
        totalAmount: event.price,
        user: user,
        event: event,
      };

      await checkoutOrder(order);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: error.message,
      });
    }
  };

  const handleLike = async () => {
    try {
      if (!user) {
        toast({
          variant: "destructive",
          title: "You must be logged in to like an event.",
        });
        return;
      }

      likedEvent = await user.likedEvents.includes(event._id);

      await likeEvent(event._id, user._id);

      if (likedEvent) {
        toast({
          title: "Event removed from Liked Events.",
        });
      } else {
        toast({
          title: "Event added to Liked Events.",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: error.message,
      });
    }
  };

  return (
    <>
      {option === "eventPage" ? (
        <>
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => handleLike()}
              variant={"secondary"}
              className="flex gap-1 rounded-full hover:scale-105 transition-all"
            >
              {!likedEvent && (
                <span>
                  <FaRegHeart className="h-5 w-5 text-primary" />
                </span>
              )}
              {likedEvent && (
                <span>
                  <FaHeart className="h-5 w-5 text-primary" />
                </span>
              )}
              Like
            </Button>
            {!disableCart && (
              <Dialog>
                <DialogTrigger>
                  <Button
                    // onClick={() => handleCheckout()}
                    variant={"secondary"}
                    className="flex gap-1 rounded-full hover:scale-105 transition-all"
                  >
                    <MdOutlineShoppingCart className="h-5 w-5 text-primary" />
                    Book Now
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Number of Tickets</DialogTitle>
                    <DialogDescription>
                      <div className="flex max-sm:flex-col justify-center items-center gap-5 mt-1">
                        <span className="text-primary text-2xl font-bold">
                          ₹{event.price * totalTickets}
                        </span>
                        <Input
                          type="number"
                          min={1}
                          max={maxTickets}
                          value={totalTickets}
                          onChange={(e) => setTotalTickets(+e.target.value)}
                        />
                        <Button onClick={() => handleCheckout()}>Book</Button>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            )}
            {disableCart && (
              <Button
                variant={"destructive"}
                disabled
                className="flex gap-1 rounded-full hover:scale-105 transition-all"
              >
                <MdOutlineDoNotDisturbOn className="h-5 w-5 text-primary" />
                Sold Out
              </Button>
            )}
          </div>
        </>
      ) : (
        <div className="absolute bottom-1/2 right-1 flex justify-center items-center">
          <div className="border bg-secondary rounded-full m-1 h-7 w-7 flex justify-center items-center hover:scale-125">
            {!likedEvent && (
              <span onClick={() => handleLike()}>
                <FaRegHeart className="h-full w-full p-1 text-primary" />
              </span>
            )}
            {likedEvent && (
              <span onClick={() => handleLike()}>
                <FaHeart className="h-full w-full p-1 text-primary" />
              </span>
            )}
          </div>
          {!disableCart && (
            // <div className="border bg-secondary rounded-full m-1 h-7 w-7 flex justify-center items-center hover:scale-125">
            //   <span onClick={() => handleCheckout()}>
            //     <MdOutlineShoppingCart className="h-full w-full p-1 text-primary" />
            //   </span>
            // </div>
            <Dialog>
              <DialogTrigger>
                <div className="border bg-secondary rounded-full m-1 h-7 w-7 flex justify-center items-center hover:scale-125">
                  <span>
                    <MdOutlineShoppingCart className="h-full w-full p-1 text-primary" />
                  </span>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Number of Tickets</DialogTitle>
                  <DialogDescription>
                    <div className="flex max-sm:flex-col justify-center items-center gap-5 mt-1">
                      <span className="text-primary text-2xl font-bold">
                        ₹{event.price * totalTickets}
                      </span>
                      <Input
                        type="number"
                        min={1}
                        max={maxTickets}
                        value={totalTickets}
                        onChange={(e) => setTotalTickets(+e.target.value)}
                      />
                      <Button onClick={() => handleCheckout()}>Book</Button>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          )}
        </div>
      )}
    </>
  );
};

export default LikeCartButton;
