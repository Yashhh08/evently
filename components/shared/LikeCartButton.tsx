"use client";

import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useToast } from "../ui/use-toast";
import { likeEvent } from "@/lib/actions/user.action";
import { Button } from "../ui/button";

interface Props {
  event: any;
  user: any;
  likedEvent: boolean;
  option?: string;
}

const LikeCartButton = ({ event, user, likedEvent, option }: Props) => {
  const { toast } = useToast();

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
            <Button
              variant={"secondary"}
              className="flex gap-1 rounded-full hover:scale-105 transition-all"
            >
              <MdOutlineShoppingCart className="h-5 w-5 text-primary" />
              Book Now
            </Button>
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
          <div className="border bg-secondary rounded-full m-1 h-7 w-7 flex justify-center items-center hover:scale-125">
            <MdOutlineShoppingCart className="h-full w-full p-1 text-primary" />
          </div>{" "}
        </div>
      )}
    </>
  );
};

export default LikeCartButton;
