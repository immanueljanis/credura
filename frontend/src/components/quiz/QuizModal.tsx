"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Clock, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizDialogProps {
  questions: QuizQuestion[];
  onQuizAnswered: () => void;
  triggerText?: string;
}

const defaultQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2,
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1,
  },
  {
    id: 3,
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correctAnswer: 1,
  },
  {
    id: 4,
    question: "Who painted the Mona Lisa?",
    options: ["Van Gogh", "Picasso", "Leonardo da Vinci", "Michelangelo"],
    correctAnswer: 2,
  },
  {
    id: 5,
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    correctAnswer: 3,
  },
];

const seconds = 30;

export function QuizDialogComponent({
  questions,
  onQuizAnswered,
  triggerText = "Start Quiz",
}: QuizDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [timeLeft, setTimeLeft] = useState(seconds);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const resetQuiz = useCallback(() => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setCorrectAnswers(0);
    setTimeLeft(seconds);
    setIsQuizActive(false);
    setShowResults(false);
  }, []);

  const handleNextQuestion = useCallback(() => {
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setCorrectAnswers((prev) => prev + 1);
    }

    if (isLastQuestion) {
      setIsQuizActive(false);
      setShowResults(true);
      const finalScore =
        selectedAnswer === currentQuestion.correctAnswer ? correctAnswers + 1 : correctAnswers;

      if (finalScore === questions.length) {
        setIsOpen(false);
        onQuizAnswered();
        resetQuiz();
      }
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setTimeLeft(seconds);
    }
  }, [
    selectedAnswer,
    currentQuestion,
    isLastQuestion,
    correctAnswers,
    onQuizAnswered,
    questions.length,
  ]);

  useEffect(() => {
    if (!isQuizActive || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleNextQuestion();
          return seconds;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isQuizActive, timeLeft, handleNextQuestion]);

  const startQuiz = () => {
    resetQuiz();
    setIsQuizActive(true);
    setTimeLeft(seconds);
  };

  const handleDialogChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      resetQuiz();
    }
  };

  const progressPercentage = ((seconds - timeLeft) / seconds) * 100;

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogChange}>
      <DialogTrigger className="w-full btn-primary cursor-pointer">{triggerText}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Trophy className="h-5 w-5" />
            Quick Quiz Challenge
          </DialogTitle>
        </DialogHeader>

        {!isQuizActive && !showResults && (
          <div className="text-center flex flex-col mt-2">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Ready to test your knowledge?</h3>
              <p className="text-muted-foreground">
                Answer {questions.length} multiple choice questions. You have {seconds} seconds per
                question!
              </p>
            </div>
            <button onClick={startQuiz} className="w-full btn-primary cursor-pointer mt-auto">
              Start Quiz
            </button>
          </div>
        )}

        {isQuizActive && !showResults && (
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span className="font-mono">{timeLeft}s</span>
                </div>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold leading-relaxed">{currentQuestion.question}</h3>

              <RadioGroup
                value={selectedAnswer?.toString() ?? ""}
                onValueChange={(value) => setSelectedAnswer(Number.parseInt(value))}
                className="space-y-3"
              >
                {currentQuestion.options.map((option, index) => (
                  <Label
                    key={index}
                    className={cn(
                      selectedAnswer === index && "bg-muted border-primary",
                      "flex-1 cursor-pointer font-medium flex items-center space-x-3 rounded-lg border p-4 transition-colors hover:bg-muted/50 gap-2"
                    )}
                  >
                    <RadioGroupItem className="" value={index.toString()} id={`option-${index}`} />
                    {option}
                  </Label>
                ))}
              </RadioGroup>
            </div>

            <div className="flex justify-end">
              <Button
                onClick={handleNextQuestion}
                disabled={selectedAnswer === null}
                variant="outline"
              >
                {isLastQuestion ? "Finish Quiz" : "Next Question"}
              </Button>
            </div>
          </div>
        )}

        {showResults && !(correctAnswers === questions.length) && (
          <div className="text-center py-8 space-y-4">
            <div className="text-6xl mb-4">
              {correctAnswers === questions.length
                ? "🎉"
                : correctAnswers >= questions.length / 2
                ? "👏"
                : "📚"}
            </div>
            <h3 className="text-2xl font-bold">Quiz Complete!</h3>
            <div className="text-lg">
              You got <span className="font-bold text-primary">{correctAnswers}</span> out of{" "}
              <span className="font-bold">{questions.length}</span> questions correct!
            </div>
            <div className="text-muted-foreground">
              {correctAnswers === questions.length && "Perfect score! Amazing! 🌟"}
              {correctAnswers >= questions.length / 2 &&
                correctAnswers < questions.length &&
                "Great job! Keep it up! 💪"}
              {correctAnswers < questions.length / 2 && "Keep practicing! You'll get better! 📖"}
            </div>
            <div className="flex gap-2 justify-center pt-4">
              <Button onClick={startQuiz} variant="outline">
                Try Again
              </Button>
              <Button className="text-white" onClick={() => setIsOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
