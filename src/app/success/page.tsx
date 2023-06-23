// "use client";
import Link from "next/link";
import React from "react";
import Cookie from "js-cookie";
// import { cookies } from "next/headers";
// import { useSearchParams } from "next/navigation";

function getUserId() {
  // let user_id = cookies().get("user_id")?.value as string;
  
  const user_id = Cookie.get("user_id");

  if (!user_id) {
    return { user_id: null };
  }
  return { user_id };
}
async function deleteData(user_id: string) {
  let req = await fetch(`/api/cart?user_id=${user_id}`, {
    method: "DELETE",
  });
  return req;
}

const page = async () => {
  // const searchParams = useSearchParams();
  // const user_id = searchParams.get("user_id") as string;

  let { user_id } = await getUserId();
  if (user_id) {
    await deleteData(user_id);
  }
  // await deleteData(user_id);
  return (
    <div className="my-14 px-10 md:px-24 lg:px-32">
      <h2 className="py-3">Your order has been placed successfully</h2>
      <p>
        Go to{" "}
        <Link href={"/"} className="underline">
          Home
        </Link>
      </p>
    </div>
  );
};

export default page;
