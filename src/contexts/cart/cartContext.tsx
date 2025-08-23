"use client";

import React, { useCallback } from "react";
import { cartReducer, State, initialState } from "./cartReducer";
import { Item, getItem, inStock } from "./cartUtils";
import { useLocalStorage } from "@/utils/use-local-storage";

// Define the interface for the cart provider state
interface CartProviderState extends State {
  addItemToCart: (item: Item, quantity: number) => void;
  removeItemFromCart: (id: Item["id"]) => void;
  clearItemFromCart: (id: Item["id"]) => void;
  getItemFromCart: (id: Item["id"]) => Item | undefined; // Changed 'any' to proper type
  isInCart: (id: Item["id"]) => boolean;
  isInStock: (id: Item["id"]) => boolean;
  resetCart: () => void;
}

// Create context with proper typing
export const cartContext = React.createContext<CartProviderState | undefined>(
  undefined,
);
cartContext.displayName = "CartContext";

// Custom hook for using cart context
export const useCart = (): CartProviderState => {
  const context = React.useContext(cartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

// CartProvider component
export function CartProvider(props: React.PropsWithChildren<{}>) {
  // Improved props typing
  const [savedCart, saveCart] = useLocalStorage(
    "uminex-cart",
    JSON.stringify(initialState),
  );

  // Handle potential parsing errors and provide fallback
  let initialCartState: State;
  try {
    initialCartState = savedCart ? JSON.parse(savedCart) : initialState;
  } catch (error) {
    console.error("Error parsing saved cart:", error);
    initialCartState = initialState;
  }

  const [state, dispatch] = React.useReducer(cartReducer, initialCartState);

  // Save cart to localStorage when state changes
  React.useEffect(() => {
    saveCart(JSON.stringify(state));
  }, [state, saveCart]);

  // Cart actions
  const addItemToCart = (item: Item, quantity: number) => {
    dispatch({ type: "ADD_ITEM_WITH_QUANTITY", item, quantity });
  };

  const removeItemFromCart = (id: Item["id"]) =>
    dispatch({ type: "REMOVE_ITEM_OR_QUANTITY", id });

  const clearItemFromCart = (id: Item["id"]) =>
    dispatch({ type: "REMOVE_ITEM", id });

  const isInCart = useCallback(
    (id: Item["id"]) => !!getItem(state.items, id),
    [state.items],
  );

  const getItemFromCart = useCallback(
    (id: Item["id"]) => getItem(state.items, id),
    [state.items],
  );

  const isInStock = useCallback(
    (id: Item["id"]) => inStock(state.items, id),
    [state.items],
  );

  const resetCart = () => dispatch({ type: "RESET_CART" });

  const value = React.useMemo(
    () => ({
      ...state,
      addItemToCart,
      removeItemFromCart,
      clearItemFromCart,
      getItemFromCart,
      isInCart,
      isInStock,
      resetCart,
    }),
    [getItemFromCart, isInCart, isInStock, state],
  );

  return <cartContext.Provider value={value} {...props} />;
}
