import React from 'react';

interface AlertProps {
  children: React.ReactNode;
  variant?: 'error' | 'success' | 'warning';
}

const Alert: React.FC<AlertProps> = ({ children, variant = 'error' }) => {
  const colors = {
    error: 'bg-red-50 border-red-200 text-red-700',
    success: 'bg-green-50 border-green-200 text-green-700',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-700'
  };

  return (
    <div className={`p-4 rounded-md border ${colors[variant]}`}>
      {children}
    </div>
  );
};

export default Alert;