"use client";
import { LIMITS } from "@/services/utils/limits";
import SupperCategoryList from "@/components/product/suppercategory/suppercategory-list";
import SupperCategoryContainer from "@/components/product/suppercategory/suppercategory-container";
import BannerGrid from "@/components/banner/banner-grid";
import { homeSupperCategory4 } from "@/components/banner/data";
import React from "react";
import { useBestSellerProductsQuery } from "@/services/product/get-all-best-seller-products";
import cn from "classnames";

interface CategoriesProps {
  className?: string;
  rowCarousel?: number;
  showBanner?: boolean;
  showCategoryList?: boolean;
}

const SuppercategoryHeadphones: React.FC<CategoriesProps> = ({
  className = "",
  rowCarousel = 1,
  showBanner = true,
}) => {
  const category = {
    name: "Cellphones & Tablets",
    slug: "cellphones-tablets",
  };
  const { data: products, isLoading } = useBestSellerProductsQuery({
    limit: LIMITS.ELETRONIC_PRODUCTS_LIMITS,
  });

  return (
    <div className={cn("mb-8 lg:mb-15", className)}>
      <SupperCategoryList className={`supper-category--list`} data={category} />
      <div className="xl:flex w-full gap-1.5">
        {showBanner && (
          <BannerGrid
            data={homeSupperCategory4}
            grid={1}
            className="hidden xl:flex staticBanner--slider "
          />
        )}
        <div
          className={`${showBanner ? "banner-main-content" : "popular-main-content"} grow`}
        >
          <SupperCategoryContainer
            uniqueKey={"supper-headphone"}
            data={products}
            isLoading={isLoading}
            rowCarousel={rowCarousel}
            showBanner={showBanner}
          />
        </div>
      </div>
    </div>
  );
};
export default SuppercategoryHeadphones;
