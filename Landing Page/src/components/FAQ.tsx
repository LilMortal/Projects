import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  const faqs = [
    {
      question: 'How does the 14-day free trial work?',
      answer: 'You can start using ProductiveFlow immediately with full access to all features. No credit card required. After 14 days, you can choose to continue with a paid plan or your account will be paused.',
    },
    {
      question: 'Can I change my plan at any time?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we\'ll prorate any charges or credits to your account.',
    },
    {
      question: 'What integrations do you support?',
      answer: 'We support over 100 integrations including Slack, Google Workspace, Microsoft 365, Zoom, Salesforce, HubSpot, and many more. We also provide a robust API for custom integrations.',
    },
    {
      question: 'Is my data secure?',
      answer: 'Absolutely. We use bank-level encryption, regular security audits, and comply with SOC 2, GDPR, and other security standards. Your data is encrypted in transit and at rest.',
    },
    {
      question: 'Do you offer customer support?',
      answer: 'Yes! We offer email support for all plans, with priority support for Professional plans and 24/7 dedicated support for Enterprise customers. We also have extensive documentation and video tutorials.',
    },
    {
      question: 'Can I use ProductiveFlow on mobile devices?',
      answer: 'Yes, ProductiveFlow works great on mobile browsers and we also have native iOS and Android apps available on the App Store and Google Play.',
    },
    {
      question: 'What happens if I exceed my plan limits?',
      answer: 'We\'ll notify you before you reach your limits. For storage and team members, you can upgrade your plan. We never cut off access suddenly - we work with you to find the right solution.',
    },
    {
      question: 'Do you offer discounts for non-profits or education?',
      answer: 'Yes, we offer special pricing for qualified non-profit organizations and educational institutions. Contact our sales team for more information about available discounts.',
    },
  ];

  return (
    <section id="faq" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            Have questions? We have answers. If you don't find what you're looking for, 
            feel free to contact our support team.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
              >
                <span className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </span>
                {openItems.includes(index) ? (
                  <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                )}
              </button>
              
              {openItems.includes(index) && (
                <div className="px-6 pb-6">
                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Our support team is here to help you get the most out of ProductiveFlow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
                Contact Support
              </button>
              <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 transition-colors duration-200 font-medium">
                View Documentation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;