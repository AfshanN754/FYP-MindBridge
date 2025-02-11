import { useState } from "react";
import { GameMode } from "@shared/schema";
import GameLayout from "@/components/common/GameLayout";
import VoiceFeedback from "@/components/common/VoiceFeedback";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

interface ObjectGameProps {
  mode: GameMode;
  onModeChange: (mode: GameMode) => void;
}

const OBJECTS = [
  { name: "Knife", category: "harmful", emoji: "🔪" },
  { name: "Ball", category: "non-harmful", emoji: "⚽" },
  { name: "Fire", category: "harmful", emoji: "🔥" },
  { name: "Book", category: "non-harmful", emoji: "📚" },
  { name: "Scissors", category: "harmful", emoji: "✂️" },
  { name: "Teddy Bear", category: "non-harmful", emoji: "🧸" },
];

export default function ObjectGame({ mode, onModeChange }: ObjectGameProps) {
  const [currentObject, setCurrentObject] = useState(() => 
    OBJECTS[Math.floor(Math.random() * OBJECTS.length)]
  );
  const [feedback, setFeedback] = useState<{ correct: boolean; message: string } | null>(null);

  const handleDrop = (category: string) => {
    const isCorrect = category === currentObject.category;
    setFeedback({
      correct: isCorrect,
      message: isCorrect ? "Correct!" : "Try again!",
    });

    if (isCorrect || mode === "quiz") {
      setTimeout(() => {
        setFeedback(null);
        setCurrentObject(OBJECTS[Math.floor(Math.random() * OBJECTS.length)]);
      }, 2000);
    }
  };

  return (
    <GameLayout title="Object Identification" mode={mode} onModeChange={onModeChange}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="text-center mb-8"
        >
          <div className="text-8xl mb-4">{currentObject.emoji}</div>
          <div className="text-2xl">{currentObject.name}</div>
        </motion.div>

        <div className="grid grid-cols-2 gap-8">
          <Card
            className="p-8 text-center cursor-pointer hover:bg-accent transition-colors"
            onClick={() => handleDrop("harmful")}
          >
            <div className="text-4xl mb-2">⚠️</div>
            <div className="text-xl">Harmful</div>
          </Card>

          <Card
            className="p-8 text-center cursor-pointer hover:bg-accent transition-colors"
            onClick={() => handleDrop("non-harmful")}
          >
            <div className="text-4xl mb-2">✅</div>
            <div className="text-xl">Non-Harmful</div>
          </Card>
        </div>

        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-center text-2xl mt-8 ${
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
