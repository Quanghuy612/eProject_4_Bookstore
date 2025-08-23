"use client";
import { forwardRef, useState } from "react";
import cn from "classnames";
import { useSearchQuery } from "@/services/product/use-search";
import SearchForm from "@/components/top-search/search-form";
import SearchCard from "@/components/top-search/search-card";
import SearchResultLoader from "@/components/shared/loaders/search-result-loader";
import useBodyScroll from "@/utils/use-body-scroll";
import Scrollbar from "@/components/shared/scrollbar";
import { useUI } from "@/contexts/useUI";
import { ROUTES } from "@/utils/routes";
import { useRouter } from "next/navigation";

type Props = {
  className?: string;
  searchId?: string;
  variant?: "border" | "dark";
};

const Search = forwardRef<HTMLDivElement, Props>(
  (
    {
      className = "md:w-[710px]",
      searchId = "search-header",
      variant = "border",
    },
    ref,
  ) => {
    const {
      displayMobileSearch,
      closeMobileSearch,
      displaySearch,
      closeSearch,
    } = useUI();
    const [queryText, setQueryText] = useState("");
    const [inputFocus, setInputFocus] = useState<boolean>(false);
    const { data: searchResults, isLoading } = useSearchQuery({
      text: queryText,
    });
    const router = useRouter();

    useBodyScroll(inputFocus === true || displaySearch || displayMobileSearch);
    function handleSearch(e: React.SyntheticEvent) {
      e.preventDefault();
      clear();
      const route = `${ROUTES.SEARCH}?q=${queryText}`;
      router.push(route);
    }
    function handleAutoSearch(e: React.FormEvent<HTMLInputElement>) {
      setQueryText(e.currentTarget.value);
    }
    function clear() {
      setQueryText("");
      setInputFocus(false);
      closeMobileSearch();
      closeSearch();
    }
    function enableInputFocus() {
      setInputFocus(true);
    }

    return (
      <div
        ref={ref}
        className={cn(
          "w-full transition-all duration-200 ease-in-out",
          className,
        )}
      >
        <div
          className={cn(
            "overlay cursor-pointer invisible w-full h-full opacity-0 flex top-0 ltr:left-0 rtl:right-0 transition-all duration-300 fixed",
            {
              open: displayMobileSearch,
              "input-focus-overlay-open": inputFocus === true,
              "open-search-overlay": displaySearch,
            },
          )}
          onClick={() => clear()}
        />
        {/* End of overlay */}

        <div className="relative z-30 flex flex-col justify-center w-full shrink-0">
          <div className="flex flex-col w-full mx-auto">
            <SearchForm
              searchId={searchId}
              name={searchId}
              value={queryText}
              onSubmit={handleSearch}
              onChange={handleAutoSearch}
              onClear={clear}
              onFocus={() => enableInputFocus()}
              variant={variant}
            />
          </div>
          {/* End of searchbox */}

          {queryText.length > 2 && (
            <div className="w-full absolute top-[50px] ltr:left-0 rtl:right-0 bg-white rounded-md  overflow-hidden drop-shadow-dropDown z-10">
              <Scrollbar>
                <div className="w-full max-h-[384px]">
                  {(() => {
                    if (isLoading) {
                      return Array.from({ length: 5 }).map((_, idx) => (
                        <div
                          key={`search-form-loader-key-${idx}`}
                          className="py-3 ltr:pl-5 rtl:pr-5 ltr:pr-10 rtl:pl-10"
                        >
                          <SearchResultLoader
                            key={idx}
                            uniqueKey={`search-form-${idx}`}
                          />
                        </div>
                      ));
                    }
                    // Check if data is empty
                    if (!searchResults || searchResults.length === 0) {
                      return (
                        <div className="text-lg py-20  min-h-60 text-center ">
                          Not found! Try with another keyword.
                        </div>
                      );
                    }

                    return searchResults?.map((item: any, index: number) => (
                      <div
                        key={`search-form-key-${index}`}
                        className="py-3 ps-4 pe-10 border-b border-black/5  hover:bg-gray-100"
                        onClick={clear}
                      >
                        <SearchCard product={item} key={index} />
                      </div>
                    ));
                  })()}
                </div>
              </Scrollbar>
            </div>
          )}
          {/* End of search result */}
        </div>
      </div>
    );
  },
);

Search.displayName = "Search";
export default Search;
