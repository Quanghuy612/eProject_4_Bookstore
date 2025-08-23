import { QueryOptionsType, Blog } from "@/services/types";
import { API_RESOURCES } from "@/services/utils/api-endpoints";
import http from "@/services/utils/http";
import shuffle from "lodash/shuffle";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

const fetchBlogPost = async () => {
  const { data } = await http.get(API_RESOURCES.BLOGDETAILS);
  return data;
};

const useBlogPostQuery = () => {
  return useQuery({
    queryKey: [API_RESOURCES.BLOGDETAILS],
    queryFn: () => fetchBlogPost(),
  });
};

export { useBlogPostQuery, fetchBlogPost };
