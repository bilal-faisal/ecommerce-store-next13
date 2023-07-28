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
import Alert from "@/components/Alert";
import { useDispatch, useSelector } from "react-redux";
import { cartActions, fetchProducts } from "@/store/slice/cartSlice";
import { RootState } from "@/store/store";

interface Product {
  title: string;
  price: string;
  image_thumbnail: IImage;
  quantity: number;
  product_id: string;
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

async function deleteProduct(product_id: string, user_id: string) {
  try {
    const response = await fetch(`/api/cart`, {
      body: JSON.stringify({ product_id: product_id, user_id: user_id }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
    });
    if (!response.ok) {
      throw new Error("Something went wrong");
    } else {
    }
  } catch (e) {
    console.log(e);
  }
}

async function updateQuantity(
  product_id: string,
  updatedQuantity: number,
  user_id: string
) {
  try {
    const response = await fetch(`/api/cart`, {
      body: JSON.stringify({ product_id, updatedQuantity, user_id }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
    });
    if (!response.ok) {
      throw new Error("Something went wrong");
    } else {
    }
  } catch (e) {
    console.log(e);
  }
}

const calculateTotal = (products: Product[]) => {
  let newTotal = products.reduce(
    (acc, product) => acc + Number(product.price) * product.quantity,
    0
  );
  return newTotal;
};

const SubComp = ({ user_id }: { user_id: string }) => {
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const cartProducts = useSelector(
    (state: RootState) => state.cartSlice.products
  );
  const [allcartData, setAllcartData] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const promises = cartProducts.map(async (item) => {
        let productData: Product = await getSanityData(item.product_id);
        return {
          ...productData,
          quantity: item.quantity,
          product_id: item.product_id,
        };
      });

      let asd = await Promise.all(promises);
      setAllcartData(asd);

      setLoading(false);
      setTotal(calculateTotal(allcartData));
    };

    fetchData();
  }, [cartProducts]);

  useEffect(() => {
    setTotal(calculateTotal(allcartData));
  }, [allcartData]);

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
    <div className="flex my-16 px-10 md:px-24 lg:px-32">
      <div className="w-full md:w-2/3 mx-auto space-y-5">
        {loading && (
          <Image src={Loader} alt="Loader..." className="mx-auto"></Image>
        )}

        {!loading && cartProducts.length == 0 ? (
          <div className="my-16 px-10 md:px-24 lg:px-32 h-1/2">
            <h2 className="text-2xl text-center">
              You have currently no items in cart
            </h2>
          </div>
        ) : (
          <>
            {allcartData.map((product) => {
              return (
                <div
                  className="flex items-center w-full bg-gray-100 py-3 px-5 rounded-md"
                  key={product.product_id}
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
                        onClick={async () => {
                          if (product.quantity < 99) {
                            console.log("---");
                            console.log(product.product_id);
                            console.log(user_id);
                            console.log("---");
                            await updateQuantity(
                              product.product_id,
                              product.quantity + 1,
                              user_id
                            );
                            dispatch(
                              cartActions.increaseProductQuantity({
                                product_id: product.product_id,
                              })
                            );
                            // calculateTotal(allcartData);
                            setTotal(
                              (prevTotal) => prevTotal + Number(product.price)
                            );
                          }
                        }}
                      >
                        <BsPlus />
                      </div>
                      <div
                        className="text-xs p-1 border-2 border-gray-800 rounded-full hover:cursor-pointer"
                        onClick={() => {
                          if (product.quantity == 1) {
                            deleteProduct(product.product_id, user_id);
                            dispatch(
                              cartActions.removeFromCart({
                                product_id: product.product_id,
                              })
                            );
                            setShowAlert(true);
                            // calculateTotal(allcartData);
                            setTotal(
                              (prevTotal) => prevTotal - Number(product.price)
                            );
                          } else if (product.quantity > 1) {
                            dispatch(
                              cartActions.decreaseProductQuantity({
                                product_id: product.product_id,
                              })
                            );
                            // calculateTotal(allcartData);
                            setTotal(
                              (prevTotal) => prevTotal - Number(product.price)
                            );
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
            <Checkout products={allcartData} />
          </>
        )}
        {showAlert && (
          <Alert message="Product removed from cart" type="success" />
        )}
      </div>
    </div>
  );
};

export default SubComp;
