import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ArrowRight, Heart, RefreshCw } from "lucide-react";
import { birthdayConfig } from "../config/birthdayConfig";
import confetti from "canvas-confetti";

export default function BirthdayQuiz() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);

  const quizData = birthdayConfig.quiz || { title: "Love Quiz", questions: [] };
  const questions = quizData.questions || [];
  const activeQuestion = questions[currentIdx] || { question: "", options: [], correctIndex: 0 };

  const handleSelect = (idx) => {
    if (isAnswered) return;
    setSelectedOpt(idx);
    setIsAnswered(true);

    const isCorrect = idx === activeQuestion.correctIndex;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedOpt(null);
    setIsAnswered(false);

    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setShowResult(true);
      if (score + (selectedOpt === activeQuestion.correctIndex ? 1 : 0) === questions.length) {
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
      }
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setScore(0);
    setShowResult(false);
    setIsAnswered(false);
  };

  return (
    <section id="quiz" className="py-24 bg-burgundy-dark text-cream relative overflow-hidden select-none px-6">
      <div className="max-w-2xl mx-auto relative z-10 flex flex-col items-center">
        <div className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 text-rose-300 font-mono text-xs uppercase tracking-widest bg-rose-500/20 border border-rose-400/30 px-4 py-1.5 rounded-full mb-3 shadow-md"
          >
            <span>Trivia Time</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-5xl font-bold text-pink-100"
          >
            {quizData.title}
          </motion.h2>
        </div>

        <div className="w-full min-h-[350px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key="quiz-card"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 md:p-8 rounded-3xl shadow-2xl w-full max-w-xl flex flex-col gap-6 relative"
              >
                <div className="w-full bg-white/10 h-[3px] rounded-full overflow-hidden">
                  <div 
                    className="bg-rose-500 h-full transition-all duration-300"
                    style={{ width: `${((currentIdx) / questions.length) * 100}%` }}
                  />
                </div>

                <div className="flex justify-between items-center text-xs font-mono font-semibold text-pink-300/80 uppercase tracking-wider">
                  <span>Question {currentIdx + 1} of {questions.length}</span>
                  <span>Score: {score}</span>
                </div>

                <h3 className="font-serif font-bold text-xl md:text-2xl text-pink-100">
                  {activeQuestion.question}
                </h3>

                <div className="flex flex-col gap-3">
                  {activeQuestion.options.map((option, idx) => {
                    const isSelected = selectedOpt === idx;
                    const isCorrect = idx === activeQuestion.correctIndex;
                    
                    let btnClass = "border-white/20 hover:bg-white/10 text-pink-100 bg-burgundy-dark/60";
                    if (isAnswered) {
                      if (isSelected) {
                        btnClass = isCorrect 
                          ? "bg-emerald-600 text-white border-emerald-400 shadow-md" 
                          : "bg-rose-600 text-white border-rose-400 shadow-md";
                      } else if (isCorrect) {
                        btnClass = "bg-emerald-900/60 text-emerald-200 border-emerald-500/50";
                      } else {
                        btnClass = "opacity-40 border-white/10 text-pink-200/50";
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelect(idx)}
                        disabled={isAnswered}
                        className={`w-full px-5 py-3.5 rounded-2xl border text-left font-sans text-sm md:text-base font-medium transition-all duration-200 focus:outline-none cursor-pointer ${btnClass}`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>

                <AnimatePresence>
                  {isAnswered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex flex-col items-center gap-4 mt-2 text-center"
                    >
                      <p className="font-sans font-semibold text-pink-100">
                        {selectedOpt === activeQuestion.correctIndex 
                          ? "You know us too well! ❤️" 
                          : "Hmm... I'll forgive you this time 😌❤️"}
                      </p>

                      <button
                        onClick={handleNext}
                        className="px-6 py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-sans font-semibold text-sm rounded-full shadow-md flex items-center gap-2 cursor-pointer transition hover:scale-105 active:scale-95 focus:outline-none"
                      >
                        {currentIdx + 1 === questions.length ? "Finish Quiz" : "Next Question"}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                key="quiz-result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl w-full max-w-md text-center flex flex-col items-center gap-6"
              >
                <div className="w-16 h-16 bg-rose-500/20 rounded-full flex items-center justify-center text-rose-400 shadow-inner">
                  <Award className="w-8 h-8" />
                </div>

                <h3 className="font-serif font-bold text-2xl md:text-3xl text-pink-100">
                  Game Completed!
                </h3>

                <div className="flex flex-col items-center gap-2">
                  <span className="font-mono text-xs font-bold text-pink-300/70 uppercase tracking-widest">
                    Your Love Score
                  </span>
                  
                  <div className="flex gap-2 text-3xl my-2">
                    {[...Array(questions.length)].map((_, i) => (
                      <Heart 
                        key={i} 
                        className={`w-8 h-8 transition-all duration-300 ${
                          i < score 
                            ? "text-rose-500 fill-rose-500 scale-110" 
                            : "text-white/20 stroke-[1.5px]"
                        }`}
                      />
                    ))}
                  </div>

                  <p className="font-sans text-sm text-pink-200/90 leading-relaxed max-w-xs mt-2 font-medium">
                    {score === questions.length 
                      ? "Perfect match! You know us inside out. ❤️" 
                      : `You got ${score} out of ${questions.length} correct! Pretty good, let's keep adding memories together.`}
                  </p>
                </div>

                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 border border-white/20 hover:bg-white/10 text-pink-200 font-sans font-semibold text-xs rounded-full flex items-center gap-2 cursor-pointer transition focus:outline-none"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Play Again
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
