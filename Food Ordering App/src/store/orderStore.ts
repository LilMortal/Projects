import { create } from 'zustand';
import type { Order, CartItem } from '../types';

interface OrderStore {
  orders: Order[];
  currentOrder: Order | null;
  
  createOrder: (items: CartItem[], customerInfo: Order['customerInfo']) => string;
  getOrderById: (id: string) => Order | undefined;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  getAllOrders: () => Order[];
}

export const useOrderStore = create<OrderStore>((set, get) => ({
  orders: [],
  currentOrder: null,

  createOrder: (items, customerInfo) => {
    const orderId = `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const total = items.reduce((sum, item) => sum + (item.menuItem.price * item.quantity), 0);
    
    const order: Order = {
      id: orderId,
      items,
      total,
      status: 'pending',
      customerInfo,
      createdAt: new Date(),
      estimatedDelivery: new Date(Date.now() + 45 * 60 * 1000), // 45 minutes from now
    };

    set({
      orders: [...get().orders, order],
      currentOrder: order,
    });

    // Simulate order status updates
    setTimeout(() => get().updateOrderStatus(orderId, 'preparing'), 2000);
    setTimeout(() => get().updateOrderStatus(orderId, 'ready'), 20000);
    setTimeout(() => get().updateOrderStatus(orderId, 'delivered'), 30000);

    return orderId;
  },

  getOrderById: (id) => {
    return get().orders.find(order => order.id === id);
  },

  updateOrderStatus: (id, status) => {
    set({
      orders: get().orders.map(order =>
        order.id === id ? { ...order, status } : order
      ),
      currentOrder: get().currentOrder?.id === id 
        ? { ...get().currentOrder!, status }
        : get().currentOrder,
    });
  },

  getAllOrders: () => {
    return get().orders.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  },
}));