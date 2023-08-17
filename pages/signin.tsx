import Link from "next/link";
import { useState } from "react";
import Router from "next/router";
import { toast } from "react-toastify";

/* eslint-disable react/no-unescaped-entities */

interface Person {
  fullname: string;
  casnumber: string;
  email: string;
  password: string;
}

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const retrievedPersonJSON = localStorage.getItem("user");

    if (!retrievedPersonJSON) return null;

    const retrievedPerson: Person = JSON.parse(retrievedPersonJSON);

    if (retrievedPerson.password == password) {
      toast.success("SignIn success");
      Router.push("/"); // Redirect to dashboard after successful sign-in
    } else {
      toast.error("SignIn failed");
    }
  };

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
      <div className="flex h-screen md:w-1/2 justify-center py-10 items-center bg-white">
        <form className="bg-white" onSubmit={handleSubmit}>
          <h1 className="text-center  text-gray-800 font-bold text-2xl mb-5">
            Welcome back!
          </h1>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
            <input
              className="pl-2 outline-none border-none"
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="University Email"
            />
          </div>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            <input
              className="pl-2 outline-none border-none"
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>

          <button
            type="submit"
            className="block w-full bg-orange-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
          >
            Sign In
          </button>
          <span className="text-sm ml-2 cursor-pointer">
            Don't have an account?{" "}
            <Link href={"/signup"}>
              <span className=" text-blue-700 underline underline-offset-4 hover:text-blue-500 hover:decoration-blue-500">
                Sign Up
              </span>
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
