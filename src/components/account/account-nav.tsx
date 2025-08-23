"use client";

import { usePathname } from "next/navigation";
import { useLogoutMutation } from "@/services/auth/use-logout";
import Link from "@/components/shared/link";
import { usePanel } from "@/contexts/usePanel";
import { colorMap } from "@/data/color-settings";
import cn from "classnames";

type Option = {
  name: string;
  slug: string;
};

export default function AccountNav({ options }: { options: Option[] }) {
  const { mutate: logout } = useLogoutMutation();
  const pathname = usePathname();
  const { selectedColor } = usePanel();

  return (
    <nav className="flex flex-col md:flex-row  border-b  border-border-base bg-white space-x-4 md:space-x-8">
      {options.map((item, index) => {
        return (
          <Link
            key={index}
            href={item.slug}
            className={cn(
              "relative  flex items-center cursor-pointer text-sm lg:text-base py-3.5",
              colorMap[selectedColor].hoverLink,
              pathname != item.slug
                ? "font-medium text-gray-500"
                : colorMap[selectedColor].link +
                    " " +
                    colorMap[selectedColor].border +
                    " border-b-2 font-semibold",
            )}
          >
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}
