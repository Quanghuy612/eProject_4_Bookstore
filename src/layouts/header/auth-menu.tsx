import Link from "@/components/shared/link";
import cn from "classnames";

interface Props {
  className?: string;
  href: string;
}

export default function AuthMenu({
  className,
  href,
  children,
}: React.PropsWithChildren<Props>) {
  return (
    <Link
      href={href}
      className={cn("text-sm font-normal focus:outline-none", className)}
    >
      {children}
    </Link>
  );
}
