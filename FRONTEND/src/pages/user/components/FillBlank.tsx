import React from 'react';
import type { Question } from '../../../types/lesson.types';

interface FillBlankProps {
  question: Question;
  answer: string;
  onAnswerChange: (answer: string) => void;
}

const FillBlank: React.FC<FillBlankProps> = ({ question, answer, onAnswerChange }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
      <h4 className="text-lg font-medium text-gray-900 mb-4">{question.question}</h4>
      <div className="mt-1">
        <input
          type="text"
          value={answer}
          onChange={(e) => onAnswerChange(e.target.value)}
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2"
          placeholder="Escribe tu respuesta aquí..."
        />
      </div>
      {question.optionsForFillBlank && question.optionsForFillBlank.length > 0 && (
        <div className="mt-3">
          <p className="text-sm font-medium text-gray-700 mb-2">Opciones sugeridas:</p>
          <div className="flex flex-wrap gap-2">
            {question.optionsForFillBlank.map((option, index) => (
              <button
                key={index}
                type="button"
                onClick={() => onAnswerChange(option)}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FillBlank;