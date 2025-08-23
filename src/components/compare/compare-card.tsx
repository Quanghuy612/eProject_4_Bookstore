"use client";
import React from "react";
import Image from "@/components/shared/image";
import CloseIcon from "../icons/close-icon";
import { Product } from "@/services/types";
import { ROUTES } from "@/utils/routes";
import { productPlaceholder } from "@/assets/placeholders";
import cn from "classnames";
import { colorMap } from "@/data/color-settings";
import usePrice from "@/services/product/use-price";
import { usePanel } from "@/contexts/usePanel";
import Link from "@/components/shared/link";
import { Check, Trash, X } from "lucide-react";
import StarIcon from "@/components/icons/star-icon";
import Button from "../shared/button";
import AddToCart from "../product/add-to-cart";
import { useCart } from "@/contexts/cart/cartContext";

interface Props {
  product: any;
  removeCompare: (id: number) => void;
}

const CompareCard: React.FC<Props> = ({ product, removeCompare }) => {
  const { name, image, slug, product_type } = product ?? {};

  // Function to get the display price
  const { price, basePrice } = usePrice({
    amount: product?.sale_price ? product?.sale_price : product?.price,
    baseAmount: product?.price,
    currencyCode: "USD",
  });
  const { price: minPrice } = usePrice({
    amount: product?.min_price ?? 0,
    currencyCode: "USD",
  });
  const { price: maxPrice } = usePrice({
    amount: product?.max_price ?? 0,
    currencyCode: "USD",
  });

  function RenderAddToCart({ props }: { props: any }) {
    const { data }: any = props;
    const { id, quantity, product_type, slug } = data ?? {};
    const { isInCart, isInStock } = useCart();
    const outOfStock = isInCart(id) && !isInStock(id);

    if (Number(quantity) < 1 || outOfStock) {
      return true;
    }
    if (product_type === "variable") {
      return (
        <Link
          variant={"button-detail"}
          href={`${ROUTES.PRODUCTS}/${slug}`}
          className={"lg:min-w-[200px]"}
        >
          Choose Options
        </Link>
      );
    }
    return <AddToCart data={data} variant="mercury" />;
  }

  // Function to check if product is in stock
  const isInStock = () => {
    if (product?.quantity > 0) return true;
    if (product.variation_options && product.variation_options.length > 0) {
      return product.variation_options.some(
        (v: any) => Number.parseInt(v.quantity) > 0,
      );
    }
    return false;
  };

  // Get storage options if available
  const getStorageOptions = () => {
    if (
      product.variations?.some(
        (v: any) => v.attribute.slug === "memory-storage",
      )
    ) {
      return product.variations
        .filter((v: any) => v.attribute.slug === "memory-storage")
        .map((v: any) => v.value)
        .join(", ");
    }
    return "-";
  };

  const { selectedColor } = usePanel();

  return (
    <div className=" overflow-hidden bg-white rounded-md">
      <div className="relative">
        <Button
          variant="border"
          className="absolute top-3 right-3 z-10 xs:p-2  xs:h-9 xs:rounded-full xs:border-0  hover:bg-gray-200 !text-brand-dark"
          onClick={() => removeCompare(product.id)}
        >
          <X size={20} strokeWidth={2} />
          <span className="sr-only">Remove from comparison</span>
        </Button>

        <div className="relative card-img-container overflow-hidden flex item-center w-full">
          <Image
            src={image?.thumbnail ?? productPlaceholder}
            alt={name || "Product Image"}
            width={380}
            height={380}
          />
        </div>
      </div>
      <div className="px-4 md:px-6 pb-4  text-center justify-items-center w-full">
        <RenderAddToCart props={{ data: product }} />
      </div>

      <div className="px-4 md:px-6 pb-6">
        <Link
          href={`${ROUTES.PRODUCTS}/${slug}`}
          className="text-brand-dark font-semibold text-sm md:text-lg leading-6 min-h-[40px] line-clamp-2 mt-1 mb-2"
        >
          {name}
        </Link>

        <div className="flex w-full  gap-2 mt-2">
          <span
            className={cn(
              colorMap[selectedColor].text,
              "inline-block font-semibold text-lg",
            )}
          >
            {product_type === "variable" ? `${minPrice} - ${maxPrice}` : price}
          </span>
          {basePrice && (
            <del className="mx-1  text-gray-400 text-opacity-70">
              {basePrice}
            </del>
          )}
        </div>

        <div className="mt-4 space-y-4 text-sm">
          <div className="flex gap-2 ">
            <span className="font-medium md:min-w-24">Availability:</span>
            <div className="flex items-center gap-1">
              {isInStock() ? (
                <>
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-green-600">In Stock</span>
                </>
              ) : (
                <>
                  <X className="h-4 w-4 text-red-500" />
                  <span className="text-red-600">Out of Stock</span>
                </>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <span className="font-medium md:min-w-24">Brand:</span>
            <span>{product.brand || product.unit || "-"}</span>
          </div>

          {product.model && (
            <div className="flex gap-2">
              <span className="font-medium md:min-w-24">Model:</span>
              <span>{product.model}</span>
            </div>
          )}

          {product.operating && (
            <div className="flex gap-2">
              <span className="font-medium md:min-w-24">OS:</span>
              <span>{product?.operating}</span>
            </div>
          )}

          {product.screen && (
            <div className="flex gap-2">
              <span className="font-medium md:min-w-24">Screen:</span>
              <span>{product.screen}</span>
            </div>
          )}

          <div className="flex gap-2">
            <span className="font-medium md:min-w-24">Storage:</span>
            <span>{getStorageOptions()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareCard;
