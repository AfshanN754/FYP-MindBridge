import { useState } from "react";
import { GameMode } from "@shared/schema";
import GameLayout from "@/components/common/GameLayout";
import VoiceFeedback from "@/components/common/VoiceFeedback";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface SpeechGameProps {
  mode: GameMode;
  onModeChange: (mode: GameMode) => void;
}

const EXPRESSIONS = [
  { 
    gesture: "Wave Hello", 
    description: "Wave your hand to say hello!", 
    emoji: "👋",
    audio: "Hello!"
  },
  { 
    gesture: "Thumbs Up", 
    description: "Show approval with a thumbs up!", 
    emoji: "👍",
    audio: "Good job!"
  },
  { 
    gesture: "Clap Hands", 
    description: "Clap your hands to show excitement!", 
    emoji: "👏",
    audio: "Let's clap together!"
  },
  { 
    gesture: "Point", 
    description: "Point to something you want!", 
    emoji: "👆",
    audio: "I want that!"
  },
  { 
    gesture: "High Five", 
    description: "Give a high five to celebrate!", 
    emoji: "✋",
    audio: "High five!"
  }
];

export default function SpeechGame({ mode, onModeChange }: SpeechGameProps) {
  const [currentExpression, setCurrentExpression] = useState(() => 
    EXPRESSIONS[Math.floor(Math.random() * EXPRESSIONS.length)]
  );
  const [practicing, setPracticing] = useState(false);
  const [feedback, setFeedback] = useState<{ correct: boolean; message: string } | null>(null);

  const handlePractice = () => {
    setPracticing(true);
    setFeedback({
      correct: true,
      message: currentExpression.audio
    });

    setTimeout(() => {
      setPracticing(false);
      setFeedback(null);
    }, 3000);
  };

  const handleNext = () => {
    let nextExpression;
    do {
      nextExpression = EXPRESSIONS[Math.floor(Math.random() * EXPRESSIONS.length)];
    } while (nextExpression.gesture === currentExpression.gesture);
    
    setCurrentExpression(nextExpression);
    setPracticing(false);
    setFeedback(null);
  };

  return (
    <GameLayout title="Speech Therapy" mode={mode} onModeChange={onModeChange}>
      <div className="max-w-2xl mx-auto space-y-8">
        <Card className="p-8">
          <motion.div
            key={currentExpression.gesture}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center"
          >
            <div className="text-8xl mb-4">{currentExpression.emoji}</div>
            <h2 className="text-2xl font-bold mb-2">{currentExpression.gesture}</h2>
            <p className="text-muted-foreground mb-8">{currentExpression.description}</p>
            
            <div className="flex gap-4 justify-center">
              <Button
                onClick={handlePractice}
                disabled={practicing}
                className="min-w-[120px]"
              >
                Practice
              </Button>
              <Button
                onClick={handleNext}
                variant="outline"
                className="min-w-[120px]"
              >
                Next
              </Button>
            </div>
          </motion.div>
        </Card>

        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-2xl text-green-500"
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
