"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { isSignedIn } = useUser();

  // 👉 If user is already logged in → redirect to /create
  useEffect(() => {
    if (isSignedIn) {
      router.push("/create");
    }
  }, [isSignedIn, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 flex flex-col items-center justify-center p-6">
      
      {/* Top-right User Button */}
      <div className="absolute top-5 right-5">
        <UserButton afterSignOutUrl="/" />
      </div>

      {/* Hero Section */}
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Welcome to <span className="text-blue-600">Your Learning Hub</span>
        </h1>

        <p className="text-gray-600 text-lg mb-6">
          Explore your courses, study materials, flashcards, and quizzes — 
          all in one organized place. Learn smart, prepare faster.
        </p>

        <Button
          className="text-lg px-6 py-5 rounded-xl flex items-center gap-2"
          onClick={() => router.push("/sign-in")}
        >
          Get Started <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

    </div>
  );
}
