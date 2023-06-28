"use client";

import { useState, useEffect } from "react";
import { CiWarning } from "react-icons/ci";
import { MdOutlineDone } from "react-icons/md";

const Alert = ({ message, type }: { message: string; type: string }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  let bgColor = "bg-gray-300";
  let icon = <></>;
  if (type == "warning") {
    bgColor = "bg-yellow-100";
    icon = <CiWarning className="text-2xl" />;
  } else if (type == "success") {
    bgColor = "bg-green-200";
    icon = <MdOutlineDone className="text-2xl" />;
  }
  return (
    <div
      className={`flex items-center fixed bottom-6 right-6 ${bgColor} p-4 rounded shadow transition-opacity duration-300 ${
        visible
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      style={{
        transitionProperty: "opacity",
        transitionTimingFunction: "ease-in-out",
      }}
    >
      {icon}
      <p className="pl-2 font-semibold">{message}</p>
    </div>
  );
};

export default Alert;
