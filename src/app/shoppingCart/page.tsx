"use client";

import useCartStore, { cartSelectors } from "@/stores/shoppingCart";
import Image from "next/image";
import { X } from "lucide-react";
import IconButton from "@/components/IconButton/IconButton";
import { Text } from "@/components/ui/text";
import React from "react";
import Button from "@/components/ui/button";

export default function ShoppingCartPage() {
  const items = useCartStore(cartSelectors.selectItems);
  const itemsCount = useCartStore(cartSelectors.selectItemCount);
  const { removeItem } = useCartStore();
/* eslint-disable  @typescript-eslint/no-explicit-any */
  const Item = (item: any): React.ReactNode => {
    const { id, genre, name, description, price, image } = item?.item;

    return (
      <div className="border-b-1 border-[#c7c7c7] pb-2 mb-4 flex flex-row justify-between">
        
        <div className="flex flex-col md:flex-row gap-y-3 md:gap-x-3">
          <figure>
            <Image
              src={image}
              alt={`Image of product: ${name}`}
              width={200}
              height={200}
            />
          </figure>
          <div className="flex flex-col justify-between">
            <div>
              <Text weight={"semibold"} variant={"subtle"}>
                {genre.toUpperCase()}
              </Text>
              <Text as="span" weight={"bold"}>
                {name}
              </Text>
              <Text weight={"light"} variant={"subtle"} truncate={false}>
                {description}
              </Text>
            </div>

            <Text
              as="span"
              weight={"bold"}
              align={"right"}
              className="w-full block mt-10"
            >
              ${price}
            </Text>
          </div>
        </div>
        <IconButton
          icon={X}
          className="cursor-pointer"
          variant={"ghost"}
          onClick={() => removeItem(Number(id))}
        />
      </div>
    );
  };

  const Summary = () => {
    const itemsTotal = useCartStore(cartSelectors.selectFormattedTotal);
    return (
      <div className="rounded-lg overflow-hidden bg-white border border-[#c7c7c7] px-4 py-6 mt-10 h-fit">
        <div className="mb-6">
          <Text textStyle={"h5"} weight={"bold"}>
            Order Summary
          </Text>
          <Text>{itemsCount} items</Text>
        </div>

        {items.map((item) => (
          <div className="flex flex-row w-full justify-between " key={item.id}>
            <Text className="text-[#3b3b3b]">{item.name}</Text>
            <Text>${item.price}</Text>
          </div>
        ))}

        <div className="flex flex-row justify-between border-t-1 mt-6">
          <Text textStyle={"h5"}>Order Total</Text>
          <Text textStyle={"h5"} weight={"bold"}>
            {itemsTotal}
          </Text>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 ">
      <div className="mb-10">
        <Text textStyle={"h2"} weight={"bold"}>
          Shopping Carts
        </Text>
        <Text as="span">{itemsCount} items</Text>
      </div>
      <div className="flex flex-col md:flex-row justify-between">
        <div>
          {items.map((item) => {
            return <Item item={item} key={item.id} />;
          })}
        </div>

        <Summary />
      </div>
      <Button isLoading={false} fullWidth className="mt-10 cursor-pointer">
        Checkout
      </Button>
    </div>
  );
}
