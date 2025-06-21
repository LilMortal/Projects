import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { HistoricalData } from '../../types';
import { format } from 'date-fns';

interface StockChartProps {
  data: HistoricalData[];
  symbol: string;
}

export const StockChart: React.FC<StockChartProps> = ({ data, symbol }) => {
  const formatTooltipValue = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(value);
  };

  const formatXAxisDate = (dateStr: string) => {
    return format(new Date(dateStr), 'MMM dd');
  };

  const isPositiveTrend = data.length > 1 && data[data.length - 1].price > data[0].price;

  return (
    <div className="bg-dark-50 border border-gray-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">
          {symbol} - 30 Day Chart
        </h3>
        <div className={`px-3 py-1 rounded-full text-sm font-medium
                        ${isPositiveTrend 
                          ? 'bg-neon-500/20 text-neon-500 border border-neon-500/30' 
                          : 'bg-red-500/20 text-red-500 border border-red-500/30'
                        }`}>
          {isPositiveTrend ? 'Bullish' : 'Bearish'}
        </div>
      </div>

      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatXAxisDate}
              stroke="#9CA3AF"
              fontSize={12}
            />
            <YAxis 
              tickFormatter={(value) => `$${value}`}
              stroke="#9CA3AF"
              fontSize={12}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#F3F4F6'
              }}
              formatter={(value: number) => [formatTooltipValue(value), 'Price']}
              labelFormatter={(label) => format(new Date(label), 'MMMM dd, yyyy')}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke={isPositiveTrend ? '#10B981' : '#EF4444'}
              strokeWidth={2}
              dot={false}
              activeDot={{ 
                r: 6, 
                fill: isPositiveTrend ? '#10B981' : '#EF4444',
                stroke: '#1F2937',
                strokeWidth: 2
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};