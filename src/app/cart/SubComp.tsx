"use client";
import Image from "next/image";
import { CartType } from "@/db/schema/cart";
import { client } from "../../../sanity/lib/client";
import { urlForImage } from "../../../sanity/lib/image";
import type { Image as IImage } from "sanity";

interface Product {
  title: string;
  price: string;
  image_thumbnail: IImage;
  quantity: number;
}

async function getSanityData(id: string) {
  let res = await client.fetch(`
      *[_type=="product"&&_id=='${id}'][0] {
          title,
          price,
          image_thumbnail,
          }`);
  return res;
}

export async function getData(user_id: string) {
  let res = await fetch(`http://localhost:3000/api/cart?user_id=${user_id}`, {
    cache: "no-store",
  });
  return res.json();
}

const SubComp = async ({ user_id }: { user_id: string }) => {
  let data = await getData(user_id);
  let total = 0;

  let promises = data.map(async (item: CartType, i: number) => {
    let productData: Product = await getSanityData(item.product_id);

    total += Number(productData.price) * item.quantity;
    return (
      <div className="flex w-full" key={i}>
        <div>
          <Image
            src={urlForImage(productData.image_thumbnail).url()}
            width={70}
            height={70}
            alt="Product Image"
          />
        </div>
        <h2 className="px-2">{productData.title}</h2>
        <div className="ml-auto w-fit text-right">
          <h2>${productData.price}</h2>
          <h2>Quantity: {item.quantity}</h2>
        </div>
      </div>
    );
  });

  let items = await Promise.all(promises);

  return (
    <div className="flex my-16 px-10 md:px-24 lg:px-32">
      <div className="w-1/2 space-y-5">
        {items}
        <div>
          <h2 className="text-right">Total: ${total}</h2>
        </div>
      </div>
    </div>
  );
};

export default SubComp;
