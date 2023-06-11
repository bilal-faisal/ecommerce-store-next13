import Image from "next/image";
import prodImg from "../../../../public/sample_prod.png";
import Count from "./Count";
import { Button } from "@/components/ui/button";
import { AiOutlineShoppingCart } from "react-icons/ai";

const page = async ({ params }: { params: { id: string } }) => {
  let id = params.id;

  return (
    <>
      <div className="bg-[#FCFCFC] my-5 py-16 px-10 md:px-24 lg:px-32">
        <div className="w-full flex flex-wrap">
          <div className="w-[30%] md:w-[15%] px-5">
            <Image src={prodImg} alt="Product" className="w-full" />
          </div>
          <div className="w-[70%] md:w-[55%]">
            <Image src={prodImg} alt="Product" className="w-full" />
          </div>
          <div className="w-[100%] md:w-[30%] px-4 space-y-7 py-16">
            <h2 className="text-2xl tracking-wider">
              Brushed Raglan Sweatshirt
              <br />
              <span className="text-lg font-bold text-[#D7D7D9]">Sweater</span>
            </h2>
            <div className="flex items-center">
              <h4 className="font-bold pr-5">Quantity:</h4>
              <Count />
            </div>
            <div className="flex items-center">
              <Button className="bg-[#212121] text-white font-semibold py-6 px-2 rounded-none w-[80%] md:w-[10rem] md:min-w-fit">
                <AiOutlineShoppingCart className="text-3xl" />
                <span className="pl-4">Add to Cart</span>
              </Button>
              <h2 className="text-2xl font-semibold px-4">$292</h2>
            </div>
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
            <div className="col-span-1">
              <h2 className="font-bold text-gray-600">PRODUCT CARE</h2>
            </div>
            <div className="col-span-2">
              <ul className="list-disc ml-4 font-semibold">
                <li>Hand wash using cold water.</li>
                <li>Do not using bleach.</li>
                <li>Hang it to dry.</li>
                <li>Iron on low temperature.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
