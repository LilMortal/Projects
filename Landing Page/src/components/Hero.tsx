import React from 'react';
import { ArrowRight, Play, CheckCircle } from 'lucide-react';

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-2000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                <CheckCircle className="w-4 h-4" />
                <span>Trusted by 10,000+ teams worldwide</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Streamline Your{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Workflow
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Transform your productivity with our intelligent automation platform. 
                Collaborate seamlessly, automate repetitive tasks, and achieve more 
                with less effort.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollToSection('contact')}
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              
              <button className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 transition-colors duration-200 font-semibold text-lg">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </button>
            </div>

            <div className="flex items-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>14-day free trial</span>
              </div>
            </div>
          </div>

          {/* Right Content - Illustration */}
          <div className="relative">
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg"></div>
                  <div className="flex-1">
                    <div className="h-3 bg-gray-200 rounded-full"></div>
                    <div className="h-2 bg-gray-100 rounded-full mt-2"></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-16 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg"></div>
                  ))}
                </div>
                
                <div className="flex justify-between items-center pt-4">
                  <div className="flex space-x-2">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="w-8 h-8 bg-gray-200 rounded-full"></div>
                    ))}
                  </div>
                  <div className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    Active
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-green-400 rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <ArrowRight className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;