"use client";
import React from "react";
import { useUser } from "@clerk/nextjs";

const WelcomeBanner = () => {
  const { user } = useUser();

  return (
    <div className="p-5  bg-green-900 w-full text-white rounded-lg flex items-center gap-6">

      <img src="/image.png" alt="logo" width={100} height={100}/>
     
    

  <div>
   <h2 className="font-bold text-3xl"> Hello, {user ? user.fullName : "Guest"} 👋</h2>
   <p className="text-sm">Welcome back, Its time to get back and start the course</p>
  </div>
  </div>
  );
};

export default WelcomeBanner;
