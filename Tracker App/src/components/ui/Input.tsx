import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: LucideIcon;
  rightIcon?: LucideIcon;
  onRightIconClick?: () => void;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon: Icon, rightIcon: RightIcon, onRightIconClick, className = '', ...props }, ref) => {
    const inputClasses = `
      w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
      bg-white dark:bg-gray-800 text-gray-900 dark:text-white
      placeholder-gray-500 dark:placeholder-gray-400
      focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
      disabled:opacity-50 disabled:cursor-not-allowed
      ${Icon ? 'pl-10' : ''}
      ${RightIcon ? 'pr-10' : ''}
      ${error ? 'border-red-500 focus:ring-red-500' : ''}
      ${className}
    `;

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {label}
          </label>
        )}
        <div className="relative">
          {Icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon className="h-5 w-5 text-gray-400" />
            </div>
          )}
          <input
            ref={ref}
            className={inputClasses}
            {...props}
          />
          {RightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <button
                type="button"
                onClick={onRightIconClick}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
              >
                <RightIcon className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';