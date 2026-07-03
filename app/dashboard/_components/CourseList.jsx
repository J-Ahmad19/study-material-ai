"use client"
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState, useRef } from 'react'
import axios from "axios";
import CourseCardItem from './CourseCardItem';
import { RefreshCcw, BookMarked } from 'lucide-react';
import {Button } from "@/components/ui/button"
import gsap from 'gsap'

const CourseList = () => {
  const { user } = useUser();
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const titleRef = useRef(null)
  const gridRef = useRef(null)

  useEffect(() => {
    if (user) GetCourseList();
  }, [user]);

  const GetCourseList = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await axios.post('api/courses', {
        createdBy: user?.primaryEmailAddress?.emailAddress,
      });

      const courses = result.data.result;
      setCourseList(courses);
      console.log("📘 Courses:", courses);

      // Fetch notes for each course
      for (const course of courses) {
        try {
          const notesRes = await axios.post('/api/chapternotes', {
            courseId: course.id,
          });
        } catch (err) {
          console.error("❌ Error fetching notes:", err);
        }
      }
    } catch (err) {
      console.error("Error fetching courses:", err);
      setError({
        message: err.response?.data?.error || "Failed to load courses",
        details: err.response?.data?.details || err.message,
      });
      setCourseList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" }
      )

      if (!loading && courseList.length > 0) {
        gsap.fromTo(
          ".course-card",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power3.out" }
        )
      }
    }, gridRef)

    return () => ctx.revert()
  }, [loading, courseList])

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div 
        ref={titleRef}
        className='flex justify-between items-center'
      >
        <div>
          <h2 className='font-bold text-3xl text-foreground flex items-center gap-3'>
            <BookMarked className='w-8 h-8 text-primary' />
            Your Study Materials
          </h2>
          <p className='text-sm text-muted-foreground mt-1'>
            {courseList.length} course{courseList.length !== 1 ? 's' : ''} in your library
          </p>
        </div>

        <Button 
          variant="outline" 
          onClick={GetCourseList}
          className='rounded-xl border-primary/30 hover:bg-primary/10 transition-all duration-300'
        >
          <RefreshCcw className='w-4 h-4 mr-2' /> 
          Refresh
        </Button>
      </div>

      {/* Error Message */}
      {error && (
        <div className='rounded-xl border border-destructive/50 bg-destructive/10 p-6'>
          <h3 className='font-semibold text-destructive mb-2'>Unable to Load Courses</h3>
          <p className='text-sm text-muted-foreground mb-4'>{error.message}</p>
          {error.details && (
            <details className='text-xs text-muted-foreground bg-background/50 p-3 rounded'>
              <summary className='cursor-pointer font-medium'>Error Details</summary>
              <pre className='mt-2 overflow-auto'>{error.details}</pre>
            </details>
          )}
          <Button 
            size="sm" 
            onClick={GetCourseList}
            className='mt-4'
          >
            Retry
          </Button>
        </div>
      )}

      {/* Grid */}
      <div 
        ref={gridRef}
        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
      >
        {!loading ? (
          courseList?.length > 0 ? (
            courseList.map((course, index) => (
              <div key={index} className='course-card'>
                <CourseCardItem course={course} />
              </div>
            ))
          ) : !error ? (
            <div className='col-span-full flex flex-col items-center justify-center py-12'>
              <BookMarked className='w-12 h-12 text-muted-foreground mb-3' />
              <p className='text-muted-foreground text-center'>
                No courses yet. Create one to get started!
              </p>
            </div>
          ) : null
        ) : (
          [1,2,3,4,5,6].map((item,index)=>(
            <div 
              key={index} 
              className='h-64 rounded-2xl bg-gradient-to-br from-muted to-muted/50 animate-pulse'
            ></div>
          ))
        )}
      </div>
    </div>
  );
};

export default CourseList;
