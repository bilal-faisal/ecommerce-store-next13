"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Logo from "/public/logo.png";

export function Header() {
  return (
    <NavigationMenu className="pt-8">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Image src={Logo} alt="Logo" className="mr-5" />
        </NavigationMenuItem>
        <NavigationMenuItem>
          <p>Female</p>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <p>Male</p>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <p>Kids</p>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <p>All Products</p>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <div className="flex border rounded-lg border-black h-8 items-center">
            <Button className="bg-white text-black hover:bg-white hover:text-black h-6 pr-1.5 mr-0">
              <BiSearch />
            </Button>
            <Input
              type="text"
              placeholder="What you looking for"
              className="border-none h-6"
            />
          </div>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Button className="bg-gray-200 text-black hover:bg-gray-300 hover:text-black  text-xl rounded-full p-2.5">
            <AiOutlineShoppingCart />
            <span className="cart-item-count absolute top-0.5 right-0 bg-red-500 text-white text-xs rounded-full h-3 w-3 flex items-center justify-center">
              1
            </span>
          </Button>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
