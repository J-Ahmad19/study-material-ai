// '=][use client";
// import React, { useState } from "react";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";

// const MaterialCardItem = ({ item, studyTypeContent, courseId }) => {
//   const [flashcards, setFlashcards] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [showFlashcards, setShowFlashcards] = useState(false);

//   const isEmpty =
//     !studyTypeContent?.[item.type] ||
//     (Array.isArray(studyTypeContent[item.type]) &&
//       studyTypeContent[item.type].length === 0);

//   // 🧩 Function to fetch flashcards if available, otherwise generate them
//   const handleFlashcards = async () => {
//     setLoading(true);

//     try {
//       // 1️⃣ Try fetching existing flashcards
//       const fetchResponse = await fetch("/api/flashcards", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ courseId }),
//       });

//       const fetchData = await fetchResponse.json();

//       if (fetchResponse.ok && fetchData.flashcards?.length > 0) {
//         console.log("✅ Loaded flashcards from DB:", fetchData.flashcards);
//         setFlashcards(fetchData.flashcards);
//         setShowFlashcards(true);
//       } else {
//         console.log("⚠️ No flashcards found, generating new ones...");

//         // 2️⃣ Generate new flashcards if not found
//         const generateResponse = await fetch("/api/generate-flashcard", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             courseId: courseId,
//             studyType: "flashcards",
//           }),
//         });

//         const generateData = await generateResponse.json();
//         console.log("✨ Generated flashcards:", generateData.flashcards);

//         if (generateData.flashcards && generateData.flashcards.length > 0) {
//           setFlashcards(generateData.flashcards);
//           setShowFlashcards(true);
//         } else {
//           alert("No flashcards generated. Try again later.");
//         }
//       }
//     } catch (error) {
//       console.error("❌ Error handling flashcards:", error);
//       alert("Failed to fetch or generate flashcards.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className={`border shadow-md rounded-lg p-5 flex flex-col items-center h-full ${
//         isEmpty ? "grayscale" : ""
//       }`}
//     >
//       <h2 className="p-2 m-5 px-2 bg-green-950 text-white rounded-full text-[10px]">
//         Ready
//       </h2>

//       <img src={item.icon} alt={item.name} width={50} height={50} />
//       <h2 className="font-medium">{item.name}</h2>
//       <p className="text-gray-500 text-sm text-center flex-grow">{item.desc}</p>

//       {/* 📘 Normal "View" button */}
//       <Link href={item.path} className="w-full mt-auto">
//         <Button className="w-full" variant="outline" disabled={isEmpty}>
//           View
//         </Button>
//       </Link>

//       {/* 🧠 Flashcard button */}
//       <div className="mt-3 w-full">
//         <Button
//           className="w-full"
//           variant="default"
//           onClick={handleFlashcards}
//           disabled={loading}
//         >
//           {loading ? "Loading..." : "Flashcards"}
//         </Button>
//       </div>

//       {/* 🪄 Flashcards Display Section */}
//       {showFlashcards && flashcards.length > 0 && (
//         <div className="mt-5 w-full bg-gray-50 p-3 rounded-lg">
//           <h3 className="text-sm font-semibold mb-2 text-gray-700">
//             Generated Flashcards:
//           </h3>

//           <div className="space-y-3 max-h-80 overflow-y-auto">
//             {flashcards.map((card, index) => (
//               <div
//                 key={index}
//                 className="p-3 border rounded-md bg-white shadow-sm"
//               >
//                 <p className="font-semibold text-gray-800">
//                   Q{index + 1}: {card.question}
//                 </p>
//                 <p className="text-gray-600 mt-1">
//                   <strong>Answer:</strong> {card.answer}
//                 </p>
//               </div>
//             ))}
//           </div>

//           <Button
//             className="mt-3 w-full"
//             variant="outline"
//             onClick={() => setShowFlashcards(false)}
//           >
//             Close Flashcards
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MaterialCardItem;
