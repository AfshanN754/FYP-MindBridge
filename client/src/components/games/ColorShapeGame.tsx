import { useState } from "react";
import { GameMode } from "@shared/schema";
import GameLayout from "@/components/common/GameLayout";
import VoiceFeedback from "@/components/common/VoiceFeedback";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import confetti from 'canvas-confetti';

interface ColorShapeGameProps {
  mode: GameMode;
  onModeChange: (mode: GameMode) => void;
}

const SHAPES = [
  { 
    name: "Circle",
    shape: "⭕",
    colors: [
      { name: "Red", colorClass: "bg-red-500 hover:bg-red-600", textColor: "text-red-500" },
      { name: "Blue", colorClass: "bg-blue-500 hover:bg-blue-600", textColor: "text-blue-500" },
      { name: "Yellow", colorClass: "bg-yellow-500 hover:bg-yellow-600", textColor: "text-yellow-500" },
      { name: "Green", colorClass: "bg-green-500 hover:bg-green-600", textColor: "text-green-500" }
    ]
  },
  { 
    name: "Square",
    shape: "⬛",
    colors: [
      { name: "Red", colorClass: "bg-red-500 hover:bg-red-600", textColor: "text-red-500" },
      { name: "Blue", colorClass: "bg-blue-500 hover:bg-blue-600", textColor: "text-blue-500" },
      { name: "Yellow", colorClass: "bg-yellow-500 hover:bg-yellow-600", textColor: "text-yellow-500" },
      { name: "Green", colorClass: "bg-green-500 hover:bg-green-600", textColor: "text-green-500" }
    ]
  },
  { 
    name: "Triangle",
    shape: "🔺",
    colors: [
      { name: "Red", colorClass: "bg-red-500 hover:bg-red-600", textColor: "text-red-500" },
      { name: "Blue", colorClass: "bg-blue-500 hover:bg-blue-600", textColor: "text-blue-500" },
      { name: "Yellow", colorClass: "bg-yellow-500 hover:bg-yellow-600", textColor: "text-yellow-500" },
      { name: "Green", colorClass: "bg-green-500 hover:bg-green-600", textColor: "text-green-500" }
    ]
  },
  { 
    name: "Star",
    shape: "⭐",
    colors: [
      { name: "Red", colorClass: "bg-red-500 hover:bg-red-600", textColor: "text-red-500" },
      { name: "Blue", colorClass: "bg-blue-500 hover:bg-blue-600", textColor: "text-blue-500" },
      { name: "Yellow", colorClass: "bg-yellow-500 hover:bg-yellow-600", textColor: "text-yellow-500" },
      { name: "Green", colorClass: "bg-green-500 hover:bg-green-600", textColor: "text-green-500" }
    ]
  }
];

export default function ColorShapeGame({ mode, onModeChange }: ColorShapeGameProps) {
  const [currentShape, setCurrentShape] = useState(() => {
    const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
    const color = shape.colors[Math.floor(Math.random() * shape.colors.length)];
    return { ...shape, correctColor: color };
  });
  const [feedback, setFeedback] = useState<{ correct: boolean; message: string } | null>(null);
  const [disabled, setDisabled] = useState(false);

  function triggerConfetti() {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }

  const handleColorSelect = (selectedColor: string) => {
    if (disabled) return;

    const isCorrect = selectedColor === currentShape.correctColor.name;
    setFeedback({
      correct: isCorrect,
      message: isCorrect 
        ? `Yes! The ${currentShape.name} is ${currentShape.correctColor.name}!` 
        : "Try again!"
    });

    if (isCorrect) {
      triggerConfetti();
      setDisabled(true);
      setTimeout(() => {
        setFeedback(null);
        const newShape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
        const newColor = newShape.colors[Math.floor(Math.random() * newShape.colors.length)];
        setCurrentShape({ ...newShape, correctColor: newColor });
        setDisabled(false);
      }, 2000);
    } else if (mode === "quiz") {
      setDisabled(true);
      setTimeout(() => {
        setFeedback(null);
        const newShape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
        const newColor = newShape.colors[Math.floor(Math.random() * newShape.colors.length)];
        setCurrentShape({ ...newShape, correctColor: newColor });
        setDisabled(false);
      }, 2000);
    }
  };

  return (
    <GameLayout title="Colors & Shapes" mode={mode} onModeChange={onModeChange}>
      <div className="max-w-4xl mx-auto space-y-8">
        <Card className="p-8 bg-white shadow-lg">
          <motion.div
            key={`${currentShape.name}-${currentShape.correctColor.name}`}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="text-center"
          >
            <div className={`text-8xl mb-4 ${currentShape.correctColor.textColor}`}>
              {currentShape.shape}
            </div>
            <div className="text-2xl mb-8 text-blue-900 font-bold">
              What color is this {currentShape.name.toLowerCase()}?
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {currentShape.colors.map((color) => (
              <Card
                key={color.name}
                className={`p-8 cursor-pointer transition-all ${
                  !disabled ? color.colorClass : 'opacity-75'
                }`}
                onClick={() => handleColorSelect(color.name)}
              >
                <div className="text-center text-white text-xl font-bold">
                  {color.name}
                </div>
              </Card>
            ))}
          </div>
        </Card>

        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
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
    </GameLayout>
  );
}