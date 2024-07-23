"use client";
import { IUser } from "@/src/interface/user";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "@/src/util/localStorage";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SignUpContent = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleSignup = (e: any) => {
    e.preventDefault();
    const users = JSON.parse(getLocalStorageItem("users") || "[]") as IUser[];
    const userExists = users.find((user) => user.email === email);

    if (userExists) {
      alert("User already exists!");
    } else {
      users.push({ username, password, email });
      setLocalStorageItem("users", JSON.stringify(users));
      setLocalStorageItem(
        "loggedInUser",
        JSON.stringify({ username, password, email, chatHistory: [] })
      );

      router.push("/");
    }
  };

  return (
    <div className="h-screen bg-gradient-to-r from-[#e3eeff] via-[#e3eeff] to-[#f3e7e9]">
      <div className="h-full flex flex-col w-full justify-center items-center">
        <form className="w-[90%] sm:w-[400px]" onSubmit={handleSignup}>
          <div className="text-black font-medium text-[24px] text-center">
            Sign Up{" "}
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
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white outline-none focus:ring-0 px-3 py-3 rounded-[10px] w-full"
              />
            </div>
          </div>
          <div className="mb-5">
            <div className="text-black mb-1 font-medium">Username</div>
            <div className="">
              <input
                type="text"
                required
                placeholder="type here"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpContent;
