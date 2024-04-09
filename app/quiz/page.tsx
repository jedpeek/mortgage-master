import Quiz from "@/components/quiz";
import React from "react";
import { auth } from "@clerk/nextjs";
import { questions } from "@/questions";
const QuizPage = () => {
  const { userId } = auth();
  const getRandomItems = (array: any) => {
    const result = [];
    const arrayLength = array.length;

    // If array length is less than 10, return the entire array
    if (arrayLength <= 10) {
      return array;
    }

    // Select 10 random items
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * arrayLength);
      result.push(array[randomIndex]);
    }

    return result;
  };
  return (
    <div>
      <Quiz questions={getRandomItems(questions)} userId={userId} />
    </div>
  );
};

export default QuizPage;
