import cn from "classnames";
import Image from "@/components/shared/image";
import usePrice from "@/services/product/use-price";
import { Product } from "@/services/types";
import { useModalAction } from "@/components/common/modal/modalContext";
import useWindowSize from "@/utils/use-window-size";
import { useCart } from "@/contexts/cart/cartContext";

import { productPlaceholder } from "@/assets/placeholders";
import dynamic from "next/dynamic";
import { ROUTES } from "@/utils/routes";
import Link from "@/components/shared/link";
import SearchIcon from "@/components/icons/search-icon";
import CheckIcon from "@/components/icons/check-icon";
import StarIcon from "@/components/icons/star-icon";
import { usePanel } from "@/contexts/usePanel";
import { colorMap } from "@/data/color-settings";
import { X } from "lucide-react";

const AddToCart = dynamic(() => import("@/components/product/add-to-cart"), {
  ssr: false,
});

interface ProductProps {
  product: Product;
  className?: string;
  variant?: string;
  removeWishlist?: (id: string) => void;
}

function RenderAddToCart({ props }: { props: any }) {
  let { data }: any = props;
  const { id, quantity, product_type, slug } = data ?? {};
  const { isInCart, isInStock } = useCart();
  const outOfStock = isInCart(id) && !isInStock(id);

  if (Number(quantity) < 1 || outOfStock) {
    return true;
  }
  if (product_type === "variable") {
    return (
      <Link variant={"button-detail"} href={`${ROUTES.PRODUCTS}/${slug}`}>
        Choose Options
      </Link>
    );
  }
  return <AddToCart data={data} variant="mercury" />;
}

function RenderLabelStock({ props }: { props: Object }) {
  let { data }: any = props;

  const { id, quantity } = data ?? {};
  const { isInCart, isInStock } = useCart();
  const outOfStock = isInCart(id) && !isInStock(id);

  if (Number(quantity) < 1 || outOfStock) {
    return (
      <p className="font-medium flex items-center space-x-1 text-[12px]  ">
        <CheckIcon />
        <span> Out Stock</span>
      </p>
    );
  }
  return (
    <p className="font-medium flex items-center space-x-1 text-[12px]  ">
      <CheckIcon />
      <span> In Stock </span>
    </p>
  );
}

const ProductCard: React.FC<ProductProps> = ({
  product,
  className,
  variant = "default",
  removeWishlist,
}) => {
  const { id, name, image, quantity, slug, product_type } = product ?? {};
  const { openModal } = useModalAction();
  const { width } = useWindowSize();
  const { isInCart, isInStock } = useCart();
  const outOfStock = isInCart(id) && !isInStock(id);
  const iconSize = width! > 1024 ? "20" : "17";
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
        "flex flex-col gap-2 product-card  p-3 md:p-4  h-full  bg-white relative z-1",
        [removeWishlist && "border border-border-two"],
        className,
        Number(quantity) < 1 || outOfStock
          ? "card-image--nojump"
          : "card-image--jump ",
        {
          "hover:drop-shadow-cardhori hover:z-50 ": variant === "boxBorder",
          rounded: variant === "default",
        },
      )}
    >
      {removeWishlist && (
        <button
          onClick={() => removeWishlist(String(id))}
          className=" hover:bg-gray-200  px-1 py-1  rounded-full absolute right-0 top-0 m-3 z-10 cursor-pointer "
        >
          <X size={20} strokeWidth={2} />
        </button>
      )}

      <div className="relative flex-shrink-0 overflow-hidden z-1">
        <div className="relative card-img-container overflow-hidden flex item-center w-full">
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
            <SearchIcon width={iconSize} height={iconSize} />
          </button>
        </div>
      </div>

      <div className="flex flex-col h-full overflow-hidden relative product-cart-content bg-white">
        <Link
          href={`${ROUTES.PRODUCTS}/${slug}`}
          className="text-brand-dark font-semibold text-sm leading-5 min-h-[40px] line-clamp-2 mt-1 mb-2"
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
          <span className="text-[13px] leading-4">(2 reviews)</span>
        </div>

        <div className="space-s-2 mt-1 mb-2">
          <span
            className={cn(
              colorMap[selectedColor].text,
              "inline-block font-semibold  md:text-[18px]",
            )}
          >
            {product_type === "variable" ? `${minPrice} - ${maxPrice}` : price}
          </span>
          {basePrice && (
            <del className="mx-1   text-gray-400 text-opacity-70">
              {basePrice}
            </del>
          )}
        </div>

        <div className="mt-1 ">
          <RenderLabelStock props={{ data: product }} />
        </div>
        <div className="block product-cart-button ">
          <RenderAddToCart props={{ data: product }} />
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
