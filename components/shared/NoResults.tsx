import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

interface Props {
  title: string;
  desc: string;
  link?: string;
  linkTitle?: string;
}

const NoResults = (props: Props) => {
  return (
    <div className="flex flex-col justify-center items-center gap-5 mt-10 mb-10 text-center">
      <Image
        src={"/images/no-results.png"}
        alt="noResults"
        height={120}
        width={120}
        className="invert-0 dark:invert"
      />
      {/* <Image
        src={"/assets/images/dark-illustration.png"}
        alt="noResults"
        height={200}
        width={200}
        className="hidden dark:block"
      /> */}

      <h2 className="text-2xl font-bold">{props.title}</h2>

      <p className="max-w-md">{props.desc}</p>

      {props.link && props.linkTitle && (
        <Link href={props.link}>
          <Button>{props.linkTitle}</Button>
        </Link>
      )}
    </div>
  );
};

export default NoResults;
