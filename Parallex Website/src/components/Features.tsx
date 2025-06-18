import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Smartphone, 
  Zap, 
  Shield, 
  Palette, 
  Code, 
  Globe,
  Layers,
  MousePointer,
  Eye
} from 'lucide-react';
import { useParallax } from '../hooks/useParallax';

const features = [
  {
    icon: Smartphone,
    title: 'Responsive Design',
    description: 'Perfectly optimized for all devices, from mobile to desktop',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Optimized performance with lazy loading and efficient animations',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description: 'Built with modern security practices and best coding standards',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: Palette,
    title: 'Beautiful Design',
    description: 'Stunning visuals with carefully crafted color schemes and typography',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Code,
    title: 'Clean Code',
    description: 'Well-structured, maintainable code following industry best practices',
    color: 'from-indigo-500 to-blue-500'
  },
  {
    icon: Globe,
    title: 'SEO Optimized',
    description: 'Search engine friendly with semantic HTML and meta optimization',
    color: 'from-teal-500 to-cyan-500'
  },
  {
    icon: Layers,
    title: 'Parallax Effects',
    description: 'Smooth layered scrolling that creates depth and visual interest',
    color: 'from-rose-500 to-pink-500'
  },
  {
    icon: MousePointer,
    title: 'Interactive Elements',
    description: 'Engaging hover effects and micro-interactions for better UX',
    color: 'from-violet-500 to-purple-500'
  },
  {
    icon: Eye,
    title: 'Accessibility First',
    description: 'Designed to be usable by everyone, including users with disabilities',
    color: 'from-amber-500 to-orange-500'
  }
];

export const Features: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const parallaxOffset = useParallax(0.1);

  return (
    <section id="features" className="relative py-24 overflow-hidden">
      {/* Parallax Background */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
        style={{ transform: `translateY(${parallaxOffset}px)` }}
      />

      {/* Decorative Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-10 w-64 h-64 bg-primary-200/30 dark:bg-primary-800/20 rounded-full filter blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-10 w-64 h-64 bg-accent-200/30 dark:bg-accent-800/20 rounded-full filter blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Powerful <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">Features</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Every feature is carefully designed and implemented to provide the best possible user experience.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="group relative p-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-500"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                transition: { duration: 0.3 }
              }}
            >
              {/* Background Gradient on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-primary-500 to-accent-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              <div className="absolute inset-[2px] rounded-2xl bg-white dark:bg-gray-800 -z-10" />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started Today
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};