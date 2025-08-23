"use client";

import type { FC } from "react";
import { usePopularProductsQuery } from "@/services/product/get-all-popular-products";
import ProductsCarousel from "@/components/product/feeds/products-carousel";
import { LIMITS } from "@/services/utils/limits";

interface ProductFeedProps {
  className?: string;
  variant?: string;
}

const PopularFeed: FC<ProductFeedProps> = ({ className, variant }) => {
  const limit = LIMITS.POPULAR_PRODUCTS_LIMITS;
  const { data, isLoading } = usePopularProductsQuery({
    limit: limit,
  });
  return (
    <ProductsCarousel
      sectionHeading="Popular products"
      className={className}
      products={data ?? []}
      loading={isLoading}
      limit={limit}
      uniqueKey="popular-product"
      variant={variant}
    />
  );
};

export default PopularFeed;
