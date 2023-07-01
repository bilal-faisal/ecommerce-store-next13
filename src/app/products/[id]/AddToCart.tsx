"use client";
import React from "react";
import { BiMinus } from "react-icons/bi";
import { BsPlus } from "react-icons/bs";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Alert from "@/components/Alert";
import {
  updateCartItemCountLocalStorageVariable,
  updateUserCartProductsLocalStorageVariable,
} from "@/components/CartUtils";

function updateLocalhost(product_id: string, count: number) {
  let initialUserCartProducts: { product_id: string; quantity: number }[] =
    JSON.parse(localStorage.getItem("userCartProducts") || "[]");

  let productFound = false;
  let updatedUserCartProducts = initialUserCartProducts.map((prod) => {
    if (prod.product_id == product_id) {
      productFound = true;
      return {
        product_id: prod.product_id,
        quantity: prod.quantity + count,
      };
    }
    return { product_id: prod.product_id, quantity: prod.quantity };
  });
  if (!productFound) {
    updatedUserCartProducts.push({ product_id, quantity: count });
  }
  updateUserCartProductsLocalStorageVariable(updatedUserCartProducts);

  if (!productFound) {
    updateCartItemCountLocalStorageVariable(updatedUserCartProducts.length);

    const cartCountChangeEvent = new Event("cartCountChange");
    window.dispatchEvent(cartCountChangeEvent);
  }
}

async function addProduct(
  product_id: string,
  count: number,
  setShowAlert: any
) {
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
      setShowAlert(true);
      updateLocalhost(product_id, count);
    }
  } catch (e) {
    console.log(e);
  }
}

const AddToCart = ({
  product_id,
  product_price,
}: {
  product_id: string;
  product_price: string;
}) => {
  let [count, setCount] = useState(1);
  let [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [showAlert]);
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
          onClick={() => addProduct(product_id, count, setShowAlert)}
          className="bg-[#212121] text-white font-semibold py-6 px-2 rounded-none w-[80%] md:w-[10rem] md:min-w-fit hover:bg-[#181818]"
        >
          <AiOutlineShoppingCart className="text-3xl" />
          <span className="pl-4">Add to Cart</span>
        </Button>
        {showAlert && <Alert message="Product added to cart" type="success" />}

        <h2 className="text-2xl font-semibold px-4">Rs {product_price}</h2>
      </div>
    </>
  );
};

export default AddToCart;
