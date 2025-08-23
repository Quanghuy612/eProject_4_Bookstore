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

interface Props {
  product: Product;
  removeCompare: (id: number) => void;
}

const CompareCardDrawer: React.FC<Props> = ({ product, removeCompare }) => {
  const { id, name, image, slug, product_type } = product ?? {};

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

  const { selectedColor } = usePanel();

  return (
    <div className="bg-gray-100 rounded-lg group flex items-center  gap-4 p-4 relative">
      <div
        onClick={() => removeCompare(id as number)}
        className="absolute rounded p-3 top-0 right-0 z-10 cursor-pointer "
      >
        <CloseIcon className="w-4 h-4" />
      </div>
      <div className="c-product-item__img">
        <Image
          src={image?.thumbnail ?? productPlaceholder}
          width={80}
          height={80}
          alt={name || "Product Image"}
        />
      </div>
      <div className=" w-full pr-5">
        <p className={`w-full`}>
          <Link
            href={`${ROUTES.PRODUCTS}/${slug}`}
            className="text-brand-dark  text-sm leading-5 min-h-[40px] line-clamp-2 mb-1"
          >
            {name}
          </Link>
        </p>

        <div className="space-s-2 ">
          <span
            className={cn(
              colorMap[selectedColor].text,
              "inline-block font-semibold text-base",
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
      </div>
    </div>
  );
};

export default CompareCardDrawer;
