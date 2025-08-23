"use client";
import cn from "classnames";
import { ROUTES } from "@/utils/routes";
import useWindowSize from "@/utils/use-window-size";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { usePanel } from "@/contexts/usePanel";
import { colorMap } from "@/data/color-settings";
import Link from "@/components/shared/link";

interface Props {
  className?: string;
  data: any;
  onNavClick?: any;
  activeTab?: number;
  variant?: string | undefined;
}

const ListingTabs: React.FC<Props> = ({
  className,
  data,
  onNavClick,
  activeTab,
  variant,
}) => {
  const { width } = useWindowSize();
  const [categoryMenu, setCategoryMenu] = useState(Boolean(false));

  function handleCategoryMenu() {
    setCategoryMenu(!categoryMenu);
  }
  const { selectedColor } = usePanel();
  return (
    <div
      className={cn(
        "sm:flex items-center block-title mb-1.5 gap-2",
        className,
        {
          ["py-2.5"]: variant === "outBorder" || variant === "outBorder-xl",
          ["px-5 py-2.5 rounded bg-white"]:
            variant === "default" || variant === "horizontal",
        },
      )}
    >
      <h3 className="text-base text-[16px] uppercase text-brand-dark font-semibold border-0  xl:basis-[30%]">
        <Link href={`${ROUTES.CATEGORIES}/${data?.slug}`}>{data?.name}</Link>
      </h3>
      {Array.isArray(data?.children) ? (
        <>
          {width! > 1280 ? (
            <div className="ltabs-tabs-wrap flex flex-wrap	 justify-end xl:basis-[70%]">
              <ul key="content" className="flex text-[14px] leading-7 ">
                {data?.children
                  .slice(0, 4)
                  ?.map((currentItem: any, idx: number) => {
                    return (
                      <li
                        className={`ps-2 hover:text-skin-primary ${
                          activeTab === currentItem.id
                            ? "text-skin-primary"
                            : "text-fill-base "
                        }`}
                        key={`${idx}`}
                      >
                        <button
                          key={idx}
                          onClick={() => onNavClick(currentItem.id)}
                          className={`px-4 py-1 rounded-full ${
                            activeTab === currentItem.id
                              ? `${colorMap[selectedColor].bg} text-brand-light`
                              : `text-gray-700 ${colorMap[selectedColor].hoverLink}`
                          }`}
                        >
                          {currentItem.name}
                        </button>
                      </li>
                    );
                  })}
              </ul>
            </div>
          ) : (
            <div className="ltabs-tabs-wrap relative z-10">
              <button
                className="flex justify-between border border-black/10 rounded-md min-w-[170px] focus:outline-none text-sm  px-3 py-2 mt-2 mb-1"
                onClick={handleCategoryMenu}
              >
                <span className="inline-flex me-2.5">
                  {data?.children[0].name}
                </span>
                <FiChevronDown className="text-xl lg:text-2xl" />
              </button>
              {categoryMenu && (
                <div
                  id="dropdown"
                  className="z-10 w-44 bg-white rounded drop-shadow absolute"
                >
                  <ul key="content" className="py-2 text-[14px] leading-6">
                    {data?.children
                      .slice(0, 4)
                      ?.map((currentItem: any, idx: number) => {
                        return (
                          <li
                            className={colorMap[selectedColor].hoverLink}
                            key={`${idx}`}
                          >
                            <button
                              onClick={() => onNavClick(currentItem.id)}
                              className={"py-2 px-4 block whitespace-no-wrap"}
                            >
                              {currentItem.name}
                            </button>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              )}
            </div>
          )}
        </>
      ) : null}
    </div>
  );
};

export default ListingTabs;
