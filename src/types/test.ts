import { Participant } from "./participants";

export type Option = {
  id?: number;
  option: string;
  is_correct: boolean;
};

export type Question = {
  id?: number;
  text: string;
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
  duration: number;
  date: string;
  questions: Question[];
  testStatus?: "pending" | "completed";
  results?: TestResult[];
  participants: Participant[];
}

export interface Quiz {
  date: string;
  description: string;
  duration: number;
  id: number;
  instructions: string;
  is_completed: boolean;
  is_published: boolean;
  participants: Participant[];
  questions: Question[];
  testAdministratorId?: number;
  title: string;
}

export interface ParticipantTest {
  id?: number;
  title: string;
  description: string;
  instructions: string;
  duration: string;
  datetime: string;
  questions: Question[];
  participant: {
    email: string;
    name: string;
    id?: string;
  };
}
