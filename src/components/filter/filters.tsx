"use client";

import React, { useState } from "react";
import Switch from "@/components/shared/switch";
import { CategoriesFilter } from "@/components/filter/facets/categories-filter";
import { FilterSection } from "@/components/filter/facets/filter-section";
import { ColorsFilter } from "@/components/filter/facets/colors-filter";
// Sample data
import {
  categoriesData,
  colorsData,
  sizesData,
} from "@/components/filter/data";
import { SizesFilter } from "@/components/filter/facets/sizes-filter";
import { PriceRangeFilter } from "@/components/filter/facets/price-range-filter";

const Filters = () => {
  const [isOnSale, setIsIsOnSale] = useState(true);

  // Price range constants
  const MIN_PRICE = 0;
  const MAX_PRICE = 1000;
  const DEFAULT_PRICE_RANGE: [number, number] = [0, 500];

  // State for section visibility
  const [sectionsOpen, setSectionsOpen] = useState({
    categories: true,
    colors: true,
    sizes: true,
    price: true,
  });

  // State for selected filters
  const [selectedFilters, setSelectedFilters] = useState<{
    categories: Record<string, boolean>;
    colors: Record<string, boolean>;
    sizes: Record<string, boolean>;
  }>({
    categories: {},
    colors: {},
    sizes: {},
  });

  // State for price range
  const [priceRange, setPriceRange] =
    useState<[number, number]>(DEFAULT_PRICE_RANGE);

  // State for expanded categories
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({});

  // Toggle section visibility
  const toggleSection = (
    section: "categories" | "colors" | "sizes" | "price",
  ) => {
    setSectionsOpen((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Toggle category expansion
  const toggleCategoryExpand = (id: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Handle checkbox changes
  const handleFilterChange = (
    section: "categories" | "colors" | "sizes",
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

  // Handle price range change
  const handlePriceRangeChange = (value: [number, number]) => {
    setPriceRange(value);
  };

  return (
    <div className="bg-white p-5 rounded ">
      {/* Categories Filter */}
      <FilterSection
        title="Categories"
        isOpen={sectionsOpen.categories}
        onToggle={() => toggleSection("categories")}
      >
        <CategoriesFilter
          categories={categoriesData}
          selectedCategories={selectedFilters.categories}
          expandedCategories={expandedCategories}
          onCategoryChange={(id, checked) =>
            handleFilterChange("categories", id, checked)
          }
          onCategoryExpand={toggleCategoryExpand}
        />
      </FilterSection>

      {/* Price Range Filter */}
      <FilterSection
        title="Price range"
        isOpen={sectionsOpen.price}
        onToggle={() => toggleSection("price")}
      >
        <PriceRangeFilter
          min={MIN_PRICE}
          max={MAX_PRICE}
          value={priceRange}
          onChange={handlePriceRangeChange}
        />
      </FilterSection>

      {/* Colors Filter */}
      <FilterSection
        title="Colors"
        isOpen={sectionsOpen.colors}
        onToggle={() => toggleSection("colors")}
      >
        <ColorsFilter
          colors={colorsData}
          selectedColors={selectedFilters.colors}
          onColorChange={(id, checked) =>
            handleFilterChange("colors", id, checked)
          }
        />
      </FilterSection>

      {/* Sizes Filter */}
      <FilterSection
        title="Size"
        isOpen={sectionsOpen.sizes}
        onToggle={() => toggleSection("sizes")}
      >
        <SizesFilter
          sizes={sizesData}
          selectedSizes={selectedFilters.sizes}
          onSizeChange={(id, checked) =>
            handleFilterChange("sizes", id, checked)
          }
        />
      </FilterSection>

      <div className="pb-8 pr-2">
        <div className="flex justify-between items-center space-x-2">
          <div>
            <label className="text-base font-medium text-neutral-900 dark:text-neutral-200 ">
              On sale!
            </label>
            <p className="text-neutral-500 dark:text-neutral-400  text-sm">
              Products currently on sale
            </p>
          </div>
          <label className="relative inline-block cursor-pointer switch">
            <Switch checked={isOnSale} onChange={setIsIsOnSale} />
          </label>
        </div>
      </div>
    </div>
  );
};

export default Filters;
