import Image from "next/image";
import home_img from "/public/home.png";
import f1 from "/public/featured1.png";
import f2 from "/public/featured2.png";
import f3 from "/public/featured3.png";
import f4 from "/public/featured4.png";
import { Button } from "@/components/ui/button";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Link from "next/link";

const HomeBanner = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 my-5 md:my-10">
      <div className="px-10 py-5 md:pl-14 lg:pl-28 md:py-16 space-y-7">
        <Button className="bg-[#e1edff] text-[blue] hover:bg-[#e1edff] hover:text-[blue] font-semibold text-lg cursor-auto">
          Sale 70%
        </Button>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-wide lg:text-6xl ">
          An Industrial Take on Streetwear
        </h1>
        <p className="leading-7 text-[#212121] md:max-w-xs md:pr-5">
          Anyone can beat you but no one can beat your outfit as long as you
          wear Dine outfits.
        </p>
        <div>
          <Link href={"/products"}>
            <Button className="bg-[#212121] text-white font-semibold py-8 px-6 rounded-none w-[80%] md:w-[10rem] hover:bg-[#181818]">
              <AiOutlineShoppingCart className="text-3xl" />
              <span className="pl-4">Start Shopping</span>
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Image src={f1} alt="featured1" />
          <Image src={f2} alt="featured2" />
          <Image src={f3} alt="featured3" />
          <Image src={f4} alt="featured4" />
        </div>
      </div>
      <div className="min-h-[37rem] hidden md:block">
        <div className="-z-10 absolute mt-5 md:w-[28rem] md:h-[28rem] lg:w-[36rem] lg:h-[36rem] bg-[#ffece3] rounded-full"></div>
        <Image
          src={home_img}
          alt="home_img"
          className="z-10 min-h-full object-cover"
        />
      </div>
    </div>
  );
};

export default HomeBanner;
