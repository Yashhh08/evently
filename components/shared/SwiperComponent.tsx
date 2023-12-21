"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { Button } from "../ui/button";
import { Autoplay } from "swiper/modules";
import { swiperContent } from "../../constants/swiperContent";

const SwiperComponent = () => {
  return (
    <Swiper
      modules={[Autoplay]}
      className="h-[500px] max-sm:h-auto mb-16"
      spaceBetween={100}
      slidesPerView={1}
      centeredSlides={true}
      autoplay={{
        delay: 3000,
      }}
      // onSlideChange={() => console.log("slide change")}
      // onSwiper={(swiper) => console.log(swiper)}
    >
      {swiperContent.map((content) => {
        return (
          <SwiperSlide>
            <div className="flex justify-around items-center w-full h-full p-10 max-sm:flex-col max-sm:p-0 max-sm:gap-3">
              <div className="flex flex-col text-center gap-8 w-[550px] max-sm:w-auto max-sm:gap-3">
                <h1 className="text-5xl font-bold max-sm:text-3xl bg-gradient-to-br from-violet-600 to-primary bg-clip-text text-transparent">
                  {content.heading}
                </h1>
                <h2 className="text-xl font-bold max-sm:text-lg bg-gradient-to-br from-primary to-gray-500 bg-clip-text text-transparent">
                  {content.description}
                </h2>
                <div>
                  <Button className="w-fit">Explore Now</Button>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src={content.imageUrl}
                  alt={content.alt}
                  width={content.alt === "hero" ? 350 : 700}
                  height={0}
                  className={`max-sm:p-2 rounded-sm ${
                    content.alt === "hero" ? "max-sm:w-[220px]" : ""
                  }`}
                />
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default SwiperComponent;
