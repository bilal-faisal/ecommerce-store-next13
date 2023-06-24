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
import { useState } from "react";
import Link from "next/link";

export function Header() {
  const [navbar, setNavbar] = useState(false);
  return (
    <div className="w-full">
      <NavigationMenu className="pt-8">
        <div className="px-6 md:items-center md:flex w-full md:w-fit justify-between">
          <div className="flex items-center py-3">
            <div className="w-full">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href={"/"}>
                    <Image src={Logo} alt="Logo" className="mx-5" />
                  </Link>
                </NavigationMenuItem>
                <div className="md:hidden">
                  <button
                    className="p-2  text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                    onClick={() => setNavbar(!navbar)}
                  >
                    {navbar ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-black"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </NavigationMenuList>
            </div>
          </div>

          <div>
            <div
              className={`h-[90vh] md:h-fit w-full flex justify-center items-center pb-4 mt-4 md:block md:pb-0 md:mt-0 ${
                navbar ? "block" : "hidden"
              }`}
            >
              <NavigationMenuList className="flex-col md:flex-row px-10 flex-shrink">
                <NavigationMenuItem>
                  <Link href={"/female"} onClick={() => setNavbar(false)}>
                    <p className="my-1 md:my-0">Female</p>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href={"/male"} onClick={() => setNavbar(false)}>
                    <p className="my-1 md:my-0">Male</p>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href={"/kids"} onClick={() => setNavbar(false)}>
                    <p className="my-1 md:my-0">Kids</p>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href={"/products"} onClick={() => setNavbar(false)}>
                    <p className="mt-1 mb-2 md:my-0">All Products</p>
                  </Link>
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
                  <Link href={"/cart"} onClick={() => setNavbar(false)}>
                    <Button className="my-2 md:my-0 relative bg-gray-200 text-black hover:bg-gray-300 hover:text-black  text-xl rounded-full p-2.5">
                      <AiOutlineShoppingCart />
                      <span className="cart-item-count absolute top-0.5 right-0 bg-red-500 text-white text-xs rounded-full h-3 w-3 flex items-center justify-center">
                        {/* 1 */}
                      </span>
                    </Button>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </div>
          </div>
        </div>
      </NavigationMenu>
    </div>
  );
}
