import { useState } from "react";
import { GameMode } from "@shared/schema";
import GameLayout from "@/components/common/GameLayout";
import VoiceFeedback from "@/components/common/VoiceFeedback";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

interface ColorShapeGameProps {
  mode: GameMode;
  onModeChange: (mode: GameMode) => void;
}

const SHAPES = [
  { name: "Circle", shape: "⭕", color: "red", colorClass: "bg-red-500" },
  { name: "Square", shape: "⬛", color: "blue", colorClass: "bg-blue-500" },
  { name: "Triangle", shape: "🔺", color: "yellow", colorClass: "bg-yellow-500" },
  { name: "Star", shape: "⭐", color: "green", colorClass: "bg-green-500" },
];

const COLORS = [
  { name: "Red", colorClass: "bg-red-500" },
  { name: "Blue", colorClass: "bg-blue-500" },
  { name: "Yellow", colorClass: "bg-yellow-500" },
  { name: "Green", colorClass: "bg-green-500" },
];

export default function ColorShapeGame({ mode, onModeChange }: ColorShapeGameProps) {
  const [currentShape, setCurrentShape] = useState(() =>
    SHAPES[Math.floor(Math.random() * SHAPES.length)]
  );
  const [feedback, setFeedback] = useState<{ correct: boolean; message: string } | null>(null);

  const handleColorSelect = (selectedColor: string) => {
    const isCorrect = selectedColor === currentShape.color;
    setFeedback({
      correct: isCorrect,
      message: isCorrect 
        ? `Yes! The ${currentShape.name} is ${currentShape.color}!` 
        : "Try again!"
    });

    if (isCorrect || mode === "quiz") {
      setTimeout(() => {
        setFeedback(null);
        setCurrentShape(SHAPES[Math.floor(Math.random() * SHAPES.length)]);
      }, 2000);
    }
  };

  return (
    <GameLayout title="Colors & Shapes" mode={mode} onModeChange={onModeChange}>
      <div className="max-w-4xl mx-auto space-y-8">
        <motion.div
          key={currentShape.name}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="text-center"
        >
          <div className="text-8xl mb-4">{currentShape.shape}</div>
          <div className="text-2xl mb-8">
            What color is this {currentShape.name.toLowerCase()}?
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          {COLORS.map((color) => (
            <Card
              key={color.name}
              className={`p-8 cursor-pointer transition-transform hover:scale-105 ${color.colorClass}`}
              onClick={() => handleColorSelect(color.name.toLowerCase())}
            >
              <div className="text-center text-white text-xl font-bold">
                {color.name}
              </div>
            </Card>
          ))}
        </div>

        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
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
