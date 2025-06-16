import React, { useState, useCallback } from 'react';
import { Calculator as CalculatorIcon } from 'lucide-react';
import Display from './Display';
import Button from './Button';
import { CalculatorState, ButtonConfig } from '../types/calculator';
import { evaluateExpression, formatNumber, isValidExpression } from '../utils/calculator';

const Calculator: React.FC = () => {
  const [state, setState] = useState<CalculatorState>({
    display: '',
    previousValue: null,
    operation: null,
    waitingForNewOperand: false,
    memory: 0,
    angleMode: 'degrees',
    history: []
  });

  const addToHistory = useCallback((expression: string, result: string) => {
    setState(prev => ({
      ...prev,
      history: [...prev.history, {
        expression,
        result,
        timestamp: Date.now()
      }].slice(-10) // Keep only last 10 entries
    }));
  }, []);

  const handleButtonClick = useCallback((value: string) => {
    setState(prev => {
      const newState = { ...prev };

      switch (value) {
        case 'AC':
          return {
            ...newState,
            display: '',
            previousValue: null,
            operation: null,
            waitingForNewOperand: false
          };

        case 'C':
          return {
            ...newState,
            display: prev.display.slice(0, -1)
          };

        case '=':
          if (prev.display && isValidExpression(prev.display)) {
            try {
              const result = evaluateExpression(prev.display, prev.angleMode);
              const formattedResult = formatNumber(result);
              addToHistory(prev.display, formattedResult);
              return {
                ...newState,
                display: formattedResult,
                waitingForNewOperand: true
              };
            } catch (error) {
              return {
                ...newState,
                display: 'Error'
              };
            }
          }
          return newState;

        case 'M+':
          if (prev.display) {
            try {
              const currentValue = evaluateExpression(prev.display, prev.angleMode);
              return {
                ...newState,
                memory: prev.memory + currentValue
              };
            } catch {
              return newState;
            }
          }
          return newState;

        case 'M-':
          if (prev.display) {
            try {
              const currentValue = evaluateExpression(prev.display, prev.angleMode);
              return {
                ...newState,
                memory: prev.memory - currentValue
              };
            } catch {
              return newState;
            }
          }
          return newState;

        case 'MR':
          return {
            ...newState,
            display: formatNumber(prev.memory),
            waitingForNewOperand: true
          };

        case 'MC':
          return {
            ...newState,
            memory: 0
          };

        case 'deg/rad':
          return {
            ...newState,
            angleMode: prev.angleMode === 'degrees' ? 'radians' : 'degrees'
          };

        default:
          // Handle number and operator input
          if (prev.waitingForNewOperand && /^[0-9]$/.test(value)) {
            return {
              ...newState,
              display: value,
              waitingForNewOperand: false
            };
          }

          if (prev.display === 'Error') {
            return {
              ...newState,
              display: /^[0-9]$/.test(value) ? value : '',
              waitingForNewOperand: false
            };
          }

          return {
            ...newState,
            display: prev.display + value,
            waitingForNewOperand: false
          };
      }
    });
  }, [addToHistory]);

  const toggleAngleMode = useCallback(() => {
    setState(prev => ({
      ...prev,
      angleMode: prev.angleMode === 'degrees' ? 'radians' : 'degrees'
    }));
  }, []);

  const buttonConfigs: ButtonConfig[] = [
    // Row 1
    { label: 'AC', value: 'AC', type: 'control' },
    { label: 'C', value: 'C', type: 'control' },
    { label: '(', value: '(', type: 'operator' },
    { label: ')', value: ')', type: 'operator' },
    { label: '÷', value: '/', type: 'operator' },

    // Row 2
    { label: 'sin', value: 'sin(', type: 'function' },
    { label: 'cos', value: 'cos(', type: 'function' },
    { label: 'tan', value: 'tan(', type: 'function' },
    { label: 'log', value: 'log(', type: 'function' },
    { label: '×', value: '*', type: 'operator' },

    // Row 3
    { label: 'asin', value: 'asin(', type: 'function' },
    { label: 'acos', value: 'acos(', type: 'function' },
    { label: 'atan', value: 'atan(', type: 'function' },
    { label: 'ln', value: 'ln(', type: 'function' },
    { label: '−', value: '-', type: 'operator' },

    // Row 4
    { label: 'x²', value: '^2', type: 'function' },
    { label: 'xʸ', value: '^', type: 'function' },
    { label: '√', value: 'sqrt(', type: 'function' },
    { label: 'exp', value: 'exp(', type: 'function' },
    { label: '+', value: '+', type: 'operator' },

    // Row 5
    { label: 'MC', value: 'MC', type: 'memory' },
    { label: 'MR', value: 'MR', type: 'memory' },
    { label: 'M+', value: 'M+', type: 'memory' },
    { label: 'M−', value: 'M-', type: 'memory' },
    { label: '=', value: '=', type: 'equals' },

    // Row 6
    { label: '7', value: '7', type: 'number' },
    { label: '8', value: '8', type: 'number' },
    { label: '9', value: '9', type: 'number' },
    { label: 'x!', value: '!', type: 'function' },
    { label: '%', value: '%', type: 'function' },

    // Row 7
    { label: '4', value: '4', type: 'number' },
    { label: '5', value: '5', type: 'number' },
    { label: '6', value: '6', type: 'number' },
    { label: 'π', value: 'π', type: 'constant' },
    { label: 'e', value: 'e', type: 'constant' },

    // Row 8
    { label: '1', value: '1', type: 'number' },
    { label: '2', value: '2', type: 'number' },
    { label: '3', value: '3', type: 'number' },
    { label: '0', value: '0', type: 'number', gridSpan: 2 },

    // Row 9
    { label: '.', value: '.', type: 'number' },
  ];

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-center mb-6">
        <CalculatorIcon className="w-8 h-8 text-indigo-400 mr-2" />
        <h1 className="text-2xl font-bold text-white">Scientific Calculator</h1>
      </div>

      {/* Display */}
      <Display
        currentDisplay={state.display}
        history={state.history}
        angleMode={state.angleMode}
        onToggleAngleMode={toggleAngleMode}
      />

      {/* Button Grid */}
      <div className="grid grid-cols-5 gap-3 mt-6">
        {buttonConfigs.map((config, index) => (
          <Button
            key={`${config.value}-${index}`}
            config={config}
            onClick={handleButtonClick}
          />
        ))}
      </div>

      {/* Memory Indicator */}
      {state.memory !== 0 && (
        <div className="mt-4 text-center">
          <span className="text-xs text-purple-400 bg-purple-500/20 px-3 py-1 rounded-full">
            M: {formatNumber(state.memory)}
          </span>
        </div>
      )}
    </div>
  );
};

export default Calculator;