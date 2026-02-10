import React from 'react';
import type { Question } from '../../../types/lesson.types';

interface MultipleChoiceProps {
  question: Question;
  answer: string;
  onAnswerChange: (answer: string) => void;
}

const MultipleChoice: React.FC<MultipleChoiceProps> = ({ question, answer, onAnswerChange }) => {
  const options = question.optionsForMultipleChoice || question.options || [];

  return (
    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
      <h4 className="text-lg font-medium text-gray-900 mb-4">{question.question}</h4>
      <div className="space-y-3">
        {options.map((option, index) => (
          <div key={index} className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id={`${question.id}-${index}`}
                name={question.id}
                type="radio"
                checked={answer === option}
                onChange={() => onAnswerChange(option)}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor={`${question.id}-${index}`} className="font-medium text-gray-700">
                {option}
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultipleChoice;