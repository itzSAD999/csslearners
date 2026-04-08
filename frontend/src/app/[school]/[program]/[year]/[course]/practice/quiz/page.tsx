"use client";

import { useState, useEffect, useCallback } from "react";
import { getQuizTopics, getFilteredQuizQuestions } from "@/lib/mock-data";
import type { QuizQuestion } from "@/lib/types";

type Phase = "setup" | "active" | "results";

export default function QuizPage() {
  const allTopics = getQuizTopics();

  // ── Setup state ──
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState<string>("ALL");
  const [questionCount, setQuestionCount] = useState(5);

  // ── Quiz state ──
  const [phase, setPhase] = useState<Phase>("setup");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answers, setAnswers] = useState<{ questionId: string; selectedIndex: number; isCorrect: boolean }[]>([]);
  const [startTime, setStartTime] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  // Timer
  useEffect(() => {
    if (phase !== "active") return;
    const interval = setInterval(() => setElapsed(Math.floor((Date.now() - startTime) / 1000)), 1000);
    return () => clearInterval(interval);
  }, [phase, startTime]);

  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const startQuiz = () => {
    const qs = getFilteredQuizQuestions(selectedTopics, difficulty, questionCount);
    if (qs.length === 0) return;
    setQuestions(qs);
    setCurrentIdx(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setStartTime(Date.now());
    setPhase("active");
  };

  const submitAnswer = useCallback(() => {
    if (selectedAnswer === null) return;
    const q = questions[currentIdx];
    const isCorrect = selectedAnswer === q.correctIndex;
    setAnswers((prev) => [...prev, { questionId: q.id, selectedIndex: selectedAnswer, isCorrect }]);
    setShowExplanation(true);
  }, [selectedAnswer, questions, currentIdx]);

  const nextQuestion = () => {
    if (currentIdx + 1 >= questions.length) {
      setPhase("results");
    } else {
      setCurrentIdx((i) => i + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const resetQuiz = () => {
    setPhase("setup");
    setSelectedAnswer(null);
    setShowExplanation(false);
    setAnswers([]);
  };

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  const correctCount = answers.filter((a) => a.isCorrect).length;
  const currentQ = questions[currentIdx];

  // ── SETUP SCREEN ──
  if (phase === "setup") {
    return (
      <div className="animate-fade-in-up">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🧠</span>
            <div>
              <h2 className="text-xl font-bold text-[var(--text-primary)]">Live Quiz</h2>
              <p className="text-sm text-[var(--text-secondary)]">Test your knowledge with MCQ questions</p>
            </div>
          </div>

          {/* Topic Selection */}
          <div className="mb-6">
            <label className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider block mb-3">
              Select Topics
            </label>
            <div className="flex flex-wrap gap-2">
              {allTopics.map((topic) => (
                <button
                  key={topic}
                  onClick={() => toggleTopic(topic)}
                  className={`rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200 ${
                    selectedTopics.includes(topic)
                      ? "bg-[var(--accent)] text-white shadow-sm"
                      : "bg-[var(--surface-muted)] text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]"
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-[var(--text-tertiary)]">
              {selectedTopics.length === 0 ? "All topics selected" : `${selectedTopics.length} topic(s) selected`}
            </p>
          </div>

          {/* Difficulty */}
          <div className="mb-6">
            <label className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider block mb-3">
              Difficulty
            </label>
            <div className="flex gap-2">
              {["ALL", "EASY", "MEDIUM", "HARD"].map((d) => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                    difficulty === d
                      ? "bg-[var(--accent)] text-white"
                      : "bg-[var(--surface-muted)] text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]"
                  }`}
                >
                  {d === "ALL" ? "All Levels" : d}
                </button>
              ))}
            </div>
          </div>

          {/* Question Count */}
          <div className="mb-8">
            <label className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider block mb-3">
              Number of Questions
            </label>
            <div className="flex gap-2">
              {[5, 10, 15, 20].map((n) => (
                <button
                  key={n}
                  onClick={() => setQuestionCount(n)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    questionCount === n
                      ? "bg-[var(--accent)] text-white"
                      : "bg-[var(--surface-muted)] text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={startQuiz}
            className="w-full rounded-lg bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-[var(--accent-dark)] hover:shadow-lg hover:-translate-y-0.5"
          >
            Start Quiz →
          </button>
        </div>
      </div>
    );
  }

  // ── ACTIVE QUIZ ──
  if (phase === "active" && currentQ) {
    return (
      <div className="animate-fade-in-up">
        {/* Progress Bar */}
        <div className="mb-4 flex items-center justify-between text-sm">
          <span className="font-medium text-[var(--text-primary)]">
            Question {currentIdx + 1} of {questions.length}
          </span>
          <span className="font-mono text-[var(--text-tertiary)]">⏱ {formatTime(elapsed)}</span>
        </div>
        <div className="mb-6 h-2 rounded-full bg-[var(--surface-muted)] overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[var(--blue-500)] to-[var(--blue-400)] transition-all duration-500"
            style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
          />
        </div>

        {/* Question Card */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
          <div className="mb-2 flex items-center gap-2">
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
              currentQ.difficulty === "EASY" ? "bg-emerald-50 text-emerald-700" :
              currentQ.difficulty === "MEDIUM" ? "bg-amber-50 text-amber-700" :
              "bg-rose-50 text-rose-700"
            }`}>
              {currentQ.difficulty}
            </span>
            <span className="rounded bg-[var(--surface-muted)] px-2 py-0.5 text-xs font-medium text-[var(--text-tertiary)]">
              {currentQ.topic}
            </span>
          </div>

          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-6">
            {currentQ.questionText}
          </h3>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((option, idx) => {
              let optionClass = "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-accent)] hover:bg-[var(--surface-muted)]";
              if (showExplanation) {
                if (idx === currentQ.correctIndex) optionClass = "border-emerald-300 bg-emerald-50 text-emerald-800";
                else if (idx === selectedAnswer && idx !== currentQ.correctIndex) optionClass = "border-rose-300 bg-rose-50 text-rose-800";
                else optionClass = "border-[var(--border)] bg-[var(--surface)] opacity-50";
              } else if (selectedAnswer === idx) {
                optionClass = "border-[var(--border-accent)] bg-[var(--accent-lighter)] ring-2 ring-[var(--accent)]/20";
              }

              return (
                <button
                  key={idx}
                  onClick={() => !showExplanation && setSelectedAnswer(idx)}
                  disabled={showExplanation}
                  className={`w-full rounded-xl border p-4 text-left text-sm font-medium transition-all duration-200 ${optionClass}`}
                >
                  <span className="mr-3 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--surface-muted)] text-xs font-bold">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  {option}
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showExplanation && currentQ.explanation && (
            <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-3 animate-fade-in-up">
              <p className="text-xs font-semibold text-blue-800 mb-1">💡 Explanation</p>
              <p className="text-sm text-blue-700">{currentQ.explanation}</p>
            </div>
          )}

          {/* Actions */}
          <div className="mt-6 flex gap-3">
            {!showExplanation ? (
              <button
                onClick={submitAnswer}
                disabled={selectedAnswer === null}
                className="flex-1 rounded-lg bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-[var(--accent-dark)] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Check Answer
              </button>
            ) : (
              <button
                onClick={nextQuestion}
                className="flex-1 rounded-lg bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-[var(--accent-dark)]"
              >
                {currentIdx + 1 >= questions.length ? "See Results" : "Next Question →"}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ── RESULTS SCREEN ──
  const percentage = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;
  const grade = percentage >= 80 ? "Excellent! 🎉" : percentage >= 60 ? "Good job! 👍" : percentage >= 40 ? "Keep practicing! 💪" : "Review the material 📚";

  return (
    <div className="animate-fade-in-up">
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8 text-center">
        <span className="text-5xl block mb-4">{percentage >= 80 ? "🏆" : percentage >= 60 ? "⭐" : "📖"}</span>
        <h2 className="text-2xl font-bold text-[var(--text-primary)]">{grade}</h2>
        <p className="mt-2 text-[var(--text-secondary)]">
          You scored <span className="font-bold text-[var(--accent)]">{correctCount}/{questions.length}</span> ({percentage}%)
        </p>
        <p className="text-sm text-[var(--text-tertiary)]">Time: {formatTime(elapsed)}</p>

        {/* Score Bar */}
        <div className="mt-6 mx-auto max-w-xs h-3 rounded-full bg-[var(--surface-muted)] overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${
              percentage >= 80 ? "bg-emerald-500" : percentage >= 60 ? "bg-amber-500" : "bg-rose-500"
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Answer Summary */}
        <div className="mt-6 grid grid-cols-5 sm:grid-cols-10 gap-2 max-w-md mx-auto">
          {answers.map((a, i) => (
            <div
              key={i}
              className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold ${
                a.isCorrect
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-rose-100 text-rose-700"
              }`}
            >
              {i + 1}
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={resetQuiz}
            className="rounded-lg bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[var(--accent-dark)]"
          >
            Take Another Quiz
          </button>
          <button
            onClick={() => { setPhase("setup"); }}
            className="rounded-lg border border-[var(--border)] px-6 py-3 text-sm font-semibold text-[var(--text-secondary)] transition-all hover:bg-[var(--surface-muted)]"
          >
            Change Settings
          </button>
        </div>
      </div>
    </div>
  );
}
