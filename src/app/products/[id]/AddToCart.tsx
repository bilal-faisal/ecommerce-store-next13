"use client";
import React from "react";
import { BiMinus } from "react-icons/bi";
import { BsPlus } from "react-icons/bs";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AiOutlineShoppingCart } from "react-icons/ai";

async function addProduct(product_id: string, count: number) {
  try {
    const response = await fetch(`/api/cart`, {
      body: JSON.stringify({ product_id: product_id, quantity: count }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    if (!response.ok) {
      throw new Error("Something went wrong");
    } else {
      alert("Product added to cart");
    }
  } catch (e) {
    console.log(e);
  }
}

const AddToCart = ({ product_id }: { product_id: string }) => {
  let [count, setCount] = useState(1);
  return (
    <>
      <div className="flex items-center">
        <h4 className="font-bold pr-5">Quantity:</h4>

        <div
          className="text-lg p-1.5 bg-[#D7D7D9] rounded-full hover:cursor-pointer"
          onClick={() => count > 1 && setCount(count - 1)}
        >
          <BiMinus />
        </div>
        <div className="w-10 text-center">{count}</div>
        <div
          className="text-lg p-1 border-2 border-black rounded-full hover:cursor-pointer"
          onClick={() => count < 99 && setCount(count + 1)}
        >
          <BsPlus />
        </div>
      </div>
      <div className="flex items-center">
        <Button
          onClick={() => addProduct(product_id, count)}
          className="bg-[#212121] text-white font-semibold py-6 px-2 rounded-none w-[80%] md:w-[10rem] md:min-w-fit"
        >
          <AiOutlineShoppingCart className="text-3xl" />
          <span className="pl-4">Add to Cart</span>
        </Button>

        <h2 className="text-2xl font-semibold px-4">$292</h2>
      </div>
    </>
  );
};

export default AddToCart;
