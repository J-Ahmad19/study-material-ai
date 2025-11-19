import React from 'react'

const ChapterList = ({ course }) => {
  const CHAP = course?.courseLayout?.chapters
  console.log('ch', CHAP)

  return (
    <div className="mt-3">
      <h2 className="font-medium text-xl">ChapterList</h2>
      <div>
        {CHAP?.map((chapter, index) => (
          <div key={index} className=" flex gap-5 shadow-md mb-2 border p-3 my-2 rounded w-full">
            <h2 className="font-medium">{chapter?.chapterTitle}</h2>
            <p className="text-gray-600 text-sm">{chapter?.chapterSummary}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChapterList
