import Link from "next/link";
import Image from "next/image";
import type { Image as IImage } from "sanity";
import { client } from "../../../sanity/lib/client";
import { urlForImage } from "../../../sanity/lib/image";

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

const page = async () => {
  let data = await getData();
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 my-16 px-10 md:px-24 lg:px-32 gap-x-5">
        {data.map((item: Product, i: number) => {
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
                <h2 className="text-lg font-semibold my-1">Rs {item.price}</h2>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default page;
