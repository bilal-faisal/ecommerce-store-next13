"use client";
import Link from "next/link";
import Image from "next/image";
import type { Image as IImage } from "sanity";
import { urlForImage } from "../../../sanity/lib/image";
import { useState, useEffect } from "react";
import Loader from "../../../public/Loading_icon.gif";

interface Product {
  _id: string;
  title: string;
  type: string;
  price: string;
  image_thumbnail: IImage;
}

async function getData() {
  let req = await fetch("/api/sanity");
  return req.json();
}

const Products = () => {
  const [data, setData] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        let data = await getData();
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      {loading && (
        <Image src={Loader} alt="Loader..." className="mx-auto"></Image>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 my-16 px-10 md:px-24 lg:px-32 gap-x-5">
        {data &&
          data.map((item: Product, i: number) => {
            return (
              <div className="h-fit" key={i}>
                <Link href={`/products/${item._id}`}>
                  <Image
                    src={urlForImage(item.image_thumbnail).url()}
                    alt="Logo"
                    width={300}
                    height={300}
                    className="w-full h-full max-h-64 md:max-h-64 object-cover object-top"
                  />
                  <h2 className="font-bold tracking-wider leading-6 mt-2">
                    {item.title}
                  </h2>
                  <h2 className="font-bold text-[#D7D7D9]">{item.type}</h2>
                  <h2 className="text-lg font-semibold my-1">
                    Rs {item.price}
                  </h2>
                </Link>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Products;