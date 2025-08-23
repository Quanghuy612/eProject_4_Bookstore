import cn from "classnames";
import { usePanel } from "@/contexts/usePanel";
import { colorMap } from "@/data/color-settings";
import React from "react";

interface Props {
  className?: string;
  variations: any;
  attributes: any;
  setAttributes: (key: any) => void;
  error?: boolean;
}

const ProductAttributes: React.FC<Props> = ({
  className = "mb-2 pt-0.5",
  variations,
  attributes,
  setAttributes,
  error,
}) => {
  if (!variations) return null;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { selectedColor } = usePanel();

  return (
    <>
      {Object.keys(variations).map((variationName, index) => (
        <div className={cn(className)} key={index}>
          <h4 className="mb-3 font-medium capitalize text-sm text-brand-dark ">
            {variationName.split("-").join(" ")}:
          </h4>

          <ul className="flex flex-wrap ltr:-mr-2 rtl:-ml-2 capitalize">
            {variations[variationName].map((attribute: any) => (
              <li
                key={attribute.id}
                className={cn(
                  `${colorMap[selectedColor].hoverLink} ${colorMap[selectedColor].hoverBorder} border cursor-pointer rounded  h-9 md:h-10 p-1 mb-2 md:mb-3 ltr:mr-2 rtl:ml-2 flex justify-center items-center font-medium text-sm text-body transition duration-200 ease-in-out  px-3`,
                  attributes[variationName] === attribute.value
                    ? `${colorMap[selectedColor].text} ${colorMap[selectedColor].border} `
                    : " border-border-two",
                )}
                onClick={() =>
                  setAttributes((prev: any) => ({
                    ...prev,
                    [variationName]: attribute.value,
                  }))
                }
              >
                {attribute.value}
              </li>
            ))}
          </ul>
          {error && (
            <p className="text-13px text-brand-danger ">
              Please select an item in {variationName.split("-").join(" ")}.
            </p>
          )}
        </div>
      ))}
    </>
  );
};

export default ProductAttributes;
