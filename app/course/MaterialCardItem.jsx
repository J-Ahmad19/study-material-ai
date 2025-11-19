import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const MaterialCardItem = ({ item, studyTypeContent, courseId }) => {
  const [contentExists, setContentExists] = useState(null); // null = loading

  // ✅ Check if flashcards or quiz exist in DB
  useEffect(() => {
    const checkContent = async () => {
      if ((item.type === "flashcards" || item.type === "quiz") && courseId) {
        try {
          const res = await fetch(
            `/api/check-${item.type}?courseId=${courseId}`
          );
          const data = await res.json();
          setContentExists(data.exists);
        } catch (error) {
          console.error(`Error checking ${item.type}:`, error);
          setContentExists(false);
        }
      }
    };
    checkContent();
  }, [courseId, item.type]);

  const isEmpty =
    !studyTypeContent?.[item.type] ||
    (Array.isArray(studyTypeContent[item.type]) &&
      studyTypeContent[item.type].length === 0);

  // ✅ Generic generator (works for both flashcards & quiz)
  const generateContent = async () => {
    try {
      console.log(`Generating ${item.type} for:`, courseId);
      const response = await fetch(`/api/generate-${item.type}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId,
          studyType: item.type,
        }),
      });
      const data = await response.json();
      console.log(`Generated ${item.type}:`, data);
      if (data.success) setContentExists(true);
    } catch (error) {
      console.error(`Error generating ${item.type}:`, error);
    }
  };

  const renderButton = () => {
    // for flashcards or quiz
    if (item.type === "flashcards" || item.type === "quiz") {
      if (contentExists === null) {
        return (
          <Button className="w-full mt-3" variant="outline" disabled>
            Checking...
          </Button>
        );
      } else if (contentExists) {
        return (
          <Link
            href={`/course/${courseId}${item.path}`}
            className="w-full mt-3"
          >
            <Button className="w-full" variant="outline">
              View
            </Button>
          </Link>
        );
      } else {
        return (
          <Button
            className="w-full mt-3"
            variant="outline"
            onClick={generateContent}
          >
            Generate
          </Button>
        );
      }
    }

    // for notes, Q/A, etc.
    return (
      <Link href={`/course/${courseId}${item.path}`} className="w-full mt-3">
        <Button className="w-full" variant="outline" disabled={isEmpty}>
          View
        </Button>
      </Link>
    );
  };

  return (
    <div
      className={`border shadow-md rounded-lg p-5 flex flex-col items-center h-full ${
        isEmpty ? "grayscale" : ""
      }`}
    >
      <h2 className="p-2 m-5 px-2 bg-green-950 text-white rounded-full text-[10px]">
        Ready
      </h2>
      <img src={item.icon} alt={item.name} width={50} height={50} />
      <h2 className="font-medium">{item.name}</h2>
      <p className="text-gray-500 text-sm text-center flex-grow">{item.desc}</p>
      {renderButton()}
    </div>
  );
};

export default MaterialCardItem;
