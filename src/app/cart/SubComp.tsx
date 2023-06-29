"use client";
import Image from "next/image";
import Checkout from "./Checkout";
import { BsPlus } from "react-icons/bs";
import { BiMinus } from "react-icons/bi";
import { CartType } from "@/db/schema/cart";
import type { Image as IImage } from "sanity";
import React, { useState, useEffect } from "react";
import { urlForImage } from "../../../sanity/lib/image";
import Loader from "../../../public/Loading_icon.gif";

interface Product {
  title: string;
  price: string;
  image_thumbnail: IImage;
  quantity: number;
}

async function getSanityData(product_id: string) {
  try {
    const response = await fetch(`/api/sanity`, {
      body: JSON.stringify({ product_id: product_id }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    if (!response.ok) {
      throw new Error("Something went wrong");
    } else {
      return response.json();
    }
  } catch (e) {
    console.log(e);
  }
}

export async function getData(user_id: string) {
  let res = await fetch(`/api/cart?user_id=${user_id}`);
  return res.json();
}

const SubComp = ({ user_id }: { user_id: string }) => {
  const [allUserSelectedProducts, setAllUserSelectedProducts] = useState<
    Product[]
  >([]);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      let data = await getData(user_id);
      let allProducts: Product[] = [];

      await Promise.all(
        data.map(async (item: CartType) => {
          let productData: Product = await getSanityData(item.product_id);
          productData = {
            // @ts-ignore
            quantity: item.quantity,
            // // @ts-ignore
            // user_id: user_id,
            ...productData,
          };
          allProducts.push(productData);
        })
      );

      setAllUserSelectedProducts(allProducts);
      calculateTotal(allProducts);
      setLoading(false);
    };

    fetchProducts();
  }, [user_id]); // the effect runs when `user_id` changes

  const calculateTotal = (products: Product[]) => {
    let newTotal = products.reduce(
      (acc, product) => acc + Number(product.price) * product.quantity,
      0
    );
    setTotal(newTotal);
  };
  return (
    <div className="flex my-16 px-10 md:px-24 lg:px-32">
      <div className="w-full md:w-2/3 mx-auto space-y-5">
        {loading && (
          <Image src={Loader} alt="Loader..." className="mx-auto"></Image>
        )}

        {!loading && allUserSelectedProducts.length == 0 ? (
          <div className="my-16 px-10 md:px-24 lg:px-32 h-1/2">
            <h2 className="text-2xl text-center">You have currently no items in cart</h2>
          </div>
        ) : (
          <>
            {allUserSelectedProducts.map((product, i) => {
              return (
                <div
                  className="flex items-center w-full bg-gray-100 py-3 px-5 rounded-md"
                  key={i}
                >
                  <div>
                    <Image
                      src={urlForImage(product.image_thumbnail).url()}
                      width={70}
                      height={70}
                      alt="Product Image"
                      className="rounded-full object-cover object-top"
                    />
                  </div>
                  <div className="w-2/5">
                    <h2 className="px-3">{product.title}</h2>
                  </div>
                  <div className="w-1/5 flex items-center justify-center">
                    <h2 className="px-3">{product.quantity}</h2>

                    <div className="flex flex-col gap-0.5">
                      <div
                        className="text-xs p-1 border-2 border-gray-800 rounded-full hover:cursor-pointer"
                        onClick={() => {
                          if (product.quantity < 99) {
                            // ++product.quantity;
                            ++allUserSelectedProducts[i].quantity;
                            setAllUserSelectedProducts([
                              ...allUserSelectedProducts,
                            ]);
                            calculateTotal(allUserSelectedProducts);
                          }
                        }}
                      >
                        <BsPlus />
                      </div>
                      <div
                        className="text-xs p-1 border-2 border-gray-800 rounded-full hover:cursor-pointer"
                        onClick={() => {
                          if (product.quantity > 0) {
                            --allUserSelectedProducts[i].quantity;
                            setAllUserSelectedProducts([
                              ...allUserSelectedProducts,
                            ]);
                            calculateTotal(allUserSelectedProducts);
                          }
                        }}
                      >
                        <BiMinus />
                      </div>
                    </div>
                  </div>
                  <div className="ml-auto w-fit text-right">
                    <h2>
                      {product.quantity} x {product.price}
                    </h2>
                  </div>
                </div>
              );
            })}

            <div>
              <h2 className="text-right">Total: Rs {total}</h2>
            </div>
            <Checkout products={allUserSelectedProducts} />
          </>
        )}
      </div>
    </div>
  );
};

export default SubComp;
