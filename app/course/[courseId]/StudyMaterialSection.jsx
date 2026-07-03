import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import MaterialCardItem from '../MaterialCardItem'
import gsap from 'gsap'
import { BookMarked } from 'lucide-react'

const StudyMaterialSection = ({courseId}) => {
  const [studyTypeContent, setStudyTypeContent] = useState();
  const sectionRef = useRef(null)
  const titleRef = useRef(null)

  const MaterialList = [
    {
      name: 'Notes/Chapters',
      desc: 'Read comprehensive study notes',
      icon: '/notes.png',
      path: '/notes',
      type:'notes',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Flashcards',
      desc: 'Test your knowledge interactively',
      icon: '/flashcard.png',
      path: '/flashcards',
      type: 'flashcards',
      color: 'from-purple-500 to-pink-500'
    },
    {
      name: 'Quiz',
      desc: 'Challenge yourself with quizzes',
      icon: '/quiz.png',
      path: '/quiz',
      type: 'quiz',
      color: 'from-orange-500 to-red-500'
    }
  ]

  useEffect(() => {
    GetStudyMaterial()
  }, [])

  const GetStudyMaterial = async () => {
    try {
      const result = await axios.post('/api/study-type', {
        courseId: courseId,
        studyType: 'ALL'
      })
      console.log('Study material:', result.data)
      setStudyTypeContent(result.data)
    } catch (error) {
      console.error('Error fetching study materials:', error)
    }
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" }
      )

      gsap.fromTo(
        ".material-card",
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: "back.out" }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className='space-y-6'>
      <div ref={titleRef}>
        <h2 className='text-3xl font-bold flex items-center gap-3 mb-2'>
          <BookMarked className='w-8 h-8 text-primary' />
          <span>Study Materials</span>
        </h2>
        <p className='text-muted-foreground'>Choose your preferred learning method</p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {MaterialList.map((item, index) => (
          <div key={index} className='material-card'>
            <MaterialCardItem 
              item={item}
              studyTypeContent={studyTypeContent}
              courseId={courseId}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default StudyMaterialSection
