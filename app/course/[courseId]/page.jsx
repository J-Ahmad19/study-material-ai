"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import { Progress } from "@/components/ui/progress"
import CourseIntroCard from "./CourseIntroCard";
import StudyMaterialSection from "./StudyMaterialSection";
import ChapterList from "./ChapterList";
import gsap from "gsap";
import { Loader, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Course = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (courseId) {
      fetchCourseDetail(courseId);
    }
  }, [courseId]);

  const fetchCourseDetail = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/courses?courseId=${id}`);
      const data = await res.json();
      if (data.success === false || data.error) {
        setError(data.error || "Failed to load course details");
        console.error("Error:", data.error);
      } else if (res.ok) {
        setCourse(data.result);
      } else {
        setError("Failed to load course. Please try again.");
      }
    } catch (error) {
      setError(error.message || "An error occurred while loading the course");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => fetchCourseDetail(courseId);

  useEffect(() => {
    if (!loading && containerRef.current) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".course-content-item",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power3.out" }
        );
      }, containerRef);

      return () => ctx.revert();
    }
  }, [loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-secondary/5">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your course...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-secondary/5 p-4">
        <div className="rounded-2xl border border-border bg-card p-8 max-w-md w-full text-center shadow-lg">
          <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Course Not Found</h2>
          <p className="text-muted-foreground mb-6">{error}</p>
          <Button 
            onClick={handleRetry}
            className="w-full rounded-xl bg-gradient-to-r from-primary to-secondary"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5">
      {/* Decorative elements */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <div className="space-y-8 relative z-10">
        <div className="course-content-item">
          <CourseIntroCard course={course} />
        </div>

        <div className="course-content-item">
          <StudyMaterialSection courseId={courseId} />
        </div>

        <div className="course-content-item">
          <ChapterList course={course} />
        </div>
      </div>
    </div>
  );
};

export default Course;
