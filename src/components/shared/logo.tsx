"use client";
import Link from "@/components/shared/link";
import cn from "classnames";
import { usePanel } from "@/contexts/usePanel";
import { colorMap } from "@/data/color-settings";
import { siteSettings } from "@/data/site-settings";
import React from "react";
import { useTheme } from "next-themes";
import SiteLogo from "@/components/icons/logo";
import { useIsMounted } from "@/utils/use-is-mounted";

interface Props {
  variant?: string;
  className?: string;
  href?: string;
}

const Logo: React.FC<Props> = ({
  className,
  variant,
  href = siteSettings.logo.href,
  ...props
}) => {
  const { selectedColor } = usePanel();
  const { theme } = useTheme();
  const mounted = useIsMounted();

  if (!mounted) {
    //Delay Rendering Until Hydration
    // Fallback during SSR and initial hydration
    return (
      <Link
        href={href}
        className={cn("inline-flex focus:outline-none", className)}
        {...props}
      >
        <SiteLogo color={colorMap["default"]?.text} /> {/* Default */}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={cn("inline-flex focus:outline-none ", className)}
      {...props}
    >
      {variant === "dark" || (theme && theme === "dark") ? (
        <SiteLogo variant={"dark"} color={colorMap[selectedColor]?.text} />
      ) : (
        <SiteLogo color={colorMap[selectedColor]?.text} />
      )}
    </Link>
  );
};

export default Logo;
