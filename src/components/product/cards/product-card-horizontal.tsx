import cn from "classnames";
import Image from "@/components/shared/image";
import usePrice from "@/services/product/use-price";
import { Product } from "@/services/types";
import { useModalAction } from "@/components/common/modal/modalContext";
import { useCart } from "@/contexts/cart/cartContext";

import { productPlaceholder } from "@/assets/placeholders";
import dynamic from "next/dynamic";
import { ROUTES } from "@/utils/routes";
import Link from "@/components/shared/link";
import CheckIcon from "@/components/icons/check-icon";
import StarIcon from "@/components/icons/star-icon";
import { colorMap } from "@/data/color-settings";
import { usePanel } from "@/contexts/usePanel";
import SearchIcon from "@/components/icons/search-icon";

interface ProductProps {
  product: Product;
  className?: string;
}

function RenderLabelStock({ props }: { props: any }) {
  const { data }: any = props;
  // console.log(variant);
  const { id, quantity } = data ?? {};
  const { isInCart, isInStock } = useCart();
  const outOfStock = isInCart(id) && !isInStock(id);

  if (Number(quantity) < 1 || outOfStock) {
    return (
      <p className="font-medium flex items-center space-x-1 text-[12px] ">
        <CheckIcon fill={"text-skin-label_in"} opacity="1" />
        <span> Out Stock </span>
      </p>
    );
  }
  return (
    <p className="font-medium flex items-center space-x-1 text-[12px] ">
      <CheckIcon fill={"text-skin-label_in"} opacity="1" />
      <span> In Stock </span>
    </p>
  );
}
const ProductCardHorizontal: React.FC<ProductProps> = ({
  product,
  className,
}) => {
  const { id, name, image, unit, quantity, slug, product_type } = product ?? {};
  const { openModal } = useModalAction();
  const { isInCart, isInStock } = useCart();
  const outOfStock = isInCart(id) && !isInStock(id);
  const { price, basePrice, discount } = usePrice({
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
  function handlePopupView() {
    openModal("PRODUCT_VIEW", product);
  }

  const { selectedColor } = usePanel();

  return (
    <article
      className={cn(
        "flex flex-col xl:flex-row items-center  gap-2 product-card relative  p-2 sm:p-4  h-full rounded bg-white",
        className,
        Number(quantity) < 1 || outOfStock
          ? "card-image--nojump"
          : "card-image--jump",
      )}
      title={name}
    >
      <div className="relative flex-shrink-0 product-card-img">
        <div className="card-img-container overflow-hidden flex items-center ">
          <Image
            src={image?.thumbnail ?? productPlaceholder}
            alt={name || "Product Image"}
            width={180}
            height={180}
          />
        </div>
        <div className="w-full h-full absolute top-0  z-10">
          {discount && (
            <span className="text-[10px] font-medium text-brand-light uppercase inline-block bg-red-600 rounded-sm px-2.5 pt-1 pb-[3px] mx-0.5 sm:mx-1">
              On Sale
            </span>
          )}

          <button
            className={cn(
              colorMap[selectedColor].hoverBg,
              "buttons--quickview px-4 py-2 bg-brand-light rounded-full hover:text-brand-light",
            )}
            aria-label="Quick View Button"
            onClick={handlePopupView}
          >
            <SearchIcon />
          </button>
        </div>
      </div>

      <div className="flex flex-col h-full overflow-hidden relative product-card-content">
        <div className="text-sm mt-auto leading-6 text-gray-400 mb-1.5 hidden">
          {unit}
        </div>
        <Link
          href={`${ROUTES.PRODUCTS}/${slug}`}
          className="text-brand-dark font-semibold text-sm leading-5 min-h-[40px] line-clamp-2 mb-2 hover:text-brand"
        >
          {name}
        </Link>

        <div className="flex text-gray-500 space-x-2 ">
          <div className="flex items-center">
            {[...Array(5)].map((_, idx) => (
              <StarIcon
                key={idx}
                color={idx < 5 ? "#F3B81F" : "#DFE6ED"}
                className="w-3 h-3 mx-px"
              />
            ))}
          </div>
          <span className="text-[13px] leading-4">(3 reviews)</span>
        </div>

        <div className="space-s-2 mt-2 mb-2">
          <span
            className={cn(
              colorMap[selectedColor].text,
              "inline-block font-semibold md:text-[18px]",
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

        <div className="mt-1 ">
          <RenderLabelStock props={{ data: product }} />
        </div>
      </div>
    </article>
  );
};

export default ProductCardHorizontal;
