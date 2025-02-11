import { useState } from "react";
import { GameMode } from "@shared/schema";
import GameLayout from "@/components/common/GameLayout";
import VoiceFeedback from "@/components/common/VoiceFeedback";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface MathGameProps {
  mode: GameMode;
  onModeChange: (mode: GameMode) => void;
}

export default function MathGame({ mode, onModeChange }: MathGameProps) {
  const [question, setQuestion] = useState(generateQuestion());
  const [feedback, setFeedback] = useState<{ correct: boolean; message: string } | null>(null);

  function generateQuestion() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operation = Math.random() < 0.5 ? "+" : "-";
    const answer = operation === "+" ? num1 + num2 : Math.max(num1, num2) - Math.min(num1, num2);
    const options = generateOptions(answer);
    
    return {
      num1: Math.max(num1, num2),
      num2: Math.min(num1, num2),
      operation,
      answer,
      options,
    };
  }

  function generateOptions(answer: number) {
    const options = [answer];
    while (options.length < 4) {
      const option = Math.max(0, answer + Math.floor(Math.random() * 5) * (Math.random() < 0.5 ? 1 : -1));
      if (!options.includes(option)) {
        options.push(option);
      }
    }
    return options.sort(() => Math.random() - 0.5);
  }

  function handleAnswer(selectedAnswer: number) {
    const isCorrect = selectedAnswer === question.answer;
    setFeedback({
      correct: isCorrect,
      message: isCorrect ? "Correct!" : "Try again!",
    });

    if (isCorrect || mode === "quiz") {
      setTimeout(() => {
        setFeedback(null);
        setQuestion(generateQuestion());
      }, 2000);
    }
  }

  return (
    <GameLayout title="Basic Mathematics" mode={mode} onModeChange={onModeChange}>
      <div className="max-w-2xl mx-auto space-y-8">
        <Card className="p-8">
          <div className="text-center text-4xl mb-8 space-x-4">
            <span>{question.num1}</span>
            <span>{question.operation}</span>
            <span>{question.num2}</span>
            <span>=</span>
            <span>?</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {question.options.map((option) => (
              <Button
                key={option}
                onClick={() => handleAnswer(option)}
                variant={
                  feedback && option === question.answer
                    ? "default"
                    : feedback?.correct === false && option === question.answer
                    ? "destructive"
                    : "outline"
                }
                className="text-2xl h-16"
              >
                {option}
              </Button>
            ))}
          </div>
        </Card>

        {feedback && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={`text-center text-2xl ${
              feedback.correct ? "text-green-500" : "text-red-500"
            }`}
          >
            {feedback.message}
          </motion.div>
        )}

        <VoiceFeedback
          message={feedback?.message || ""}
          play={!!feedback}
        />
      </div>
    </GameLayout>
  );
}
