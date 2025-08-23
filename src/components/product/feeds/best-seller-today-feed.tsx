"use client";

import { usePopularProductsQuery } from "@/services/product/get-all-popular-products";
import SectionHeader from "@/components/common/section-header";
import ProductCard from "@/components/product/cards/product-card";
import ProductCardLoader from "@/components/shared/loaders/product-card-loader";
import { LIMITS } from "@/services/utils/limits";
import Alert from "@/components/shared/alert";
import ProductSellerToday from "@/components/product/cards/product-seller-today";
import cn from "classnames";
import Carousel from "@/components/shared/carousel/carousel";
import { SwiperSlide } from "swiper/react";
import useWindowSize from "@/utils/use-window-size";
import { usePanel } from "@/contexts/usePanel";
import { colorMap } from "@/data/color-settings";
interface BestSellerProps {
  className?: string;
}

const options = {
  slidesPerView: 2,
  spaceBetween: 1,
  grid: {
    rows: 2,
    fill: "row",
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
      grid: {
        rows: 2,
      },
    },
    1024: {
      slidesPerView: 2,
      grid: {
        rows: 2,
      },
    },
  },
};

export default function BestSellerTodayFeed({ className }: BestSellerProps) {
  const { width } = useWindowSize();
  const limit = 8;
  const { data, isLoading, error } = usePopularProductsQuery({
    limit: limit,
  });
  const { selectedColor } = usePanel();
  return (
    <div className={cn("mb-8 lg:mb-15", className)}>
      <div className="grid grid-cols-1 gap-y-6 md:gap-5 md:grid-cols-2 xl:grid-cols-12 lg:gap-5 ">
        <div
          className={cn(
            "md:top-16 lg:top-20 xl:col-span-4  mb-3 md:mb-0 bg-white  rounded border-2 ",
            colorMap[selectedColor].border,
          )}
        >
          <SectionHeader
            sectionHeading="Today’s Offer"
            className={
              "mt-3 md:mt-5 mx-5 pb-3 uppercase font-semibold border-b border-black/10"
            }
          />
          <ProductSellerToday
            product={data?.[0]!}
            date={Date.now() + 4000000 * 60}
          />
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-px  xl:col-span-8 xl:bg-border-base rounded border border-border-base overflow-hidden">
          {error ? (
            <Alert message={error?.message} className="col-span-full" />
          ) : width! < 1280 ? (
            <Carousel {...options}>
              {isLoading
                ? Array.from({ length: limit! }).map((_, idx) => (
                    <SwiperSlide key={`popular-product-${idx}`}>
                      <ProductCardLoader uniqueKey={`popular-product-${idx}`} />
                    </SwiperSlide>
                  ))
                : data?.slice(1, 9)?.map((product: any) => (
                    <SwiperSlide key={`popular-product-${product.id}`}>
                      <ProductCard product={product} />
                    </SwiperSlide>
                  ))}
            </Carousel>
          ) : isLoading ? (
            Array.from({ length: limit! }).map((_, idx) => (
              <ProductCardLoader
                key={`popular-product-${idx}`}
                uniqueKey={`popular-product-${idx}`}
              />
            ))
          ) : (
            data
              ?.slice(1, 9)
              ?.map((product: any) => (
                <ProductCard
                  product={product}
                  key={`bestseller-product-${product.id}`}
                  variant={"outBorder"}
                />
              ))
          )}
        </div>
      </div>
    </div>
  );
}
