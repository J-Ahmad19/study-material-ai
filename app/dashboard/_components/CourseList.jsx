"use client"
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import axios from "axios";
import CourseCardItem from './CourseCardItem';
import { RefreshCcw } from 'lucide-react';
import {Button } from "@/components/ui/button"

const CourseList = () => {
  const { user } = useUser();
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading]= useState(false)

  useEffect(() => {
    if (user) GetCourseList();
  }, [user]);

  const GetCourseList = async () => {
    setLoading(true)
    const result = await axios.post('/api/courses', {
      createdBy: user?.primaryEmailAddress?.emailAddress,
    });

    const courses = result.data.result;
    setCourseList(courses);
    setLoading(false)
    console.log("📘 Courses:", courses);

    // 👇 Fetch notes for each course
    for (const course of courses) {
      try {
        const notesRes = await axios.post('/api/chapternotes', {
          courseId: course.id, // or course.courseId depending on your schema
        });

        // console.log(`📝 Notes for course "${course.topic}":`, notesRes.data.notes);
      } catch (err) {
        console.error("❌ Error fetching notes:", err);
      }
    }
  };

  return (
    <div className='mt-10'>
      <h2 className='font-bold text-2xl flex justify-between items-center'> Your Study Material

<Button variant="outline" 
onClick={GetCourseList}><RefreshCcw/> Refresh</Button>

      </h2>
      
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 mt-2 gap-5'>
        {loading==false? courseList?.map((course, index) => {
          return <CourseCardItem course={course} key={index} />;
        }):
        [1,2,3,4,5,6].map((item,index)=>(
          <div key={index} className='h-56 w-full bg-slate-200 rounded-lg animate-pulse'>
            </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
