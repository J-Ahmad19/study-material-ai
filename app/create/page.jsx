"use client";

import React, { useState } from "react";
import SelectOption from "./_components/SelectOption";
import { Button } from "@/components/ui/button";
import TopicInput from "./_components/TopicInput";
import axios from "axios";
import { useUser } from "@clerk/nextjs"; 
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner"

const Create = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [generatedCourse, setGeneratedCourse] = useState(null);
  const { user } = useUser();
  const router= useRouter();

  const handleUserInput = (fieldName, fieldValue) => {
    setFormData((prev) => {
      const updated = { ...prev, [fieldName]: fieldValue };
      console.log("Updated formData:", updated);
      return updated;
    });
  };

  const GenerateCourseOutline = async () => {
   
    try {
      setLoading(true);
      setGeneratedCourse(null);
     console.log("Form Data:", formData);
    //alert(JSON.stringify(formData, null, 2)); 

      const courseId = formData.courseId || crypto.randomUUID();


      const result = await axios.post("/api/generate-course-outline", {
        courseId,
        ...formData,
        createdBy: user?.primaryEmailAddress?.emailAddress,
      });

       // console.log(result.data.result.resp)
      console.log("Generated Course:", result.data);
      setGeneratedCourse(result.data);
    } catch (err) {
      console.error("Error generating course:", err);
     // alert("Failed to generate course. Please try again.");
    } finally {
      setLoading(false);
      router.replace('/dashboard');
      toast("Your course content is generating, Click on Refresh button")

    }
  };

  return (
    <div className="flex flex-col items-center p-5 md:px-24 lg:px-36 mt-20 w-full">
      <h2 className="font-bold text-4xl text-green-950 text-center">
        Start Building your Personal Study Material
      </h2>
      <p className="text-yellow-950 text-lg text-center">
        Fill all details in order to generate study material for your next project
      </p>

      {/* Steps */}
      <div className="mt-10 w-full">
        {step === 0 ? (
          <SelectOption selectedStudyType={(value) => handleUserInput("studyType", value)} />
        ) : (
          <TopicInput
            setTopic={(value) => handleUserInput("topic", value)}
            setDifficultyLevel={(value) => handleUserInput("difficultyLevel", value)}
          />
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-between w-full mt-10">
        {step !== 0 ? (
          <Button variant="outline" onClick={() => setStep(step - 1)}>Previous</Button>
        ) : (
          <span />
        )}

        {step === 0 ? (
          <Button onClick={() => setStep(step + 1)}>Next</Button>
        ) : (
          <Button disabled={loading} onClick={GenerateCourseOutline}>
            {loading ? <Loader className="animate-spin"/>: "Generate"}
          </Button>
        )}
      </div>

      {/* Output Section */}
      {generatedCourse && (
        <div className="mt-10 w-full bg-gray-100 rounded-xl p-5 shadow-md">
          <h3 className="text-2xl font-semibold text-green-900">Generated Course</h3>
          
          {/* Show JSON in readable format */}
          <pre className="bg-black text-white p-4 rounded-lg overflow-x-auto mt-3 text-sm">
            {JSON.stringify(generatedCourse, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default Create;
