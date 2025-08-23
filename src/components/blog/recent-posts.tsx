"use client";

import Image from "@/components/shared/image";
import Link from "next/link";
import SectionHeader from "@/components/common/section-header";
import { useBlogsQuery } from "@/services/blog/get-all-blogs";
import { productPlaceholder } from "@/assets/placeholders";
import { ROUTES } from "@/utils/routes";
import { usePanel } from "@/contexts/usePanel";
import { colorMap } from "@/data/color-settings";
import cn from "classnames";

export default function RecentPosts() {
  const { data: dataPosts } = useBlogsQuery();
  const { selectedColor } = usePanel();
  return (
    <div className="w-full p-4 bg-gray-50 bg-white rounded-md">
      <SectionHeader
        sectionHeading={"Recent Posts"}
        className="mb-5 block-title uppercase"
      />
      <div className="space-y-5 ">
        {dataPosts?.slice(0, 5)?.map((post) => (
          <Link
            href={{ pathname: `${ROUTES.BLOG}/${post.slug}` }}
            key={post.id}
            className="flex  gap-3 group"
          >
            <div className="card-img-container flex overflow-hidden max-w-[80px] mx-auto relative hover:opacity-80">
              <Image
                src={post.image ?? productPlaceholder}
                alt={post.title || "Product Image"}
                width={150}
                height={100}
              />
            </div>

            <div>
              <h3
                className={cn(
                  "font-medium text-sm text-brand-dark mb-1.5",
                  colorMap[selectedColor].groupHoverLink,
                )}
              >
                {post.title}
              </h3>
              <p className="text-13px text-gray-500">{post.date}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
