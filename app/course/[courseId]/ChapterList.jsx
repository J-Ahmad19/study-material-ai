import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { BookOpen, ChevronRight } from 'lucide-react'

const ChapterList = ({ course }) => {
  const CHAP = course?.courseLayout?.chapters
  const containerRef = useRef(null)
  const titleRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" }
      )

      gsap.fromTo(
        ".chapter-item",
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.08, ease: "power3.out" }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="space-y-6">
      <div ref={titleRef}>
        <h2 className="text-3xl font-bold flex items-center gap-3 mb-2">
          <BookOpen className="w-8 h-8 text-primary" />
          <span>Course Chapters</span>
        </h2>
        <p className="text-muted-foreground">Explore all topics covered in this course</p>
      </div>

      <div className="space-y-3">
        {CHAP && CHAP.length > 0 ? (
          CHAP.map((chapter, index) => (
            <div 
              key={index} 
              className="chapter-item group relative rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-card/80 transition-all duration-300 overflow-hidden cursor-pointer"
            >
              {/* Gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative z-10 p-6 flex items-start gap-4 lg:gap-6">
                {/* Chapter number badge */}
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 border border-primary/50 flex items-center justify-center">
                  <span className="font-bold text-sm text-primary">{index + 1}</span>
                </div>

                {/* Chapter content */}
                <div className="flex-grow min-w-0">
                  <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                    {chapter?.chapterTitle}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {chapter?.chapterSummary}
                  </p>
                </div>

                {/* Arrow icon */}
                <div className="flex-shrink-0 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-xl border border-dashed border-border p-8 text-center">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
            <p className="text-muted-foreground">No chapters available yet</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ChapterList
