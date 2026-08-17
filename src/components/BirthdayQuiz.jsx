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

  const quizData = birthdayConfig.quiz;
  const questions = quizData.questions;
  const activeQuestion = questions[currentIdx];

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
      // Explode confetti on perfect score!
      if (score + (selectedOpt === activeQuestion.correctIndex ? 1 : 0) === questions.length) {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 }
        });
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
    <section 
      id="quiz" 
      className="py-24 bg-gradient-to-b from-cream to-[#fff5f5] relative overflow-hidden select-none px-6"
    >
      <div className="absolute top-1/2 left-10 w-48 h-48 bg-rose-200/10 rounded-full blur-2xl pointer-events-none" />
      
      <div className="max-w-2xl mx-auto relative z-10 flex flex-col items-center">
        {/* Title */}
        <div className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-rose-800 font-poppins text-xs font-semibold uppercase tracking-widest bg-rose-100 px-4 py-1.5 rounded-full mb-3"
          >
            Trivia Time
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-playfair text-3xl md:text-5xl font-bold text-rose-900"
          >
            {quizData.title}
          </motion.h2>
        </div>

        <div className="w-full min-h-[350px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!showResult ? (
              /* Question Slide */
              <motion.div
                key="quiz-card"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="glass p-6 md:p-8 rounded-3xl border border-rose-200 shadow-md w-full max-w-xl flex flex-col gap-6 relative"
              >
                {/* Progress bar */}
                <div className="w-full bg-rose-100 h-[3px] rounded-full overflow-hidden">
                  <div 
                    className="bg-rose-500 h-full transition-all duration-300"
                    style={{ width: `${((currentIdx) / questions.length) * 100}%` }}
                  />
                </div>

                {/* Counter */}
                <div className="flex justify-between items-center text-xs font-poppins font-semibold text-rose-800/60 uppercase tracking-wider">
                  <span>Question {currentIdx + 1} of {questions.length}</span>
                  <span>Score: {score}</span>
                </div>

                {/* Question Text */}
                <h3 className="font-playfair font-bold text-xl md:text-2xl text-rose-950">
                  {activeQuestion.question}
                </h3>

                {/* Options Grid */}
                <div className="flex flex-col gap-3">
                  {activeQuestion.options.map((option, idx) => {
                    const isSelected = selectedOpt === idx;
                    const isCorrect = idx === activeQuestion.correctIndex;
                    
                    let btnClass = "border-rose-200/50 hover:bg-white/50 text-rose-950";
                    if (isAnswered) {
                      if (isSelected) {
                        btnClass = isCorrect 
                          ? "bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-100" 
                          : "bg-rose-500 text-white border-rose-500 shadow-md shadow-rose-100";
                      } else if (isCorrect) {
                        btnClass = "bg-emerald-100 text-emerald-800 border-emerald-300";
                      } else {
                        btnClass = "opacity-50 border-rose-100 text-rose-900/60";
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelect(idx)}
                        disabled={isAnswered}
                        className={`w-full px-5 py-3.5 rounded-2xl border text-left font-poppins text-sm md:text-base font-medium transition-all duration-200 focus:outline-none cursor-pointer ${btnClass}`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>

                {/* Reaction Feedback */}
                <AnimatePresence>
                  {isAnswered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex flex-col items-center gap-4 mt-2 text-center"
                    >
                      <p className="font-inter font-semibold text-rose-900">
                        {selectedOpt === activeQuestion.correctIndex 
                          ? "You know us too well! ❤️" 
                          : "Hmm... I'll forgive you this time 😌❤️"}
                      </p>

                      <button
                        onClick={handleNext}
                        className="px-6 py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-poppins font-semibold text-sm rounded-full shadow-md flex items-center gap-2 cursor-pointer transition hover:scale-105 active:scale-95 focus:outline-none"
                      >
                        {currentIdx + 1 === questions.length ? "Finish Quiz" : "Next Question"}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              /* Results Screen */
              <motion.div
                key="quiz-result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass p-8 rounded-3xl border border-rose-200 shadow-md w-full max-w-md text-center flex flex-col items-center gap-6"
              >
                <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center text-rose-500 shadow-inner">
                  <Award className="w-8 h-8 fill-rose-500/10" />
                </div>

                <h3 className="font-playfair font-bold text-2xl md:text-3xl text-rose-950">
                  Game Completed!
                </h3>

                <div className="flex flex-col items-center gap-2">
                  <span className="font-poppins text-xs font-bold text-rose-800/60 uppercase tracking-widest">
                    Your Love Score
                  </span>
                  
                  {/* Hearts visualization */}
                  <div className="flex gap-2 text-3xl my-2">
                    {[...Array(questions.length)].map((_, i) => (
                      <Heart 
                        key={i} 
                        className={`w-8 h-8 transition-all duration-300 ${
                          i < score 
                            ? "text-rose-500 fill-rose-500 scale-110 drop-shadow-sm" 
                            : "text-rose-200 stroke-[1.5px]"
                        }`}
                      />
                    ))}
                  </div>

                  <p className="font-inter text-sm text-rose-950/80 leading-relaxed max-w-xs mt-2 font-medium">
                    {score === questions.length 
                      ? "Perfect match! You know us absolutely inside out. ❤️" 
                      : `You got ${score} out of ${questions.length} correct! Pretty good, let's keep adding memories together.`}
                  </p>
                </div>

                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 border border-rose-300 hover:bg-rose-100/50 text-rose-800 font-poppins font-semibold text-xs rounded-full flex items-center gap-2 cursor-pointer transition focus:outline-none"
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
