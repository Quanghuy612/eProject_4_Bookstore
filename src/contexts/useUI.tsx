"use client";

import React from "react";
import { CartProvider } from "./cart/cartContext";
import { ModalProvider } from "@/components/common/modal/modalContext";
import { WishlistProvider } from "@/contexts/wishlist/wishlistProvider";
import { CompareProvider } from "@/contexts/compare/compareProvider";

export interface State {
  isAuthorized: boolean;
  displaySidebar: boolean;
  displayFilter: boolean;
  displayCart: boolean;
  displaySearch: boolean;
  displayMobileSearch: boolean;
  displayDrawer: boolean;
  drawerView: string | null;
  toastText: string;
  isStickyheader: boolean;
  data?: unknown; // Changed from 'any' to 'unknown' for better type safety
}

const initialState = {
  isAuthorized: true,
  displaySidebar: false,
  displayFilter: false,
  displayCart: false,
  displaySearch: false,
  displayMobileSearch: false,
  displayDrawer: false,
  drawerView: null,
  toastText: "",
  isStickyheader: false,
  data: null,
};

type Action =
  | {
      type: "SET_AUTHORIZED";
    }
  | {
      type: "SET_UNAUTHORIZED";
    }
  | {
      type: "OPEN_SIDEBAR";
    }
  | {
      type: "CLOSE_SIDEBAR";
    }
  | {
      type: "OPEN_SEARCH";
    }
  | {
      type: "CLOSE_SEARCH";
    }
  | {
      type: "OPEN_MOBILE_SEARCH";
    }
  | {
      type: "CLOSE_MOBILE_SEARCH";
    }
  | {
      type: "OPEN_FILTER";
    }
  | {
      type: "CLOSE_FILTER";
    }
  | {
      type: "OPEN_DRAWER";
      data: null;
    }
  | {
      type: "CLOSE_DRAWER";
    }
  | {
      type: "SET_DRAWER_VIEW";
      view: DRAWER_VIEWS;
    };

type DRAWER_VIEWS = "CART_SIDEBAR" | "MOBILE_MENU" | "ORDER_DETAILS";

export const UseUI = React.createContext<State | any>(initialState);

UseUI.displayName = "UIContext";

function uiReducer(state: State, action: Action) {
  switch (action.type) {
    case "SET_AUTHORIZED": {
      return {
        ...state,
        isAuthorized: true,
      };
    }
    case "SET_UNAUTHORIZED": {
      return {
        ...state,
        isAuthorized: false,
      };
    }
    case "OPEN_SIDEBAR": {
      return {
        ...state,
        displaySidebar: true,
      };
    }
    case "CLOSE_SIDEBAR": {
      return {
        ...state,
        displaySidebar: false,
        drawerView: null,
      };
    }

    case "OPEN_SEARCH": {
      return {
        ...state,
        displaySearch: true,
      };
    }
    case "CLOSE_SEARCH": {
      return {
        ...state,
        displaySearch: false,
      };
    }
    case "OPEN_MOBILE_SEARCH": {
      return {
        ...state,
        displayMobileSearch: true,
      };
    }
    case "CLOSE_MOBILE_SEARCH": {
      return {
        ...state,
        displayMobileSearch: false,
      };
    }
    case "OPEN_FILTER": {
      return {
        ...state,
        displayFilter: true,
      };
    }
    case "CLOSE_FILTER": {
      return {
        ...state,
        displayFilter: false,
      };
    }
    case "OPEN_DRAWER": {
      return {
        ...state,
        displayDrawer: true,
        displaySidebar: false,
        data: action.data,
      };
    }
    case "CLOSE_DRAWER": {
      return {
        ...state,
        displayDrawer: false,
      };
    }
    case "SET_DRAWER_VIEW": {
      return {
        ...state,
        drawerView: action.view,
      };
    }
  }
}

export function UIProvider(props: React.PropsWithChildren<any>) {
  const [state, dispatch] = React.useReducer(uiReducer, initialState);

  const authorize = () => dispatch({ type: "SET_AUTHORIZED" });
  const unauthorize = () => dispatch({ type: "SET_UNAUTHORIZED" });
  const openSidebar = () => dispatch({ type: "OPEN_SIDEBAR" });
  const closeSidebar = () => dispatch({ type: "CLOSE_SIDEBAR" });

  const openFilter = () => dispatch({ type: "OPEN_FILTER" });
  const closeFilter = () => dispatch({ type: "CLOSE_FILTER" });

  const openSearch = () => dispatch({ type: "OPEN_SEARCH" });
  const closeSearch = () => dispatch({ type: "CLOSE_SEARCH" });
  const openMobileSearch = () => dispatch({ type: "OPEN_MOBILE_SEARCH" });
  const closeMobileSearch = () => dispatch({ type: "CLOSE_MOBILE_SEARCH" });
  const toggleMobileSearch = () =>
    state.displayMobileSearch
      ? dispatch({ type: "CLOSE_MOBILE_SEARCH" })
      : dispatch({ type: "OPEN_MOBILE_SEARCH" });
  const openDrawer = (data?: any) => dispatch({ type: "OPEN_DRAWER", data });
  const closeDrawer = () => dispatch({ type: "CLOSE_DRAWER" });

  const setDrawerView = (view: DRAWER_VIEWS) =>
    dispatch({ type: "SET_DRAWER_VIEW", view });

  const value = React.useMemo(
    () => ({
      ...state,
      authorize,
      unauthorize,
      openSidebar,
      closeSidebar,
      openFilter,
      closeFilter,
      openDrawer,
      closeDrawer,
      openSearch,
      closeSearch,
      openMobileSearch,
      closeMobileSearch,
      toggleMobileSearch,
      setDrawerView,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state],
  );
  return <UseUI.Provider value={value} {...props} />;
}

export const useUI = () => {
  const context = React.useContext(UseUI);
  if (context === undefined) {
    throw new Error(`useUI must be used within a UIProvider`);
  }
  return context;
};

export function ManagedUIContext({ children }: React.PropsWithChildren<{}>) {
  return (
    <CartProvider>
      <WishlistProvider>
        <CompareProvider>
          <UIProvider>
            <ModalProvider>{children}</ModalProvider>
          </UIProvider>
        </CompareProvider>
      </WishlistProvider>
    </CartProvider>
  );
}
