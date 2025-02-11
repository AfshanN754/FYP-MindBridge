import { useState } from "react";
import { useRoute } from "wouter";
import { GameMode, GameType } from "@shared/schema";
import MathGame from "@/components/games/MathGame";
import ObjectGame from "@/components/games/ObjectGame";
import SpeechGame from "@/components/games/SpeechGame";
import ColorShapeGame from "@/components/games/ColorShapeGame";
import NotFound from "./not-found";

export default function GamePage() {
  const [, params] = useRoute("/game/:type");
  const [mode, setMode] = useState<GameMode>("learning");
  
  if (!params) return <NotFound />;
  
  const gameType = params.type as GameType;
  
  switch (gameType) {
    case "math":
      return <MathGame mode={mode} onModeChange={setMode} />;
    case "objects":
      return <ObjectGame mode={mode} onModeChange={setMode} />;
    case "speech":
      return <SpeechGame mode={mode} onModeChange={setMode} />;
    case "colorshape":
      return <ColorShapeGame mode={mode} onModeChange={setMode} />;
    default:
      return <NotFound />;
  }
}
