import { cn } from "@/utils/utils";
import Image from "next/image";
import { Text } from "../ui/text";
import Button from "../ui/button";

interface GameCardProps {
  title: string;
  genre: string;
  price: number;
  imageUrl: string;
  imageAlt?: string;
  onAddToCart?: () => void;
  className?: string;
}

const GameCard = ({
  title,
  genre,
  price,
  imageUrl,
  imageAlt = "Game Over",
  onAddToCart,
  className,
}: GameCardProps) => {
  return (
    <div
      className={cn(
        "w-[240px] rounded-lg overflow-hidden bg-white border border-[#8F8F8F] hover:border-2 p-3",
        className
      )}
    >
      <div className="relative w-full h-[180px] bg-gray-100">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover rounded-xs"
          sizes="240px"
        />
      </div>
      <div className="py-4 space-y-3">
        <Text
          textStyle="caption"
          variant="muted"
          className="uppercase tracking-wider"
          weight='bold'
          color="#dcdcdc"
        >
          {genre}
        </Text>
      </div>
      <div className="flex items-center justify-between my-1">
        <Text textStyle="bodySmall" weight="bold" className="text-gray-700">
          {title}
        </Text>
        <Text textStyle="bodySmall" weight="bold" className="text-gray-900">
          ${price}
        </Text>
      </div>
      <Button
        variant="outline"
        fullWidth
        onClick={onAddToCart}
        className="h-10 text-sm font-medium cursor-pointer font-bold"
        isLoading={false}
      >
        ADD TO CART
      </Button>
    </div>
  );
};

export default GameCard;
