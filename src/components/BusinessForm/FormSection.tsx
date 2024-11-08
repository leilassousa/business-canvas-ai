// src/components/BusinessForm/FormSection.tsx

import React from 'react';
import { Question } from '@/lib/types';

interface FormSectionProps {
  questions: Question[];
  formData: Record<string, string>;
  onChange: (questionId: string, value: string) => void;
}

const FormSection: React.FC<FormSectionProps> = ({
  questions,
  formData,
  onChange,
}) => {
  let currentPreamble: string | undefined;

  return (
    <div className="space-y-8">
      {questions.map((question) => {
        const showPreamble = question.preamble && question.preamble !== currentPreamble;
        if (showPreamble) {
          currentPreamble = question.preamble;
        }

        return (
          <div key={question.id} className="space-y-4">
            {showPreamble && (
              <p className="text-gray-600 italic text-sm leading-relaxed">
                {question.preamble}
              </p>
            )}
            <div className="space-y-2">
              <label
                htmlFor={question.id}
                className="block text-sm font-medium text-gray-700"
              >
                {question.questionText}
              </label>
              {question.type === 'textarea' ? (
                <textarea
                  id={question.id}
                  value={formData[question.id] || ''}
                  onChange={(e) => onChange(question.id, e.target.value)}
                  className="w-full min-h-[100px] p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Type your answer here..."
                />
              ) : (
                <input
                  type="text"
                  id={question.id}
                  value={formData[question.id] || ''}
                  onChange={(e) => onChange(question.id, e.target.value)}
                  className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Type your answer here..."
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FormSection;