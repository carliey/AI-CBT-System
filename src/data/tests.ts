import { Test } from "../types/test";

const completedTest1: Test = {
  title: "Completed Test 1",
  description: "This is a completed test.",
  instructions: "Read each question carefully before answering.",
  duration: "60",
  datetime: "2023-09-01T14:00:00",
  questions: [
    {
      question: "What is the capital of France?",
      options: [
        { option: "Paris", is_correct: true },
        { option: "Berlin", is_correct: false },
        { option: "Madrid", is_correct: false },
        { option: "Rome", is_correct: false },
      ],
    },
    {
      question: "What is 5 + 3?",
      options: [
        { option: "6", is_correct: false },
        { option: "7", is_correct: false },
        { option: "8", is_correct: true },
        { option: "9", is_correct: false },
      ],
    },
    // Add more questions here
  ],
  testStatus: "completed",
  participants: [{ name: "musa shuaib", email: "JD123" }],
  results: [
    {
      email: "JD123",
      completionDateTime: "2023-09-01T15:00:00",
      score: 9,
      attempted: 10,
    },
    {
      email: "JS456",
      completionDateTime: "2023-09-01T15:30:00",
      score: 6,
      attempted: 10,
    },
    {
      email: "MM789",
      completionDateTime: "2023-09-01T16:00:00",
      score: 8,
      attempted: 10,
    },
    // Add more participants' results here
  ],
};

const completedTest2: Test = {
  title: "Completed Test 2",
  description: "This is another completed test.",
  instructions: "Read each question carefully before answering.",
  duration: "45",
  datetime: "2023-09-03T10:00:00",
  questions: [
    {
      question: "What is 5 + 3?",
      options: [
        { option: "6", is_correct: false },
        { option: "7", is_correct: false },
        { option: "8", is_correct: true },
        { option: "9", is_correct: false },
      ],
    },
    // Add more questions here
  ],
  testStatus: "completed",
  participants: [{ name: "musa shuaib", email: "JD123" }],
  results: [
    {
      email: "JD123@email.com",
      completionDateTime: "2023-09-03T10:45:00",
      score: 10,
      attempted: 10,
    },
    {
      email: "JS456@email.com",
      completionDateTime: "2023-09-03T11:15:00",
      score: 7,
      attempted: 10,
    },
    {
      email: "MM789@email.com",
      completionDateTime: "2023-09-03T11:30:00",
      score: 10,
      attempted: 10,
    },
    // Add more participants' results here
  ],
};

export const pendingTest1: Test = {
  title: "Pending Test 1",
  description: "This is a pending test.",
  instructions: "Read each question carefully before answering.",
  duration: "45",
  datetime: "2023-09-10T09:00:00",
  questions: [
    {
      question: "What is the capital of Spain?",
      options: [
        { option: "Madrid", is_correct: true },
        { option: "Paris", is_correct: false },
        { option: "Rome", is_correct: false },
        { option: "Berlin", is_correct: false },
      ],
    },
    {
      question: "Which gas do plants primarily absorb from the atmosphere?",
      options: [
        { option: "Oxygen", is_correct: false },
        { option: "Nitrogen", is_correct: false },
        { option: "Carbon Dioxide", is_correct: true },
        { option: "Hydrogen", is_correct: false },
      ],
    },
    {
      question: "What is the largest mammal?",
      options: [
        { option: "Elephant", is_correct: false },
        { option: "Blue Whale", is_correct: true },
        { option: "Giraffe", is_correct: false },
        { option: "Hippopotamus", is_correct: false },
      ],
    },
  ],
  testStatus: "pending",
  participants: [
    { name: "John Doe", email: "JD123" },
    { name: "Jane Smith", email: "JS456" },
    { name: "Mary Johnson", email: "MJ789" },
  ],
  results: [],
};

const pendingTest2: Test = {
  title: "Pending Test 2",
  description: "This is another pending test.",
  instructions: "Read each question carefully before answering.",
  duration: "30",
  datetime: "2023-09-15T14:30:00",
  questions: [
    {
      question: "Which planet is known as the Red Planet?",
      options: [
        { option: "Venus", is_correct: false },
        { option: "Mars", is_correct: true },
        { option: "Jupiter", is_correct: false },
        { option: "Saturn", is_correct: false },
      ],
    },
    {
      question: "What is the chemical symbol for gold?",
      options: [
        { option: "Au", is_correct: true },
        { option: "Ag", is_correct: false },
        { option: "Cu", is_correct: false },
        { option: "Fe", is_correct: false },
      ],
    },
    {
      question: "What process converts sugar into alcohol?",
      options: [
        { option: "Fermentation", is_correct: true },
        { option: "Distillation", is_correct: false },
        { option: "Oxidation", is_correct: false },
        { option: "Hydration", is_correct: false },
      ],
    },
  ],
  testStatus: "pending",
  participants: [
    { name: "Alice Johnson", email: "AJ123" },
    { name: "Bob Smith", email: "BS456" },
    { name: "Eve Davis", email: "ED789" },
  ],
  results: [],
};

export const participantTest = {
  title: "Pending Test 1",
  description: "This is a pending test.",
  instructions: "Read each question carefully before answering.",
  duration: "45",
  datetime: "2023-09-10T09:00:00",
  questions: [
    {
      question: "What is the capital of Spain?",
      options: [
        { option: "Madrid", is_correct: true },
        { option: "Paris", is_correct: false },
        { option: "Rome", is_correct: false },
        { option: "Berlin", is_correct: false },
      ],
    },
    {
      question: "Which gas do plants primarily absorb from the atmosphere?",
      options: [
        { option: "Oxygen", is_correct: false },
        { option: "Nitrogen", is_correct: false },
        { option: "Carbon Dioxide", is_correct: true },
        { option: "Hydrogen", is_correct: false },
      ],
    },
    {
      question: "What is the largest mammal?",
      options: [
        { option: "Elephant", is_correct: false },
        { option: "Blue Whale", is_correct: true },
        { option: "Giraffe", is_correct: false },
        { option: "Hippopotamus", is_correct: false },
      ],
    },
  ],
  testStatus: "pending",
  participant: { name: "John Doe", email: "JD123" },
};

export const completedTests: Test[] = [completedTest1, completedTest2];
export const pendingTests: Test[] = [pendingTest1, pendingTest2];
