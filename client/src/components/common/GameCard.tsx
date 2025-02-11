import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link } from "wouter";

interface GameCardProps {
  title: string;
  description: string;
  icon: string;
  href: string;
}

export default function GameCard({ title, description, icon, href }: GameCardProps) {
  return (
    <Link href={href}>
      <Card className="cursor-pointer hover:bg-accent transition-colors">
        <CardHeader>
          <div className="text-4xl mb-2">{icon}</div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
