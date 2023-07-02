"use client";
import Image from "next/image";
import Link from "next/link";
import { client } from "../../sanity/lib/client";
import { urlForImage } from "../../sanity/lib/image";
import type { Image as IImage } from "sanity";
import { useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

interface Product {
  _id: string;
  title: string;
  type: string;
  price: string;
  image_thumbnail: IImage;
}

async function getData() {
  let res = await client.fetch(`*[_type=="product"] {
      _id,
      title,
      type,
      price,
      image_thumbnail
    }`);
  return res;
}

const HomeSlider = () => {
  const [data, setData] = useState<Product[] | null>(null);
  const [index, setIndex] = useState(0);
  const [screenSize, setScreenSize] = useState("");

  let hasNext =
    index + (screenSize == "medium" ? 2 : 0) < (data?.length as number) - 1;
  let hasPrev = index > 0;

  useEffect(() => {
    async function fetchData() {
      try {
        let data = await getData();
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();

    function handleResize() {
      const width = window.innerWidth;
      if (width >= 768) {
        setScreenSize("medium");
      } else {
        setScreenSize("small");
      }
    }

    handleResize();

    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <div className="mt-24">
      <h4 className="text-center text-sm tracking-wider font-semibold text-[#0062f5]">
        Products
      </h4>
      <h2 className="text-center text-3xl tracking-wide font-extrabold py-3">
        Check What We Have
      </h2>
      {data && (
        <div className="flex items-center justify-evenly md:px-10 lg:px-20 h-fit my-10">
          <button
            onClick={() => {
              if (hasPrev) {
                setIndex(index - 1);
              }
            }}
            disabled={!hasPrev}
            className="text-gray-800 disabled:text-gray-400"
          >
            <IoIosArrowBack className="text-3xl md:text-4xl mx-3" />
          </button>

          {screenSize == "medium" ? (
            <div className="flex justify-center items-center space-x-6">
              {[index, index + 1, index + 2].map((i) => {
                return (
                  <div
                    key={i}
                    className="z-0 w-full md:w-1/3 transform transition-transform hover:scale-110 duration-500 cursor-pointer"
                  >
                    <Link href={`/products/${data[i]._id}`}>
                      <Image
                        src={urlForImage(data[i].image_thumbnail).url()}
                        alt="Logo"
                        width={300}
                        height={300}
                        className="object-cover object-top max-h-80"
                      />
                      <h2 className="text-lg font-bold pt-3">
                        {data[i].title}
                      </h2>
                      <h2 className="text-lg font-bold">Rs {data[i].price}</h2>
                    </Link>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex justify-center items-center space-x-6">
              <div className="z-0 w-full cursor-pointer">
                <Link href={`/products/${data[index]._id}`}>
                  <Image
                    src={urlForImage(data[index].image_thumbnail).url()}
                    alt="Logo"
                    width={300}
                    height={300}
                    className="object-cover object-top max-h-64"
                  />
                  <h2 className="font-bold pt-3">
                    {data[index].title}
                  </h2>
                  <h2 className="font-bold">Rs {data[index].price}</h2>
                </Link>
              </div>
            </div>
          )}
          <button
            onClick={() => {
              if (hasNext) {
                setIndex(index + 1);
              }
            }}
            disabled={!hasNext}
            className="text-gray-800 disabled:text-gray-400"
          >
            <IoIosArrowForward className="text-3xl md:text-4xl mx-3" />
          </button>
        </div>
      )}
    </div>
  );
};

export default HomeSlider;
