import React from 'react'
import { Progress } from "@/components/ui/progress"
const CourseIntroCard = ({course}) => {
  return (
   


    <div className='flex  gap-5 border p-10  shadow-md  items-center'>
        <img src={'/knowledge.png'} alt='other' width={70} height={70}/>
      <div>
    
    <h2 className='mt-3 font-bold text-2xl'>{course?.courseLayout?.courseTitle}</h2>
    <p className='text-xs' >{course?.courseLayout?.courseSummary}</p>
<div className='mt-3'>
    <Progress value={0}/>
    <h2 className='text-lg text-amber-950'>Total chapter: {course?.courseLayout?.chapters?.length} </h2>
</div>
</div>

    </div>
  )
}

export default CourseIntroCard