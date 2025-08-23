"use client";

import React, { useState } from "react";
import TopBar from "@/components/category/top-bar";
import HorizontalFilter from "@/components/filter/horizontal-filter";
import DrawerFilter from "@/components/category/drawer-filter";
import { LIMITS } from "@/services/utils/limits";
import { useMoreProductsQuery } from "@/services/product/get-all-more-products";
import { ProductGrid } from "@/components/product/product-grid";
import { usePathname } from "next/navigation";
import useQueryParam from "@/utils/use-query-params";

export default function PageContent() {
  const [viewAs, setViewAs] = useState(Boolean(true));
  const pathname = usePathname();
  const { getParams, query } = useQueryParam(pathname ?? "/");
  const newQuery: { sort_by?: string } = getParams(
    `${process.env.NEXT_PUBLIC_WEBSITE_URL}${query}`,
  );

  // Get category query parameters
  const limit = LIMITS.PRODUCTS_LIMITS;
  const {
    isFetching: isLoading,
    isFetchingNextPage: loadingMore,
    fetchNextPage,
    hasNextPage,
    data,
  } = useMoreProductsQuery({
    limit: limit,
    sort_by: newQuery.sort_by,
  });

  return (
    <div className=" products-category">
      <div className="hidden lg:block mb-1.5 ">
        <HorizontalFilter />
      </div>
      <div className="w-full">
        <DrawerFilter />
        <TopBar viewAs={viewAs} setViewAs={setViewAs} />
        <ProductGrid
          data={data}
          isLoading={isLoading}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          loadingMore={loadingMore}
          viewAs={viewAs}
        />
      </div>
    </div>
  );
}
