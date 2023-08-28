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

export interface Test {
  title: string;
  description: string;
  instructions: string;
  duration: string;
  datetime: string;
  questions: Question[];
  testStatus: "pending" | "completed";
  results?: TestResult[];
}
