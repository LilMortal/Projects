import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Clock, MapPin, Phone, User } from 'lucide-react';
import { Button } from '../components/UI/Button';
import { Badge } from '../components/UI/Badge';
import { useOrderStore } from '../store/orderStore';

export const OrderConfirmation: React.FC = () => {
  const { orderId } = useParams();
  const { getOrderById } = useOrderStore();
  const [order, setOrder] = useState(useOrderStore.getState().getOrderById(orderId || ''));

  useEffect(() => {
    const unsubscribe = useOrderStore.subscribe((state) => {
      if (orderId) {
        setOrder(state.getOrderById(orderId));
      }
    });

    return unsubscribe;
  }, [orderId]);

  if (!order) {
    return (
      <div className="pt-16 md:pt-20 min-h-screen bg-neutral-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-2xl font-bold text-neutral-800 mb-4">Order not found</h1>
          <p className="text-neutral-600 mb-6">The order you're looking for doesn't exist.</p>
          <Link to="/">
            <Button>Go Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'preparing': return 'warning';
      case 'ready': return 'success';
      case 'delivered': return 'success';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Order Received';
      case 'preparing': return 'Preparing Your Order';
      case 'ready': return 'Order Ready';
      case 'delivered': return 'Delivered';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  };

  return (
    <div className="pt-16 md:pt-20 min-h-screen bg-neutral-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-success-600" />
          </div>
          <h1 className="text-3xl font-bold text-neutral-800 mb-2">Order Confirmed!</h1>
          <p className="text-lg text-neutral-600">
            Thank you for your order. We'll have it ready soon!
          </p>
        </div>

        <div className="space-y-6">
          {/* Order Status */}
          <div className="bg-white rounded-2xl shadow-soft p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-neutral-800">Order Status</h2>
              <Badge variant={getStatusColor(order.status) as any} size="md">
                {getStatusText(order.status)}
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <span className="font-bold text-primary-600">#{order.id.slice(-6).toUpperCase()}</span>
                </div>
                <div>
                  <p className="font-medium text-neutral-800">Order ID</p>
                  <p className="text-sm text-neutral-500">#{order.id.slice(-6).toUpperCase()}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-accent-600" />
                </div>
                <div>
                  <p className="font-medium text-neutral-800">Estimated Delivery</p>
                  <p className="text-sm text-neutral-500">
                    {order.estimatedDelivery.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-2xl shadow-soft p-6">
            <h2 className="text-xl font-semibold text-neutral-800 mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.menuItem.id} className="flex gap-4 pb-4 border-b border-neutral-100 last:border-b-0 last:pb-0">
                  <img 
                    src={item.menuItem.image} 
                    alt={item.menuItem.name}
                    className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-neutral-800">{item.menuItem.name}</h4>
                    <p className="text-sm text-neutral-500 mb-1">{item.menuItem.description}</p>
                    <p className="text-sm text-neutral-600">
                      ${item.menuItem.price} × {item.quantity}
                    </p>
                  </div>
                  <span className="font-medium text-neutral-800">
                    ${(item.menuItem.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="border-t border-neutral-200 pt-4 mt-4">
              <div className="flex justify-between text-lg font-semibold text-neutral-800">
                <span>Total</span>
                <span className="text-primary-600">${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Customer Info */}
          <div className="bg-white rounded-2xl shadow-soft p-6">
            <h2 className="text-xl font-semibold text-neutral-800 mb-4">Delivery Information</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-neutral-400" />
                <span className="text-neutral-700">{order.customerInfo.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-neutral-400" />
                <span className="text-neutral-700">{order.customerInfo.phone}</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-neutral-400 mt-0.5" />
                <span className="text-neutral-700">{order.customerInfo.address}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/orders" className="flex-1">
              <Button variant="secondary" className="w-full">
                View All Orders
              </Button>
            </Link>
            <Link to="/menu" className="flex-1">
              <Button className="w-full">
                Order Again
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};