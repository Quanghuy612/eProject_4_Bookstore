import React, { useReducer, useEffect } from "react";
import { CompareContext } from "./compareContext";
import { compareReducer } from "./compareReducer";
import { Product } from "@/services/types";

const initialState: Product[] =
  typeof window !== "undefined"
    ? JSON.parse(window.localStorage.getItem("compares") || "[]")
    : [];

export const CompareProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [compareList, dispatch] = useReducer(compareReducer, initialState);

  const addToCompare = (product: Product) =>
    dispatch({ type: "ADD_TO_COMPARE", product });
  const removeFromCompare = (productId: number) =>
    dispatch({ type: "REMOVE_COMPARE", productId });
  const clearCompare = () => dispatch({ type: "CLEAR_COMPARE" });

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("compares", JSON.stringify(compareList));
    }
  }, [compareList]);

  return (
    <CompareContext.Provider
      value={{ compareList, addToCompare, removeFromCompare, clearCompare }}
    >
      {children}
    </CompareContext.Provider>
  );
};
