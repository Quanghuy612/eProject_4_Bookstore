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

const BlogCardBig: React.FC<BlogProps> = ({ blog, className }) => {
  const { title, image, totalWatchCount, slug, date, shortDescription } =
    blog ?? {};
  const { selectedColor } = usePanel();
  return (
    <article
      className={cn(
        "blog-card overflow-hidden w-full bg-white rounded-md p-4 xl:p-5",
        className,
      )}
      title={title}
    >
      <div className="relative ">
        <Link href={`${ROUTES.BLOG}/${slug}`} className="text-skin-base ">
          <div className="card-img-container flex overflow-hidden  mx-auto  relative hover:opacity-80">
            <Image
              src={image ?? productPlaceholder}
              alt={title || "Product Image"}
              width={1020}
              height={430}
            />
          </div>
        </Link>
      </div>

      <div className="justify-center py-5 sm:py-8 relative">
        <h4 className={"font-semibold text-xl lg:text-2xl mb-5"}>
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
        <div className="text-15px leading-6 mb-6 text-gray-500">
          {shortDescription}
        </div>
        <div className={"flex justify-between items-center"}>
          <div className="entry-meta text-13px text-gray-500 flex">
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
              colorMap[selectedColor].bg,
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

export default BlogCardBig;
