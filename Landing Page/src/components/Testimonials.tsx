import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Product Manager',
      company: 'TechCorp',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      content: 'ProductiveFlow has transformed how our team collaborates. We\'ve reduced project completion time by 40% and everyone loves using it.',
      rating: 5,
    },
    {
      name: 'Marcus Rodriguez',
      role: 'CEO',
      company: 'StartupFlow',
      image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      content: 'The automation features are incredible. Tasks that used to take hours now happen automatically. It\'s like having an extra team member.',
      rating: 5,
    },
    {
      name: 'Emily Thompson',
      role: 'Operations Director',
      company: 'ScaleUp Inc.',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      content: 'Best investment we\'ve made this year. The ROI was clear within the first month. Our team is more productive and happier.',
      rating: 5,
    },
    {
      name: 'David Kim',
      role: 'Engineering Lead',
      company: 'DevStudio',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      content: 'The security features give us peace of mind, and the API integrations are seamless. Perfect for our growing development team.',
      rating: 5,
    },
    {
      name: 'Lisa Johnson',
      role: 'Marketing Manager',
      company: 'GrowthLab',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      content: 'The analytics dashboard provides insights we never had before. We can now track our campaign performance in real-time.',
      rating: 5,
    },
    {
      name: 'Alex Williams',
      role: 'Project Manager',
      company: 'ConsultPro',
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      content: 'Client communication has never been easier. The collaboration tools help us deliver projects faster and with higher quality.',
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Loved by{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Teams Worldwide
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our customers have to say 
            about how ProductiveFlow has transformed their workflow.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
            >
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <div className="relative mb-6">
                <Quote className="absolute -top-2 -left-2 w-8 h-8 text-blue-200" />
                <p className="text-gray-700 leading-relaxed pl-6">
                  "{testimonial.content}"
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="inline-flex items-center space-x-4 bg-white rounded-full px-8 py-4 shadow-lg border border-gray-100">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="text-gray-700 font-medium">
              4.9/5 average rating from 2,500+ reviews
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;