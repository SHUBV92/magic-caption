'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const Hero = () => {
  const slogans = [
    "Transform Your Content",
    "Engage Your Audience",
    "Break Language Barriers"
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-24 sm:pb-20">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Left column - Text content */}
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.3 } }
              }}
            >
              <motion.h1
                variants={fadeInUp}
                className="text-5xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-6xl md:text-7xl"
              >
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                  Magic Caption
                </span>
              </motion.h1>

              <motion.div 
                variants={fadeInUp}
                className="mt-3 space-y-1"
              >
                {slogans.map((slogan, index) => (
                  <p
                    key={slogan}
                    className="text-xl text-gray-500 dark:text-gray-400"
                    style={{ opacity: 1 - index * 0.2 }}
                  >
                    {slogan}
                  </p>
                ))}
              </motion.div>

              <motion.p
                variants={fadeInUp}
                className="mt-8 text-lg text-gray-600 dark:text-gray-300"
              >
                Create professional captions in minutes. Perfect for content creators, educators, and businesses.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="mt-8 flex gap-4 sm:justify-center lg:justify-start"
              >
                <Link href="/upload">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                  >
                    Start Now
                  </motion.button>
                </Link>
                <Link href="#features">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 text-lg font-semibold text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    Learn More
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Right column - Example images */}
          <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
            <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="relative block w-full rounded-lg overflow-hidden"
              >
                {/* Main editor preview */}
                <Image
                  src="/editor-preview.png"
                  alt="Video editor interface"
                  width={600}
                  height={400}
                  className="w-full rounded-lg shadow-2xl"
                  priority
                />

                {/* Floating elements */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="absolute top-4 right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                    <span className="text-sm font-medium">AI Processing</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-gray-800/90 p-4 rounded-lg backdrop-blur-sm"
                >
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    "Hello everyone, welcome to this tutorial..."
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Generated caption with 99% accuracy
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
