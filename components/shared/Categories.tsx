import { categories } from "@/constants/categories";
import Link from "next/link";
import React from "react";

const Categories = () => {
  return (
    <div
      id="categories"
      className="flex overflow-x-auto justify-between items-start text-center gap-10 max-sm:gap-5 mb-16"
    >
      {categories.map((item) => {
        return (
          <Link
            href={item.path}
            key={item.title}
            scroll={false}
            className="flex flex-col justify-center items-center gap-4 max-sm:gap-2 hover:text-primary md:hover:scale-95 transition-all max-md:text-primary"
          >
            <div className="max-md:h-12 max-md:w-12 h-16 w-16 border flex justify-center items-center rounded-full">
              <div className="md:scale-150">{item.icon}</div>
            </div>
            <div className="font-medium">{item.title}</div>
          </Link>
        );
      })}
    </div>
  );
};

export default Categories;
