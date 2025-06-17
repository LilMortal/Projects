import React from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../UI/Button';
import { useCartStore } from '../../store/cartStore';

export const CartSidebar: React.FC = () => {
  const { 
    items, 
    isOpen, 
    closeCart, 
    updateQuantity, 
    removeItem, 
    getTotal, 
    getItemCount 
  } = useCartStore();

  const total = getTotal();
  const itemCount = getItemCount();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={closeCart}
      />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-strong z-50 transform transition-transform animate-slideUp">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-neutral-200">
          <h2 className="text-lg font-semibold text-neutral-800">
            Your Cart ({itemCount} {itemCount === 1 ? 'item' : 'items'})
          </h2>
          <Button
            onClick={closeCart}
            variant="ghost"
            size="sm"
            icon={X}
          />
        </div>

        {/* Content */}
        <div className="flex flex-col h-full">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              <ShoppingBag size={48} className="text-neutral-300 mb-4" />
              <h3 className="text-lg font-medium text-neutral-600 mb-2">Your cart is empty</h3>
              <p className="text-neutral-500 mb-4">Add some delicious items to get started!</p>
              <Button onClick={closeCart}>
                <Link to="/menu">Browse Menu</Link>
              </Button>
            </div>
          ) : (
            <>
              {/* Items */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {items.map((item) => (
                  <div key={item.menuItem.id} className="flex gap-3 bg-neutral-50 rounded-xl p-3">
                    <img 
                      src={item.menuItem.image} 
                      alt={item.menuItem.name}
                      className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-neutral-800 truncate">
                        {item.menuItem.name}
                      </h4>
                      <p className="text-sm text-neutral-500 mb-2">
                        ${item.menuItem.price}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 bg-white rounded-lg p-1">
                          <Button
                            onClick={() => updateQuantity(item.menuItem.id, item.quantity - 1)}
                            variant="ghost"
                            size="sm"
                            icon={Minus}
                            className="w-6 h-6 p-0"
                          />
                          <span className="w-6 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            onClick={() => updateQuantity(item.menuItem.id, item.quantity + 1)}
                            variant="ghost"
                            size="sm"
                            icon={Plus}
                            className="w-6 h-6 p-0"
                          />
                        </div>
                        
                        <button
                          onClick={() => removeItem(item.menuItem.id)}
                          className="text-error-500 hover:text-error-600 text-sm font-medium transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="border-t border-neutral-200 p-4 space-y-4">
                <div className="flex items-center justify-between text-lg font-semibold">
                  <span>Total:</span>
                  <span className="text-primary-600">${total.toFixed(2)}</span>
                </div>
                
                <Link to="/checkout" onClick={closeCart}>
                  <Button className="w-full" size="lg">
                    Checkout
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};