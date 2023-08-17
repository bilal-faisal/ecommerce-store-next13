"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useUser, useAuth } from "@clerk/nextjs";
import { cartActions } from "@/store/slice/cartSlice";
import Loader from "../../../public/Loading_icon.gif";
import { useSearchParams } from "next/navigation";

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

const Page = () => {
  const { isLoaded, isSignedIn } = useUser();
  const searchParams = useSearchParams();
  const clearCart = searchParams.get("clearCart");
  const router = useRouter();
  const dispatch = useDispatch();
  const { userId: user_id } = useAuth();

  // If the user status hasn't been determined yet, render nothing.
  if (!isLoaded) {
    return null;
  }

  // Once the user status is loaded, proceed with the logic.
  useEffect(() => {
    if (clearCart !== "ok") {
      if (!isSignedIn) {
        router.push("/sign-in");
      } else {
        router.push("/");
      }
      return;
    }

    const deleteDataIfNeeded = async () => {
      if (user_id) {
        await deleteData(user_id, dispatch);
      }
    };

    deleteDataIfNeeded();
  }, [clearCart, isSignedIn, user_id, router, dispatch]);

  if (!isSignedIn) {
    return <Image src={Loader} alt="Loader..." className="mx-auto" />;
  }

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

export default Page;
