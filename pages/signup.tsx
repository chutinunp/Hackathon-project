import dynamic from "next/dynamic";

const DynamicSignUpFormForm = dynamic(() => import("@/components/SignUpForm"), {
  ssr: false,
});

const Signup = () => {
  return (
    <div className="h-screen md:flex">
      <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-orange-800 to-yellow-700 i justify-around items-center hidden">
        <div className="md:text-center lg:text-left">
          <h1 className="text-white font-bold  text-4xl font-sans">EXECH!</h1>
          <p className="text-white mt-1">
            Simplify international student fees transfer like never before
          </p>
        </div>
        <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8 animated-circle"></div>
        <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8 animated-circle"></div>
        <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8 animated-circle"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8 animated-circle"></div>
      </div>
      <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
        <DynamicSignUpFormForm />
      </div>
    </div>
  );
};

export default Signup;
