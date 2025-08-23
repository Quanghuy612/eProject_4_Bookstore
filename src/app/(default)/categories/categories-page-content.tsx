"use client";
import { usePanel } from "@/contexts/usePanel";
import cn from "classnames";
import { colorMap } from "@/data/color-settings";
import React from "react";
import { useCategoriesQuery } from "@/services/category/get-all-categories";
import { CategoriesContainer } from "@/components/category/categories-container";

export default function CategoriesPageContent() {
  const { data: categories, isLoading } = useCategoriesQuery({
    limit: 9,
  });
  const { selectedColor } = usePanel();

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div
          className={cn(
            "animate-spin rounded-full h-12 w-12 border-4 border-t-transparent",
            colorMap[selectedColor].border,
          )}
        ></div>
      </div>
    );

  return <CategoriesContainer categories={categories} />;
}
