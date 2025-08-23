"use client";
import React from "react";
import { Element } from "react-scroll";
import { useParams } from "next/navigation";

import ProductDetailsTab from "@/components/product/product-details/product-tab";
import RelatedProductSlider from "@/components/product/feeds/related-product-feed";
import { useProductQuery } from "@/services/product/get-product";
import ProductGallery from "@/components/product/product-details/product-gallery";
import ProductView from "@/components/product/product-details/product-view";
import cn from "classnames";
import { colorMap } from "@/data/color-settings";
import { usePanel } from "@/contexts/usePanel";

export default function PageContent() {
  const pathname = useParams();
  const { slug } = pathname;
  const { data, isLoading } = useProductQuery(slug as string);
  const { selectedColor } = usePanel();

  if (isLoading)
    return (
      <div
        className={
          "flex justify-center items-center min-h-[650px] bg-white rounded"
        }
      >
        <div
          className={cn(
            "animate-spin rounded-full h-12 w-12 border-4 border-t-transparent",
            colorMap[selectedColor].border,
          )}
        ></div>
      </div>
    );

  return (
    <Element name="category" className=" products-category">
      <div className="w-full">
        <div className="grid-cols-10 lg:grid gap-7 2xl:gap-7 mb-8 lg:mb-10 bg-white p-5 md:p-8 rounded">
          <ProductGallery data={data} className={"col-span-5 "} />
          <ProductView data={data} className={"col-span-5 "} />
        </div>
        <ProductDetailsTab />
        <RelatedProductSlider />
      </div>
    </Element>
  );
}
