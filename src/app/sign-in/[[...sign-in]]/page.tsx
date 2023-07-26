import { SignIn } from "@clerk/nextjs";

const page = () => {
  return (
    <div className="py-16">
      <div className="flex justify-center">
        <SignIn />
      </div>
    </div>
  );
};

export default page;

// additional work: after sign in go back to the page user was already