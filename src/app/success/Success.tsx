"use client";
import Link from "next/link";
import React from "react";
// import Cookie from "js-cookie";
import { useAuth } from "@clerk/nextjs";
import {
  updateCartItemCountLocalStorageVariable,
  updateUserCartProductsLocalStorageVariable,
} from "@/components/CartUtils";

async function deleteData(user_id:string) {
  // const user_id = Cookie.get("user_id");

  if (user_id) {
    let req = await fetch(`/api/cart?user_id=${user_id}`, {
      method: "DELETE",
      cache: "no-cache",
    });
    if (!req.ok) {
      return { error: "Unexpected error" };
    } else {
      updateCartItemCountLocalStorageVariable(0);
      updateUserCartProductsLocalStorageVariable([]);

      const cartCountChangeEvent = new Event("cartCountChange");
      window.dispatchEvent(cartCountChangeEvent);
      return req;
    }
  }
}


const Success = async () => {
    const { userId: user_id } = useAuth();
    await deleteData(user_id as string);
    return (
      <div className="my-14 px-10 md:px-24 lg:px-32">
        <h2 className="py-3">Your order has been placed successfully</h2>
        <p>
          Go to{" "}
          <Link href={"/"} className="underline">
            Home
          </Link>
        </p>
      </div>
    );
}

export default Success