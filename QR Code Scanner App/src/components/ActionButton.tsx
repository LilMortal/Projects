import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface ActionButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'warning';
  disabled?: boolean;
  fullWidth?: boolean;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  icon: Icon,
  label,
  onClick,
  variant = 'primary',
  disabled = false,
  fullWidth = false,
}) => {
  const baseClasses = "flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none";
  
  const variantClasses = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 shadow-md hover:shadow-lg",
    success: "bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl",
    warning: "bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl",
  };

  const widthClasses = fullWidth ? "w-full" : "";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${widthClasses}`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </button>
  );
};