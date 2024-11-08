// src/lib/types.ts

export interface Question {
  id: string;
  section: Section;
  preamble?: string;
  questionText: string;
  type: 'text' | 'textarea';
}

export type Section =
  | 'Problem'
  | 'Audience'
  | 'Competitors'
  | 'Channels'
  | 'Elevator Pitch'
  | 'Differentiator'
  | 'Solution'
  | 'Costs'
  | 'Revenue'
  | 'Business Boosters'
  | 'Personal Fit';

export interface FormData {
  [key: string]: string;
}

export interface AnalysisResponse {
  analysis: string;
  error?: string;
}

export interface ReportProps {
  analysis: string;
  onReset: () => void;
}