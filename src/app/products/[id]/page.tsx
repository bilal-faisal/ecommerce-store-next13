import Image from "next/image";
import type { Image as IImage } from "sanity";
import { client } from "../../../../sanity/lib/client";
import { urlForImage } from "../../../../sanity/lib/image";
import AddToCart from "./AddToCart";

interface Product {
  _id: string;
  title: string;
  type: string;
  price: string;
  description: string;
  image: IImage;
  image_thumbnail: IImage;
  product_care: string[];
}

async function getData(id: string) {
  let res = await client.fetch(`*[_type=="product"&&_id=="${id}"][0] {
    _id,
    title,
    type,
    price,
    description,
    image,
    image_thumbnail,
    product_care,
  }`);
  return res;
}

const page = async ({ params }: { params: { id: string } }) => {
  let id = params.id;
  let data: Product = await getData(id);

  return (
    <>
      <div className="bg-[#FCFCFC] my-5 py-16 px-10 md:px-24 lg:px-32">
        <div className="w-full flex flex-wrap">
          <div className="w-[30%] md:w-[15%] px-5">
            <Image
              src={urlForImage(data.image_thumbnail).url()}
              width={200}
              height={200}
              alt="Product"
              className="w-full"
            />
          </div>
          <div className="w-[70%] md:w-[55%]">
            <Image
              src={urlForImage(data.image).url()}
              width={500}
              height={500}
              alt="Product"
              className="w-full h-full max-h-64 md:max-h-[600px] object-cover object-top"
            />
          </div>
          <div className="w-[100%] md:w-[30%] px-4 space-y-7 py-16">
            <h2 className="text-2xl tracking-wider">
              {data.title}
              <br />
              <span className="text-lg font-bold text-[#D7D7D9]">
                {data.type}
              </span>
            </h2>

            <AddToCart product_id={data._id} />
          </div>
        </div>

        <div className="bg-white my-16 py-16 px-5 md:px-16">
          <div className="leading-3 flex items-center mb-16">
            <h2 className="z-10 text-[#F6F7F9] font-extrabold shrink tracking-wide text-6xl sm:text-7xl md:text-8xl lg:text-9xl absolute">
              Overview
            </h2>
            <h2 className="z-20 font-bold text-xl">Product Information</h2>
          </div>
          <div className="w-full h-2 border-t-2 border-gray-300"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-5">
            <div className="col-span-1">
              <h2 className="font-bold text-gray-600">PRODUCT DETAILS</h2>
            </div>
            <div className="col-span-2 text-justify tracking-wide leading-7">
              {data.description}
            </div>
            <div className="col-span-1">
              <h2 className="font-bold text-gray-600">PRODUCT CARE</h2>
            </div>
            <div className="col-span-2">
              <ul className="list-disc ml-4 font-semibold">
                {data.product_care.map((item, i) => {
                  return <li key={i}>{item}</li>;
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
