"use client";
import { useState, useEffect } from "react";
// import { cookies } from "next/headers";
import SubComp from "./SubComp";
import Cookie from "js-cookie";
import Loader from "../../../public/Loading_icon.gif";
import Image from "next/image";

function getUserId() {
  // let user_id = cookies().get("user_id")?.value as string;
  const user_id = Cookie.get("user_id");

  if (!user_id) {
    return { user_id: null };
  }
  return { user_id };
}

const Page = () => {
  const [userId, setUserId] = useState<null | string>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      let { user_id } = await getUserId();
      setUserId(user_id);
      setLoading(false);
    };

    getUser();
  }, []);

  return (
    <>
      {!userId ? (
        <div className="my-32 px-10 md:px-24 lg:px-32 h-1/2">
          {loading && (
            <Image src={Loader} alt="Loader..." className="mx-auto"></Image>
          )}

          {!loading && !userId && (
            <h2 className="text-2xl text-center">
              You have currently no items in cart
            </h2>
          )}
        </div>
      ) : (
        <>
          {/* @ts-ignore */}
          <SubComp user_id={userId} />
        </>
      )}
    </>
  );
};

export default Page;
