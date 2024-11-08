// src/components/Report/PDFReport.tsx

import React from 'react';
import { jsPDF } from 'jspdf';

interface PDFReportProps {
  analysis: string;
  onReset: () => void;
}

export const PDFReport: React.FC<PDFReportProps> = ({ analysis, onReset }) => {
  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Split the analysis into sections
    const sections = analysis.split(/(?=\d\.\s)/);
    
    let yPosition = 20;
    const lineHeight = 7;
    const pageWidth = 210;
    const margin = 20;
    const textWidth = pageWidth - (margin * 2);

    sections.forEach((section) => {
      // Add a new page if we're near the bottom
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }

      // Split section into lines that fit the page width
      const lines = doc.splitTextToSize(section, textWidth);
      
      // Add lines to the document
      doc.setFontSize(12);
      doc.text(lines, margin, yPosition);
      
      // Update y position for next section
      yPosition += lines.length * lineHeight + 10;
    });

    // Save the PDF
    doc.save('business-analysis.pdf');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Business Analysis Report</h1>
          <div className="space-x-4">
            <button
              onClick={generatePDF}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Download PDF
            </button>
            <button
              onClick={onReset}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              Start New Analysis
            </button>
          </div>
        </div>

        <div className="prose max-w-none">
          {analysis.split(/(?=\d\.\s)/).map((section, index) => (
            <div key={index} className="mb-8">
              <div className="whitespace-pre-wrap">
                {section.trim()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};