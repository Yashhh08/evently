"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { Button } from "../ui/button";
import { Autoplay } from "swiper/modules";

const SwiperComponent = () => {
  return (
    <Swiper
      modules={[Autoplay]}
      className="border h-[500px] max-sm:h-auto"
      spaceBetween={100}
      slidesPerView={1}
      centeredSlides={true}
      autoplay={{
        delay: 3000,
      }}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>
        <div className="flex justify-around items-center w-full h-full p-10 max-sm:flex-col max-sm:p-0 max-sm:gap-3">
          <div className="flex flex-col text-center gap-8 w-[550px] max-sm:w-auto max-sm:gap-3">
            <h1 className="text-5xl font-bold max-sm:text-3xl">
              Host, Connect, Celebrate: Your Events, Our Platform!
            </h1>
            <h2 className="text-xl font-medium max-sm:text-lg">
              Book and learn helpful tips from 3,168+ mentors in world-class
              companies with our global community.
            </h2>
            <div>
              <Button className="w-fit">Explore Now</Button>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <Image
              src="/images/hero.png"
              alt="hero"
              width={350}
              height={0}
              className="max-sm:p-2 rounded-sm max-sm:w-[220px]"
            />
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="flex justify-around items-center w-full h-full p-10 max-sm:flex-col max-sm:p-0 max-sm:gap-3">
          <div className="flex flex-col text-center gap-8 w-[550px] max-sm:w-auto max-sm:gap-3">
            <h1 className="text-5xl font-bold max-sm:text-3xl">
              Unleash the Night: A Celebration Like No Other
            </h1>
            <h2 className="text-xl font-medium max-sm:text-lg">
              Get ready for a night that defies the ordinary and embraces the
              extraordinary!
            </h2>
            <div>
              <Button className="w-fit">Explore Now</Button>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <Image
              src="/images/party.jpg"
              alt="party"
              width={700}
              height={0}
              className="max-sm:p-2 rounded-sm"
            />
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="flex justify-around items-center w-full h-full p-10 max-sm:flex-col max-sm:p-0 max-sm:gap-3">
          <div className="flex flex-col text-center gap-8 w-[550px] max-sm:w-auto max-sm:gap-3">
            <h1 className="text-5xl font-bold max-sm:text-3xl">
              Elevate Your Business: A Networking Extravaganza
            </h1>
            <h2 className="text-xl font-medium max-sm:text-lg">
              Join us for an exclusive business event where opportunities
              unfold, ideas converge and connections flourish.
            </h2>
            <div>
              <Button className="w-fit">Explore Now</Button>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <Image
              src="/images/business.jpg"
              alt="business"
              width={700}
              height={0}
              className="max-sm:p-2 rounded-sm"
            />
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="flex justify-around items-center w-full h-full p-10 max-sm:flex-col max-sm:p-0 max-sm:gap-3">
          <div className="flex flex-col text-center gap-8 w-[550px] max-sm:w-auto max-sm:gap-3">
            <h1 className="text-5xl font-bold max-sm:text-3xl">
              Savor the Moment: A Culinary Journey Awaits
            </h1>
            <h2 className="text-xl font-medium max-sm:text-lg">
              Join us for an exquisite food and drink event where flavors blend,
              aromas enchant and every bite is a celebration of culinary
              mastery.
            </h2>
            <div>
              <Button className="w-fit">Explore Now</Button>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <Image
              src="/images/food.jpg"
              alt="food"
              width={700}
              height={0}
              className="max-sm:p-2 rounded-sm"
            />
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="flex justify-around items-center w-full h-full p-10 max-sm:flex-col max-sm:p-0 max-sm:gap-3">
          <div className="flex flex-col text-center gap-8 w-[550px] max-sm:w-auto max-sm:gap-3">
            <h1 className="text-5xl font-bold max-sm:text-3xl">
              Passion Unleashed: Explore, Create, Connect
            </h1>
            <h2 className="text-xl font-medium max-sm:text-lg">
              Dive into a world of creativity, exploration and shared passions.
              Join us for a hobby event where enthusiasts come together to
              celebrate the things they love.
            </h2>
            <div>
              <Button className="w-fit">Explore Now</Button>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <Image
              src="/images/hobby.jpg"
              alt="hobby"
              width={700}
              height={0}
              className="max-sm:p-2 rounded-sm"
            />
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="flex justify-around items-center w-full h-full p-10 max-sm:flex-col max-sm:p-0 max-sm:gap-3">
          <div className="flex flex-col text-center gap-8 w-[550px] max-sm:w-auto max-sm:gap-3">
            <h1 className="text-5xl font-bold max-sm:text-3xl">
              Harmony in Expression: A Fusion of Performing & Visual Arts
            </h1>
            <h2 className="text-xl font-medium max-sm:text-lg">
              From mesmerizing performances to captivating exhibitions, this is
              your canvas to explore, create and appreciate the beauty of
              artistic expression.
            </h2>
            <div>
              <Button className="w-fit">Explore Now</Button>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <Image
              src="/images/play.jpg"
              alt="play"
              width={700}
              height={0}
              className="max-sm:p-2 rounded-sm"
            />
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default SwiperComponent;
