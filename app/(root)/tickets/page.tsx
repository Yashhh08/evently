import NoResults from "@/components/shared/NoResults";
import OrderCards from "@/components/shared/OrderCards";
import { getOrdersByUserId } from "@/lib/actions/order.action";
import { getUserByClerkId } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await getUserByClerkId(userId);

  const events = await getOrdersByUserId(user._id);

  const upcomingEvents = events.filter((event: any) => {
    return new Date(event.event.startDate) > new Date();
  });

  const pastEvents = events.filter((event: any) => {
    return new Date(event.event.startDate) < new Date();
  });

  return (
    <div className="flex flex-col gap-10">
      <h3 className="text-3xl max-sm:text-xl font-bold text-center bg-gradient-to-r from-violet-600 to-primary bg-clip-text text-transparent">
        Upcoming Events
      </h3>
      {upcomingEvents.length > 0 ? (
        <OrderCards events={upcomingEvents} />
      ) : (
        <NoResults
          title={"You have no upcoming events"}
          desc={""}
          link={"/#categories"}
          linkTitle={"Explore Events"}
        />
      )}
      <h3 className="text-3xl max-sm:text-xl font-bold text-center bg-gradient-to-r from-violet-600 to-primary bg-clip-text text-transparent">
        Past Events
      </h3>
      {pastEvents.length > 0 ? (
        <OrderCards events={pastEvents} />
      ) : (
        <NoResults
          title={"You don't have any past events"}
          desc={""}
          // link={"/#categories"}
          // linkTitle={"Explore Events"}
        />
      )}
    </div>
  );
};

export default Page;
