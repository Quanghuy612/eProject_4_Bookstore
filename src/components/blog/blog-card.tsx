import cn from "classnames";
import Image from "@/components/shared/image";
import Link from "@/components/shared/link";
import { ROUTES } from "@/utils/routes";
import { productPlaceholder } from "@/assets/placeholders";
import { getCountview } from "@/utils/get-countview";
import { usePanel } from "@/contexts/usePanel";
import { colorMap } from "@/data/color-settings";

interface BlogProps {
  blog?: any;
  className?: string;
}

const BlogCard: React.FC<BlogProps> = ({ blog, className }) => {
  const { title, image, totalWatchCount, slug, date, category } = blog ?? {};
  const { selectedColor } = usePanel();
  return (
    <article
      className={cn(
        "flex flex-col product-card overflow-hidden  h-full bg-white rounded",
        className,
      )}
      title={title}
    >
      <div className="relative flex-shrink-0 demo">
        <Link href={`${ROUTES.BLOG}/${slug}`} className="text-brand-dark ">
          <div className="card-img-container flex overflow-hidden max-w-[420px] mx-auto relative hover:opacity-80">
            <Image
              src={image ?? productPlaceholder}
              alt={title || "Product Image"}
              width={350}
              height={210}
              className="object-cover bg-skin-thumbnail"
            />
          </div>
        </Link>
      </div>

      <div className="flex flex-col py-5 px-5 h-full overflow-hidden text-center relative">
        <div className="text-sm font-semibold mb-2.5 text-gray-500">
          {category}
        </div>
        <h4 className={"font-semibold text-md mb-3.5 "}>
          <Link
            href={`${ROUTES.BLOG}/${slug}`}
            className={cn(
              "text-brand-dark line-clamp-2",
              colorMap[selectedColor].hoverLink,
            )}
          >
            {title}
          </Link>
        </h4>
        <div className="entry-meta text-13px text-gray-400">
          <span className="post-on pe-2.5 relative inline-block"> {date}</span>
          <span className="has-dot px-2.5 relative inline-block">
            {getCountview(totalWatchCount)} View
          </span>
          <span className="has-dot ps-2.5 relative inline-block">
            4 mins read
          </span>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
