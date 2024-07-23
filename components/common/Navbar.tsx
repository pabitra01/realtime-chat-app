"use client";
import { IUser } from "@/src/interface/user";
import { removeLocalStorageItem } from "@/src/util/localStorage";
import Link from "next/link";
import React from "react";

const Navbar = ({ user }: NavbarProps) => {
  console.log(user);
  const onLogOut = () => {
    removeLocalStorageItem("loggedInUser");
    window.location.reload();
  };

  return (
    <div className="h-[60px] bg-white">
      <div className="container mx-auto h-full">
        <div className="flex items-center h-full justify-end gap-5">
          {Object.keys(user).length === 0 ? (
            <>
              <Link href="/login">
                <div className="text-black">Login</div>
              </Link>
              <Link href="/signup">
                <div className="text-black">Sign Up</div>
              </Link>{" "}
            </>
          ) : (
            <>
              <div className="cursor-pointer" onClick={onLogOut}>
                Log out
              </div>
              <div className="w-10 h-10 border-2 uppercase  text-[#4A25E1] border-black/5 rounded-full font-bold flex justify-center items-center">
                {user.username.charAt(0)}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
type NavbarProps = {
  user: IUser;
};

export default Navbar;
