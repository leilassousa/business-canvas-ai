// src/components/Report/PDFReport.tsx
import React from 'react';
import { ReportProps } from '@/lib/types';

export const PDFReport: React.FC<ReportProps> = ({ analysis, onReset }) => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Business Analysis Report</h1>
        <div className="space-x-4">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Print Report
          </button>
          <button
            onClick={onReset}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            New Analysis
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <div 
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: analysis.replace(/\n/g, '<br/>') }} 
        />
      </div>
    </div>
  );
};