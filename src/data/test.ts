interface Question {
  questionText: string;
  options: string[];
  correctOptionIndex: number;
}

interface Participant {
  participantName: string;
  participantID: string;
}

interface Answer {
  questionIndex: number;
  chosenOptionIndex: number;
  isCorrect: boolean;
}

interface TestResult {
  participantID: string;
  completionDateTime: string;
  score: number;
  answers: Answer[];
}

interface Test {
  testTitle: string;
  testDescription: string;
  testDate: string;
  testDuration: string;
  testStatus: "pending" | "completed";
  questions: Question[];
  participants: Participant[];
  results: TestResult[];
}
