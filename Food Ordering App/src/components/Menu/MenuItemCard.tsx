import React from 'react';
import { Plus, Star, Clock, Leaf, Flame } from 'lucide-react';
import { Button } from '../UI/Button';
import { Badge } from '../UI/Badge';
import { useCartStore } from '../../store/cartStore';
import type { MenuItem } from '../../types';

interface MenuItemCardProps {
  item: MenuItem;
  onViewDetails: (item: MenuItem) => void;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onViewDetails }) => {
  const { addItem } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(item);
  };

  return (
    <div 
      className="bg-white rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 cursor-pointer group overflow-hidden"
      onClick={() => onViewDetails(item)}
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {item.isVegetarian && (
            <Badge variant="success" className="flex items-center gap-1">
              <Leaf size={12} />
              Veg
            </Badge>
          )}
          {item.isSpicy && (
            <Badge variant="warning" className="flex items-center gap-1">
              <Flame size={12} />
              Spicy
            </Badge>
          )}
        </div>
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
          <Star className="w-3 h-3 fill-warning-400 text-warning-400" />
          <span className="text-xs font-medium text-neutral-700">{item.rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="space-y-1">
          <h3 className="font-semibold text-neutral-800 group-hover:text-primary-600 transition-colors">
            {item.name}
          </h3>
          <p className="text-sm text-neutral-500 line-clamp-2">
            {item.description}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-neutral-500">
          <Clock size={12} />
          <span>{item.preparationTime} min</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-primary-600">
            ${item.price}
          </span>
          <Button
            onClick={handleAddToCart}
            icon={Plus}
            size="sm"
            className="px-3"
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};