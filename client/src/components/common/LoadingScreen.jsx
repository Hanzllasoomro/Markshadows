import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-white to-gray-100">
      <div className="flex flex-col items-center space-y-4 animate-fade-in">
        <Loader2 className="animate-spin text-blue-600 w-10 h-10" />
        <p className="text-lg font-medium text-gray-700">Loading your experience...</p>
        <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 animate-pulse rounded-full w-2/3" />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
