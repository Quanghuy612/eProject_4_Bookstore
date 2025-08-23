import React, { useEffect, useState } from "react";
import isEmpty from "lodash/isEmpty";
import Button from "@/components/shared/button";
import Counter from "@/components/shared/counter";
import { useCart } from "@/contexts/cart/cartContext";
import ProductAttributes from "@/components/product/product-attributes";
import { constructCartItem } from "@/utils/construct-cart-item";
import usePrice from "@/services/product/use-price";
import { getVariations } from "@/services/utils/get-variations";
import ThumbnailCarousel from "@/components/shared/carousel/thumbnail-carousel";
import Image from "@/components/shared/image";
import CartIcon from "@/components/icons/cart-icon";

import {
  useModalAction,
  useModalState,
} from "@/components/common/modal/modalContext";
import CloseButton from "@/components/shared/close-button";
import VariationPrice from "./variation-price";
import isEqual from "lodash/isEqual";
import { productGalleryPlaceholder } from "@/assets/placeholders";
import StarIcon from "@/components/icons/star-icon";
import { usePanel } from "@/contexts/usePanel";
import cn from "classnames";
import { colorMap } from "@/data/color-settings";
import PaypalIconLabel from "@/components/icons/payment/paypal-text";
import { HelpCircle, Share2, TruckIcon } from "lucide-react";
import TrustSeal from "@/components/shared/trust-seal";
import WishlistButton from "@/components/wishlist/wishlist-button";
import CompareButton from "@/components/compare/compare-button";

export default function ProductQuickview() {
  const { data } = useModalState();
  const { closeModal } = useModalAction();
  const { addItemToCart, isInCart, getItemFromCart, isInStock } = useCart();
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [attributes, setAttributes] = useState<{ [key: string]: string }>({});
  const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);

  const { price, basePrice, discount } = usePrice({
    amount: data.sale_price ? data.sale_price : data.price,
    baseAmount: data.price,
    currencyCode: "USD",
  });
  const variations = getVariations(data.variations);

  const { image, name, unit, gallery, quantity } = data;

  const isSelected = !isEmpty(variations)
    ? !isEmpty(attributes) &&
      Object.keys(variations).every((variation) =>
        attributes.hasOwnProperty(variation),
      )
    : true;
  let selectedVariation: any = {};
  if (isSelected) {
    selectedVariation = data?.variation_options?.find((o: any) =>
      isEqual(
        o.options.map((v: any) => v.value).sort(),
        Object.values(attributes).sort(),
      ),
    );
  }
  const item = constructCartItem(data, selectedVariation);
  const outOfStock = isInCart(item.id) && !isInStock(item.id);

  function addToCart() {
    if (!isSelected) return;
    // to show btn feedback while product carting
    setAddToCartLoader(true);
    setTimeout(() => {
      setAddToCartLoader(false);
    }, 1500);
    addItemToCart(item, selectedQuantity);
  }

  const { selectedColor } = usePanel();
  useEffect(() => setSelectedQuantity(1), [data.id]);

  return (
    <div className="md:w-[600px] lg:w-[940px] xl:w-[1180px] mx-auto p-1 lg:p-0 xl:p-3 bg-white rounded-md">
      <CloseButton onClick={closeModal} />
      <div className="overflow-hidden">
        <div className="px-2 md:px-5 mb-2 lg:mb-2 pt-4 md:pt-7">
          <div className="lg:flex items-stretch justify-between gap-8">
            <div className="xl:flex  justify-center overflow-hidden">
              {!!gallery?.length ? (
                <ThumbnailCarousel gallery={gallery} />
              ) : (
                <div className="flex items-center justify-center w-auto">
                  <Image
                    src={image?.original ?? productGalleryPlaceholder}
                    alt={name!}
                    width={650}
                    height={590}
                  />
                </div>
              )}
            </div>

            <div className="flex-shrink-0 flex flex-col lg:w-[430px] xl:w-[520px] 2xl:w-[520px]">
              <div className="pt-5 lg:pt-0 pb-5">
                <div className="mb-2 md:mb-2.5 block -mt-1.5">
                  <h2 className="text-lg font-medium  text-brand-dark md:text-xl xl:text-2xl ">
                    {name}
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

                {unit && isEmpty(variations) ? (
                  <div className="hidden text-sm font-medium md:text-15px">
                    {unit}
                  </div>
                ) : (
                  <VariationPrice
                    selectedVariation={selectedVariation}
                    minPrice={data.min_price}
                    maxPrice={data.max_price}
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
                        <del className="text-sm  md:text-xl text-opacity-50 ltr:pl-3 rtl:pr-3 text-brand-dark/50">
                          {basePrice}
                        </del>
                        <span className="inline-block rounded-full  text-[13px]  bg-brand-sale bg-opacity-20 text-brand-light uppercase px-2 py-1 ltr:ml-2.5 rtl:mr-2.5">
                          {discount} Off
                        </span>
                      </>
                    )}
                  </div>
                )}
              </div>

              {Object.keys(variations).map((variation) => {
                return (
                  <ProductAttributes
                    key={`popup-attribute-key${variation}`}
                    variations={variations}
                    attributes={attributes}
                    setAttributes={setAttributes}
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
                    {selectedVariation?.is_disable ||
                    selectedVariation.quantity === 0
                      ? "Out Stock"
                      : `There are ${selectedVariation.quantity}  pieces still available.`}
                  </span>
                )}
              </div>

              <div className="pt-1.5 lg:pt-3 xl:pt-5 space-y-2.5 md:space-y-3.5">
                <Counter
                  variant="single"
                  value={selectedQuantity}
                  onIncrement={() => setSelectedQuantity((prev) => prev + 1)}
                  onDecrement={() =>
                    setSelectedQuantity((prev) => (prev !== 1 ? prev - 1 : 1))
                  }
                  disabled={
                    isInCart(item.id)
                      ? (getItemFromCart(item.id)?.quantity ?? 0) +
                          selectedQuantity >=
                        Number(item.stock)
                      : selectedQuantity >= Number(item.stock)
                  }
                />

                {/* Add to cart and action buttons */}
                <div className="flex flex-col md:flex-row gap-2.5 mt-8">
                  <Button
                    variant={"dark"}
                    onClick={addToCart}
                    className="flex-auto w-full px-1.5"
                    disabled={!isSelected}
                    loading={addToCartLoader}
                  >
                    <CartIcon className="text-white ltr:mr-3 rtl:ml-3" />
                    Add to cart
                  </Button>
                  <div className={"flex gap-2.5 "}>
                    <WishlistButton product={data} />
                    <CompareButton product={data} />
                  </div>
                </div>

                {/* PayPal button */}
                <Button variant={"paypal"} className={"gap-2"}>
                  Pay with <PaypalIconLabel />
                </Button>
              </div>

              <div className={"space-y-8 mt-9"}>
                {/* Action buttons */}
                <div className="hidden flex  items-center gap-5 md:gap-8 text-brand-dark font-semibold">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
