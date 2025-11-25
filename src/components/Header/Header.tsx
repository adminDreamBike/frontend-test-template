import Link from "next/link";
import IconButton from "../IconButton/IconButton";
import { Text } from "../ui/text";
import { ShoppingCart } from "lucide-react";

const Header = () => {
  return (
    <div className="bg-[#eeeeee] h-14 p-6 flex justify-between">
        <Link href={'/'} className="self-center ">
        <Text variant="muted" weight={"semibold"} className="text-lg self-center">
        GamerShop
      </Text>
        </Link>
      
      <Link href={"/shoppingCart"} className="self-center ">
        <IconButton
          icon={ShoppingCart}          
          label="link shopping cart"
          className="cursor-pointer"
        />
      </Link>
    </div>
  );
};

export default Header;
