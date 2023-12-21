"use client";

import { Input } from "@/components/ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface customTypes {
  route: string;
  placeholder: string;
  otherClasses: string;
}

const SearchBar = ({ route, placeholder, otherClasses }: customTypes) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const query = searchParams.get("q");

  const [search, setSearch] = useState(query || "");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "q",
          value: search,
        });

        router.push(newUrl, { scroll: false });
      } else {
        if (pathname === route) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ["q"],
          });

          router.push(newUrl, { scroll: false });
        }
      }
    }, 700);

    return () => clearTimeout(delayDebounceFn);
  }, [query, search, searchParams, router, pathname, route]);

  return (
    <div
      className={`w-auto h-10 p-4 ml-1 rounded-[10px] border bg-slate-50 border-slate-300 flex justify-center items-center gap-2.5 dark:bg-gradient-to-b from-gray-900 to-zinc-900 dark:border-slate-800 max-sm:w-52 max-sm:ml-2 max-sm:h-5 ${otherClasses}`}
    >
      <Image
        src="/images/search.svg"
        alt="search"
        height={24}
        width={24}
        className="cursor-pointer max-sm:h-4 max-sm:w-4"
      />
      <Input
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-transparent text-slate-900 dark:text-slate-300 text-base font-normal border-none max-sm:text-xs truncate focus:outline-none"
      />
    </div>
  );
};

export default SearchBar;
