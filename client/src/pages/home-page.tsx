import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import GameCard from "@/components/common/GameCard";
import { LogOut } from "lucide-react";

export default function HomePage() {
  const { user, logoutMutation } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Welcome, {user?.name}!</h1>
          <Button variant="ghost" size="icon" onClick={() => logoutMutation.mutate()}>
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <GameCard
            title="Basic Mathematics"
            description="Learn counting and simple arithmetic"
            icon="🎲"
            href="/game/math"
          />
          <GameCard
            title="Object Identification"
            description="Learn about harmful and non-harmful objects"
            icon="🖼"
            href="/game/objects"
          />
          <GameCard
            title="Speech Therapy"
            description="Practice common gestures and expressions"
            icon="🗣"
            href="/game/speech"
          />
          <GameCard
            title="Colors & Shapes"
            description="Identify and match colors and shapes"
            icon="🎨"
            href="/game/colorshape"
          />
        </div>
      </main>
    </div>
  );
}
