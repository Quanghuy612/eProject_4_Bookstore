"use client";

import cn from "classnames";
import { useRef } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { getDirection } from "@/utils/get-direction";
import {
  Autoplay,
  Grid,
  Navigation,
  Pagination,
  Swiper,
} from "@/components/shared/carousel/slider";
import "swiper/css/autoplay";
import "swiper/css/grid";
import "swiper/css/pagination";
import { usePanel } from "@/contexts/usePanel";
import { colorMap } from "@/data/color-settings";

type CarouselPropsType = {
  className?: string;
  buttonGroupClassName?: string;
  prevActivateId?: string;
  nextActivateId?: string;
  prevButtonClassName?: string;
  nextButtonClassName?: string;
  buttonSize?: "default" | "small";
  centeredSlides?: boolean;
  loop?: boolean;
  slidesPerColumn?: number;
  breakpoints?: object | any;
  spaceBetween?: number;
  navigation?: boolean;
  pagination?: {};
  autoplay?: object | any;
  grid?: object;
};

export default function Carousel({
  children,
  className = "",
  buttonGroupClassName = "",
  prevActivateId = "",
  nextActivateId = "",
  prevButtonClassName = " start-3 xl:start-5 ",
  nextButtonClassName = " end-3 xl:end-5",
  buttonSize = "default",
  breakpoints,
  navigation = true,
  pagination = false,
  loop = false,
  spaceBetween = 10,
  grid,
  autoplay,
  ...props
}: React.PropsWithChildren<CarouselPropsType>) {
  const dir = getDirection("en");
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const { selectedColor } = usePanel();
  const nextButtonClasses = cn(
    "swiper-next w-8 h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 text-base lg:text-lg xl:text-xl cursor-pointer flex items-center justify-center rounded-full bg-brand-light absolute transition duration-300  hover:text-brand-light focus:outline-none transform drop-shadow-navigation",
    { "3xl:text-2xl": buttonSize === "default" },
    colorMap[selectedColor].hoverBg,
    nextButtonClassName,
  );
  const prevButtonClasses = cn(
    "swiper-prev w-8 h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 text-base lg:text-lg xl:text-xl cursor-pointer flex items-center justify-center rounded-full bg-brand-light absolute transition duration-300 hover:text-brand-light focus:outline-none transform drop-shadow-navigation",
    { "3xl:text-2xl": buttonSize === "default" },
    colorMap[selectedColor].hoverBg,
    prevButtonClassName,
  );

  return (
    <div
      className={`carouselWrapper relative ${className} ${
        pagination ? "dotsCircle" : "dotsCircleNone"
      }`}
    >
      <Swiper
        modules={[Navigation, Autoplay, Pagination, Grid]}
        autoplay={autoplay}
        breakpoints={breakpoints}
        spaceBetween={spaceBetween}
        dir={dir}
        pagination={
          pagination
            ? {
                clickable: true,
                bulletClass: `swiper-pagination-bullet`,
                bulletActiveClass: `swiper-pagination-bullet-active ${colorMap[selectedColor].bg}`,
              }
            : false
        }
        grid={grid}
        navigation={
          navigation
            ? {
                prevEl: prevActivateId.length
                  ? `#${prevActivateId}`
                  : prevRef.current!, // Assert non-null
                nextEl: nextActivateId.length
                  ? `#${nextActivateId}`
                  : nextRef.current!, // Assert non-null
              }
            : {}
        }
        /*onBeforeInit={(swiper) => {
				  swiper.params.navigation.prevEl = prevActivateId.length ? `#${prevActivateId}`: prevRef.current!;
				  swiper.params.navigation.nextEl = nextActivateId.length ? `#${nextActivateId}` : nextRef.current!;
				}}*/
        {...props}
      >
        {children}
      </Swiper>
      {Boolean(navigation) && (
        <div
          className={`flex items-center w-full absolute  z-10  ${
            buttonGroupClassName ? buttonGroupClassName : "top-2/4"
          }`}
        >
          {prevActivateId.length > 0 ? (
            <div className={prevButtonClasses} id={prevActivateId}>
              {dir === "rtl" ? <IoIosArrowForward /> : <IoIosArrowBack />}
            </div>
          ) : (
            <div ref={prevRef} className={prevButtonClasses}>
              {dir === "rtl" ? <IoIosArrowForward /> : <IoIosArrowBack />}
            </div>
          )}

          {nextActivateId.length > 0 ? (
            <div className={nextButtonClasses} id={nextActivateId}>
              {dir === "rtl" ? <IoIosArrowBack /> : <IoIosArrowForward />}
            </div>
          ) : (
            <div ref={nextRef} className={nextButtonClasses}>
              {dir === "rtl" ? <IoIosArrowBack /> : <IoIosArrowForward />}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
