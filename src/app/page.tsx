// src/app/page.tsx

'use client';

import { useState } from 'react';
import BusinessForm from '@/components/BusinessForm';
import { PDFReport } from '@/components/Report';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password) {
      setIsAuthenticated(true);
      localStorage.setItem('password', password);
    }
  };

  const handleSubmit = async (formData: Record<string, string>) => {
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('password')}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const data = await response.json();
      setAnalysis(data.analysis);
    } catch (error) {
      setError('Failed to generate analysis. Please try again.');
      console.error('Error:', error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <form onSubmit={handleLogin} className="p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6">Enter Password</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded mb-4"
            placeholder="Enter password"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded"
          >
            Access Tool
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {!analysis ? (
        <BusinessForm onSubmit={handleSubmit} />
      ) : (
        <PDFReport 
          analysis={analysis} 
          onReset={() => setAnalysis(null)}
        />
      )}
    </div>
  );
}