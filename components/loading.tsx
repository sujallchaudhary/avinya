import React from 'react';

interface LoadingScreenProps {
  isLoading: boolean;
  message?: string;
  description?: string;
  brandName?: string;
  spinnerSize?: 'sm' | 'md' | 'lg';
  showLoadingBar?: boolean;
  className?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  isLoading,
  message = 'Loading...',
  description = 'Please wait while we prepare your experience',
  brandName='Gale Tales',
  spinnerSize = 'md',
  showLoadingBar = true,
  className = '',
}) => {
  if (!isLoading) return null;

  const spinnerSizes = {
    sm: {
      outer: 'w-12 h-12',
      inner: 'w-8 h-8'
    },
    md: {
      outer: 'w-16 h-16',
      inner: 'w-12 h-12'
    },
    lg: {
      outer: 'w-20 h-20',
      inner: 'w-16 h-16'
    }
  };

  return (
    <div className={`fixed inset-0 z-50 ${className}`}>
      <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm" />
      <div className="relative h-full flex flex-col items-center justify-center">
        <div className="flex flex-col items-center space-y-6">
          <div className="relative">
            <div className={`${spinnerSizes[spinnerSize].outer} border-4 border-blue-100 dark:border-blue-900 rounded-full animate-pulse`} />
          </div>
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
              {message}
            </h2>
            {description && (
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs animate-pulse">
                {description}
              </p>
            )}
          </div>
          {showLoadingBar && (
            <div className="w-48 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 dark:bg-blue-400 animate-[loading_2s_ease-in-out_infinite]" />
            </div>
          )}
        </div>
        {brandName && (
          <div className="absolute bottom-8 text-lg text-gray-400 dark:text-gray-500">
            {brandName}
          </div>
        )}
      </div>
      <style jsx>{`
        @keyframes loading {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;