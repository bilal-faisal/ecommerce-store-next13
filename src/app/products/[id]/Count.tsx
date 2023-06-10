"use client";
import React from "react";
import { BiMinus } from "react-icons/bi";
import { BsPlus } from "react-icons/bs";
import { useState } from "react";

const Count = () => {
  let [count, setCount] = useState(0);
  return (
    <>
      <div
        className="text-lg p-1.5 bg-[#D7D7D9] rounded-full hover:cursor-pointer"
        onClick={() => (count > 0 && setCount(count - 1))}
      >
        <BiMinus />
      </div>
      <div className="w-10 text-center">{count}</div>
      <div
        className="text-lg p-1 border-2 border-black rounded-full hover:cursor-pointer"
        onClick={() => (count < 99 && setCount(count + 1))}
      >
        <BsPlus />
      </div>
    </>
  );
};

export default Count;
