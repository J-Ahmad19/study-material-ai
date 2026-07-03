"use client";

import React, { useState, useRef, useEffect } from "react";
import SelectOption from "./_components/SelectOption";
import { Button } from "@/components/ui/button";
import TopicInput from "./_components/TopicInput";
import axios from "axios";
import { useUser } from "@clerk/nextjs"; 
import { Loader, Sparkles, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner"
import gsap from "gsap"

const Create = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [generatedCourse, setGeneratedCourse] = useState(null);
  const { user } = useUser();
  const router = useRouter();
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [step])

  const handleUserInput = (fieldName, fieldValue) => {
    setFormData((prev) => {
      const updated = { ...prev, [fieldName]: fieldValue };
      console.log("Updated formData:", updated);
      return updated;
    });
  };

  const GenerateCourseOutline = async () => {
    try {
      setLoading(true);
      setGeneratedCourse(null);
      console.log("Form Data:", formData);

      const courseId = formData.courseId || crypto.randomUUID();

      const result = await axios.post("/api/generate-course-outline", {
        courseId,
        ...formData,
        createdBy: user?.primaryEmailAddress?.emailAddress,
      });

      console.log("Generated Course:", result.data);
      setGeneratedCourse(result.data);
    } catch (err) {
      console.error("Error generating course:", err);
      toast.error("Failed to generate course. Please try again.");
    } finally {
      setLoading(false);
      router.replace('/dashboard');
      toast.success("Your course content is generating! Click the Refresh button on dashboard to see it.")
    }
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5 py-12 px-4"
    >
      {/* Decorative elements */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
              Create Your Course
            </span>
          </div>

          <h1 className="text-5xl font-bold mb-4">
            Build Your{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Personal Study Material
            </span>
          </h1>

          <p className="text-lg text-muted-foreground">
            Answer a few questions and we&apos;ll generate comprehensive study material tailored to your needs
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8 flex gap-2 justify-center">
          {[0, 1].map((s) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                s <= step
                  ? "bg-gradient-to-r from-primary to-secondary"
                  : "bg-muted"
              }`}
            ></div>
          ))}
        </div>

        {/* Content Container */}
        <div 
          ref={contentRef}
          className="bg-card border border-border rounded-3xl shadow-xl p-8 md:p-10"
        >
          {/* Step Content */}
          {step === 0 ? (
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                What type of study material do you need?
              </h2>
              <p className="text-muted-foreground mb-6">
                Select the type of content you want to create
              </p>
              <SelectOption 
                selectedStudyType={(value) => handleUserInput("studyType", value)} 
              />
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Tell us about your topic
              </h2>
              <p className="text-muted-foreground mb-6">
                Provide details to help us create the best material
              </p>
              <TopicInput
                setTopic={(value) => handleUserInput("topic", value)}
                setDifficultyLevel={(value) => handleUserInput("difficultyLevel", value)}
              />
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between gap-4 mt-10">
            {step !== 0 ? (
              <Button 
                variant="outline" 
                onClick={() => setStep(step - 1)}
                className="rounded-xl"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
            ) : (
              <div />
            )}

            {step === 0 ? (
              <Button 
                onClick={() => setStep(step + 1)}
                className="rounded-xl bg-gradient-to-r from-primary to-secondary hover:shadow-lg transition-all duration-300"
              >
                Next
              </Button>
            ) : (
              <Button 
                disabled={loading} 
                onClick={GenerateCourseOutline}
                className="rounded-xl bg-gradient-to-r from-primary to-secondary hover:shadow-lg transition-all duration-300"
              >
                {loading ? (
                  <><Loader className="animate-spin mr-2 w-4 h-4" /> Generating...</>
                ) : (
                  <><Sparkles className="mr-2 w-4 h-4" /> Generate</>
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="mt-8 text-center">
            <div className="inline-block">
              <div className="w-12 h-12 rounded-full border-4 border-muted border-t-primary animate-spin mb-4"></div>
              <p className="text-muted-foreground">Creating your study material...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Create;
