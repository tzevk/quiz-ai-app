// File: components/QuizPage.jsx
"use client";

import { useEffect, useState } from "react";
import QuestionCard from "./QuestionCard";
import QuizTimer from "./QuizTimer";
import ProgressBar from "./ProgressBar";
import "../styles/quiz.css";

const QuizPage = ({ questions }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const handleOptionSelect = (questionId, option) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: option });
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleSubmit = () => {
    alert("Quiz submitted! You can now evaluate the answers.");
  };

  return (
    <div className="quiz-container">
      <QuizTimer duration={60} />

      <ProgressBar
        current={Object.keys(selectedAnswers).length}
        total={questions.length}
      />

      <QuestionCard
        question={questions[currentIndex]}
        index={currentIndex}
        total={questions.length}
        selected={selectedAnswers[questions[currentIndex]._id]}
        onSelect={handleOptionSelect}
      />

      <div className="quiz-nav">
        <button onClick={handlePrevious} disabled={currentIndex === 0}>
          Previous
        </button>
        {currentIndex < questions.length - 1 ? (
          <button onClick={handleNext}>Next</button>
        ) : (
          <button onClick={handleSubmit} className="submit-btn">
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
