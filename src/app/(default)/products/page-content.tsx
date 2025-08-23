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
    <>
      <Element name="category" className="xl:flex flex-row-reverse">
        <div className="xl:sticky z-40  lg:block h-full shrink-0 top-16 w-full  xl:w-[36%] ">
          <ProductView
            data={data}
            className={"mb-8 lg:mb-10 bg-white p-5 md:p-8 rounded "}
          />
        </div>
        <div className="w-full  xl:w-[64%] xl:pe-8  xl:mb-0 mb-8">
          <ProductGallery
            data={data}
            className={"mb-8 lg:mb-10 bg-white p-5 md:p-8 rounded"}
          />
          <ProductDetailsTab />
        </div>
      </Element>

      <RelatedProductSlider />
    </>
  );
}
