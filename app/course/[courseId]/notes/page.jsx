"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import gsap from "gsap";
import { ChevronLeft, ChevronRight, Moon, Sun, BookOpen, Loader } from "lucide-react";

export default function ViewNotes() {
  const { courseId } = useParams();
  const [notes, setNotes] = useState([]);
  const [stepCount, setStepCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();
  const contentRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    try {
      const result = await axios.post("/api/study-type", {
        courseId,
        studyType: "notes",
      });
      setNotes(Array.isArray(result.data) ? result.data : []);
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  const prevStep = () => {
    if (stepCount > 0) {
      setStepCount(stepCount - 1);
      animateContent();
    }
  };

  const nextStep = () => {
    if (stepCount < notes.length - 1) {
      setStepCount(stepCount + 1);
      animateContent();
    }
  };

  const animateContent = () => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }, containerRef);
    return () => ctx.revert();
  };

  useEffect(() => {
    animateContent();
  }, [stepCount]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-secondary/5">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading study notes...</p>
        </div>
      </div>
    );
  }

  const progressPercentage = notes.length > 0 ? ((stepCount + 1) / notes.length) * 100 : 0;

  return (
    <div 
      ref={containerRef}
      className={`min-h-screen transition-colors duration-300 ${
        darkMode 
          ? 'bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900' 
          : 'bg-gradient-to-br from-background via-background to-secondary/5'
      }`}
    >
      {/* Decorative elements */}
      <div className={`fixed top-0 right-0 w-96 h-96 ${darkMode ? 'bg-primary/10' : 'bg-primary/5'} rounded-full blur-3xl -z-10 pointer-events-none`}></div>
      <div className={`fixed bottom-0 left-0 w-96 h-96 ${darkMode ? 'bg-secondary/10' : 'bg-secondary/5'} rounded-full blur-3xl -z-10 pointer-events-none`}></div>

      {/* Header with controls */}
      <div className="sticky top-0 z-20 backdrop-blur-md border-b border-border/50 p-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-primary" />
            <span className="text-sm font-semibold text-muted-foreground">
              Chapter {stepCount + 1} of {notes.length}
            </span>
          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg border border-border hover:bg-card transition-colors duration-300"
            title={darkMode ? "Light mode" : "Dark mode"}
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-slate-600" />
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-8">
        {notes.length > 0 ? (
          <>
            {/* Progress bar */}
            <div className="space-y-3">
              <Progress value={progressPercentage} className="h-2" />
              <p className="text-xs text-muted-foreground text-center">
                {stepCount + 1} / {notes.length} sections completed
              </p>
            </div>

            {/* Notes Content */}
            <div
              ref={contentRef}
              className={`rounded-2xl border border-border/50 backdrop-blur-sm p-8 md:p-12 shadow-lg transition-all duration-300 ${
                darkMode
                  ? 'bg-slate-800/50 text-slate-50'
                  : 'bg-card'
              }`}
            >
              {/* Content styling for better readability */}
              <style>{`
                .notes-content h1 {
                  font-size: 2rem;
                  font-weight: bold;
                  margin-bottom: 1.5rem;
                  color: ${darkMode ? '#f0f9ff' : 'var(--foreground)'};
                }
                .notes-content h2 {
                  font-size: 1.5rem;
                  font-weight: 700;
                  margin-top: 1.5rem;
                  margin-bottom: 1rem;
                  color: ${darkMode ? '#e0f2fe' : 'var(--foreground)'};
                  border-bottom: 2px solid var(--primary);
                  padding-bottom: 0.5rem;
                }
                .notes-content h3 {
                  font-size: 1.25rem;
                  font-weight: 600;
                  margin-top: 1.25rem;
                  margin-bottom: 0.75rem;
                  color: ${darkMode ? '#bae6fd' : 'var(--primary)'};
                }
                .notes-content p {
                  line-height: 1.8;
                  margin-bottom: 1rem;
                  color: ${darkMode ? '#cbd5e1' : 'var(--foreground)'};
                }
                .notes-content ul, .notes-content ol {
                  margin: 1.5rem 0;
                  margin-left: 1.5rem;
                  color: ${darkMode ? '#cbd5e1' : 'var(--foreground)'};
                }
                .notes-content li {
                  margin-bottom: 0.75rem;
                  line-height: 1.7;
                }
                .notes-content code {
                  background-color: ${darkMode ? 'rgba(30, 41, 59, 0.8)' : 'var(--input)'};
                  padding: 0.25rem 0.5rem;
                  border-radius: 0.375rem;
                  font-family: 'Courier New', monospace;
                  color: ${darkMode ? '#7dd3fc' : 'var(--primary)'};
                  font-size: 0.875em;
                }
                .notes-content blockquote {
                  border-left: 4px solid var(--primary);
                  padding-left: 1rem;
                  margin: 1.5rem 0;
                  font-style: italic;
                  color: ${darkMode ? '#94a3b8' : 'var(--muted-foreground)'};
                }
              `}</style>

              <div className="notes-content prose prose-invert dark:prose-invert max-w-none">
                <div 
                  dangerouslySetInnerHTML={{ __html: notes[stepCount]?.notes }} 
                />
              </div>

              {/* Completion message */}
              {stepCount === notes.length - 1 && (
                <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
                  <p className="text-center font-semibold text-lg text-primary">
                    ✓ You&apos;ve completed all chapters!
                  </p>
                </div>
              )}
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between gap-4">
              <Button
                onClick={prevStep}
                disabled={stepCount === 0}
                className="rounded-xl"
                variant={stepCount === 0 ? "outline" : "default"}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              <div className="flex gap-2">
                {notes.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setStepCount(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === stepCount
                        ? 'bg-primary w-8'
                        : 'bg-muted hover:bg-muted-foreground'
                    }`}
                    title={`Go to chapter ${index + 1}`}
                  />
                ))}
              </div>

              <Button
                onClick={nextStep}
                disabled={stepCount >= notes.length - 1}
                className="rounded-xl"
                variant={stepCount >= notes.length - 1 ? "outline" : "default"}
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            {/* Back Button */}
            <button
              onClick={() => router.back()}
              className="w-full py-3 rounded-xl border border-border hover:bg-card transition-colors duration-300 font-medium text-foreground"
            >
              ← Back to Course
            </button>
          </>
        ) : (
          <div className="rounded-2xl border border-dashed border-border p-16 text-center">
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground text-lg">No study notes available yet</p>
            <Button 
              onClick={() => router.back()} 
              className="mt-6"
            >
              Back to Course
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
