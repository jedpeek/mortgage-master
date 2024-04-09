import Quiz from "@/components/quiz";
import { questions } from "@/questions";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function Home() {
  const { userId } = auth();
  // if (userId) {
  //   redirect("/dashboard");
  // }

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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Quiz questions={getRandomItems(questions)} userId={userId} />
    </main>
  );
}
