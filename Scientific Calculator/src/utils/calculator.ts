export const formatNumber = (num: number): string => {
  if (isNaN(num) || !isFinite(num)) {
    return 'Error';
  }

  // Handle very small numbers
  if (Math.abs(num) < 1e-10 && num !== 0) {
    return '0';
  }

  // Handle very large numbers
  if (Math.abs(num) > 1e15) {
    return num.toExponential(6);
  }

  // Remove trailing zeros and unnecessary decimal point
  const formatted = num.toString();
  if (formatted.includes('.')) {
    return formatted.replace(/\.?0+$/, '');
  }
  
  return formatted;
};

export const toRadians = (degrees: number): number => {
  return degrees * (Math.PI / 180);
};

export const toDegrees = (radians: number): number => {
  return radians * (180 / Math.PI);
};

export const factorial = (n: number): number => {
  if (n < 0 || !Number.isInteger(n)) {
    throw new Error('Factorial is only defined for non-negative integers');
  }
  if (n > 170) {
    throw new Error('Factorial too large');
  }
  if (n === 0 || n === 1) return 1;
  
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
};

export const evaluateExpression = (expression: string, angleMode: 'degrees' | 'radians'): number => {
  try {
    // Replace constants
    let processedExpression = expression
      .replace(/π/g, Math.PI.toString())
      .replace(/e(?![+\-0-9])/g, Math.E.toString());

    // Handle factorial
    processedExpression = processedExpression.replace(/(\d+(?:\.\d+)?)!/g, (match, num) => {
      return factorial(parseFloat(num)).toString();
    });

    // Handle percentage
    processedExpression = processedExpression.replace(/(\d+(?:\.\d+)?)%/g, (match, num) => {
      return (parseFloat(num) / 100).toString();
    });

    // Handle functions with proper parentheses
    const functionMap: { [key: string]: (x: number) => number } = {
      'sin': (x) => angleMode === 'degrees' ? Math.sin(toRadians(x)) : Math.sin(x),
      'cos': (x) => angleMode === 'degrees' ? Math.cos(toRadians(x)) : Math.cos(x),
      'tan': (x) => angleMode === 'degrees' ? Math.tan(toRadians(x)) : Math.tan(x),
      'asin': (x) => angleMode === 'degrees' ? toDegrees(Math.asin(x)) : Math.asin(x),
      'acos': (x) => angleMode === 'degrees' ? toDegrees(Math.acos(x)) : Math.acos(x),
      'atan': (x) => angleMode === 'degrees' ? toDegrees(Math.atan(x)) : Math.atan(x),
      'log': (x) => Math.log10(x),
      'ln': (x) => Math.log(x),
      'sqrt': (x) => Math.sqrt(x),
      'exp': (x) => Math.exp(x),
    };

    // Process functions
    Object.keys(functionMap).forEach(func => {
      const regex = new RegExp(`${func}\\(([^)]+)\\)`, 'g');
      processedExpression = processedExpression.replace(regex, (match, arg) => {
        const argValue = evaluateExpression(arg, angleMode);
        return functionMap[func](argValue).toString();
      });
    });

    // Handle power operations (^)
    processedExpression = processedExpression.replace(/([^+\-*/^()]+)\^([^+\-*/^()]+)/g, (match, base, exp) => {
      return Math.pow(parseFloat(base), parseFloat(exp)).toString();
    });

    // Use Function constructor for safe evaluation (better than eval)
    const result = new Function('return ' + processedExpression)();
    
    if (typeof result !== 'number' || isNaN(result)) {
      throw new Error('Invalid calculation');
    }

    return result;
  } catch (error) {
    throw new Error('Invalid expression');
  }
};

export const isValidExpression = (expression: string): boolean => {
  try {
    // Basic validation
    if (!expression.trim()) return false;
    
    // Check for balanced parentheses
    let parenthesesCount = 0;
    for (const char of expression) {
      if (char === '(') parenthesesCount++;
      if (char === ')') parenthesesCount--;
      if (parenthesesCount < 0) return false;
    }
    
    return parenthesesCount === 0;
  } catch {
    return false;
  }
};