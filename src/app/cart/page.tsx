import { cookies } from "next/headers";
import SubComp from "./SubComp";

function getUserId() {
  let user_id = cookies().get("user_id")?.value as string;

  if (!user_id) {
    return { user_id: null };
  }
  return { user_id };
}

const page = async () => {
  let { user_id } = await getUserId();
  return (
    <>
      {!user_id ? (
        <div className="my-16 px-10 md:px-24 lg:px-32 h-1/2">
          <h2 className="text-2xl">You have currently no items in cart</h2>
        </div>
      ) : (
        <>
          {/* @ts-ignore */}
          <SubComp user_id={user_id} />
        </>
      )}
    </>
  );
};

export default page;
