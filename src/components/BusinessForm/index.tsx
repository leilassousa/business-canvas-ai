// src/components/BusinessForm/index.tsx

import React, { useState } from 'react';
import FormSection from './FormSection';
import { Section } from '@/lib/types';
import type { Question } from '@/lib/types';
// Fix the import path
import * as questionsModule from '@/components/BusinessForm/question';

interface BusinessFormProps {
  onSubmit: (formData: Record<string, string>) => Promise<void>;
}

const BusinessForm: React.FC<BusinessFormProps> = ({ onSubmit }) => {
  const [currentSection, setCurrentSection] = useState<Section>(questionsModule.sections[0]);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (questionId: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleNext = () => {
    const nextSection = questionsModule.getNextSection(currentSection);
    if (nextSection) {
      setCurrentSection(nextSection);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    const prevSection = questionsModule.getPreviousSection(currentSection);
    if (prevSection) {
      setCurrentSection(prevSection);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
      // You might want to show an error message to the user here
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentQuestions = questionsModule.getQuestionsBySection(currentSection);
  const isLastSection = !questionsModule.getNextSection(currentSection);
  const isFirstSection = !questionsModule.getPreviousSection(currentSection);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Business Canvas Analysis
        </h1>
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {questionsModule.sections.map((sectionItem) => (
            <button
              key={sectionItem}
              onClick={() => setCurrentSection(sectionItem)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                currentSection === sectionItem
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {sectionItem}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <FormSection
          questions={currentQuestions}
          formData={formData}
          onChange={handleInputChange}
        />

        <div className="flex justify-between pt-6">
          <button
            type="button"
            onClick={handlePrevious}
            className={`px-6 py-2 rounded-md ${
              isFirstSection
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            disabled={isFirstSection}
          >
            Previous
          </button>

          {isLastSection ? (
            <button
              type="submit"
              className={`px-6 py-2 rounded-md bg-blue-500 text-white ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Generating Report...' : 'Generate Report'}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
            >
              Next
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default BusinessForm;