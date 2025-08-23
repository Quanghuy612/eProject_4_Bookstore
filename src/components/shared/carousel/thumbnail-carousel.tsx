import {
  Navigation,
  Swiper,
  SwiperOptions,
  SwiperSlide,
  Thumbs,
} from "@/components/shared/carousel/slider";
import Image from "@/components/shared/image";
import { useRef, useState } from "react";
import cn from "classnames";
import { productGalleryPlaceholder } from "@/assets/placeholders";
import ImageLightBox from "@/components/shared/image-lightbox";
import { useModalAction } from "@/components/common/modal/modalContext";
import { usePanel } from "@/contexts/usePanel";
import { colorMap } from "@/data/color-settings";
import { IoPlay } from "react-icons/io5";

interface Props {
  gallery: any[];
  thumbnailClassName?: string;
  galleryClassName?: string;
  videoUrl?: string;
}

// product gallery breakpoints
const galleryCarouselBreakpoints: { [key: number]: SwiperOptions } = {
  1280: {
    slidesPerView: 5,
    direction: "vertical",
  },
  767: {
    slidesPerView: 4,
    direction: "horizontal",
  },
  0: {
    slidesPerView: 3,
    direction: "horizontal",
  },
};

const swiperParams: SwiperOptions = {
  slidesPerView: 1,
  spaceBetween: 0,
};

const ThumbnailCarousel: React.FC<Props> = ({
  gallery,
  videoUrl,
  thumbnailClassName = "xl:w-[500px]",
  galleryClassName = "xl:w-[100px]",
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const dir = "ltr" as string;
  const { openModal } = useModalAction();
  const { selectedColor } = usePanel();

  const renderCirclePlay = () => {
    return (
      <div className={"absolute z-1 top-0 left-0 group m-5  "}>
        <div
          className={cn(
            "flex justify-center items-center   text-white w-15 h-15  rounded-full border-1 border-white890",
            colorMap[selectedColor].bg,
            colorMap[selectedColor].hoverBg,
          )}
          onClick={() => openModal("PRODUCT_VIDEO", videoUrl)}
        >
          <IoPlay className={cn("w-6 h-6")} />
        </div>
      </div>
    );
  };

  return (
    <div className="w-full xl:flex xl:flex-row-reverse relative ">
      <ImageLightBox gallery={gallery} />
      <div
        className={cn(
          "w-full xl:ltr:ml-5 xl:rtl:mr-5  overflow-hidden rounded-md relative",
          thumbnailClassName,
        )}
      >
        <Swiper
          id="productGallery"
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[Navigation, Thumbs]}
          navigation={{
            prevEl: prevRef.current!, // Assert non-null
            nextEl: nextRef.current!, // Assert non-null
          }}
          {...swiperParams}
        >
          {gallery?.map((item: any) => (
            <SwiperSlide
              key={`product-gallery-${item.id}`}
              className="flex items-center justify-center"
            >
              <Image
                src={item?.original ?? productGalleryPlaceholder}
                alt={`Product gallery ${item.id}`}
                width={650}
                height={590}
                className="mx-auto rounded-lg"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* End of product main slider */}

      <div className={` shrink-0 ${galleryClassName}`}>
        <Swiper
          id="productGalleryThumbs"
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          watchSlidesProgress={true}
          freeMode={true}
          effect={"slide"}
          breakpoints={galleryCarouselBreakpoints}
        >
          {gallery?.map((item: any, index: number) => {
            const isFirstItem = index === 0;
            return (
              <SwiperSlide
                key={`product-thumb-gallery-${item.id}`}
                className=" cursor-pointer rounded overflow-hidden border border-border-base transition hover:opacity-75"
              >
                <Image
                  src={item?.thumbnail ?? productGalleryPlaceholder}
                  alt={`Product thumb gallery ${item.id}`}
                  width={170}
                  height={170}
                />
                {isFirstItem && videoUrl && renderCirclePlay()}
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default ThumbnailCarousel;
