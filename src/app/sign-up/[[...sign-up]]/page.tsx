import { SignUp } from "@clerk/nextjs";

const page = () => {
  return (
    <div className="py-24">
      <div className="flex justify-center">
        <SignUp />
      </div>
    </div>
  );
};

export default page;
