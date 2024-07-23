"use client";
import React from "react";
import Navbar from "../common/Navbar";
import HomeBody from "./HomeBody";

const HomeContent = () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
  console.log(user);

  return (
    <div className="h-screen bg-gradient-to-r from-[#e3eeff] via-[#e3eeff] to-[#f3e7e9]">
      <Navbar user={user} />
      <HomeBody user={user} />
    </div>
  );
};

export default HomeContent;
