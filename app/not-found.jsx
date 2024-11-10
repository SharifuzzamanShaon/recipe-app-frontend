import React from "react";

const ErrorNotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center p-8 bg-white shadow-lg rounded-md">
        <h1 className="text-4xl font-bold text-red-500 mb-4">Error</h1>
        <p className="text-lg text-gray-700">Not Found</p>
      </div>
    </div>
  );
};

export default ErrorNotFound;
