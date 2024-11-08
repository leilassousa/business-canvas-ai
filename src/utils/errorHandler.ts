// This file handles all our error messages and error processing
interface AnalysisError extends Error {
  code?: string;
  details?: string;
}

export const handleAnalysisError = (error: AnalysisError): string => {
  // These are the messages users will see when different errors happen
  const errorMessages = {
    INVALID_INPUT: 'Please fill in all required fields.',
    API_TIMEOUT: 'It\'s taking longer than expected. Please try again.',
    SERVER_ERROR: 'Oops! Something went wrong. Please try again.',
    RATE_LIMIT: 'Please wait a few minutes before trying again.',
    DEFAULT: 'Failed to generate analysis. Please try again.'
  };

  // Log error for debugging
  console.error('Analysis Error:', {
    message: error.message,
    code: error.code,
    details: error.details,
    stack: error.stack
  });

  // Return the appropriate error message
  return errorMessages[error.code as keyof typeof errorMessages] || errorMessages.DEFAULT;
};