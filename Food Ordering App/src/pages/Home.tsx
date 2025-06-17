import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Clock, Truck } from 'lucide-react';
import { Button } from '../components/UI/Button';
import { restaurant, categories } from '../data/mockData';

export const Home: React.FC = () => {
  return (
    <div className="pt-16 md:pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-orange-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-800 leading-tight">
                  Delicious Food
                  <span className="block text-primary-600">Delivered Fast</span>
                </h1>
                <p className="text-lg text-neutral-600 max-w-lg">
                  {restaurant.description}. Order now and get fresh, hot meals delivered to your doorstep in {restaurant.deliveryTime}.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/menu">
                  <Button size="lg" className="w-full sm:w-auto">
                    Order Now
                    <ArrowRight size={20} />
                  </Button>
                </Link>
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  View Menu
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-neutral-200">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Star className="w-5 h-5 fill-warning-400 text-warning-400" />
                    <span className="text-2xl font-bold text-neutral-800">{restaurant.rating}</span>
                  </div>
                  <p className="text-sm text-neutral-600">Rating</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Clock className="w-5 h-5 text-primary-500" />
                    <span className="text-2xl font-bold text-neutral-800">30</span>
                  </div>
                  <p className="text-sm text-neutral-600">Min Delivery</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Truck className="w-5 h-5 text-secondary-500" />
                    <span className="text-2xl font-bold text-neutral-800">${restaurant.deliveryFee}</span>
                  </div>
                  <p className="text-sm text-neutral-600">Delivery</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <img 
                src={restaurant.image}
                alt="Delicious food"
                className="w-full h-96 lg:h-[500px] object-cover rounded-3xl shadow-strong"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
              Popular Categories
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Explore our wide variety of delicious food categories, from comfort classics to healthy options.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/menu?category=${category.id}`}
                className="group text-center"
              >
                <div className="relative overflow-hidden rounded-2xl mb-3 aspect-square">
                  <img 
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <h3 className="font-semibold text-white text-sm">
                      {category.name}
                    </h3>
                    <p className="text-white/80 text-xs">
                      {category.itemCount} items
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
              Why Choose YumBasket?
            </h2>
            <p className="text-lg text-neutral-600">
              We're committed to bringing you the best food delivery experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-2xl shadow-soft">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">Fast Delivery</h3>
              <p className="text-neutral-600">
                Get your food delivered hot and fresh in just 30-45 minutes
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-2xl shadow-soft">
              <div className="w-16 h-16 bg-secondary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">Quality Food</h3>
              <p className="text-neutral-600">
                Fresh ingredients and expert chefs ensure every meal is perfect
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-2xl shadow-soft">
              <div className="w-16 h-16 bg-accent-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-accent-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">Easy Ordering</h3>
              <p className="text-neutral-600">
                Simple, intuitive ordering process with secure payment options
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};