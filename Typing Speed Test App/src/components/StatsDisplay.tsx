import React from 'react';
import { TypingStats } from '../types';
import { Clock, Zap, Target, AlertCircle } from 'lucide-react';

interface StatsDisplayProps {
  stats: TypingStats;
  timeRemaining: number;
  duration: number;
}

export const StatsDisplay: React.FC<StatsDisplayProps> = ({ stats, timeRemaining, duration }) => {
  const progress = ((duration - timeRemaining) / duration) * 100;

  const StatCard: React.FC<{
    icon: React.ReactNode;
    label: string;
    value: string | number;
    color: string;
  }> = ({ icon, label, value, color }) => (
    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-orange-200/50 shadow-lg shadow-orange-100/30">
      <div className="flex items-center gap-3 mb-2">
        <div className={`p-2 rounded-lg ${color}`}>
          {icon}
        </div>
        <span className="text-gray-700 text-sm font-medium">{label}</span>
      </div>
      <div className="text-2xl font-bold text-gray-800">{value}</div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Timer */}
      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-orange-200/50 shadow-lg shadow-orange-100/30">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-orange-500" />
            <span className="text-gray-700 font-medium">Time Remaining</span>
          </div>
          <div className="text-3xl font-bold text-gray-800">
            {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-orange-400 to-pink-400 transition-all duration-1000 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Zap className="w-5 h-5 text-white" />}
          label="WPM"
          value={stats.wpm}
          color="bg-gradient-to-br from-orange-400 to-pink-400"
        />
        
        <StatCard
          icon={<Zap className="w-5 h-5 text-white" />}
          label="CPM"
          value={stats.cpm}
          color="bg-gradient-to-br from-pink-400 to-purple-400"
        />
        
        <StatCard
          icon={<Target className="w-5 h-5 text-white" />}
          label="Accuracy"
          value={`${stats.accuracy}%`}
          color="bg-gradient-to-br from-emerald-400 to-green-400"
        />
        
        <StatCard
          icon={<AlertCircle className="w-5 h-5 text-white" />}
          label="Errors"
          value={stats.errors}
          color="bg-gradient-to-br from-red-400 to-pink-400"
        />
      </div>
    </div>
  );
};