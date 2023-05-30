import Image from "next/image";
import e1_img from "/public/event1.png";
import e2_img from "/public/event2.png";
import e3_img from "/public/event3.png";
import { Button } from "@/components/ui/button";

const HomePromotion = () => {
  return (
    <div>
      <h4 className="text-center text-xs tracking-wider font-semibold text-[#0062f5]">
        PROMOTIONS
      </h4>
      <h2 className="text-center text-3xl tracking-wide font-extrabold py-3">
        Our Promotions Events
      </h2>
      <div className="flex flex-wrap md:px-28 h-fit justify-between my-5">
        <div className="w-full md:w-[40%] flex flex-col justify-between">
          <div className="bg-zinc-300 grid grid-cols-2 items-end">
            <div className="w-full p-5">
              <h2 className="text-3xl font-bold leading-10">GET UP TO 60%</h2>
              <p className="text-lg font-medium leading-6">
                For the summer season
              </p>
            </div>
            <div className="w-full">
              <Image src={e1_img} alt="Logo" className="mr-10" />
            </div>
          </div>
          <div className="bg-neutral-800 text-center py-5 flex flex-col px-10">
            <h2 className="text-4xl font-semibold text-white py-3">
              GET 30% Off
            </h2>
            <p className="font-light text-sm text-white py-1">USE PROMO CODE</p>
            <Button className="flex-shrink flex bg-zinc-700 text-white hover:bg-zinc-700 hover:text-white text-base px-10 font-bold tracking-[0.3rem]">
              <p>DINEWEEKENDSALE</p>
            </Button>
          </div>
        </div>

        <div className="w-full md:w-[28%] bg-[#efe1c7] flex flex-col justify-between">
          <div className="pt-5 pl-4">
            <p>Flex Sweatshirt</p>
            <p>
              <s>$100.00</s> <span className="font-semibold">$75.00</span>
            </p>
          </div>
          <Image src={e2_img} alt="Logo" className="mx-auto" width={230} />
        </div>

        <div className="w-full md:w-[28%] bg-zinc-300 flex flex-col justify-between">
          <div className="pt-5 pl-4">
            <p>Flex Sweatshirt</p>
            <p>
              <s>$100.00</s> <span className="font-semibold">$75.00</span>
            </p>
          </div>
          <Image src={e3_img} alt="Logo" className="mx-auto" width={230} />
        </div>
      </div>
    </div>
  );
};

export default HomePromotion;
