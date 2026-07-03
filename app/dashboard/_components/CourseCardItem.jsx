import React, { useEffect, useRef } from 'react'
import { Progress } from "@/components/ui/progress"
import {Button } from "@/components/ui/button"
import {ArrowRight, BookOpen, CheckCircle2} from 'lucide-react'
import Link from "next/link";
import gsap from 'gsap';

const CourseCardItem = ({course}) => {
  const cardRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out" }
      )
    }, cardRef)

    return () => ctx.revert()
  }, [])

  return (
    <Link href={course?.status === 'Generating' ? `/course/${course?.courseId}` : '#'}>
      <div 
        ref={cardRef}
        className='group relative h-full rounded-2xl border border-border bg-card hover:border-primary/50 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer hover:scale-105'
      >
        {/* Gradient overlay */}
        <div className='absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

        <div className='relative z-10 h-full flex flex-col p-6'>
          {/* Header with icon */}
          <div className='flex justify-between items-start mb-4'>
            <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300'>
              <BookOpen className='w-6 h-6' />
            </div>
            {course?.status === 'Generating' && (
              <CheckCircle2 className='w-5 h-5 text-green-500' />
            )}
          </div>

          {/* Title and Summary */}
          <h2 className='font-semibold text-lg text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300'>
            {course?.courseLayout?.courseTitle || 'Untitled Course'}
          </h2>
          <p className='text-sm text-muted-foreground line-clamp-2 mb-4 flex-grow'>
            {course?.courseLayout?.courseSummary || 'No description available'}
          </p>

          {/* Progress */}
          <div className='space-y-2 mb-4'>
            <Progress value={0} className='h-2' />
            <p className='text-xs text-muted-foreground'>0% complete</p>
          </div>

          {/* Footer CTA */}
          {course?.status === 'Generating' ? (
            <div className='flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all duration-300'>
              <span>View Course</span>
              <ArrowRight className='w-4 h-4' />
            </div>
          ) : (
            <div className='text-sm text-muted-foreground font-medium'>
              Processing...
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

export default CourseCardItem
