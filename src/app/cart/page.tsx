import { cookies } from "next/headers";
import SubComp from "./SubComp";

export async function userId() {
  let user_id = cookies().get("user_id")?.value as string;

  if (!user_id) {
    return { error: "user_id does not exists." };
  }
  return { user_id: user_id };
}

const page = async () => {
  let user_id = await userId();
  return (
    <>
      {user_id.error ? (
        <div className="my-16 px-10 md:px-24 lg:px-32 h-1/2">
          <h2 className="text-2xl">You have currently no items in cart</h2>
        </div>
      ) : (
        <>
          {/* @ts-ignore */}
          <SubComp user_id={user_id.user_id} />
        </>
      )}
    </>
  );
  // if (user_id.error) {
  //   alert("user does not exists");
  //   return <></>;
  // } else {
  //   return (
  //     <>
  //       {/* @ts-ignore */}
  //       <SubComp user_id={user_id.user_id} />
  //     </>
  //   );
  // }
};

export default page;
