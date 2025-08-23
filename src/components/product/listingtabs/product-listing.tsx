"use client";
import ProductsCarousel from "@/components/product/feeds/products-carousel";

interface Props {
  data: any;
  isLoading: boolean;
  error?: string | null;
  variant: string;
}
const ProductListing: React.FC<Props> = ({ data, isLoading, variant }) => {
  let breakpoints = {};
  let rowCarousel = 1;

  if (variant === "horizontal") {
    rowCarousel = 2;
    breakpoints = {
      "1536": {
        slidesPerView: 3,
      },
      "1280": {
        slidesPerView: 3,
      },
      "1024": {
        slidesPerView: 3,
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
  } else if (variant == "outBorder-xl") {
    rowCarousel = 1;
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
  } else {
    rowCarousel = 1;
    breakpoints = {
      "1536": {
        slidesPerView: 6,
      },
      "1280": {
        slidesPerView: 5,
      },
      "1024": {
        slidesPerView: 3,
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
    <ProductsCarousel
      sectionHeading=""
      products={data}
      loading={isLoading}
      uniqueKey="electronic"
      variant={variant}
      rowCarousel={rowCarousel}
      carouselBreakpoint={breakpoints}
    />
  );
};
export default ProductListing;
