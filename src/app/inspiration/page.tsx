'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import InspirationCard from '../components/InspirationCard/InspirationCard';
import Navigation from '../components/Navigation/Navigation';

const InspirationPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Sample data - in a real app, this would come from an API
  const shorts = [
    {
      id: 1,
      title: "5 Quick Cooking Tips Everyone Should Know",
      thumbnail: "https://i.ytimg.com/vi/8JiZhUL1xHE/maxresdefault.jpg",
      views: "1.2M",
      likes: "250K",
      category: "Cooking",
      duration: "30s"
    },
    {
      id: 2,
      title: "Morning Workout Routine for Beginners",
      thumbnail: "https://i.ytimg.com/vi/UBMk30rjy0o/maxresdefault.jpg",
      views: "800K",
      likes: "150K",
      category: "Fitness",
      duration: "45s"
    },
    {
      id: 3,
      title: "Travel Hacks That Will Save You Money",
      thumbnail: "https://i.ytimg.com/vi/yRz6LBiyMWQ/maxresdefault.jpg",
      views: "2.1M",
      likes: "420K",
      category: "Travel",
      duration: "28s"
    },
    {
      id: 4,
      title: "Learn This Dance Move in 60 Seconds",
      thumbnail: "https://i.ytimg.com/vi/J1GhZhMxGYE/maxresdefault.jpg",
      views: "3.5M",
      likes: "890K",
      category: "Dance",
      duration: "60s"
    },
    {
      id: 5,
      title: "Easy DIY Room Decor Ideas",
      thumbnail: "https://i.ytimg.com/vi/8TI6FQlWoRY/maxresdefault.jpg",
      views: "1.8M",
      likes: "320K",
      category: "DIY",
      duration: "35s"
    }
  ];

  const paginate = (newDirection: number) => {
    if (currentIndex + newDirection < 0 || currentIndex + newDirection >= shorts.length) return;
    setDirection(newDirection);
    setCurrentIndex(currentIndex + newDirection);
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Get Inspired
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Swipe through trending Shorts for content inspiration
          </p>
        </div>

        <div className="relative h-[600px] max-w-sm mx-auto">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={{
                enter: (direction: number) => ({
                  x: direction > 0 ? 1000 : -1000,
                  opacity: 0,
                  scale: 0.8
                }),
                center: {
                  zIndex: 1,
                  x: 0,
                  opacity: 1,
                  scale: 1
                },
                exit: (direction: number) => ({
                  zIndex: 0,
                  x: direction < 0 ? 1000 : -1000,
                  opacity: 0,
                  scale: 0.8
                })
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className="absolute w-full"
            >
              <InspirationCard short={shorts[currentIndex]} />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={() => paginate(-1)}
            disabled={currentIndex === 0}
            className="p-4 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            👈
          </button>
          <button
            onClick={() => paginate(1)}
            disabled={currentIndex === shorts.length - 1}
            className="p-4 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            👉
          </button>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-500 dark:text-gray-400">
            {currentIndex + 1} of {shorts.length}
          </p>
        </div>
      </main>
    </div>
  );
};

export default InspirationPage;
