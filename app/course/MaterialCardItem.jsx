import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { Loader, CheckCircle2, BookOpen, Sparkles } from "lucide-react";

const MaterialCardItem = ({ item, studyTypeContent, courseId }) => {
  const [contentExists, setContentExists] = useState(null);
  const [generating, setGenerating] = useState(false);
  const cardRef = useRef(null);

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

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );

      gsap.to(".material-card-icon", {
        y: -4,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, cardRef);

    return () => ctx.revert();
  }, []);

  const isEmpty =
    !studyTypeContent?.[item.type] ||
    (Array.isArray(studyTypeContent[item.type]) &&
      studyTypeContent[item.type].length === 0);

  const generateContent = async () => {
    try {
      setGenerating(true);
      const response = await fetch(`/api/generate-${item.type}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId,
          studyType: item.type,
        }),
      });
      const data = await response.json();
      if (data.success) setContentExists(true);
    } catch (error) {
      console.error(`Error generating ${item.type}:`, error);
    } finally {
      setGenerating(false);
    }
  };

  const renderButton = () => {
    if (item.type === "flashcards" || item.type === "quiz") {
      if (contentExists === null) {
        return (
          <Button 
            className="w-full mt-4 rounded-xl" 
            variant="outline" 
            disabled
          >
            <Loader className="w-4 h-4 mr-2 animate-spin" />
            Checking...
          </Button>
        );
      } else if (contentExists) {
        return (
          <Link
            href={`/course/${courseId}${item.path}`}
            className="w-full mt-4"
          >
            <Button className="w-full rounded-xl bg-gradient-to-r from-primary to-secondary hover:shadow-lg transition-all duration-300">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              View
            </Button>
          </Link>
        );
      } else {
        return (
          <Button
            className="w-full mt-4 rounded-xl bg-gradient-to-r from-primary/70 to-secondary/70 hover:shadow-lg transition-all duration-300"
            onClick={generateContent}
            disabled={generating}
          >
            {generating ? (
              <><Loader className="w-4 h-4 mr-2 animate-spin" /> Generating...</>
            ) : (
              <><Sparkles className="w-4 h-4 mr-2" /> Generate</>
            )}
          </Button>
        );
      }
    }

    return (
      <Link href={`/course/${courseId}${item.path}`} className="w-full mt-4">
        <Button 
          className="w-full rounded-xl bg-gradient-to-r from-primary to-secondary hover:shadow-lg transition-all duration-300"
          disabled={isEmpty}
        >
          <BookOpen className="w-4 h-4 mr-2" />
          View
        </Button>
      </Link>
    );
  };

  return (
    <div
      ref={cardRef}
      className={`group relative rounded-2xl border border-border bg-card hover:border-primary/50 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col ${
        isEmpty ? "opacity-75" : ""
      }`}
    >
      {/* Gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${item.color || 'from-primary/5 to-secondary/5'} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

      <div className="relative z-10 p-8 flex flex-col items-center flex-grow">
        {/* Status Badge */}
        <div className="px-3 py-1 mb-4 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-primary/20 text-primary border border-primary/30">
          Ready to Learn
        </div>

        {/* Icon */}
        <div className="material-card-icon w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
          <BookOpen className="w-8 h-8" />
        </div>

        {/* Title */}
        <h3 className="font-bold text-lg text-foreground mb-2 text-center group-hover:text-primary transition-colors duration-300">
          {item.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground text-center flex-grow mb-4">
          {item.desc}
        </p>

        {/* Button */}
        {renderButton()}
      </div>
    </div>
  );
};

export default MaterialCardItem;
