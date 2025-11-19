"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function ViewNotes() {
  const { courseId } = useParams();
  const [notes, setNotes] = useState([]);
  const [stepCount, setStepCount] = useState(0);
  const router= useRouter();

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    try {
      const result = await axios.post("/api/study-type", {
        courseId,
        studyType: "notes",
      });
      console.log("API response:", result.data);

      // result.data is already an array
      setNotes(Array.isArray(result.data) ? result.data : []);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const prevStep = () =>
    setStepCount((prev) => (prev > 0 ? prev - 1 : prev));
  const nextStep = () =>
    setStepCount((prev) => (prev < notes.length - 1 ? prev + 1 : prev));

  return (
    <div className="p-6 space-y-6">
      {/* Progress bar + buttons */}
      <div className="flex gap-5 items-center">
        {stepCount > 0 && (
          <Button variant="outline" size="sm" onClick={prevStep}>
            Previous
          </Button>
        )}

        {notes.map((_, index) => (
          <div
            key={index}
            className={`w-full h-2 rounded-full ${
              index <= stepCount ? "bg-green-800" : "bg-gray-200"
            }`}
          />
        ))}

        <Button
          variant="outline"
          size="sm"
          onClick={nextStep}
          disabled={stepCount >= notes.length - 1}
        >
          Next
        </Button>
      </div>

      {/* Notes content */}
    <div className="prose max-w-none">
  {notes.length > 0 ? (
    <>
      <div dangerouslySetInnerHTML={{ __html: notes[stepCount]?.notes }} />

      {stepCount === notes.length - 1 && (
        <h2 className="mt-6 text-center text-green-700 font-semibold">
          End of notes
        </h2>
      )}
      <Button className="bg-green-700"  onClick={()=>router.back()}>Go back to Course Page</Button>
    </>
  ) : (
    <p className="text-gray-500">No notes available.</p>
  )}
</div>

    </div>
  );
}
