import React, { useState } from 'react';
import FormSection from './FormSection';
import Alert from '../Alert';
import { Section } from '@/lib/types';
import type { Question } from '@/lib/types';
import * as questionsModule from '@/components/BusinessForm/question';

interface BusinessFormProps {
  onSubmit: (formData: Record<string, string>) => Promise<void>;
}

const BusinessForm: React.FC<BusinessFormProps> = ({ onSubmit }) => {
  const [currentSection, setCurrentSection] = useState<Section>(questionsModule.sections[0]);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleInputChange = (questionId: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [questionId]: value,
    }));
    // Clear messages when user starts typing
    setError(null);
    setSuccessMessage(null);
  };

  const validateCurrentSection = (): boolean => {
    const currentQuestions = questionsModule.getQuestionsBySection(currentSection);
    const unansweredQuestions = currentQuestions.filter(
      question => !formData[question.id]?.trim()
    );

    if (unansweredQuestions.length > 0) {
      setError(`Please answer all questions in the ${currentSection} section before proceeding.`);
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (!validateCurrentSection()) {
      return;
    }

    const nextSection = questionsModule.getNextSection(currentSection);
    if (nextSection) {
      setError(null);
      setSuccessMessage(null);
      setCurrentSection(nextSection);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    const prevSection = questionsModule.getPreviousSection(currentSection);
    if (prevSection) {
      setError(null);
      setSuccessMessage(null);
      setCurrentSection(prevSection);
      window.scrollTo(0, 0);
    }
  };

  const validateForm = (): boolean => {
    // Check if all questions across all sections are answered
    const allQuestions = questionsModule.sections.flatMap(section => 
      questionsModule.getQuestionsBySection(section)
    );
    
    const unansweredQuestions = allQuestions.filter(
      question => !formData[question.id]?.trim()
    );

    if (unansweredQuestions.length > 0) {
      const firstUnanswered = unansweredQuestions[0];
      const section = questionsModule.sections.find(section => 
        questionsModule.getQuestionsBySection(section).includes(firstUnanswered)
      );
      
      setError(`Please complete all questions. Missing answers in ${section} section.`);
      setCurrentSection(section as Section); // Navigate to the section with missing answers
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear any existing messages
    setError(null);
    setSuccessMessage(null);

    // Validate the form before submission
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit(formData);
      setSuccessMessage('Report generated successfully!');
      // Optional: You might want to reset the form or redirect the user
    } catch (error: any) {
      console.error('Error submitting form:', error);
      setError(error.message || 'Failed to generate report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSectionClick = (section: Section) => {
    // Validate current section before allowing navigation
    if (currentSection !== section && !validateCurrentSection()) {
      return;
    }
    setCurrentSection(section);
    setError(null);
    setSuccessMessage(null);
    window.scrollTo(0, 0);
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
              onClick={() => handleSectionClick(sectionItem)}
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

      {error && (
        <div className="mb-6">
          <Alert variant="error">{error}</Alert>
        </div>
      )}

      {successMessage && (
        <div className="mb-6">
          <Alert variant="success">{successMessage}</Alert>
        </div>
      )}

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