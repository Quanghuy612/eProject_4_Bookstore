"use client";

import type { FC } from "react";
import ProductsCarousel from "@/components/product/feeds/products-carousel";
import { LIMITS } from "@/services/utils/limits";
import { useTrendingProductsQuery } from "@/services/product/get-all-trending-products";

interface ProductFeedProps {
  className?: string;
  variant?: string;
}

const TrendingFeed: FC<ProductFeedProps> = ({ className, variant }) => {
  const limit = LIMITS.POPULAR_PRODUCTS_LIMITS;
  const { data, isLoading } = useTrendingProductsQuery({
    limit: limit,
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
      sectionHeading="Popular Products"
      className={className}
      products={data ?? []}
      loading={isLoading}
      limit={limit}
      uniqueKey="popular-product"
      variant={variant}
      carouselBreakpoint={breakpoints}
    />
  );
};

export default TrendingFeed;
