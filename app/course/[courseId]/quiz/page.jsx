"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function ViewQuiz() {
  const { courseId } = useParams();
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    getQuizData();
  }, []);

  const getQuizData = async () => {
    try {
      const result = await axios.post("/api/study-type", {
        courseId,
        studyType: "quiz",
      });

      // Flatten all quiz content arrays into one array of questions
      const data = Array.isArray(result.data)
        ? result.data.flatMap((item) => item.content || [])
        : [];

      console.log("Quiz fetched:", data);
      setQuizQuestions(data);
    } catch (error) {
      console.error("Error fetching quiz:", error);
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const nextQuestion = () => {
    if (index < quizQuestions.length - 1) {
      setIndex(index + 1);
      setSelectedOption(null);
      setShowAnswer(false);
    }
  };

  const prevQuestion = () => {
    if (index > 0) {
      setIndex(index - 1);
      setSelectedOption(null);
      setShowAnswer(false);
    }
  };

  const currentQuestion = quizQuestions[index];

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Quiz</h1>

      {quizQuestions.length > 0 && currentQuestion ? (
        <div className="border rounded-lg p-6 shadow-sm">
          <p className="font-semibold text-lg mb-4 text-blue-700">
            Q{index + 1}: {currentQuestion.question}
          </p>

          <div className="space-y-2">
            {currentQuestion.options?.map((option, i) => (
              <div
                key={i}
                className={`p-2 border rounded cursor-pointer ${
                  selectedOption === option
                    ? "bg-blue-100 border-blue-500"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => handleOptionSelect(option)}
              >
                {option}
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-between items-center">
            <Button onClick={prevQuestion} disabled={index === 0}>
              Previous
            </Button>

            <Button
              onClick={() => setShowAnswer(true)}
              variant="outline"
              disabled={!selectedOption}
            >
              Show Answer
            </Button>

            <Button
              onClick={nextQuestion}
              disabled={index === quizQuestions.length - 1}
            >
              Next
            </Button>
          </div>

          {showAnswer && (
            <div className="mt-4 p-3 border-t text-green-700 font-medium">
              ✅ Correct Answer: {currentQuestion.answer}
            </div>
          )}
        </div>
      ) : (
        <p className="text-center text-gray-600">No quiz available.</p>
      )}
    </div>
  );
}
