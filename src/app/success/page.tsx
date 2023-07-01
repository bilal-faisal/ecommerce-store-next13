"use client";
import Link from "next/link";
import React from "react";
import Cookie from "js-cookie";
import { updateCartItemCount } from "@/components/CartUtils";

// function getUserId() {
//   const user_id = Cookie.get("user_id");
//   if (!user_id) {
//     return { user_id: null };
//   }
//   return { user_id };
// }
async function deleteData() {
  const user_id = Cookie.get("user_id");
  if (user_id) {
    let req = await fetch(`/api/cart?user_id=${user_id}`, {
      method: "DELETE",
      cache: "no-cache",
    });
    if (!req.ok) {
      return { error: "Unexpected error" };
    } else {
      updateCartItemCount(0);

      const cartCountChangeEvent = new Event("cartCountChange");
      window.dispatchEvent(cartCountChangeEvent);
      return req;
    }
  }
}

const page = async () => {
  await deleteData();
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
};

export default page;
