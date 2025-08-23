"use client";

import ProductsCarousel from "@/components/product/feeds/products-carousel";
import { useBestSellerProductsQuery } from "@/services/product/get-all-best-seller-products";
import { LIMITS } from "@/services/utils/limits";
import { FC } from "react";
interface Props {
  className?: string;
  variant?: string;
}
const BestSellerFeed: FC<Props> = ({ className, variant }) => {
  const {
    data: Product = [],
    isLoading,
    error,
  } = useBestSellerProductsQuery({
    limit: LIMITS.BEST_SELLER_PRODUCTS_LIMITS,
  });

  return (
    <ProductsCarousel
      sectionHeading="Best Products"
      products={Product}
      loading={isLoading}
      limit={LIMITS.BEST_SELLER_PRODUCTS_LIMITS}
      uniqueKey="best-sellers"
      variant={variant}
      className={className}
    />
  );
};
export default BestSellerFeed;
