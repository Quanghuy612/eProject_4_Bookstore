import React from "react";
import ThumbnailCarousel from "@/components/shared/carousel/thumbnail-carousel";
import Image from "@/components/shared/image";
import { Product } from "@/services/types";
import cn from "classnames";
import { productPlaceholder } from "@/assets/placeholders";
interface GalleryProps {
  className?: string;
  data?: Product; // Adjust based on your actual data structure
}
const ProductGallery: React.FC<GalleryProps> = ({ data, className }) => {
  return (
    <div className={cn("mb-6 overflow-hidden  md:mb-8 lg:mb-0", className)}>
      {!!data?.gallery?.length ? (
        <ThumbnailCarousel
          gallery={data?.gallery}
          videoUrl={data?.videoUrl}
          thumbnailClassName="xl:w-full"
          galleryClassName="xl:w-[100px]"
        />
      ) : (
        <div className="flex items-center justify-center w-auto">
          <Image
            src={data?.image?.original ?? productPlaceholder}
            alt={data?.name ?? "product name"}
            width={900}
            height={680}
          />
        </div>
      )}
    </div>
  );
};
export default ProductGallery;
