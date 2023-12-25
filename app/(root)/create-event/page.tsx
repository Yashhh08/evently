import EventForm from "@/components/shared/EventForm";
import { getUserByClerkId, getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import React from "react";

const Page = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await getUserByClerkId(userId);

  return (
    <>
      <EventForm userId={user._id} type="create" />
    </>
  );
};

export default Page;
