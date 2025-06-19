import React from 'react';
import { motion } from 'framer-motion';
import {
  Target,
  Heart,
  Book,
  Dumbbell,
  Coffee,
  Moon,
  Sun,
  Star,
  Zap,
  Award,
  Clock,
  CheckCircle,
  Circle,
  Square,
  Triangle,
  Diamond,
} from 'lucide-react';

interface IconPickerProps {
  value: string;
  onChange: (icon: string) => void;
  color: string;
}

const icons = [
  { name: 'target', component: Target },
  { name: 'heart', component: Heart },
  { name: 'book', component: Book },
  { name: 'dumbbell', component: Dumbbell },
  { name: 'coffee', component: Coffee },
  { name: 'moon', component: Moon },
  { name: 'sun', component: Sun },
  { name: 'star', component: Star },
  { name: 'zap', component: Zap },
  { name: 'award', component: Award },
  { name: 'clock', component: Clock },
  { name: 'check-circle', component: CheckCircle },
  { name: 'circle', component: Circle },
  { name: 'square', component: Square },
  { name: 'triangle', component: Triangle },
  { name: 'diamond', component: Diamond },
];

export function IconPicker({ value, onChange, color }: IconPickerProps) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {icons.map((icon) => {
        const IconComponent = icon.component;
        return (
          <motion.button
            key={icon.name}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onChange(icon.name)}
            className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center transition-all ${
              value === icon.name
                ? 'border-gray-900 dark:border-white bg-gray-100 dark:bg-gray-700'
                : 'border-gray-200 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
            type="button"
          >
            <IconComponent 
              className="w-5 h-5" 
              style={{ color: value === icon.name ? color : undefined }}
            />
          </motion.button>
        );
      })}
    </div>
  );
}