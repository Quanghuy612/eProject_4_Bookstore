"use client";
import { usePopularProductsQuery } from "@/services/product/get-all-popular-products";
import SectionHeader from "@/components/common/section-header";
import ProductCardLoader from "@/components/shared/loaders/product-card-loader";
import { LIMITS } from "@/services/utils/limits";
import Alert from "@/components/shared/alert";
import Image from "@/components/shared/image";
import Carousel from "@/components/shared/carousel/carousel";
import { SwiperSlide } from "@/components/shared/carousel/slider";
import React from "react";
import Countdown, { zeroPad } from "react-countdown";
import ClockIcon from "@/components/icons/clock-icon";
import cn from "classnames";
import useWindowSize from "@/utils/use-window-size";
import ProductBestDealsCard from "@/components/product/cards/best-deal-card";
import { usePanel } from "@/contexts/usePanel";
import { colorMap } from "@/data/color-settings";

interface ProductFeedProps {
  className?: string;
  uniqueKey?: string;
  showBanner?: boolean;
  variant?: string;
}

let breakpoints = {};
let spaceBetween = 6;
const backgroundThumbnail = "/assets/images/banner/home1/hotdeals.png";

const BestDealsFeed: React.FC<ProductFeedProps> = ({
  className = "",
  uniqueKey,
  showBanner = true,
  variant,
}) => {
  const limit = LIMITS.POPULAR_PRODUCTS_TWO_LIMITS;
  const { data, isLoading, error } = usePopularProductsQuery({
    limit: limit,
  });

  if (showBanner) {
    breakpoints = {
      "1280": {
        slidesPerView: 4,
      },
      "1024": {
        slidesPerView: 3,
      },
      "640": {
        slidesPerView: 3,
      },
      "0": {
        slidesPerView: 2,
      },
    };
  } else {
    breakpoints = {
      "1536": {
        slidesPerView: 6,
      },
      "1280": {
        slidesPerView: 5,
      },
      "1024": {
        slidesPerView: 4,
      },
      "640": {
        slidesPerView: 3,
      },
      "360": {
        slidesPerView: 2,
      },
      "0": {
        slidesPerView: 1,
      },
    };
  }

  if (variant == "outBorder-xl") {
    breakpoints = {
      "1536": {
        slidesPerView: 7,
      },
      "1280": {
        slidesPerView: 5,
      },
      "1024": {
        slidesPerView: 4,
      },
      "640": {
        slidesPerView: 3,
      },
      "360": {
        slidesPerView: 2,
      },
      "0": {
        slidesPerView: 1,
      },
    };
  }
  const { width } = useWindowSize();
  if (variant == "outBorder") spaceBetween = 10;
  if (variant == "outBorder-xl") {
    width! < 1536 ? (spaceBetween = 10) : (spaceBetween = 20);
  }
  const { selectedColor } = usePanel();
  const rendererCountdown = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: any) => {
    if (completed) {
      return null;
    } else {
      return (
        <div className="flex text-[14px] font-semibold gap-2">
          <span
            className={`flex items-center justify-center min-w-[40px] md:min-w-[45px] min-h-[30px] md:min-h-[30px] text-brand-light rounded p-1 ${colorMap[selectedColor].bg}`}
          >
            {zeroPad(days)}
          </span>
          <span
            className={`flex items-center justify-center min-w-[40px] md:min-w-[45px] min-h-[30px] md:min-h-[30px] text-brand-light rounded p-1 ${colorMap[selectedColor].bg}`}
          >
            {zeroPad(hours)}
          </span>
          <span
            className={`flex items-center justify-center min-w-[40px] md:min-w-[45px] min-h-[30px] md:min-h-[30px] text-brand-light rounded p-1 ${colorMap[selectedColor].bg}`}
          >
            {zeroPad(minutes)}
          </span>
          <span
            className={`flex items-center justify-center min-w-[40px] md:min-w-[45px] min-h-[30px] md:min-h-[30px] text-brand-light rounded p-1 ${colorMap[selectedColor].bg}`}
          >
            {zeroPad(seconds)}
          </span>
        </div>
      );
    }
  };

  return (
    <div className={`mb-12 lg:mb-15 ${className}`}>
      <div
        className={cn(
          "md:flex justify-between mb-1.5  py-2.5 rounded ",
          showBanner && "bg-white px-5",
        )}
      >
        <div className="flex items-center gap-2">
          <ClockIcon opacity="1" />
          <SectionHeader
            headingPosition="hotdeal"
            sectionHeading="HOT DEALS!"
            sectionSubHeading="GET OUR BEST PRICES"
            className="flex gap-2 items-center uppercase"
          />
        </div>

        <div className="flex items-center gap-2">
          <h2 className="text-skin-base  text-[14px]">
            {" "}
            Hurry Up! Offer ends in:
          </h2>
          <Countdown
            date={Date.now() + 4000000 * 60}
            intervalDelay={1000}
            renderer={rendererCountdown}
          />
        </div>
      </div>
      {error ? (
        <Alert message={error?.message} className="col-span-full" />
      ) : (
        <div className="xl:flex gap-1 relative heightFull">
          {showBanner && (
            <div
              className={`xl:max-w-[466px] relative overflow-hidden flex items-center`}
            >
              <Image
                src={backgroundThumbnail}
                alt={"Product Image"}
                width={465}
                height={395}
              />
            </div>
          )}

          <div
            className={cn(
              showBanner ? "trendy-main-content" : "main-content w-full",
            )}
          >
            <Carousel
              breakpoints={breakpoints}
              spaceBetween={spaceBetween}
              prevActivateId={`prevBestdeals`}
              nextActivateId={`nextBestdeals`}
            >
              {(isLoading && !data) || data == undefined ? (
                Array.from({ length: limit! }).map((_, idx) => (
                  <SwiperSlide key={`bestdeals-${idx}`}>
                    <div className={"p-2 w-56 h-full rounded bg-white"}>
                      <ProductCardLoader
                        key={`bestdeals-${idx}`}
                        uniqueKey={`bestdeals-${idx}`}
                      />
                    </div>
                  </SwiperSlide>
                ))
              ) : (
                <>
                  {data?.slice(0, limit).map((product: any, idx) => (
                    <SwiperSlide key={`${uniqueKey}-${idx}`}>
                      <ProductBestDealsCard
                        variant={variant}
                        key={`best-product-${product.id}`}
                        product={product}
                        date={Date.now() + 4000000 * 60}
                      />
                    </SwiperSlide>
                  ))}
                </>
              )}
            </Carousel>
          </div>
        </div>
      )}
    </div>
  );
};

export default BestDealsFeed;
