import Image from "next/image";
import p1_img from "/public/prod1.png";

const page = () => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 my-16 px-10 md:px-24 lg:px-32 gap-x-5">
        <div className="h-fit">
          <Image
            src={p1_img}
            alt="Logo"
            className="object-cover w-full h-full max-h-64 md:max-h-80"
          />
          <h2 className="font-bold tracking-wider leading-6 mt-2">
            Brushed Raglan Sweatshirt
          </h2>
          <h2 className="font-bold text-[#D7D7D9]">Sweater</h2>
          <h2 className="text-lg font-semibold my-1">$292</h2>
        </div>
      </div>
    </>
  );
};

export default page;
