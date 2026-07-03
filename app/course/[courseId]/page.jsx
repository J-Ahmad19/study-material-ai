"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import { Progress } from "@/components/ui/progress"
import CourseIntroCard from "./CourseIntroCard";
import StudyMaterialSection from "./StudyMaterialSection";
import ChapterList from "./ChapterList";
import gsap from "gsap";
import { Loader } from "lucide-react";

const Course = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    if (courseId) {
      fetchCourseDetail(courseId);
    }
  }, [courseId]);

  const fetchCourseDetail = async (id) => {
    try {
      const res = await fetch(`/api/courses?courseId=${id}`);
      const data = await res.json();
      if (data.success === false || data.error) {
        console.error("Error:", data.error);
      } else {
        setCourse(data.result);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

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
