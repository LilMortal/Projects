export interface CalculatorState {
  display: string;
  previousValue: number | null;
  operation: string | null;
  waitingForNewOperand: boolean;
  memory: number;
  angleMode: 'degrees' | 'radians';
  history: HistoryItem[];
}

export interface HistoryItem {
  expression: string;
  result: string;
  timestamp: number;
}

export type ButtonType = 
  | 'number' 
  | 'operator' 
  | 'function' 
  | 'memory' 
  | 'constant' 
  | 'control' 
  | 'equals';

export interface ButtonConfig {
  label: string;
  value: string;
  type: ButtonType;
  className?: string;
  gridSpan?: number;
}