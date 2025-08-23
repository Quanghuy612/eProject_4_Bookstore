import type { FC } from "react";

import ReviewCard from "@/components/cards/review-card";
import ReviewForm from "@/components/product/product-details/review-form";

const data = [
  {
    id: 1,
    rating: 4,
    title: " Aenean at consectetur felis",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam libero neque, sed sodales nulla facilisis quis. Praesent convallis eget dolor in pellentesque. Etiam in tincidunt metus",
    author: "Luhan Nguyen",
  },
  {
    id: 2,
    rating: 5,
    title: "Donec porttitor aliquam lobortis",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam libero neque, sed sodales nulla facilisis quis. Praesent convallis eget dolor in pellentesque. Etiam in tincidunt metus",
    author: "Luhan Nguyen",
  },
  {
    id: 3,
    rating: 3,
    title: "Pellentesque accumsan",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam libero neque, sed sodales nulla facilisis quis. Praesent convallis eget dolor in pellentesque. Etiam in tincidunt metus",
    author: "Luhan Nguyen",
  },
];

const ProductReview: FC = () => {
  return (
    <div className="lg:flex">
      <div className="pt-2">
        {data?.map((item) => (
          <ReviewCard item={item} key={`review-key-${item.id}`} />
        ))}
      </div>
      <ReviewForm className="lg:w-[500px] xl:w-[540px] 2xl:w-[600px] 3xl:w-[730px] lg:ltr:pl-10 lg:rtl:pr-10 xl:ltr:pl-14 xl:rtl:pr-14 3xl:ltr:pl-20 3xl:rtl:pr-20 shrink-0 pt-10" />
    </div>
  );
};

export default ProductReview;
