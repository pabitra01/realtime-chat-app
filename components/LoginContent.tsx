"use client";
import { IUser } from "@/src/interface/user";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LoginContent = () => {
  const [email, setUserEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const handleLogin = (e: any) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users") || "[]") as IUser[];
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      console.log(user);
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      router.push("/");
    } else {
      alert("Invalid credentials!");
    }
  };
  return (
    <div className="h-screen bg-gradient-to-r from-[#e3eeff] via-[#e3eeff] to-[#f3e7e9]">
      <div className="h-full flex flex-col w-full justify-center items-center">
        <form className="w-[90%] sm:w-[400px]" onSubmit={handleLogin}>
          <div className="text-black font-medium text-[24px] text-center">
            Login{" "}
          </div>
          <div className="text-center text-black/50 text-[14px] mb-10">
            Welcome back! please enter your details
          </div>
          <div className="mb-5">
            <div className="text-black mb-1 font-medium">Email</div>
            <div className="">
              <input
                type="email"
                required
                placeholder="type here"
                value={email}
                onChange={(e) => setUserEmail(e.target.value)}
                className="bg-white outline-none focus:ring-0 px-3 py-3 rounded-[10px] w-full"
              />
            </div>
          </div>

          <div className="">
            <div className="text-black mb-1 font-medium">Password</div>
            <div className="">
              <input
                required
                type="text"
                placeholder="type here"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white outline-none focus:ring-0 px-3 py-3 rounded-[10px] w-full"
              />
            </div>
          </div>
          <div className="">
            <button
              type="submit"
              className=" bg-gradient-to-r from-[#DA22FF] to-[#9733EE]  font-medium text-white py-3 text-center  rounded-[10px] mt-10 w-full"
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginContent;
