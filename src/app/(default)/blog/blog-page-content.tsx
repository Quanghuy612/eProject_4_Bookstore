"use client";

import { useBlogsQuery } from "@/services/blog/get-all-blogs";
import { BlogContent } from "./blog-content";
import { BlogBigContent } from "./blog-category-big/blog-big-content";
import { BlogListContent } from "./blog-category-list/blog-list-content";
import { usePanel } from "@/contexts/usePanel";
import { colorMap } from "@/data/color-settings";

import React from "react";
import cn from "classnames";

export default function BlogPageContent({ variant }: { variant: string }) {
  const { data, isLoading } = useBlogsQuery();
  const dataBlog = data;
  const { selectedColor } = usePanel();

  const renderBlogContent = (variant: string) => {
    switch (variant) {
      case "grid":
        return <BlogContent dataBlog={dataBlog} />;
      case "list":
        return <BlogListContent dataBlog={dataBlog} />;
      case "big":
        return <BlogBigContent dataBlog={dataBlog} />;
      default:
        return (
          <BlogContent
            dataBlog={dataBlog}
            className={`pt-10  xl:grid-cols-4`}
          />
        );
    }
  };

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

  return renderBlogContent(variant);
}
