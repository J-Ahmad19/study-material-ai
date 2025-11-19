import React, { useEffect, useState } from 'react'
import axios from 'axios'
import MaterialCardItem from '../MaterialCardItem'
import Link from "next/link";
const StudyMaterialSection = ({courseId}) => {

  const [studyTypeContent, setStudyTypeContent]= useState();

  const MaterialList = [
    {
      name: 'Notes/Chapters',
      desc: 'Read notes to prepare it',
      icon: '/notes.png',
      path: '/notes',
      type:'notes'
    },
    {
      name: 'Flashcard',
      desc: 'Flashcard helps to test your Knowledge',
      icon: '/flashcard.png',
      path: '/flashcards',
      type: 'flashcards'
    },
    {
      name: 'Quiz',
      desc: 'Great way to test your Knowledge',
      icon: '/quiz.png',
      path: '/quiz',
      type: 'quiz'
    }
    // {
    //   name: 'Question/Answer',
    //   desc: 'Helps to practice your Learning',
    //   icon: '/qa.png',
    //   path: '/qa',
    //   type: 'qa'
    // }
  ]
  
useEffect(()=>{
  GetStudyMaterial()
}, [])

const GetStudyMaterial= async()=>{
  const result= await axios.post('/api/study-type',{
courseId:courseId,
studyType:'ALL'

  })
console.log('res',result)
setStudyTypeContent(result.data)

}

  return (
    <div className='mt-5'>
      <h2 className='font-medium text-xl'>Study Material Section</h2>

      <div className='grid grid-cols-2 md:grid-cols-3 gap-4 mt-3'>
       {MaterialList.map((item, index) => (
  <MaterialCardItem 
    key={index}
    item={item}
    studyTypeContent={studyTypeContent}
    courseId={courseId}
  />
))}
      </div>
    </div>
  )
}

export default StudyMaterialSection
