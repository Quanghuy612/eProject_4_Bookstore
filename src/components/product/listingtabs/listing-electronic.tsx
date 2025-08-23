"use client";
import { LIMITS } from "@/services/utils/limits";
import ListingTabs from "@/components/product/listingtabs/listing-tabs";
import ProductListing from "@/components/product/listingtabs/product-listing";
import { useElectronicProductsQuery } from "@/services/product/get-all-electronic-products";
import { useElectronicCategoryQuery } from "@/services/product/get-electronic-category";
import { useState, useTransition } from "react";
import Loading from "@/components/shared/loading";

interface Props {
  showColLeft?: boolean;
  variant?: string | undefined;
}

const ListingElectronic: React.FC<Props> = ({
  showColLeft = false,
  variant = "default",
}) => {
  const [activeTab, setActiveTab] = useState(1);
  const [isPending, startTransition] = useTransition();

  const { data: categories } = useElectronicCategoryQuery({
    limit: LIMITS.ELETRONIC_PRODUCTS_LIMITS,
  });

  const { data: products, isLoading } = useElectronicProductsQuery({});

  const handleTabClick = (category: number) => {
    startTransition(() => {
      setActiveTab(category);
    });
  };

  return (
    <div className="mb-8 lg:mb-12">
      <div className="listing-tabs">
        <ListingTabs
          variant={variant}
          data={categories}
          onNavClick={handleTabClick}
          activeTab={activeTab}
        />
        {isPending ? (
          <Loading />
        ) : (
          <ProductListing
            data={products}
            isLoading={isLoading}
            variant={variant}
          />
        )}
      </div>
    </div>
  );
};
export default ListingElectronic;
