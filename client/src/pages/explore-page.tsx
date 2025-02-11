import { motion } from "framer-motion";
import GameCard from "@/components/common/GameCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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

const CATEGORIES = [
  {
    title: "Learning Games",
    description: "Interactive games designed to make learning fun and engaging",
    icon: "🎮"
  },
  {
    title: "Visual Learning",
    description: "Games that help develop visual recognition and memory",
    icon: "👁️"
  },
  {
    title: "Skill Development",
    description: "Activities to improve various cognitive and motor skills",
    icon: "🧩"
  }
];

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <main className="container mx-auto px-4 py-12 space-y-16">
        <motion.section
          initial="hidden"
          animate="show"
          variants={container}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h1
            variants={item}
            className="text-4xl font-bold text-blue-900 mb-6"
          >
            Explore Learning Games
          </motion.h1>
          <motion.p
            variants={item}
            className="text-lg text-blue-700 mb-12"
          >
            Discover our collection of educational games designed specifically for children with autism
          </motion.p>

          <motion.div 
            variants={container}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            {CATEGORIES.map((category) => (
              <motion.div key={category.title} variants={item}>
                <Card className="h-full bg-white/50 backdrop-blur border-2 border-blue-100 hover:border-blue-200 transition-colors">
                  <CardHeader>
                    <div className="text-4xl mb-4">{category.icon}</div>
                    <CardTitle className="text-blue-900">{category.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-blue-700">{category.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          initial="hidden"
          animate="show"
          variants={container}
          className="max-w-6xl mx-auto"
        >
          <motion.h2
            variants={item}
            className="text-3xl font-bold text-blue-900 text-center mb-8"
          >
            Available Games
          </motion.h2>
          <motion.div 
            variants={container}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <motion.div variants={item}>
              <GameCard
                title="Basic Mathematics"
                description="Learn counting and simple arithmetic through interactive exercises"
                icon="🎲"
                href="/game/math"
              />
            </motion.div>
            <motion.div variants={item}>
              <GameCard
                title="Object Identification"
                description="Learn about everyday objects and their safety levels"
                icon="🖼"
                href="/game/objects"
              />
            </motion.div>
            <motion.div variants={item}>
              <GameCard
                title="Speech Therapy"
                description="Practice common gestures and expressions with voice guidance"
                icon="🗣"
                href="/game/speech"
              />
            </motion.div>
            <motion.div variants={item}>
              <GameCard
                title="Shapes Recognition"
                description="Learn to identify different shapes and patterns"
                icon="🎨"
                href="/game/colorshape"
              />
            </motion.div>
          </motion.div>
        </motion.section>
      </main>
    </div>
  );
}
