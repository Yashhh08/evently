"use client";

import React from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "../ui/use-toast";
import { deleteEventById } from "@/lib/actions/event.action";

const DeleteEventButton = ({ event }: any) => {
  const handleDeleteEvent = async (eventId: string) => {
    try {
      const event = await deleteEventById(eventId);

      if (event) {
        toast({
          title: "Event deleted successfully.",
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
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          size={"sm"}
          className="m-1 h-fit hover:scale-95 p-1"
        >
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription className="flex flex-col gap-1 max-sm:items-center">
            <p>This action cannot be undone.</p>
            <p>This will permanently delete the event and all related data.</p>
            <p>
              Make sure to refund tickets of all customers, otherwise legal
              actions will be taken.
            </p>
            <Button
              variant="destructive"
              className="hover:scale-95 w-fit"
              onClick={() => handleDeleteEvent(event._id)}
            >
              Delete Event
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteEventButton;
