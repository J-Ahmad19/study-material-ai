"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress"
import CourseIntroCard from "./CourseIntroCard";
import StudyMaterialSection from "./StudyMaterialSection";
import ChapterList from "./ChapterList";

const Course = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p>Loading...</p>;

  return (
    <div>


<div>


    <CourseIntroCard course={course}/>
{/* study material detail */}
<StudyMaterialSection courseId={courseId}/>
    {/* chapter list */}
    <ChapterList course={course}/>
    
</div>
    </div>
   
  )}

export default Course;
