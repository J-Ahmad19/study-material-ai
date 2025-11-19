"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function ViewFlashcards() {
  const { courseId } = useParams();
  const router = useRouter();
  const [flashcards, setFlashcards] = useState([]);
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    getFlashcards();
  }, []);

  const getFlashcards = async () => {
    try {
      const result = await axios.post("/api/study-type", {
        courseId,
        studyType: "flashcards",
      });
      console.log("Flashcards fetched:", result.data);
      setFlashcards(Array.isArray(result.data) ? result.data : []);
    } catch (error) {
      console.error("Error fetching flashcards:", error);
    }
  };

  const prevCard = () => {
    if (index > 0) {
      setIndex(index - 1);
      setShowAnswer(false);
    }
  };

  const nextCard = () => {
    if (index < flashcards.length - 1) {
      setIndex(index + 1);
      setShowAnswer(false);
    }
  };

  return (
      <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Flashcards</h1>

      {flashcards.map((f) =>
        f.content?.map((c, index) => (
          <div key={index} className="border rounded-lg p-4 mb-4 shadow-sm">
            <p className="font-semibold text-blue-700">
              Q: {c.question}
            </p>
            <p className="text-gray-800 mt-2">
              A: {c.answer}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
