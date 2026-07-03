import React, { useEffect, useRef } from 'react'
import { Progress } from "@/components/ui/progress"
import gsap from 'gsap'
import { BookOpen, Layers } from 'lucide-react'

const CourseIntroCard = ({course}) => {
  const cardRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      )

      gsap.to(".intro-icon", {
        y: -8,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    }, cardRef)

    return () => ctx.revert()
  }, [])

  const totalChapters = course?.courseLayout?.chapters?.length || 0

  return (
    <div 
      ref={cardRef}
      className='rounded-3xl border border-primary/20 bg-gradient-to-br from-card via-card to-primary/5 backdrop-blur-sm p-8 md:p-10 shadow-xl overflow-hidden'
    >
      {/* Background gradient effect */}
      <div className='absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10'></div>

      <div className='grid grid-cols-1 md:grid-cols-12 gap-8 items-start relative z-10'>
        {/* Icon Section */}
        <div className='md:col-span-2 flex justify-center md:justify-start'>
          <div className='intro-icon w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary'>
            <BookOpen className='w-12 h-12' />
          </div>
        </div>

        {/* Content Section */}
        <div className='md:col-span-10 space-y-4'>
          <div>
            <h2 className='text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-2'>
              {course?.courseLayout?.courseTitle || 'Untitled Course'}
            </h2>
            <p className='text-base text-muted-foreground leading-relaxed'>
              {course?.courseLayout?.courseSummary || 'No description available'}
            </p>
          </div>

          {/* Progress and Stats */}
          <div className='space-y-3 pt-4 border-t border-border'>
            <div>
              <div className='flex justify-between items-center mb-2'>
                <span className='text-sm font-semibold text-foreground'>Course Progress</span>
                <span className='text-xs text-muted-foreground'>0%</span>
              </div>
              <Progress value={0} className='h-2' />
            </div>

            <div className='flex items-center gap-4 pt-2'>
              <div className='flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20'>
                <Layers className='w-4 h-4 text-primary' />
                <span className='text-sm font-semibold text-foreground'>
                  {totalChapters} {totalChapters === 1 ? 'Chapter' : 'Chapters'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseIntroCard
