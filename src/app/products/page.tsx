import Image from "next/image";
import type { Image as IImage } from "sanity";
import { client } from "../../../sanity/lib/client";
import { urlForImage } from "../../../sanity/lib/image";
import Link from "next/link";

interface Product {
  _id: string;
  title: string;
  category: string;
  price: string;
  description: string;
  image_thumbnail: IImage;
}

async function getData() {
  let res = await client.fetch(`*[_type=="product"]`);
  return res;
}

const page = async () => {
  let data = await getData();
  console.log(data);
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 my-16 px-10 md:px-24 lg:px-32 gap-x-5">
        {data.map((item: Product) => {
          return (
            <Link href={`/products/${item._id}`}>
              <div className="h-fit">
                <Image
                  src={urlForImage(item.image_thumbnail).url()}
                  alt="Logo"
                  width={300}
                  height={300}
                  className="object-cover w-full h-full max-h-64 md:max-h-80"
                />
                <h2 className="font-bold tracking-wider leading-6 mt-2">
                  {item.title}
                </h2>
                <h2 className="font-bold text-[#D7D7D9]">{item.category}</h2>
                <h2 className="text-lg font-semibold my-1">${item.price}</h2>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default page;
