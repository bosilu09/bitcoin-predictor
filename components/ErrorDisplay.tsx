
import React from 'react';

interface ErrorDisplayProps {
  message: string | null;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div
      className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 my-4 rounded-md shadow-md"
      role="alert"
    >
      <p className="font-bold">Error</p>
      <p>{message}</p>
    </div>
  );
};

export default ErrorDisplay;
