import React, { useEffect, useMemo, useRef, useState } from "react";
import { Product, VariationOption } from "@/services/types";
import StarIcon from "@/components/icons/star-icon";
import isEmpty from "lodash/isEmpty";
import VariationPrice from "@/components/product/variation-price";
import cn from "classnames";
import { colorMap } from "@/data/color-settings";
import ProductAttributes from "@/components/product/product-attributes";
import Counter from "@/components/shared/counter";
import Button from "@/components/shared/button";
import CartIcon from "@/components/icons/cart-icon";
import WishlistButton from "@/components/wishlist/wishlist-button";
import CompareButton from "@/components/compare/compare-button";
import PaypalIconLabel from "@/components/icons/payment/paypal-text";
import { HelpCircle, Share2, TruckIcon } from "lucide-react";
import TrustSeal from "@/components/shared/trust-seal";
import { useCart } from "@/contexts/cart/cartContext";
import usePrice from "@/services/product/use-price";
import { getVariations } from "@/services/utils/get-variations";
import isEqual from "lodash/isEqual";
import { constructCartItem } from "@/utils/construct-cart-item";
import { usePanel } from "@/contexts/usePanel";
import StickyCart from "@/components/product/sticky-cart";
interface ViewProps {
  className?: string;
  data?: Product;
}
const ProductView: React.FC<ViewProps> = ({ data, className }) => {
  const { addItemToCart, isInCart, getItemFromCart, isInStock } = useCart();
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [attributes, setAttributes] = useState<{ [key: string]: string }>({});
  const [favorite, setFavorite] = useState<boolean>(false);
  const [quantity] = useState(1);
  const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);
  const [addToWishlistLoader, setAddToWishlistLoader] =
    useState<boolean>(false);
  const [errorAttributes, setErrorAttributes] = useState<boolean>(false);
  const [selectedVariation, setSelectedVariation] = useState<any | undefined>(
    undefined,
  );

  const { price, basePrice, discount } = usePrice(
    data && {
      amount: data?.sale_price ? data?.sale_price : data?.price,
      baseAmount: data?.price,
      currencyCode: "USD",
    },
  );

  const variations = getVariations(data?.variations);

  const isSelected = !isEmpty(variations)
    ? !isEmpty(attributes) &&
      Object.keys(variations).every((variation) =>
        attributes.hasOwnProperty(variation),
      )
    : true;

  // Memoize sorted attribute values
  const sortedAttributeValues = useMemo(
    () => Object.values(attributes).sort(),
    [attributes],
  );

  // Effect to handle variation selection
  useEffect(() => {
    if (!isSelected) return;
    setErrorAttributes(false);

    const dataVaiOption: any = data?.variation_options;
    const newSelectedVariation = dataVaiOption?.find((o: VariationOption) =>
      isEqual(o.options.map((v) => v.value).sort(), sortedAttributeValues),
    );

    setSelectedVariation(newSelectedVariation);
  }, [isSelected, data, sortedAttributeValues]);

  const item = constructCartItem(data!, selectedVariation);
  const outOfStock = isInCart(item.id) && !isInStock(item.id);

  function addToCart() {
    if (!isSelected) return setErrorAttributes(true);
    // to show btn feedback while product carting
    setAddToCartLoader(true);
    setTimeout(() => {
      setAddToCartLoader(false);
    }, 1500);

    const item = constructCartItem(data!, selectedVariation);
    addItemToCart(item, quantity);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function addToWishlist() {
    // to show btn feedback while product wishlist
    setAddToWishlistLoader(true);
    setFavorite(!favorite);
    setTimeout(() => {
      setAddToWishlistLoader(false);
    }, 1500);
  }

  const [isCartVisible, setCartVisible] = useState<boolean>(false);
  const targetButtonRef = useRef<HTMLButtonElement | null>(null);
  const { selectedColor } = usePanel();
  return (
    <div className={cn("flex flex-col  shrink-0", className)}>
      <div className="pb-4 lg:pb-8">
        <div className="mb-2 md:mb-2.5 block ">
          <h2 className="text-lg font-medium transition-colors duration-300 text-brand-dark md:text-xl xl:text-2xl">
            {data?.name}
          </h2>
        </div>

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

        {data?.unit && isEmpty(variations) ? (
          <div className="text-sm font-medium md:text-15px">{data?.unit}</div>
        ) : (
          <VariationPrice
            selectedVariation={selectedVariation}
            minPrice={data?.min_price}
            maxPrice={data?.max_price}
          />
        )}

        {isEmpty(variations) && (
          <div className="flex items-center mt-5">
            <div
              className={cn(
                colorMap[selectedColor].text,
                "font-medium text-base md:text-xl xl:text-2xl",
              )}
            >
              {price}
            </div>
            {discount && (
              <>
                <del className="text-sm text-opacity-50 md:text-15px ltr:pl-3 rtl:pr-3 text-brand-dark ">
                  {basePrice}
                </del>
                <span className="inline-block rounded font-bold text-xs md:text-sm bg-brand-tree bg-opacity-20 text-brand-tree uppercase px-2 py-1 ltr:ml-2.5 rtl:mr-2.5">
                  {discount} {"text-off"}
                </span>
              </>
            )}
          </div>
        )}
      </div>

      <dl className="productView-info  text-[14px] leading-8 pb-5 mb-5 border-b border-border-base">
        <dt className={`productView-info-name w-40 float-left`}>Brand:</dt>
        <dd className="productView-info-value">{data?.brand}</dd>
        <dt className={`productView-info-name w-40 float-left`}>
          Operating System:
        </dt>
        <dd className="productView-info-value"> iOS 17</dd>
        <dt className={`productView-info-name w-40 float-left`}>
          Screen Size:
        </dt>
        <dd className="productView-info-value" data-product-weight="">
          6.1 Inches
        </dd>
        <dt className={`productView-info-name w-40 float-left`}>Model Name:</dt>
        <dd className="productView-info-value">iPhone 16</dd>
      </dl>
      {Object.keys(variations).map((variation) => {
        return (
          <ProductAttributes
            key={`popup-attribute-key${variation}`}
            variations={variations}
            attributes={attributes}
            setAttributes={setAttributes}
            error={errorAttributes}
          />
        );
      })}

      <div className="pb-2">
        {/* check that item isInCart and place the available quantity or the item quantity */}
        {isEmpty(variations) && (
          <>
            {Number(quantity) > 0 || !outOfStock ? (
              <span className="text-sm font-medium text-yellow">
                {`There are ${quantity} pieces still available.`}
              </span>
            ) : (
              <div className="text-base text-brand-danger whitespace-nowrap">
                Out Stock
              </div>
            )}
          </>
        )}

        {!isEmpty(selectedVariation) && (
          <span className="text-sm font-medium text-yellow">
            {selectedVariation?.is_disable || selectedVariation.quantity === 0
              ? "Out Stock"
              : `There are ${selectedVariation.quantity}  pieces still available.`}
          </span>
        )}
      </div>

      <div className="pt-1.5 lg:pt-3 xl:pt-5 space-y-2.5 md:space-y-3.5">
        <label
          className={"font-medium text-sm text-brand-dark mb-1.5 inline-block"}
        >
          Quantity:
        </label>
        <Counter
          variant="single"
          value={selectedQuantity}
          onIncrement={() => setSelectedQuantity((prev) => prev + 1)}
          onDecrement={() =>
            setSelectedQuantity((prev) => (prev !== 1 ? prev - 1 : 1))
          }
          disabled={
            isInCart(item.id)
              ? (getItemFromCart(item.id)?.quantity ?? 0) + selectedQuantity >=
                Number(item.stock)
              : selectedQuantity >= Number(item.stock)
          }
        />

        {/* Add to cart and action buttons */}
        <div
          className="flex flex-col md:flex-row gap-2.5 mt-8"
          data-product-attribute
        >
          <Button
            ref={targetButtonRef}
            variant={"dark"}
            onClick={addToCart}
            className="flex-auto px-1.5"
            loading={addToCartLoader}
          >
            <CartIcon width={18} className="text-white ltr:mr-3 rtl:ml-3" />
            Add to cart
          </Button>
          <div className={"grid grid-cols-2 gap-2.5 lg:w-[140px]"}>
            <WishlistButton product={data} />
            <CompareButton product={data} />
          </div>
        </div>

        {/* PayPal button */}
        <Button variant={"paypal"} className={"gap-2"}>
          Pay with <PaypalIconLabel />
        </Button>
      </div>

      <div className={"space-y-8 mt-8"}>
        {/* Action buttons */}
        <div className="hidden flex  items-center gap-5 md:gap-8 text-brand-dark font-medium">
          <button className="flex items-center text-sm gap-1">
            <HelpCircle size={18} />
            Ask a question
          </button>

          <button className="flex items-center text-sm gap-1">
            <TruckIcon size={18} />
            Delivery & Return
          </button>

          <button className="flex items-center text-sm gap-1">
            <Share2 size={18} />
            Share
          </button>
        </div>

        {/* Action buttons */}
        <TrustSeal />
      </div>

      <StickyCart
        product={data}
        addToCartLoader={addToCartLoader}
        handleAddToCart={addToCart}
        isCartVisible={isCartVisible}
        setCartVisible={setCartVisible}
        targetButtonRef={targetButtonRef}
        isSelected={isSelected}
      />
    </div>
  );
};
export default ProductView;
