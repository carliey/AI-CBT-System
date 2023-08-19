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
