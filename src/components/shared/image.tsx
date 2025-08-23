import Image, { StaticImageData } from "next/image";
import cn from "classnames";

interface Props {
  variant?: string;
  className?: string;
  width: string | number;
  height: string | number;
  src: string | StaticImageData;
  alt: string;
}

const ImageFill: React.FC<Props> = ({
  className,
  variant,
  width,
  height,
  src,
  alt,
  ...props
}) => {
  return (
    <div className={cn("relative md:inline-block overflow-hidden mx-auto")}>
      <div className="block w-full box-sizing">
        <svg
          className="block max-w-full h-auto"
          xmlns="http://www.w3.org/2000/svg"
          width={width}
          height={height}
          version="1.1"
        />
      </div>
      <Image
        src={src}
        alt={alt}
        width={0}
        height={0}
        sizes="100vw"
        priority // Add priority to optimize LCP
        className={cn(
          "absolute top-0 left-0 right-0 bottom-0 max-w-full max-h-full min-w-full object-cover",
          {
            "rounded-md": variant === "rounded",
          },
          className,
        )}
      />
    </div>
  );
};

export default ImageFill;
