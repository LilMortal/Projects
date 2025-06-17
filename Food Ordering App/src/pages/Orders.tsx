import React from 'react';
import { Clock, MapPin, Phone, User } from 'lucide-react';
import { Badge } from '../components/UI/Badge';
import { Button } from '../components/UI/Button';
import { useOrderStore } from '../store/orderStore';
import { Link } from 'react-router-dom';

export const Orders: React.FC = () => {
  const { getAllOrders } = useOrderStore();
  const orders = getAllOrders();

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
      case 'preparing': return 'Preparing';
      case 'ready': return 'Ready for Pickup';
      case 'delivered': return 'Delivered';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  };

  return (
    <div className="pt-16 md:pt-20 min-h-screen bg-neutral-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-800 mb-2">Order History</h1>
          <p className="text-lg text-neutral-600">Track your orders and reorder your favorites</p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-soft p-12 text-center">
            <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-neutral-400" />
            </div>
            <h2 className="text-xl font-semibold text-neutral-800 mb-2">No orders yet</h2>
            <p className="text-neutral-600 mb-6">When you place your first order, it will appear here.</p>
            <Link to="/menu">
              <Button>Browse Menu</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl shadow-soft p-6">
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div className="mb-2 sm:mb-0">
                    <h3 className="text-lg font-semibold text-neutral-800">
                      Order #{order.id.slice(-6).toUpperCase()}
                    </h3>
                    <p className="text-sm text-neutral-500">
                      {order.createdAt.toLocaleDateString()} at {order.createdAt.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                  <Badge variant={getStatusColor(order.status) as any} size="md">
                    {getStatusText(order.status)}
                  </Badge>
                </div>

                {/* Order Items */}
                <div className="space-y-3 mb-4">
                  {order.items.map((item) => (
                    <div key={item.menuItem.id} className="flex gap-3">
                      <img 
                        src={item.menuItem.image} 
                        alt={item.menuItem.name}
                        className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-neutral-800">{item.menuItem.name}</h4>
                        <p className="text-sm text-neutral-500">
                          ${item.menuItem.price} × {item.quantity}
                        </p>
                      </div>
                      <span className="font-medium text-neutral-700">
                        ${(item.menuItem.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Customer Info */}
                <div className="bg-neutral-50 rounded-xl p-4 mb-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-neutral-400" />
                      <span className="text-neutral-700">{order.customerInfo.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-neutral-400" />
                      <span className="text-neutral-700">{order.customerInfo.phone}</span>
                    </div>
                    <div className="flex items-start gap-2 sm:col-span-2">
                      <MapPin className="w-4 h-4 text-neutral-400 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-700">{order.customerInfo.address}</span>
                    </div>
                  </div>
                </div>

                {/* Order Footer */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-neutral-200">
                  <div className="mb-3 sm:mb-0">
                    <span className="text-lg font-semibold text-neutral-800">
                      Total: <span className="text-primary-600">${order.total.toFixed(2)}</span>
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <Link to={`/order-confirmation/${order.id}`}>
                      <Button variant="secondary" size="sm">
                        View Details
                      </Button>
                    </Link>
                    <Button size="sm">
                      Reorder
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};