import { useState } from "react";
import { GameMode } from "@shared/schema";
import GameLayout from "@/components/common/GameLayout";
import VoiceFeedback from "@/components/common/VoiceFeedback";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useLocation } from "wouter";
import confetti from 'canvas-confetti';
import CountingGame from "./CountingGame";

interface MathGameProps {
  mode: GameMode;
  onModeChange: (mode: GameMode) => void;
}

export default function MathGame({ mode, onModeChange }: MathGameProps) {
  const [question, setQuestion] = useState(generateQuestion());
  const [feedback, setFeedback] = useState<{ correct: boolean; message: string } | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [, setLocation] = useLocation();

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

  function triggerConfetti() {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }

  function handleAnswer(selectedAnswer: number) {
    if (disabled) return;

    const isCorrect = selectedAnswer === question.answer;
    setFeedback({
      correct: isCorrect,
      message: isCorrect ? "Correct!" : "Try again!",
    });

    if (isCorrect) {
      triggerConfetti();
      setDisabled(true);
      setTimeout(() => {
        setFeedback(null);
        if (mode === "quiz" && questionNumber >= 10) {
          // Quiz completed
          setShowExitDialog(true);
        } else {
          setQuestion(generateQuestion());
          if (mode === "quiz") {
            setQuestionNumber(prev => prev + 1);
          }
        }
        setDisabled(false);
      }, 2000);
    } else if (mode === "quiz") {
      setDisabled(true);
      setTimeout(() => {
        setFeedback(null);
        setQuestion(generateQuestion());
        setQuestionNumber(prev => prev + 1);
        setDisabled(false);
      }, 2000);
    }
  }

  function handleExit() {
    if (mode === "quiz") {
      setShowExitDialog(true);
    } else {
      setLocation("/");
    }
  }

  return (
    <GameLayout title="Basic Mathematics" mode={mode} onModeChange={onModeChange}>
      <Tabs defaultValue="arithmetic" className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="counting">Number Learning</TabsTrigger>
          <TabsTrigger value="arithmetic">Addition & Subtraction</TabsTrigger>
        </TabsList>

        <TabsContent value="counting">
          <CountingGame />
        </TabsContent>

        <TabsContent value="arithmetic">
          <div className="space-y-8">
            <Card className="p-8 bg-white shadow-lg">
              {mode === "quiz" && (
                <div className="text-center mb-4 text-blue-900">
                  Question {questionNumber} of 10
                </div>
              )}

              <div className="text-center text-4xl mb-8 space-x-4 font-bold text-blue-900">
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
                    disabled={disabled}
                    variant={
                      feedback && option === question.answer
                        ? "default"
                        : feedback?.correct === false && option === question.answer
                        ? "destructive"
                        : "outline"
                    }
                    className={`text-2xl h-16 ${
                      feedback && option === question.answer
                        ? "bg-green-500 hover:bg-green-600"
                        : "hover:bg-blue-50"
                    }`}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </Card>

            <AnimatePresence>
              {feedback && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className={`text-center text-3xl font-bold ${
                    feedback.correct ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {feedback.message}
                  {feedback.correct && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-4xl mt-2"
                    >
                      🎉
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <VoiceFeedback
              message={feedback?.message || ""}
              play={!!feedback}
            />
          </div>
        </TabsContent>
      </Tabs>

      <AlertDialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Exit Quiz?</AlertDialogTitle>
            <AlertDialogDescription>
              {questionNumber >= 10 
                ? "Congratulations! You've completed all questions. Would you like to return to the home page?"
                : "Are you sure you want to exit? Your progress will be lost."
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => setLocation("/")}>
              Return Home
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </GameLayout>
  );
}