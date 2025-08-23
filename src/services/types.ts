export type CategoriesQueryOptionsType = {
  text?: string;
  category?: string;
  status?: string;
  limit?: number;
};

export type QueryOptionsType = {
  text?: string;
  category?: string;
  status?: string;
  limit?: number;
  sort_by?: string; // Added for newQuery
};

export type Attachment = {
  id: string | number;
  thumbnail: string;
  original: string;
};
export type Category = {
  id: number | string;
  name: string;
  slug: string;
  image?: Attachment;
  children?: [Category];
  products?: Product[];
  productCount?: number;
  [key: string]: unknown;
};

export type Tag = {
  id: string | number;
  name: string;
  slug: string;
};
export type Product = {
  id: number | string;
  name: string;
  slug: string;
  price: number;
  quantity?: number;
  sold: number;
  videoUrl: string;
  unit: string;
  sale_price?: number;
  min_price?: number;
  max_price?: number;
  image: Attachment;
  sku?: string;
  gallery?: Attachment[];
  category?: Category;
  tag?: Tag[];
  meta?: never[];
  brand: string;
  description?: string;
  variations?: object;
  rating: number;
  discountPercentage: number;
  weight: number;
  [key: string]: unknown;
};

export type Variation = {
  id?: number;
  name?: string;
  price?: number;
  sale_price?: number;
  quantity?: number;
  sku?: string;
  options?: object;
};
// Define types based on the new data structure
export interface Option {
  name: string;
  value: string;
}

export interface VariationOption {
  id: number;
  title: string;
  price: number;
  sale_price: number | null;
  quantity: number;
  is_disable: number;
  sku: string;
  options: Option[];
}

export type OrderItem = {
  id: number | string;
  name: string;
  image: Attachment;
  price: number;
  quantity: number;
};

export type Order = {
  id: string | number;
  name: string;
  slug: string;
  products: OrderItem[];
  total: number;
  tracking_number: string;
  customer: {
    id: number;
    email: string;
  };
  shipping_fee: number;
  payment_gateway: string;
};

export type Blog = {
  id: number | string;
  title: string;
  subTitle: string;
  shortDescription: string;
  authorName: string;
  date: string;
  totalWatchCount?: number;
  totalCommentCount?: number;
  titleTwo: string;
  category: string;
  image: string;
  sku?: string;
  content?: string;
  contentTwo?: string;
  contentThree?: string;
  quote: {
    content: string;
  };
  postList?: object;
  discount?: object;
  tags?: Tag;
  comments?: object;
  [key: string]: unknown;
};

export type MenutopType = {
  id: number;
  path: string;
  label: string;
};

export type MainMenuType = {
  id: number;
  path: string;
  label: string;
  type: string;
  mega_categoryCol: number;
  mega_bannerMode: string;
  mega_bannerImg: string;
  mega_bannerUrl: string;
  mega_contentBottom: string;
  subMenu: SubMenuType[];
};

export type SubMenuType = {
  id: number;
  path: string;
  label: string;
  image?: Attachment;
  subMenu?: SubMenuType[];
};

export type ThemeMode = "light" | "dark";
export type TabType = "COLOR" | "LAYOUT" | "THEME";
