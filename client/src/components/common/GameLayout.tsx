import { PropsWithChildren } from "react";
import { Button } from "@/components/ui/button";
import { Home, X } from "lucide-react";
import { Link } from "wouter";
import { GameMode } from "@shared/schema";
import { Toggle } from "@/components/ui/toggle";

interface GameLayoutProps extends PropsWithChildren {
  title: string;
  mode: GameMode;
  onModeChange: (mode: GameMode) => void;
}

export default function GameLayout({ title, mode, onModeChange, children }: GameLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <Home className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold">{title}</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Toggle
              pressed={mode === "learning"}
              onPressedChange={() => onModeChange(mode === "learning" ? "quiz" : "learning")}
            >
              {mode === "learning" ? "Learning Mode" : "Quiz Mode"}
            </Toggle>
            
            <Link href="/">
              <Button variant="ghost" size="icon">
                <X className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
