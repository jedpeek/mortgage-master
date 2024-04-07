"use client";
import React, { useState } from "react";

const Quiz = ({ questions }: any) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleOptionSelect = (option: any) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (selectedOption === questions[currentQuestion].correctOption) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    } else {
      setShowResult(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setShowResult(false);
  };

  return (
    <div className="max-w-md mx-auto p-10 outline rounded">
      {!showResult ? (
        <>
          <h1 className="text-2xl font-bold mb-4">
            {questions[currentQuestion].question}
          </h1>
          <div className="space-y-2">
            {questions[currentQuestion].options.map(
              (option: any, index: any) => (
                <div key={index} className="flex items-center">
                  <input
                    type="radio"
                    id={`option${index}`}
                    name="option"
                    value={option}
                    checked={selectedOption === index}
                    onChange={() => handleOptionSelect(index)}
                    className="mr-2"
                  />
                  <label htmlFor={`option${index}`}>{option}</label>
                </div>
              )
            )}
          </div>
          <button
            onClick={handleNextQuestion}
            disabled={selectedOption === null}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          >
            Next
          </button>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4">Quiz Completed!</h1>
          <p className="mb-4">
            Your score: {score} / {questions.length}
          </p>
          <button
            onClick={handleRestartQuiz}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Restart Quiz
          </button>
        </>
      )}
    </div>
  );
};

export default Quiz;
