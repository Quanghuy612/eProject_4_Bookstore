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
import StarIcon from "@/components/icons/star-icon";
import { colorMap } from "@/data/color-settings";
import { usePanel } from "@/contexts/usePanel";

const AddToCart = dynamic(() => import("@/components/product/add-to-cart"), {
  ssr: false,
});

interface ProductProps {
  product: Product;
  className?: string;
  variant?: string;
}

function RenderPopupOrAddToCart({ props }: { props: any }) {
  let { data }: any = props;
  // console.log(variant);
  const { id, quantity, product_type, slug } = data ?? {};

  const { isInCart, isInStock } = useCart();
  const outOfStock = isInCart(id) && !isInStock(id);

  if (Number(quantity) < 1 || outOfStock) {
    return (
      <span className="font-semibold text-[11px] text-brand-light uppercase inline-block bg-brand-danger rounded px-2.5 pt-1 pb-[3px] mt-4">
        Out Stock
      </span>
    );
  }
  if (product_type === "variable") {
    return (
      <Link variant={"button-detail2"} href={`${ROUTES.PRODUCTS}/${slug}`}>
        Choose Options
      </Link>
    );
  }
  return <AddToCart data={data} variant="furni" />;
}

const ProductCardFurni: React.FC<ProductProps> = ({
  product,
  className,
  variant = "default",
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
        "flex flex-col gap-3 product-card-v2 relative p-1 sm:p-2  h-full  bg-white",
        className,
        Number(quantity) < 1 || outOfStock
          ? "card-image--nojump"
          : "card-image--zoom ",
        {
          "hover:drop-shadow-cardhori hover:z-50 ": variant === "boxBorder",
          rounded: variant === "default",
        },
      )}
      title={name}
    >
      <div className="relative flex-shrink-0 overflow-hidden rounded-sm">
        <div className="relative flex card-img-container   w-full">
          <Image
            src={image?.thumbnail ?? productPlaceholder}
            alt={name || "Product Image"}
            width={330}
            height={330}
          />
        </div>
        <div className="w-full h-full absolute top-0  z-10">
          {discount && (
            <span className="font-semibold text-[11px]  border border-[#ff6128] text-brand-sale uppercase inline-block bg-white rounded-sm px-2.5 p-1 pb-[3px]  m-4">
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
          <div
            className={cn(
              "block px-2 lg:px-4 box-border",
              Number(quantity) < 1 || outOfStock
                ? "product-outstock-button"
                : "product-cart-button",
            )}
          >
            <RenderPopupOrAddToCart props={{ data: product }} />
          </div>
        </div>
      </div>

      <div className="flex flex-col h-full overflow-hidden  relative">
        <Link
          href={`${ROUTES.PRODUCTS}/${slug}`}
          className="text-brand-dark font-semibold text-sm leading-5 min-h-[40px] line-clamp-2 mt-1 mb-2"
        >
          {name}
        </Link>
        <div className="flex text-gray-500 space-x-2 mb-2">
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
        <div className="space-s-2 mb-2">
          <span className="inline-block font-semibold md:text-lg text-brand-dark">
            {product_type === "variable" ? `${minPrice} - ${maxPrice}` : price}
          </span>
          {basePrice && (
            <del className="mx-1  text-gray-400 text-opacity-70">
              {basePrice}
            </del>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductCardFurni;
