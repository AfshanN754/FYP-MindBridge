import { useEffect } from 'react';

interface VoiceFeedbackProps {
  message: string;
  play: boolean;
}

export default function VoiceFeedback({ message, play }: VoiceFeedbackProps) {
  useEffect(() => {
    if (play && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(message);
      window.speechSynthesis.speak(utterance);
    }
  }, [message, play]);

  return null;
}
