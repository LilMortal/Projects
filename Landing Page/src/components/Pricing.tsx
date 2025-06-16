import React from 'react';
import { Check, Zap, Crown, Building } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: 'Starter',
      price: 9,
      period: 'month',
      description: 'Perfect for individuals and small teams getting started',
      icon: <Zap className="w-6 h-6" />,
      color: 'from-blue-500 to-indigo-600',
      features: [
        'Up to 5 team members',
        'Basic automation workflows',
        '10GB storage',
        'Email support',
        'Mobile app access',
        'Basic integrations',
      ],
      popular: false,
    },
    {
      name: 'Professional',
      price: 29,
      period: 'month',
      description: 'Ideal for growing teams that need advanced features',
      icon: <Crown className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-600',
      features: [
        'Up to 25 team members',
        'Advanced automation workflows',
        '100GB storage',
        'Priority support',
        'Advanced analytics',
        'Custom integrations',
        'Time tracking',
        'Custom fields',
      ],
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 99,
      period: 'month',
      description: 'For large organizations with complex requirements',
      icon: <Building className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-600',
      features: [
        'Unlimited team members',
        'Enterprise automation',
        'Unlimited storage',
        '24/7 dedicated support',
        'Advanced security',
        'Custom integrations',
        'White-label options',
        'API access',
        'Custom training',
      ],
      popular: false,
    },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Simple,{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Transparent Pricing
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the perfect plan for your team. All plans include a 14-day free trial 
            and can be cancelled anytime. No hidden fees.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 ${
                plan.popular ? 'border-purple-500' : 'border-gray-100'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="p-8">
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${plan.color} rounded-lg text-white`}>
                    {plan.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                </div>

                <p className="text-gray-600 mb-6">{plan.description}</p>

                <div className="mb-6">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                    <span className="text-gray-600">/{plan.period}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">per user, billed monthly</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => scrollToSection('contact')}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:from-purple-600 hover:to-pink-700 shadow-lg hover:shadow-xl'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Start Free Trial
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="inline-flex items-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>No setup fees</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;