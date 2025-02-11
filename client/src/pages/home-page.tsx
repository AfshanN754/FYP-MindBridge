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

const AUTISM_FACTS = [
  {
    title: "Unique Perspectives",
    description: "Individuals with autism often have exceptional abilities in visual skills, music, academic skills, and problem-solving",
    icon: "🎨"
  },
  {
    title: "Early Intervention",
    description: "Early intervention and support can significantly improve a child's development and quality of life",
    icon: "🌱"
  },
  {
    title: "Different Learning Styles",
    description: "Every child with autism learns differently, making personalized education approaches essential",
    icon: "📚"
  }
];

const TEAM_MEMBERS = [
  {
    name: "Saad Amin",
    role: "Lead Developer",
    description: "A passionate developer dedicated to creating accessible educational technology. With years of experience in special education software, Saad leads the technical development of our platform.",
    avatar: "👨‍💻",
    bgColor: "bg-blue-50"
  },
  {
    name: "Afshan Naeem",
    role: "Educational Specialist",
    description: "With a Masters in Special Education and 8 years of experience working with autistic children, Afshan ensures our platform meets the unique needs of every child.",
    avatar: "👩‍🏫",
    bgColor: "bg-purple-50"
  },
  {
    name: "Zahra Sardar",
    role: "UX Designer",
    description: "A certified UX designer specializing in accessible interfaces. Zahra's expertise in autism-friendly design principles helps create engaging and comfortable learning experiences.",
    avatar: "👩‍🎨",
    bgColor: "bg-pink-50"
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-900">Welcome, {user?.name}!</h1>
          <Button variant="ghost" size="icon" onClick={() => logoutMutation.mutate()}>
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 space-y-16">
        <motion.section
          initial="hidden"
          animate="show"
          variants={container}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h2 
            variants={item}
            className="text-4xl font-bold text-blue-900 mb-6"
          >
            Understanding Autism
          </motion.h2>
          <motion.p 
            variants={item}
            className="text-lg text-blue-700 mb-12 leading-relaxed"
          >
            Every child with autism is unique, with their own strengths, challenges, and ways of learning.
            Our platform provides interactive, engaging, and autism-friendly educational games to support
            their learning journey.
          </motion.p>

          <motion.div 
            variants={container}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            {AUTISM_FACTS.map((fact) => (
              <motion.div key={fact.title} variants={item}>
                <Card className="h-full bg-white/50 backdrop-blur border-2 border-blue-100 hover:border-blue-200 transition-colors">
                  <CardHeader>
                    <div className="text-4xl mb-4">{fact.icon}</div>
                    <CardTitle className="text-blue-900">{fact.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-blue-700">{fact.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={item}>
            <Link href="/explore">
              <Button className="bg-blue-600 hover:bg-blue-700 text-lg py-6 px-8 rounded-full shadow-lg">
                Explore Learning Games
              </Button>
            </Link>
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
            className="text-3xl font-bold text-blue-900 text-center mb-12"
          >
            Meet Our Team
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEAM_MEMBERS.map((member) => (
              <motion.div key={member.name} variants={item}>
                <Card className={`${member.bgColor} border-none shadow-lg hover:shadow-xl transition-shadow`}>
                  <CardHeader className="text-center">
                    <div className="text-6xl mb-4">{member.avatar}</div>
                    <CardTitle className="text-2xl text-blue-900">{member.name}</CardTitle>
                    <CardDescription className="text-blue-700 font-medium">
                      {member.role}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-blue-600 leading-relaxed">
                      {member.description}
                    </p>
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