"use client";
import Alert from "@/components/shared/alert";
import CategoryListCardLoader from "@/components/shared/loaders/category-list-card-loader";
import { useCategoriesQuery } from "@/services/category/get-all-categories";
import cn from "classnames";
import CategoryMenu from "@/components/shared/category-menu";

interface CategoryDropdownProps {
  className?: string;
  categoriesLimit?: number;
}

export default function CategoryDropdownNav({
  className,
  categoriesLimit = 9,
}: CategoryDropdownProps) {
  const {
    data: categories,
    isLoading: loading,
    error,
  } = useCategoriesQuery({
    limit: 9,
  });

  return (
    <div className={cn("absolute z-30 w-72 lg:w-full", className)}>
      <div className="max-h-full">
        {error ? (
          <div className="2xl:ltr:pr-4 2xl:rtl:pl-4">
            <Alert message={error.message} />
          </div>
        ) : loading ? (
          <div
            className={"w-full bg-white rounded-b-md category-dropdown-menu"}
          >
            {Array.from({ length: 7 }).map((_, idx) => (
              <CategoryListCardLoader
                key={`category-list-${idx}`}
                uniqueKey="category-list-card-loader"
              />
            ))}
          </div>
        ) : (
          <CategoryMenu items={categories} categoriesLimit={categoriesLimit} />
        )}
      </div>
    </div>
  );
}
