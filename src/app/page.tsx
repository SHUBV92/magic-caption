'use client';

import { motion } from 'framer-motion';
import Navigation from './components/Navigation/Navigation';
import Hero from './components/Hero/Hero';

export default function Home() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navigation />
      
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful Features
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mb-8" />
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Everything you need to create professional captions for your videos
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {[
              {
                title: "AI-Powered Captions",
                description: "Generate accurate captions automatically using OpenAI's Whisper technology.",
                icon: "🤖",
                color: "from-blue-500 to-blue-600"
              },
              {
                title: "Real-time Editing",
                description: "Fine-tune captions with our intuitive editor. Perfect timing and styling made easy.",
                icon: "✏️",
                color: "from-purple-500 to-purple-600"
              },
              {
                title: "Multiple Languages",
                description: "Support for multiple languages and automatic translation capabilities.",
                icon: "🌍",
                color: "from-indigo-500 to-indigo-600"
              },
              {
                title: "Smart Timing",
                description: "Automatic speech detection for perfect caption timing.",
                icon: "⚡️",
                color: "from-pink-500 to-pink-600"
              },
              {
                title: "Custom Styles",
                description: "Customize fonts, colors, and animations to match your brand.",
                icon: "🎨",
                color: "from-green-500 to-green-600"
              },
              {
                title: "Easy Export",
                description: "Export your captioned videos in multiple formats with one click.",
                icon: "🚀",
                color: "from-yellow-500 to-yellow-600"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={item}
                className="group p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-3xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonial/Trust Section */}
      <motion.section 
        className="py-20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Trusted by content creators worldwide
          </p>
          <div className="flex justify-center items-center space-x-12 opacity-50">
            <span className="text-2xl font-bold">YouTube</span>
            <span className="text-2xl font-bold">TikTok</span>
            <span className="text-2xl font-bold">Instagram</span>
            <span className="text-2xl font-bold">Twitch</span>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
