import React from 'react';
import type { Question } from '../../../types/lesson.types';

interface OpenQuestionProps {
  question: Question;
  answer: string;
  onAnswerChange: (answer: string) => void;
}

const OpenQuestion: React.FC<OpenQuestionProps> = ({ question, answer, onAnswerChange }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
      <h4 className="text-lg font-medium text-gray-900 mb-4">{question.question}</h4>
      <div className="mt-1">
        <textarea
          rows={3}
          value={answer || ''}
          onChange={(e) => onAnswerChange(e.target.value)}
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2"
          placeholder="Escribe tu respuesta aquí..."
        />
      </div>
      <p className="mt-2 text-sm text-gray-500">
        Escribe la respuesta correcta según lo aprendido en el video.
      </p>
    </div>
  );
};

export default OpenQuestion;