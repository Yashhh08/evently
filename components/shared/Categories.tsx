import { categories } from "@/constants/categories";
import Link from "next/link";
import React from "react";

const Categories = () => {
  return (
    <div className="flex justify-center items-start text-center gap-10 max-sm:overflow-scroll">
      {categories.map((item) => {
        return (
          <Link
            href={item.path}
            key={item.title}
            className="flex flex-col justify-center items-center gap-4 w-32 hover:text-primary hover:scale-105"
          >
            <div className="h-12 w-12 scale-150 max-sm:scale-100 border flex justify-center items-center rounded-full">
              {item.icon}
            </div>
            <div className="font-medium">{item.title}</div>
          </Link>
        );
      })}
    </div>
  );
};

export default Categories;
