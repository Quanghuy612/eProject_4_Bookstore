"use client";
import type { FC } from "react";

import { useThisWeekProductsQuery } from "@/services/product/get-all-this-week-products";
import ProductsCarousel from "@/components/product/feeds/products-carousel";
import { LIMITS } from "@/services/utils/limits";

interface ProductFeedProps {
  className?: string;
  variant?: string;
}

const BestProductFeed: FC<ProductFeedProps> = ({ className, variant }) => {
  const {
    data: Product = [],
    isLoading,
    error,
  } = useThisWeekProductsQuery({
    limit: LIMITS.BEST_SELLER_PRODUCTS_LIMITS,
  });

  const breakpoints = {
    "1280": {
      slidesPerView: 4,
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

  return (
    <ProductsCarousel
      sectionHeading="Our Best Products"
      products={Product}
      loading={isLoading}
      limit={LIMITS.BEST_SELLER_PRODUCTS_LIMITS}
      uniqueKey="best-sellers"
      className={className}
      carouselBreakpoint={breakpoints}
      variant={variant}
      rowCarousel={2}
    />
  );
};
export default BestProductFeed;
