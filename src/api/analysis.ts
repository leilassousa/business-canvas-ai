// This file handles sending the form data to generate the report
export const generateAnalysis = async (formData: FormData) => {
  try {
    const response = await fetch('/api/generate-report', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = new Error('SERVER_ERROR') as any;
      error.code = 'SERVER_ERROR';
      error.details = await response.text();
      throw error;
    }

    return response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};