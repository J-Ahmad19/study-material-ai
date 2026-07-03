"use client";

import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import { ArrowRight, Sparkles, BookOpen, Brain, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Home() {
  const router = useRouter();
  const { isSignedIn } = useUser();
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const buttonRef = useRef(null);
  const featuresRef = useRef(null);

  // Redirect if already signed in
  useEffect(() => {
    if (isSignedIn) {
      router.push("/create");
    }
  }, [isSignedIn, router]);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger animations
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );

      gsap.fromTo(
        descRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "power3.out" }
      );

      gsap.fromTo(
        buttonRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.6, delay: 0.4, ease: "back.out" }
      );

      gsap.fromTo(
        ".feature-card",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, delay: 0.6, ease: "power3.out" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Study Materials",
      description: "AI-generated comprehensive study guides",
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Flashcards",
      description: "Interactive flashcards for quick learning",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Quizzes",
      description: "Test your knowledge with smart quizzes",
    },
  ];

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10 flex flex-col items-center justify-center p-6 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10"></div>

      {/* User Button */}
      <div className="absolute top-6 right-6">
        <UserButton afterSignOutUrl="/" />
      </div>

      {/* Main Content */}
      <div className="max-w-4xl w-full">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div
            ref={titleRef}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
              Welcome to Your Learning Hub
            </span>
          </div>

          <h1 ref={titleRef} className="text-6xl font-bold mb-6">
            Learn{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Smarter
            </span>
            , Study{" "}
            <span className="bg-gradient-to-r from-secondary via-accent to-primary bg-clip-text text-transparent">
              Faster
            </span>
          </h1>

          <p
            ref={descRef}
            className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto"
          >
            Unlock your potential with AI-powered study materials, intelligent
            flashcards, and interactive quizzes. All in one beautiful platform
            designed for your success.
          </p>

          <div ref={buttonRef} className="flex gap-4 justify-center">
            <Button
              size="lg"
              className="px-8 py-6 text-lg font-semibold rounded-2xl bg-gradient-to-r from-primary to-secondary hover:shadow-2xl hover:scale-105 transition-all duration-300"
              onClick={() => router.push("/sign-in")}
            >
              Get Started <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-6 text-lg font-semibold rounded-2xl hover:scale-105 transition-all duration-300"
              onClick={() => router.push("/sign-up")}
            >
              Sign Up
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div
          ref={featuresRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card group relative p-8 rounded-2xl bg-card border border-border hover:border-primary/50 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
            >
              {/* Gradient hover effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
