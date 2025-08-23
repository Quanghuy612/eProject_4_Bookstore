import cn from "classnames";
import Image from "@/components/shared/image";
import Link from "@/components/shared/link";
import { Blog } from "@/services/types";
import { productPlaceholder } from "@/assets/placeholders";
import { ROUTES } from "@/utils/routes";
import { getCountview } from "@/utils/get-countview";
import { BsArrowRight, BsClock } from "react-icons/bs";
import { usePanel } from "@/contexts/usePanel";
import { colorMap } from "@/data/color-settings";

interface BlogProps {
  blog: Blog;
  className?: string;
}

const BlogCardList: React.FC<BlogProps> = ({ blog, className }) => {
  const { title, image, totalWatchCount, slug, date, shortDescription } =
    blog ?? {};
  const { selectedColor } = usePanel();
  return (
    <article
      className={cn(
        "flex flex-col sm:flex-row blog-card overflow-hidden w-full bg-white rounded",
        className,
      )}
      title={title}
    >
      <div className="relative flex-shrink-0 w-[360px] lg:w-[400px]">
        <Link href={`${ROUTES.BLOG}/${slug}`} className="text-skin-base ">
          <div className="card-img-container flex overflow-hidden  mx-auto relative hover:opacity-80">
            <Image
              src={image ?? productPlaceholder}
              alt={title || "Product Image"}
              width={720}
              height={430}
            />
          </div>
        </Link>
      </div>

      <div className="flex flex-col justify-center py-5 px-5 sm:px-8 h-full overflow-hidden relative">
        <h4 className={"font-medium text-xl  mb-3.5 "}>
          <Link
            href={`${ROUTES.BLOG}/${slug}`}
            className={cn(
              "text-brand-dark line-clamp-2 ",
              colorMap[selectedColor].hoverLink,
            )}
          >
            {title}
          </Link>
        </h4>
        <div className="text-15px leading-6 mb-5 lg:mb-8 text-gray-500">
          {shortDescription}
        </div>
        <div className={"flex justify-between"}>
          <div className="entry-meta text-13px text-gray-500 flex items-center">
            <span className="post-on pe-2.5 relative flex items-center gap-1.5">
              <BsClock className="transition " />
              {date}
            </span>
            <span className="has-dot px-2.5 relative">
              {getCountview(totalWatchCount)} Views
            </span>
          </div>
          <Link
            href={`${ROUTES.BLOG}/${slug}`}
            className={cn(
              " rounded text-brand-light px-4 lg:px-5 py-2 xs:hover:text-brand-light text-13px flex items-center gap-1.5",
              "bg-brand-dark",
              colorMap[selectedColor].hoverBg,
            )}
          >
            Read More
            <BsArrowRight className={`rtl:rotate-180`} />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogCardList;
