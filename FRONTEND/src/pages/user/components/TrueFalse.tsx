import React from 'react';
import type { Question } from '../../../types/lesson.types';

interface TrueFalseProps {
  question: Question;
  answer: string;
  onAnswerChange: (answer: string) => void;
}

const TrueFalse: React.FC<TrueFalseProps> = ({ question, answer, onAnswerChange }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
      <h4 className="text-lg font-medium text-gray-900 mb-4">{question.question}</h4>
      <div className="space-y-3">
        <div className="flex items-center">
          <input
            id={`${question.id}-true`}
            name={question.id}
            type="radio"
            checked={answer === 'true'}
            onChange={() => onAnswerChange('true')}
            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
          />
          <label htmlFor={`${question.id}-true`} className="ml-2 block text-sm font-medium text-gray-700">
            Verdadero
          </label>
        </div>
        <div className="flex items-center">
          <input
            id={`${question.id}-false`}
            name={question.id}
            type="radio"
            checked={answer === 'false'}
            onChange={() => onAnswerChange('false')}
            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
          />
          <label htmlFor={`${question.id}-false`} className="ml-2 block text-sm font-medium text-gray-700">
            Falso
          </label>
        </div>
      </div>
    </div>
  );
};

export default TrueFalse;