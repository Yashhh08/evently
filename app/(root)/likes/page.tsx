import EventCard from "@/components/shared/EventCard";
import NoResults from "@/components/shared/NoResults";
import { getLikedEvents, getUserByClerkId } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await getUserByClerkId(userId);

  const likedEvents = await getLikedEvents(user._id);

  return (
    <div>
      <h1 className="text-4xl max-sm:text-2xl font-bold text-center bg-gradient-to-r from-violet-600 to-primary bg-clip-text text-transparent mb-5">
        Liked Events
      </h1>
      <div className="flex justify-evenly items-center gap-10 flex-wrap">
        {likedEvents.length > 0 ? (
          likedEvents.map((event: any) => {
            return <EventCard key={event._id} event={event} />;
          })
        ) : (
          <NoResults
            title="No Liked Events"
            desc="You haven't liked any events yet."
          />
        )}
      </div>
    </div>
  );
};

export default Page;
