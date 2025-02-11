import { useState } from "react";
import { GameMode } from "@shared/schema";
import GameLayout from "@/components/common/GameLayout";
import VoiceFeedback from "@/components/common/VoiceFeedback";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import confetti from 'canvas-confetti';

interface ShapeGameProps {
  mode: GameMode;
  onModeChange: (mode: GameMode) => void;
}

const SHAPES = [
  { 
    name: "Circle",
    shape: "⭕",
    description: "A round shape with no corners"
  },
  { 
    name: "Square",
    shape: "⬛",
    description: "A shape with four equal sides and four corners"
  },
  { 
    name: "Triangle",
    shape: "🔺",
    description: "A shape with three sides and three corners"
  },
  { 
    name: "Star",
    shape: "⭐",
    description: "A shape with five points"
  },
  { 
    name: "Heart",
    shape: "❤️",
    description: "A shape that represents love"
  }
];

export default function ShapeGame({ mode, onModeChange }: ShapeGameProps) {
  const [currentShape, setCurrentShape] = useState(() => {
    const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
    return shape;
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

  const handleShapeSelect = (selectedShape: string) => {
    if (disabled) return;

    const isCorrect = selectedShape === currentShape.name;
    setFeedback({
      correct: isCorrect,
      message: isCorrect 
        ? `Yes! This is a ${currentShape.name}! ${currentShape.description}` 
        : "Try again!"
    });

    if (isCorrect) {
      triggerConfetti();
      setDisabled(true);
      setTimeout(() => {
        setFeedback(null);
        let newShape;
        do {
          newShape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
        } while (newShape.name === currentShape.name);
        setCurrentShape(newShape);
        setDisabled(false);
      }, 2000);
    } else if (mode === "quiz") {
      setDisabled(true);
      setTimeout(() => {
        setFeedback(null);
        let newShape;
        do {
          newShape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
        } while (newShape.name === currentShape.name);
        setCurrentShape(newShape);
        setDisabled(false);
      }, 2000);
    }
  };

  return (
    <GameLayout title="Shape Recognition" mode={mode} onModeChange={onModeChange}>
      <div className="max-w-4xl mx-auto space-y-8">
        <Card className="p-8 bg-white shadow-lg">
          <motion.div
            key={currentShape.name}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="text-center"
          >
            <div className="text-8xl mb-4">
              {currentShape.shape}
            </div>
            <div className="text-2xl mb-8 text-blue-900 font-bold">
              What shape is this?
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {SHAPES.map((shape) => (
              <Card
                key={shape.name}
                className={`p-8 cursor-pointer transition-all hover:bg-blue-50 ${
                  disabled ? 'opacity-75' : ''
                }`}
                onClick={() => handleShapeSelect(shape.name)}
              >
                <div className="text-center">
                  <div className="text-4xl mb-2">{shape.shape}</div>
                  <div className="text-xl font-bold text-blue-900">{shape.name}</div>
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