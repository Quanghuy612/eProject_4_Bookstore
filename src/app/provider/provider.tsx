"use client";

import React from "react";
import { Provider } from "jotai";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider as NextThemesProvider } from "next-themes";

function Providers({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const queryClientRef = React.useRef<QueryClient | null>(null);

  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  return (
    <Provider>
      <QueryClientProvider client={queryClientRef.current}>
        <NextThemesProvider {...props}>{children}</NextThemesProvider>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </Provider>
  );
}

export default Providers;
