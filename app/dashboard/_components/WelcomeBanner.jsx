"use client";
import React, { useEffect, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import gsap from "gsap";
import { Sparkles } from "lucide-react";

const WelcomeBanner = () => {
  const { user } = useUser();
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );

      // Floating animation for icon
      gsap.to(".welcome-icon", {
        y: -8,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border border-primary/20 p-8 md:p-10 mb-8"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-2xl"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="welcome-icon w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white shadow-lg">
            <Sparkles className="w-8 h-8 md:w-10 md:h-10" />
          </div>

          <div ref={textRef}>
            <h2 className="text-2xl md:text-4xl font-bold text-foreground">
              Hello, {user ? user.fullName : "Guest"} 👋
            </h2>
            <p className="text-sm md:text-base text-muted-foreground mt-1">
              Welcome back! Ready to expand your knowledge today?
            </p>
          </div>
        </div>

        {/* Stats or motivational message */}
        <div className="hidden md:block text-right">
          <p className="text-3xl font-bold text-primary">Keep Learning</p>
          <p className="text-sm text-muted-foreground">Your journey continues</p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;
