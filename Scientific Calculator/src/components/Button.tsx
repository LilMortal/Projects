import React from 'react';
import { ButtonConfig } from '../types/calculator';

interface ButtonProps {
  config: ButtonConfig;
  onClick: (value: string) => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ config, onClick, disabled = false }) => {
  const getBaseClasses = () => {
    const base = `
      relative overflow-hidden rounded-xl font-medium text-sm
      transition-all duration-200 ease-out
      border border-white/10 backdrop-blur-sm
      active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
      hover:shadow-lg hover:-translate-y-0.5
      focus:outline-none focus:ring-2 focus:ring-blue-400/50
    `;

    const typeClasses: { [key: string]: string } = {
      number: `
        bg-slate-700/50 hover:bg-slate-600/60 text-white
        shadow-lg shadow-slate-900/20
      `,
      operator: `
        bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500
        text-white shadow-lg shadow-orange-500/25
      `,
      function: `
        bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500
        text-white shadow-lg shadow-blue-500/25
      `,
      memory: `
        bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500
        text-white shadow-lg shadow-purple-500/25
      `,
      constant: `
        bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500
        text-white shadow-lg shadow-emerald-500/25
      `,
      control: `
        bg-gradient-to-br from-red-500 to-red-600 hover:from-red-400 hover:to-red-500
        text-white shadow-lg shadow-red-500/25
      `,
      equals: `
        bg-gradient-to-br from-indigo-500 to-indigo-600 hover:from-indigo-400 hover:to-indigo-500
        text-white shadow-lg shadow-indigo-500/25
      `,
    };

    return base + ' ' + (typeClasses[config.type] || typeClasses.number);
  };

  const getGridClasses = () => {
    if (config.gridSpan === 2) return 'col-span-2';
    if (config.gridSpan === 3) return 'col-span-3';
    return 'col-span-1';
  };

  return (
    <button
      className={`${getBaseClasses()} ${getGridClasses()} ${config.className || ''} h-14`}
      onClick={() => onClick(config.value)}
      disabled={disabled}
    >
      <span className="relative z-10">{config.label}</span>
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-200" />
    </button>
  );
};

export default Button;