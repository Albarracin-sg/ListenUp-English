import React from 'react';
import type { Question } from '../../../types/lesson.types';
import { QUESTION_TYPES } from '../../../utils/constants';
import MultipleChoice from './MultipleChoice';
import TrueFalse from './TrueFalse';
import FillBlank from './FillBlank';
import OpenQuestion from './OpenQuestion';

interface QuestionRendererProps {
  question: Question;
  answer: string;
  onAnswerChange: (answer: string) => void;
}

const QuestionRenderer: React.FC<QuestionRendererProps> = ({ question, answer, onAnswerChange }) => {
  switch (question.type) {
    case QUESTION_TYPES.MULTIPLE_CHOICE:
      return (
        <MultipleChoice
          question={question}
          answer={answer}
          onAnswerChange={onAnswerChange}
        />
      );
    case QUESTION_TYPES.TRUE_FALSE:
      return (
        <TrueFalse
          question={question}
          answer={answer}
          onAnswerChange={onAnswerChange}
        />
      );
    case QUESTION_TYPES.FILL_BLANK:
      return (
        <FillBlank
          question={question}
          answer={answer}
          onAnswerChange={onAnswerChange}
        />
      );
    case QUESTION_TYPES.OPEN:
      return (
        <OpenQuestion
          question={question}
          answer={answer}
          onAnswerChange={onAnswerChange}
        />
      );
    default:
      return (
        <div className="bg-red-50 p-4 rounded-md">
          <p className="text-red-800">Tipo de pregunta no soportado: {question.type}</p>
        </div>
      );
  }
};

export default QuestionRenderer;