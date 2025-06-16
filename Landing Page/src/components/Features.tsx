import React from 'react';
import { Zap, Users, Shield, BarChart3, Clock, Smartphone } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Lightning Fast Automation',
      description: 'Automate repetitive tasks with our intelligent workflow engine. Save hours every day with smart triggers and actions.',
      color: 'from-yellow-400 to-orange-500',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Seamless Collaboration',
      description: 'Work together effortlessly with real-time collaboration tools, shared workspaces, and instant messaging.',
      color: 'from-blue-400 to-indigo-500',
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Enterprise Security',
      description: 'Bank-level security with end-to-end encryption, SSO integration, and compliance with major standards.',
      color: 'from-green-400 to-emerald-500',
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Advanced Analytics',
      description: 'Gain insights into your workflow with detailed analytics, performance metrics, and custom reporting.',
      color: 'from-purple-400 to-pink-500',
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Time Tracking',
      description: 'Monitor project progress with built-in time tracking, automated timesheets, and productivity insights.',
      color: 'from-red-400 to-rose-500',
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: 'Mobile Ready',
      description: 'Access your workspace anywhere with our responsive design and native mobile apps for iOS and Android.',
      color: 'from-cyan-400 to-teal-500',
    },
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Succeed
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive platform provides all the tools your team needs 
            to streamline workflows, boost productivity, and achieve exceptional results.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative">
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl text-white mb-6 shadow-lg`}>
                  {feature.icon}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full px-8 py-4 border border-blue-100">
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full border-2 border-white"
                ></div>
              ))}
            </div>
            <span className="text-gray-700 font-medium">
              Join 10,000+ teams already using ProductiveFlow
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;