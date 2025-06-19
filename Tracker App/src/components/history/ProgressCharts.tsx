import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Tracker } from '../../types';
import { format, subDays, eachDayOfInterval } from 'date-fns';

interface ProgressChartsProps {
  trackers: Tracker[];
}

export function ProgressCharts({ trackers }: ProgressChartsProps) {
  // Mock data generation - in a real app, this would come from tracker logs
  const generateMockData = () => {
    const days = eachDayOfInterval({
      start: subDays(new Date(), 30),
      end: new Date(),
    });

    return days.map(day => ({
      date: format(day, 'MMM dd'),
      completed: Math.floor(Math.random() * trackers.length) + 1,
      total: trackers.length,
    }));
  };

  const generateCategoryData = () => {
    const categories = ['Health', 'Productivity', 'Learning', 'Personal', 'Work'];
    return categories.map(category => ({
      category,
      count: Math.floor(Math.random() * 10) + 1,
      color: ['#4F46E5', '#F59E0B', '#10B981', '#EF4444', '#8B5CF6'][Math.floor(Math.random() * 5)],
    }));
  };

  const lineData = generateMockData();
  const categoryData = generateCategoryData();
  const completionData = trackers.map(tracker => ({
    name: tracker.name,
    completion: tracker.completion_rate || 0,
    color: tracker.color,
  }));

  return (
    <div className="space-y-8">
      {/* Completion Trend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Completion Trend (Last 30 Days)
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis 
                dataKey="date" 
                stroke="#6B7280"
                fontSize={12}
              />
              <YAxis 
                stroke="#6B7280"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB',
                }}
              />
              <Line 
                type="monotone" 
                dataKey="completed" 
                stroke="#4F46E5" 
                strokeWidth={3}
                dot={{ fill: '#4F46E5', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#4F46E5', strokeWidth: 2, fill: '#4F46E5' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Tracker Completion Rates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Completion Rates by Tracker
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={completionData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                <XAxis 
                  type="number" 
                  stroke="#6B7280"
                  fontSize={12}
                  domain={[0, 100]}
                />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  stroke="#6B7280"
                  fontSize={12}
                  width={80}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB',
                  }}
                  formatter={(value) => [`${value}%`, 'Completion Rate']}
                />
                <Bar 
                  dataKey="completion" 
                  fill="#4F46E5"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Category Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Trackers by Category
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="count"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          {/* Legend */}
          <div className="mt-4 grid grid-cols-2 gap-2">
            {categoryData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {item.category}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}