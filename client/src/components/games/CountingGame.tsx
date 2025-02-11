import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import VoiceFeedback from "@/components/common/VoiceFeedback";
import confetti from 'canvas-confetti';

const NUMBERS = [
  { 
    digit: 1,
    word: "one",
    path: "M 20 80 L 20 20",
    description: "Draw a straight line down"
  },
  { 
    digit: 2,
    word: "two",
    path: "M 20 20 C 40 20 40 20 40 40 C 40 60 20 60 20 80 L 40 80",
    description: "Start at the top, curve to the right, then down and left, and finish with a line to the right"
  },
  { 
    digit: 3,
    word: "three",
    path: "M 20 20 C 40 20 40 40 20 50 C 40 50 40 80 20 80",
    description: "Make a curve to the right at the top, then curve back to the middle, and curve again to the bottom"
  },
  { 
    digit: 4,
    word: "four",
    path: "M 30 20 L 30 80 M 20 50 L 40 50",
    description: "Draw a line down, then cross it with a horizontal line"
  },
  { 
    digit: 5,
    word: "five",
    path: "M 40 20 L 20 20 L 20 50 C 20 65 40 65 40 80 C 40 95 20 95 20 80",
    description: "Start with a top line, go down, then curve to make the bottom"
  },
  {
    digit: 6,
    word: "six",
    path: "M 40 20 C 20 20 20 50 20 50 C 20 80 40 80 40 50 C 40 20 20 50 20 50",
    description: "Make a curve that loops around at the bottom"
  },
  {
    digit: 7,
    word: "seven",
    path: "M 20 20 L 40 20 L 20 80",
    description: "Draw a line across the top, then diagonal down to the left"
  },
  {
    digit: 8,
    word: "eight",
    path: "M 30 20 C 40 20 40 35 30 50 C 20 35 20 20 30 20 M 30 50 C 40 65 40 80 30 80 C 20 80 20 65 30 50",
    description: "Make two circles, one on top of the other"
  },
  {
    digit: 9,
    word: "nine",
    path: "M 30 20 C 40 20 40 35 30 50 C 20 35 20 20 30 20 M 30 50 L 30 80",
    description: "Draw a circle at the top, then a line straight down"
  },
  {
    digit: 10,
    word: "ten",
    path: "M 10 80 L 10 20 M 30 80 C 40 80 40 50 30 50 C 20 50 20 80 30 80",
    description: "Draw one straight line, then a zero next to it"
  }
];

export default function CountingGame() {
  const [currentNumber, setCurrentNumber] = useState(NUMBERS[0]);
  const [showAnimation, setShowAnimation] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleNumberClick = (number: typeof NUMBERS[0]) => {
    setCurrentNumber(number);
    setShowAnimation(true);
    setFeedback(`This is the number ${number.word}`);

    confetti({
      particleCount: 50,
      spread: 30,
      origin: { y: 0.6 }
    });

    // Reset animation after showing
    setTimeout(() => {
      setShowAnimation(false);
      setFeedback(null);
    }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card className="p-8 bg-white shadow-lg">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-blue-900">Learning Numbers</h2>
          <p className="text-muted-foreground">Click on a number to learn how to write it!</p>
        </div>

        <div className="grid grid-cols-5 gap-4 mb-8">
          {NUMBERS.map((number) => (
            <Button
              key={number.digit}
              onClick={() => handleNumberClick(number)}
              variant="outline"
              className="h-20 text-3xl hover:bg-blue-50"
            >
              {number.digit}
            </Button>
          ))}
        </div>

        <AnimatePresence>
          {showAnimation && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center"
            >
              <svg
                width="200"
                height="200"
                viewBox="0 0 60 100"
                className="mx-auto mb-4"
              >
                <motion.path
                  d={currentNumber.path}
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
              </svg>
              <p className="text-lg text-blue-900">{currentNumber.description}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>

      <VoiceFeedback
        message={feedback || ""}
        play={!!feedback}
      />
    </div>
  );
}