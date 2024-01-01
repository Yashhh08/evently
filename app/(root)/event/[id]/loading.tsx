import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col gap-2 h-screen">
      <Skeleton className="h-5" />
      <Skeleton className="h-5 w-1/2" />
      <Skeleton className="h-5" />
      <br />
      <Skeleton className="h-5 w-1/2" />
      <Skeleton className="h-72 w-full" />
      <Skeleton className="h-5 w-1/2" />
      <br />
      <Skeleton className="h-5" />
      <Skeleton className="h-5 w-1/2" />
      <Skeleton className="h-5" />
      <br />
      <Skeleton className="h-32" />
    </div>
  );
};

export default Loading;
