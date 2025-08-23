import SectionHeader from "@/components/common/section-header";
import { Product } from "@/services/types";
import Carousel from "@/components/shared/carousel/carousel";
import { SwiperSlide } from "@/components/shared/carousel/slider";
import ProductCardLoader from "@/components/shared/loaders/product-card-loader";
import cn from "classnames";
import ProductCardFurni from "@/components/product/cards/product-card-furni";
import ProductCard from "@/components/product/cards/product-card";
import ProductCardHorizontal from "@/components/product/cards/product-card-horizontal";
import React from "react";
import ProductCardBorder from "@/components/product/cards/product-card-border";
import useWindowSize from "@/utils/use-window-size";

interface ProductsCarouselProps {
  sectionHeading?: string;
  className?: string;
  products: Product[];
  loading: boolean;
  limit?: number;
  uniqueKey?: string;
  carouselBreakpoint?: {} | any;
  rowCarousel?: number;
  variant?: string;
}
let spaceBetween = 6;
let breakpoints = {
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

const ProductsCarousel: React.FC<ProductsCarouselProps> = ({
  sectionHeading,
  className = "",
  products,
  loading,
  limit,
  uniqueKey,
  carouselBreakpoint,
  variant = "default",
  rowCarousel = 1,
}) => {
  const { width } = useWindowSize();
  if (variant == "outBorder") spaceBetween = 10;
  if (variant == "outBorder-xl") {
    width! < 1536 ? (spaceBetween = 10) : (spaceBetween = 20);
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
  return (
    <div className={cn("heightFull relative", className)}>
      {sectionHeading && (
        <>
          {(() => {
            switch (variant) {
              case "furniture":
                return (
                  <SectionHeader
                    sectionHeading={sectionHeading}
                    sectionSubHeading="The best quality products are waiting for you & choose it now."
                    headingPosition={"center"}
                  />
                );
              case "furniture2":
                return (
                  <SectionHeader
                    sectionHeading={sectionHeading}
                    sectionSubHeading="The best quality products are waiting for you & choose it now."
                    headingPosition={"center-xl"}
                  />
                );
              case "noHeading":
                break;
              default:
                return (
                  <SectionHeader
                    sectionHeading={sectionHeading}
                    className={cn("py-2.5 uppercase", {
                      "mb-1.5 rounded bg-white px-5": variant === "default",
                    })}
                  />
                );
            }
          })()}
        </>
      )}

      <div
        className={cn("heightFull", {
          "border border-black/10 rounded-md overflow-hidden":
            variant === "boxBorder",
        })}
      >
        <Carousel
          spaceBetween={spaceBetween}
          grid={{ rows: rowCarousel, fill: "row" }}
          breakpoints={carouselBreakpoint || breakpoints}
          prevActivateId={`prev${uniqueKey}`}
          nextActivateId={`next${uniqueKey}`}
        >
          {loading ? (
            Array.from({ length: limit! }).map((_, idx) => (
              <SwiperSlide key={`${uniqueKey}-${idx}`}>
                <div className={"p-2 w-56 h-full rounded bg-white"}>
                  <ProductCardLoader uniqueKey={`${uniqueKey}-${idx}`} />
                </div>
              </SwiperSlide>
            ))
          ) : (
            <>
              {products?.map((product: any, idx) => (
                <SwiperSlide key={`${uniqueKey}-${idx}`} className="">
                  {(() => {
                    switch (variant) {
                      case "horizontal":
                        return (
                          <ProductCardHorizontal
                            key={`${uniqueKey}-${product.id}`}
                            product={product}
                          />
                        );
                      case "furniture":
                      case "furniture2":
                        return (
                          <ProductCardFurni
                            key={`${uniqueKey}-${product.id}`}
                            product={product}
                          />
                        );
                      case "outBorder-xl":
                      case "outBorder":
                        return (
                          <ProductCardBorder
                            key={`${uniqueKey}-${product.id}`}
                            product={product}
                            variant={variant}
                          />
                        );
                      default:
                        return (
                          <ProductCard
                            key={`${uniqueKey}-${product.id}`}
                            product={product}
                            variant={variant}
                          />
                        );
                    }
                  })()}
                </SwiperSlide>
              ))}
            </>
          )}
        </Carousel>
      </div>
    </div>
  );
};

export default ProductsCarousel;
