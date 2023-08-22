import React from "react";
import { Question } from "../../../types/questions";
import TestEditor from "../../../components/TestEditor";

type Props = {
  questions: Question[];
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
};

const Questions = ({ questions, setQuestions }: Props) => {
  return (
    <div>
      <TestEditor questions={questions} setQuestions={setQuestions} />
    </div>
  );
};

export default Questions;
