import Image from "next/image";
import p1_img from "/public/prod1.png";
import p2_img from "/public/prod2.png";
import p3_img from "/public/prod3.png";
import Link from "next/link";

const HomeProducts = () => {
  return (
    <div className="mt-24">
      <h4 className="text-center text-sm tracking-wider font-semibold text-[#0062f5]">
        Products
      </h4>
      <h2 className="text-center text-3xl tracking-wide font-extrabold py-3">
        Check What We Have
      </h2>
      <div className="flex flex-wrap md:px-14 lg:px-28 h-fit justify-between my-10 space-y-5 md:space-y-0 mx-7">
        <div className="z-0 w-full md:w-1/3 transform transition-transform hover:scale-110 duration-500 cursor-pointer">
          <Link href={"/products/54a39683-e8a5-4e54-888d-10627ba4861f"}>
            <Image
              src={p1_img}
              alt="Logo"
              className="object-cover w-full h-full max-h-64 md:max-h-96"
            />
            <h2 className="text-lg font-bold pt-3">
              Brushed Raglan Sweatshirt
            </h2>
            <h2 className="text-lg font-bold">Rs 195</h2>
          </Link>
        </div>
        <div className="z-10 w-full md:w-1/3 transform transition-transform hover:scale-110 duration-500 cursor-pointer">
          <Link href={"/products/54a39683-e8a5-4e54-888d-10627ba4861f"}>
            <Image
              src={p2_img}
              alt="Logo"
              className="object-cover w-full h-full max-h-64 md:max-h-96"
            />
            <h2 className="text-lg font-bold pt-3">Cameryn Sash Tie Dress</h2>
            <h2 className="text-lg font-bold">Rs 545</h2>
          </Link>
        </div>
        <div className="z-20 w-full md:w-1/3 transform transition-transform hover:scale-110 duration-500 cursor-pointer">
          <Link href={"/products/54a39683-e8a5-4e54-888d-10627ba4861f"}>
            <Image
              src={p3_img}
              alt="Logo"
              className="object-cover w-full h-full max-h-64 md:max-h-96"
            />
            <h2 className="text-lg font-bold pt-3">Flex Sweatshirt</h2>
            <h2 className="text-lg font-bold">Rs 175</h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeProducts;
