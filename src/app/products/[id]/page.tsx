import Image from "next/image";
import prodImg from "../../../../public/sample_prod.png";
import Count from "./Count";
import { Button } from "@/components/ui/button";
import { AiOutlineShoppingCart } from "react-icons/ai";

const page = async ({ params }: { params: { id: string } }) => {
  let id = params.id;

  return (
    <>
      <div className="bg-[#FCFCFC] my-5 py-16 px-32">
        <div className="w-full flex">
          <div className="w-[15%] px-5">
            <Image src={prodImg} alt="Product" className="w-full" />
          </div>
          <div className="w-[55%]">
            <Image src={prodImg} alt="Product" className="w-full" />
          </div>
          <div className="w-[30%] px-4 space-y-7 py-16">
            <h2 className="text-2xl tracking-wider">
              Brushed Raglan Sweatshirt
              <br /><span className="text-lg font-bold text-[#D7D7D9]">Sweater</span>
            </h2>
            <div className="flex items-center">
              <h4 className="font-bold pr-5">Quantity:</h4>
              <Count />
            </div>
            <div className="flex items-center">
              <Button className="bg-[#212121] text-white font-semibold py-6 px-2 rounded-none w-[80%] md:w-[10rem]">
                <AiOutlineShoppingCart className="text-3xl" />
                <span className="pl-4">Add to Cart</span>
              </Button>
              <h2 className="text-2xl font-semibold px-4">$292</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
