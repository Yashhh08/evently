import EventCards from "@/components/shared/EventCards";
import NoResults from "@/components/shared/NoResults";
import { Button } from "@/components/ui/button";
import { getEventsByUserId } from "@/lib/actions/event.action";
import { getUserByClerkId } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await getUserByClerkId(userId);

  const events = await getEventsByUserId(user._id);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex max-sm:flex-col justify-between max-sm:items-center">
        <h1 className="text-4xl max-sm:text-2xl font-bold  bg-gradient-to-r from-violet-600 to-primary bg-clip-text text-transparent mb-5">
          Events Organized by You
        </h1>
        <Link href="/create-event">
          <Button className="w-fit">Create Event</Button>
        </Link>
      </div>
      {events.length > 0 ? (
        <EventCards events={events} page="profile" />
      ) : (
        <NoResults
          title={"You have not created any events yet."}
          desc={"create your first event now!"}
          // link={"/#categories"}
          // linkTitle={"Explore Events"}
        />
      )}
    </div>
  );
};

export default Page;
