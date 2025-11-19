import React, { useState } from "react";

const SelectOption = ({selectedStudyType}) => {
  const Option = [
    {
      name: "Exam",
      icon: "/exam_1.png",
    },
    {
      name: "Job Interview",
      icon: "/job.png",
    },
    {
      name: "Practice",
      icon: "/practice.png",
    },
    {
      name: "Coding Prep",
      icon: "/code.png",
    },
    {
      name: "Other",
      icon: "/knowledge.png",
    },
  ];

  const [selectedOption , setSelectedOption]= useState();

  return (
    <div>
      <h2 className="text-center mb-2 text-lg">
        For which you want to create your Personal study material
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4 lg:grid-cols-5 ">
        {Option.map((option, index) => (
          <div
            key={index}
            className={`flex flex-col items-center p-4 border rounded-2xl shadow-sm cursor-pointer hover:shadow-md transition ${option?.name==selectedOption&& 'border-purple-950'}`} 
            onClick={()=>{setSelectedOption(option.name);selectedStudyType(option.name)}}
          >
            <img
              src={option.icon}
              alt={option.name}
              width="50"
              height="50"
              className="mb-2"
            />
            
            <h2 className="text-sm font-medium text-gray-700">{option.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectOption;
