import { Participant } from "./participants";

export type Option = {
  id?: number;
  option: string;
  is_correct: boolean;
};

export type Question = {
  id?: number;
  question: string;
  options: Option[];
};

export type Questions = Question[];

export interface TestResult {
  email: string;
  completionDateTime: string;
  score: number;
  attempted: number;
}

export interface Test {
  id?: number;
  title: string;
  description: string;
  instructions: string;
  duration: string;
  datetime: string;
  questions: Question[];
  testStatus: "pending" | "completed";
  results?: TestResult[];
  participants: Participant[];
}
