"use client";

import React, { useState } from "react";
import { CategoriesFilter } from "@/components/filter/facets/categories-filter";
import { SizesFilter } from "@/components/filter/facets/sizes-filter";
import { ColorsFilter } from "@/components/filter/facets/colors-filter";
import { PriceRangeFilter } from "@/components/filter/facets/price-range-filter";
import { DollarSign, LayoutGrid, Palette, Ruler, Tag, X } from "lucide-react";

// Sample data
import {
  categoriesData,
  colorsData,
  sizesData,
} from "@/components/filter/data";
import { FilterPopover } from "@/components/filter/facets/filter-popover";
import cn from "classnames";
import { colorMap } from "@/data/color-settings";
import { usePanel } from "@/contexts/usePanel";

export default function HorizontalFilter() {
  const [isOnSale, setIsIsOnSale] = useState(false);

  // Price range constants
  const MIN_PRICE = 0;
  const MAX_PRICE = 1000;
  const DEFAULT_PRICE_RANGE: [number, number] = [0, 500];

  const [selectedFilters, setSelectedFilters] = useState({
    categories: {},
    colors: {},
    sizes: {},
    price: DEFAULT_PRICE_RANGE as [number, number],
  });

  const handleFilterChange = (
    section: "categories" | "colors" | "sizes" | "price",
    id: string,
    checked: boolean,
  ) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [id]: checked,
      },
    }));
  };

  // State for price range
  const handlePriceChange = (value: [number, number]) => {
    setSelectedFilters((prev) => ({
      ...prev,
      price: value,
    }));
  };

  const clearFilter = (section: keyof typeof selectedFilters) => {
    if (section === "price") {
      setSelectedFilters((prev) => ({ ...prev, price: DEFAULT_PRICE_RANGE }));
    } else {
      setSelectedFilters((prev) => ({ ...prev, [section]: {} }));
    }
  };

  const hasSelectedFilters = (section: keyof typeof selectedFilters) => {
    return Object.values(selectedFilters[section]).some((value) => value);
  };

  // Handle price range change
  const isPriceRangeSelected = () => {
    return (
      selectedFilters.price[0] !== DEFAULT_PRICE_RANGE[0] ||
      selectedFilters.price[1] !== DEFAULT_PRICE_RANGE[1]
    );
  };
  const getPriceRangeLabel = () => {
    if (!isPriceRangeSelected()) return "Price";
    return `$${selectedFilters.price[0]} - $${selectedFilters.price[1]}`;
  };

  const { selectedColor } = usePanel();

  return (
    <div className="w-full px-4 py-4 bg-white  rounded">
      <div className="flex items-center gap-5">
        <div className={""}>Filters</div>
        {/* Categories Filter */}
        <FilterPopover
          label="Categories"
          icon={<LayoutGrid className="h-4 w-4" />}
          isSelected={hasSelectedFilters("categories")}
          onClear={() => clearFilter("categories")}
        >
          <div className="mb-4">
            <h3 className="font-semibold text-base  text-brand-dark">
              Categories
            </h3>
          </div>
          <CategoriesFilter
            categories={categoriesData}
            selectedCategories={selectedFilters.categories}
            onCategoryChange={(id, checked) =>
              handleFilterChange("categories", id, checked)
            }
          />
        </FilterPopover>

        {/* Price Range Filter */}
        <FilterPopover
          label="Price"
          selectedLabel={getPriceRangeLabel()}
          icon={<DollarSign className="h-4 w-4" />}
          isSelected={isPriceRangeSelected()}
          onClear={() => clearFilter("price")}
        >
          <div className="mb-4">
            <h3 className="font-semibold text-base  text-brand-dark">
              Price Range
            </h3>
          </div>
          <PriceRangeFilter
            min={MIN_PRICE}
            max={MAX_PRICE}
            value={selectedFilters.price}
            onChange={handlePriceChange}
          />
        </FilterPopover>

        {/* Colors Filter */}
        <FilterPopover
          label="Colors"
          icon={<Palette className="h-4 w-4" />}
          isSelected={hasSelectedFilters("colors")}
          onClear={() => clearFilter("colors")}
        >
          <div className="mb-4">
            <h3 className="font-semibold text-base  text-brand-dark">Colors</h3>
          </div>
          <ColorsFilter
            colors={colorsData}
            selectedColors={selectedFilters.colors}
            onColorChange={(id, checked) =>
              handleFilterChange("colors", id, checked)
            }
          />
        </FilterPopover>

        {/* Sizes Filter */}
        <FilterPopover
          label="Sizes"
          icon={<Ruler className="h-4 w-4" />}
          isSelected={hasSelectedFilters("sizes")}
          onClear={() => clearFilter("sizes")}
        >
          <div className="mb-4">
            <h3 className="font-semibold text-base  text-brand-dark">Sizes</h3>
          </div>
          <SizesFilter
            sizes={sizesData}
            selectedSizes={selectedFilters.sizes}
            onSizeChange={(id, checked) =>
              handleFilterChange("sizes", id, checked)
            }
          />
        </FilterPopover>

        {/* On Sale Toggle */}
        <button
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-300 dark:border-neutral-700 hover:border-neutral-500",
            isOnSale
              ? `bg-blue-50  ${colorMap[selectedColor].border}`
              : "border-neutral-300 dark:border-neutral-700",
          )}
          onClick={() => setIsIsOnSale(!isOnSale)}
        >
          <Tag className="h-4 w-4 text-gray-500" />
          <span className="text-sm">On sale</span>
          {isOnSale && (
            <span
              className={`flex-shrink-0 w-4 h-4 rounded-full text-brand-light flex items-center justify-center cursor-pointer ${colorMap[selectedColor].bg}`}
            >
              <X className="h-3 w-3 " />
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
