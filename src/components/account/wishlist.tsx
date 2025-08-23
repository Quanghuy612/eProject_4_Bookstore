"use client";

import { useWishlist } from "@/contexts/useWishlist";
import ProductCard from "@/components/product/cards/product-card";
import React from "react";
import { useIsMounted } from "@/utils/use-is-mounted";

export default function Wishlist() {
  const { wishlistList, removeFromWishlist } = useWishlist();
  const mounted = useIsMounted();
  return (
    <>
      <h2 className="text-base md:text-lg  font-semibold text-brand-dark  lg:pt-0">
        List of saved products
      </h2>
      <div className=" pt-8 ">
        {mounted ? (
          wishlistList.length === 0 ? (
            <p>No products in the Wishlist list.</p>
          ) : (
            <div
              className={
                "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-1.5 md:gap-5"
              }
            >
              {wishlistList.map((product) => (
                <ProductCard
                  key={`wishlistList-${product.id}`}
                  product={product}
                  removeWishlist={removeFromWishlist}
                />
              ))}
            </div>
          )
        ) : null}
      </div>
    </>
  );
}
