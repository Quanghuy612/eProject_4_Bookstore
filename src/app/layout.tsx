import type { Metadata } from "next";
import { Bai_Jamjuree } from "next/font/google";
import "./globals.css";

import ModalManaged from "@/components/common/modal/modalManaged";
import { ManagedUIContext } from "@/contexts/useUI";
import { ColorProvider } from "@/contexts/usePanel";
import Providers from "@/app/provider/provider";
import DrawerManaged from "@/components/common/drawer/drawerManaged";
import PanelSidebar from "@/components/panel/panel-sidebar";

const bai_jamjuree = Bai_Jamjuree({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    template: "Uminex | %s",
    default: "Uminex",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body className={`${bai_jamjuree.className}  antialiased`}>
        <Providers
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ColorProvider>
            <ManagedUIContext>
              {children}
              <PanelSidebar />
              <ModalManaged />
              <DrawerManaged />
            </ManagedUIContext>
          </ColorProvider>
        </Providers>
      </body>
    </html>
  );
}
