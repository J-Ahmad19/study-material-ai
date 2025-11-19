"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function FlashcardView() {
  const { courseId } = useParams();
  const [flashcards, setFlashcards] = useState([]);
  const [index, setIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    getFlashcards();
  }, []);

  const getFlashcards = async () => {
    try {
      const response = await fetch("/api/get-flashcard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId }),
      });
      const data = await response.json();
      if (data.success) {
        setFlashcards(data.flashcards);
      }
    } catch (err) {
      console.error("Error fetching flashcards:", err);
    }
  };

  if (flashcards.length === 0)
    return <p className="text-center mt-10">No flashcards available yet.</p>;

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-6">Flashcards</h1>

      <div className="border p-6 rounded-lg shadow-md bg-white">
        <p className="font-semibold text-lg">
          Q{index + 1}: {flashcards[index]?.question}
        </p>
        <p className="mt-4 text-gray-700">
          <strong>Answer:</strong> {flashcards[index]?.answer}
        </p>
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <Button
          onClick={() => setIndex((prev) => Math.max(prev - 1, 0))}
          disabled={index === 0}
          variant="outline"
        >
          Previous
        </Button>
        <Button
          onClick={() => setIndex((prev) => Math.min(prev + 1, flashcards.length - 1))}
          disabled={index === flashcards.length - 1}
          variant="outline"
        >
          Next
        </Button>
      </div>

      <Button
        className="mt-6 bg-green-700 text-white"
        onClick={() => router.back()}
      >
        Back to Course Page
      </Button>
    </div>
  );
}
