"use client";
import React, { useState } from "react";
import { Element } from "react-scroll";
import { useSearchQuery } from "@/services/product/use-search";
import { useSearchParams } from "next/navigation";
import DrawerFilter from "@/components/category/drawer-filter";
import TopBar from "@/components/category/top-bar";
import Filters from "@/components/filter/filters";
import Heading from "@/components/shared/heading";
import { ProductGridPagination } from "@/components/product/product-grid-pagination";

export default function PageContent() {
  const [viewAs, setViewAs] = useState(Boolean(true));
  // Get search and category query parameters
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("q") || "";
  const { data: searchResults, isLoading } = useSearchQuery({
    text: searchTerm,
  });

  return (
    <Element name="category" className="flex products-category">
      <div className="sticky hidden lg:block h-full shrink-0 ltr:pr-7 rtl:pl-7   w-[300px] top-16 ">
        <Filters />
      </div>
      <div className="w-full">
        <div className="sm:flex items-center justify-center mb-3 filters-panel bg-white rounded p-2 xl:p-4 text-center">
          <Heading
            variant={"titleMedium"}
          >{`${searchResults?.length ?? ""} results for "${searchTerm}"`}</Heading>
        </div>
        <DrawerFilter />
        <TopBar viewAs={viewAs} setViewAs={setViewAs} />
        <ProductGridPagination
          data={searchResults}
          isLoading={isLoading}
          viewAs={viewAs}
        />
      </div>
    </Element>
  );
}
