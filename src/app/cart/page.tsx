"use client";
import { useState, useEffect } from "react";
import SubComp from "./SubComp";
import Image from "next/image";
import { useClerk } from "@clerk/clerk-react";
import Loader from "../../../public/Loading_icon.gif";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

const Page = () => {
  const [loading, setLoading] = useState(true);
  const { session } = useClerk();
  const { userId } = useAuth();

  useEffect(() => {
    if (session !== undefined) {
      setLoading(false);
    }
  }, [session]);

  return (
    <>
      {!session ? (
        <div className="my-32 px-10 md:px-24 lg:px-32 h-1/2">
          {loading && (
            <Image src={Loader} alt="Loader..." className="mx-auto"></Image>
          )}

          {!loading && !session && (
            <h2 className="text-2xl text-center">
              You&apos;re not currently logged in.{" "}
              <Link href="/sign-in" className="underline">
                Sign in
              </Link>
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
