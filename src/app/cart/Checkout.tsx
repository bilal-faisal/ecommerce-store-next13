"use client";
import type { Image as IImage } from "sanity";
import getStripePromise from "@/lib/stripe";

interface Product {
  title: string;
  price: string;
  image_thumbnail: IImage;
  quantity: number;
}

const Checkout = ({ products }: { products: Product[] }) => {
  const handleCheckout = async () => {
    console.log(getStripePromise);
    const stripe = await getStripePromise();
    const res = await fetch("/api/stripe-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
      body: JSON.stringify(products),
    });
    const data = await res.json();
    if (data.session) {
      stripe?.redirectToCheckout({ sessionId: data.session.id });
    }
  };
  return (
    <div className="w-full flex">
      <button
        onClick={handleCheckout}
        className="ml-auto py-1.5 px-4 bg-black rounded-md font-semibold text-white"
      >
        Checkout
      </button>
    </div>
  );
};

export default Checkout;
