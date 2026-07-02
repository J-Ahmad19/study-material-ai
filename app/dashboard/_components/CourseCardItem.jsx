import React from 'react'
import { Progress } from "@/components/ui/progress"
import {Button } from "@/components/ui/button"
import {RefreshCw} from 'lucide-react'
import Link from "next/link";

const CourseCardItem = ({course}) => {

  console.log(course?.status)
  return (
    <div className='border rounded-lg shadow-md p-5 '>

<div>
    <div className='flex justify-between items-center'>
        <img src={'knowledge.png'} alt='other' width={50} height={50}/>
      {/* //  <h2 className='test-[10px] p-1 rounded-full'> 29 Aug 2025</h2> */}
    </div>
    <h2 className='mt-3 font-medium text-lg'>{course?.courseLayout?.courseTitle}</h2>
    <p className='text-xs line-clamp-2 text-gray-500' >{course?.courseLayout?.courseSummary}</p>
<div className='mt-3'>
    <Progress value={0}/>

</div>
<div className='mt-3 flex justify-end'>
  {course?.status === 'Generating' ? (
  <Link href={'/course/'+course?.courseId}> 
  <Button>View</Button>
  </Link>
  ) : (
    <h2 className='text-sm p-1 px-2  flex items-center rounded-full gap-2 bg-gray-500'>
      
    </h2>  
  )}
</div>

</div>

    </div>
  )
}

export default CourseCardItem