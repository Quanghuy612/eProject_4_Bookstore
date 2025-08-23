import { BsX } from "react-icons/bs";
import cn from "classnames";
import Container from "@/components/shared/container";

type HighlightedBarProps = {
  onClose?: (e: React.SyntheticEvent) => void;
  variant?: "dark" | "primary";
  className?: string;
};

const basedClasses = {
  dark: "bg-brand-dark",
  primary: "bg-gradient-to-r from-[#0f8e99] to-[#308eb0]",
};

export default function HighlightedBar({
  variant = "primary",
  onClose,
  children,
  className,
}: React.PropsWithChildren<HighlightedBarProps>) {
  return (
    <div className={cn(" w-full", basedClasses[variant], className)}>
      <Container>
        <div
          className={
            "z-50  min-h-[40px] py-3.5 px-4 md:px-6 lg:px-36  items-center justify-center relative"
          }
        >
          {children}
          <button
            onClick={onClose}
            aria-label="Close Button"
            className="absolute text-white top-2 flex items-center justify-center transition-colors duration-200 rounded-full outline-none w-7 md:w-8 h-7 md:h-8 right-0    hover:bg-brand-light/10 "
          >
            <BsX className="w-6 h-6" />
          </button>
        </div>
      </Container>
    </div>
  );
}
