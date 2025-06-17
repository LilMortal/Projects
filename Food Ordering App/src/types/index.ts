export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  ingredients: string[];
  rating: number;
  preparationTime: number;
  isVegetarian?: boolean;
  isSpicy?: boolean;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  customerInfo: {
    name: string;
    phone: string;
    address: string;
  };
  createdAt: Date;
  estimatedDelivery: Date;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  itemCount: number;
}

export interface Restaurant {
  name: string;
  description: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  minOrder: number;
  image: string;
}