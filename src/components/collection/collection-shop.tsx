"use client";

import CollectionShopCard from "@/components/collection/collection-shop-card";
import SectionHeader from "@/components/common/section-header";
import useWindowSize from "@/utils/use-window-size";
import Carousel from "@/components/shared/carousel/carousel";
import { SwiperSlide } from "@/components/shared/carousel/slider";
import { ROUTES } from "@/utils/routes";

const data = [
  {
    id: 1,
    slug: "veadrom",
    image: "/assets/images/category/collection_1.png",
    title: "Beadrom",
  },
  {
    id: 2,
    slug: "accessories",
    image: "/assets/images/category/collection_2.png",
    title: "Home Accessories",
  },
  {
    id: 3,
    slug: "sectional",
    image: "/assets/images/category/collection_3.png",
    title: "Sectional Sofas",
  },
  {
    id: 4,
    slug: "home-kitchen",
    image: "/assets/images/category/collection_4.png",
    title: "Dining & Kitchen",
  },
  {
    id: 5,
    slug: "lighting-decor",
    image: "/assets/images/category/collection_5.png",
    title: "Decor & Lighting",
  },
];

interface Props {
  className?: string;
  headingPosition?: "left" | "center";
}

const breakpoints = {
  "1024": {
    slidesPerView: 4,
  },
  "768": {
    slidesPerView: 3,
  },
  "540": {
    slidesPerView: 2,
  },
  "0": {
    slidesPerView: 2,
  },
};

const CollectionShop: React.FC<Props> = ({
  className = "mb-12 lg:mb-14 xl:mb-16 2xl:mb-20 pb-1 lg:pb-0 3xl:pb-2.5",
  headingPosition = "center",
}) => {
  const { width } = useWindowSize();
  return (
    <div className={className}>
      <SectionHeader
        sectionHeading="Shop By Category"
        sectionSubHeading="The best quality products are waiting for you & choose it now."
        headingPosition={headingPosition}
      />
      {width! < 1200 ? (
        <Carousel
          breakpoints={breakpoints}
          prevActivateId="collection-carousel-button-prev"
          nextActivateId="collection-carousel-button-next"
        >
          {data?.map((item) => (
            <SwiperSlide key={`collection-key-${item.id}`}>
              <CollectionShopCard
                key={item.id}
                collection={item}
                href={`${ROUTES.CATEGORIES}/${item.slug}`}
              />
            </SwiperSlide>
          ))}
        </Carousel>
      ) : (
        <div className="gap-5 xl:grid xl:grid-cols-5 ">
          {data?.map((item) => (
            <CollectionShopCard
              key={item.id}
              collection={item}
              href={`${ROUTES.CATEGORIES}/${item.slug}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CollectionShop;
