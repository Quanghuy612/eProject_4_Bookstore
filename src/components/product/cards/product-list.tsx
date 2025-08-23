import cn from "classnames";
import Image from "@/components/shared/image";
import Link from "@/components/shared/link";
import usePrice from "@/services/product/use-price";
import { Product } from "@/services/types";
import { useModalAction } from "@/components/common/modal/modalContext";
import useWindowSize from "@/utils/use-window-size";
import SearchIcon from "@/components/icons/search-icon";
import { useCart } from "@/contexts/cart/cartContext";
import { productPlaceholder } from "@/assets/placeholders";
import { ROUTES } from "@/utils/routes";
import dynamic from "next/dynamic";
import StarIcon from "@/components/icons/star-icon";
import { colorMap } from "@/data/color-settings";
import { usePanel } from "@/contexts/usePanel";

const AddToCart = dynamic(() => import("@/components/product/add-to-cart"), {
  ssr: false,
});

interface ProductProps {
  product: Product;
  className?: string;
}

function RenderPopupOrAddToCart({ props }: { props: any }) {
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
  return <AddToCart data={data} />;
}

const ProductList: React.FC<ProductProps> = ({ product, className }) => {
  const { openModal } = useModalAction();
  const { name, image, slug, product_type, description } = product ?? {};
  const { width } = useWindowSize();
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
        "product-list-view  overflow-hidden relative  grid grid-cols-4  p-2 sm:p-4 gap-4 lg:gap-8 bg-white rounded",
        className,
      )}
      title={name}
    >
      <div className="col-span-1 relative  overflow-hidden">
        <Link
          href={`${ROUTES.PRODUCTS}/${slug}`}
          className="block h-full flex align-center"
        >
          <Image
            src={image?.thumbnail ?? productPlaceholder}
            alt={name || "Product Image"}
            width={180}
            height={180}
          />
        </Link>

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

      <div className="col-span-3">
        <Link
          href={`${ROUTES.PRODUCTS}/${slug}`}
          className="text-brand-dark  text-base font-semibold leading-5 min-h-[30px] line-clamp-2 mt-1 mb-2 hover:text-skin-primary"
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
              "inline-block font-semibold text-[18px]",
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

        <p className="hidden lg:block text-sm text-skin-base line-clamp-3 leading-7 opacity-80">
          {description}
        </p>
        <div className="inline-block product-cart-button lg:mt-6">
          <RenderPopupOrAddToCart props={{ data: product }} />
        </div>
      </div>
    </article>
  );
};

export default ProductList;
