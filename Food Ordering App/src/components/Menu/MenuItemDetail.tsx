import React, { useState } from 'react';
import { X, Star, Clock, Leaf, Flame, Minus, Plus } from 'lucide-react';
import { Button } from '../UI/Button';
import { Badge } from '../UI/Badge';
import { Modal } from '../UI/Modal';
import { useCartStore } from '../../store/cartStore';
import type { MenuItem } from '../../types';

interface MenuItemDetailProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const MenuItemDetail: React.FC<MenuItemDetailProps> = ({
  item,
  isOpen,
  onClose,
}) => {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();

  if (!item) return null;

  const handleAddToCart = () => {
    addItem(item, quantity);
    onClose();
    setQuantity(1);
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" showCloseButton={false}>
      <div className="space-y-6">
        {/* Header with close button */}
        <div className="flex justify-end">
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            icon={X}
          />
        </div>

        {/* Image */}
        <div className="relative">
          <img 
            src={item.image} 
            alt={item.name}
            className="w-full h-64 object-cover rounded-xl"
          />
          <div className="absolute top-4 left-4 flex gap-2">
            {item.isVegetarian && (
              <Badge variant="success" className="flex items-center gap-1">
                <Leaf size={12} />
                Vegetarian
              </Badge>
            )}
            {item.isSpicy && (
              <Badge variant="warning" className="flex items-center gap-1">
                <Flame size={12} />
                Spicy
              </Badge>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-neutral-800 mb-2">{item.name}</h2>
            <p className="text-neutral-600">{item.description}</p>
          </div>

          {/* Rating and Time */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-warning-400 text-warning-400" />
              <span className="font-medium text-neutral-700">{item.rating}</span>
            </div>
            <div className="flex items-center gap-1 text-neutral-500">
              <Clock size={16} />
              <span>{item.preparationTime} min</span>
            </div>
          </div>

          {/* Ingredients */}
          <div>
            <h3 className="font-semibold text-neutral-800 mb-2">Ingredients</h3>
            <div className="flex flex-wrap gap-2">
              {item.ingredients.map((ingredient, index) => (
                <Badge key={index} variant="secondary">
                  {ingredient}
                </Badge>
              ))}
            </div>
          </div>

          {/* Price and Add to Cart */}
          <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold text-primary-600">
                ${item.price}
              </span>
              
              {/* Quantity Selector */}
              <div className="flex items-center gap-2 bg-neutral-100 rounded-xl p-1">
                <Button
                  onClick={decrementQuantity}
                  variant="ghost"
                  size="sm"
                  icon={Minus}
                  className="w-8 h-8 p-0"
                />
                <span className="w-8 text-center font-medium">{quantity}</span>
                <Button
                  onClick={incrementQuantity}
                  variant="ghost"
                  size="sm"
                  icon={Plus}
                  className="w-8 h-8 p-0"
                />
              </div>
            </div>

            <Button
              onClick={handleAddToCart}
              size="lg"
              className="px-8"
            >
              Add to Cart - ${(item.price * quantity).toFixed(2)}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};