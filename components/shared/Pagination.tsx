"use client";

import React from "react";
import { Button } from "../ui/button";
import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  page: number;
  totalPages: number;
}

const Pagination = (props: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handlePagination = (value: string) => {
    const nextPageNumber = value === "prev" ? props.page - 1 : props.page + 1;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: nextPageNumber.toString(),
    });

    router.push(newUrl, { scroll: false });
  };

  if (props.totalPages <= 1 && props.page === 1) {
    return null;
  }

  return (
    <div className="flex justify-center items-center mt-10 gap-5">
      <Button
        disabled={props.page === 1}
        size={"sm"}
        onClick={() => handlePagination("prev")}
      >
        Prev
      </Button>
      <Button size={"sm"} variant={"secondary"}>
        {props.page}
      </Button>
      <Button
        disabled={props.page >= props.totalPages}
        size={"sm"}
        onClick={() => handlePagination("next")}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
