import React, { useState } from "react";

const FlashcardViewer = ({ courseId }) => {
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCards, setShowCards] = useState(false);

  const handleViewFlashcards = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/flashcards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId }),
      });

      const data = await res.json();

      if (data.flashcards) {
        setFlashcards(data.flashcards);
        setShowCards(true);
      } else {
        alert("No flashcards found for this course.");
      }
    } catch (err) {
      console.error("Error fetching flashcards:", err);
      alert("Failed to load flashcards");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5">
      <button
        onClick={handleViewFlashcards}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        {loading ? "Loading..." : "View Flashcards"}
      </button>

      {showCards && (
        <div className="mt-5 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {flashcards.map((card, index) => (
            <div
              key={index}
              className="border rounded-xl shadow-md p-4 bg-white hover:shadow-lg transition"
            >
              <h3 className="font-semibold text-lg mb-2">Q{index + 1}: {card.question}</h3>
              <p className="text-gray-700">{card.answer}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FlashcardViewer;
