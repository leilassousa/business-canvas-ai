// This file checks if the form data is valid before we try to generate a report
export const validateFormData = (formData: FormData): boolean => {
  // List of fields that must be filled out
  const requiredFields = [
    'problem',
    'audience',
    'competitors',
    'channels',
    'elevator_pitch',
    'differentiator',
    'solution',
    'costs',
    'revenue',
    'business_boosters',
    'personal_fit'
  ];
  
  // Check each required field
  for (const field of requiredFields) {
    const value = formData.get(field);
    if (!value || String(value).trim() === '') {
      console.log(`Missing required field: ${field}`);
      return false;
    }
  }
  
  return true;
};