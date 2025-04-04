import React from 'react';
import { X } from 'lucide-react';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  okButtonText?: string;
  className?: string;
  position?: 'center' | 'top' | 'bottom';
}

const Popup: React.FC<PopupProps> = ({
  isOpen,
  onClose,
  title = 'Notification',
  description = '',
  okButtonText = 'Okay',
  className = '',
  position = 'center'
}) => {
  if (!isOpen) return null;

  const positionClasses = {
    center: 'items-center',
    top: 'items-start pt-20',
    bottom: 'items-end pb-20'
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center overflow-auto bg-black/50 backdrop-blur-sm">
      <div className={`flex ${positionClasses[position]}`}>
        <div className={`relative w-full max-w-md m-4 bg-white dark:bg-slate-950 rounded-lg shadow-lg ${className}`}>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Content */}
          <div className="p-6">
            {/* Title */}
            <h2 className="text-xl font-semibold mb-4 pr-6 text-gray-900 dark:text-gray-100">
              {title}
            </h2>

            {/* Description */}
            {description && (
              <p className="mb-6 text-gray-600 dark:text-gray-300">
                {description}
              </p>
            )}

            {/* Button */}
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                {okButtonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;