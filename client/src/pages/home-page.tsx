import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import GameCard from "@/components/common/GameCard";
import { Link } from "wouter";
import { LogOut } from "lucide-react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const TEAM_MEMBERS = [
  {
    name: "Saad Amin",
    role: "Lead Developer",
    description: "Passionate about creating educational technology for special needs children"
  },
  {
    name: "Afshan Naeem",
    role: "Educational Specialist",
    description: "Expert in autism education and child development"
  },
  {
    name: "Zahra Sardar",
    role: "UX Designer",
    description: "Focused on creating autism-friendly user interfaces"
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function HomePage() {
  const { user, logoutMutation } = useAuth();

  return (
    <div className="min-h-screen bg-blue-50">
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-900">Welcome, {user?.name}!</h1>
          <Button variant="ghost" size="icon" onClick={() => logoutMutation.mutate()}>
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <motion.section
          initial="hidden"
          animate="show"
          variants={container}
          className="max-w-4xl mx-auto mb-16 text-center"
        >
          <motion.h2 
            variants={item}
            className="text-4xl font-bold text-blue-900 mb-6"
          >
            Understanding Autism
          </motion.h2>
          <motion.p 
            variants={item}
            className="text-lg text-blue-700 mb-8"
          >
            Every child with autism is unique, with their own strengths, challenges, and ways of learning.
            Our platform provides interactive, engaging, and autism-friendly educational games to support
            their learning journey.
          </motion.p>
          <motion.div variants={item}>
            <Link href="/explore">
              <Button className="bg-blue-600 hover:bg-blue-700 text-lg py-6 px-8">
                Explore Games
              </Button>
            </Link>
          </motion.div>
        </motion.section>

        <motion.section
          initial="hidden"
          animate="show"
          variants={container}
          className="mb-16"
        >
          <motion.h2 
            variants={item}
            className="text-3xl font-bold text-blue-900 text-center mb-8"
          >
            Our Team
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TEAM_MEMBERS.map((member) => (
              <motion.div key={member.name} variants={item}>
                <Card className="bg-white">
                  <CardHeader>
                    <CardTitle>{member.name}</CardTitle>
                    <CardDescription>{member.role}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{member.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
        </section>
      </main>
    </div>
  );
}