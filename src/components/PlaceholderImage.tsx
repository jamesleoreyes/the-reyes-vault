import Image from "next/image";
import { assets } from "@/configs/app";
import { cn } from "@/lib/styles";

interface PlaceholderProps {
  className?: string;
}

function PlaceholderImage({ className }: PlaceholderProps) {
  return (
    <Image
      src={assets.images.placeholder}
      width={100}
      height={100}
      alt="Placeholder image"
      className={cn("absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale", className)}
    />
  );
};

export { PlaceholderImage };