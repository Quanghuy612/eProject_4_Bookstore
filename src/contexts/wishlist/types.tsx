import { Product } from "@/services/types";

export interface WishlistContextType {
  wishlistList: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;
}
