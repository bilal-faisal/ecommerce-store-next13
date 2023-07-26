"use client";
import Link from "next/link";
import React from "react";
import { useAuth } from "@clerk/nextjs";
import { useDispatch } from "react-redux";
import { cartActions } from "@/store/slice/cartSlice";

async function deleteData(user_id: string, dispatch: any) {
  if (user_id) {
    let req = await fetch(`/api/cart?user_id=${user_id}`, {
      method: "DELETE",
      cache: "no-cache",
    });
    if (!req.ok) {
      return { error: "Unexpected error" };
    } else {
      dispatch(cartActions.reset());
      return req;
    }
  }
}

const Success = async () => {
  const { userId: user_id } = useAuth();
  const dispatch = useDispatch();
  await deleteData(user_id as string, dispatch);
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

export default Success;
