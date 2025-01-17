'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface Short {
  id: number;
  title: string;
  thumbnail: string;
  views: string;
  likes: string;
  category: string;
  duration: string;
}

interface InspirationCardProps {
  short: Short;
}

const InspirationCard = ({ short }: InspirationCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative w-full aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl bg-gray-900"
    >
      {/* Thumbnail */}
      <div className="relative w-full h-full">
        <Image
          src={short.thumbnail}
          alt={short.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />

      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-between">
        {/* Top Section */}
        <div className="flex justify-between items-start">
          <motion.span 
            className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm"
            whileHover={{ scale: 1.05 }}
          >
            {short.category}
          </motion.span>
          <motion.span 
            className="px-3 py-1 bg-black/20 backdrop-blur-sm rounded-full text-white text-sm"
            whileHover={{ scale: 1.05 }}
          >
            {short.duration}
          </motion.span>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-white text-xl font-bold mb-2 line-clamp-2">
            {short.title}
          </h3>
          <div className="flex items-center gap-4">
            <motion.div 
              className="flex items-center gap-1"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-white text-sm">👁️</span>
              <span className="text-white text-sm">{short.views}</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-1"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-white text-sm">❤️</span>
              <span className="text-white text-sm">{short.likes}</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Swipe Instructions */}
      <motion.div 
        className="absolute bottom-20 left-0 right-0 flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="px-4 py-2 bg-black/40 backdrop-blur-sm rounded-full">
          <p className="text-white text-sm">
            Swipe right to like, left to skip
          </p>
        </div>
      </motion.div>

      {/* Like/Dislike Indicators */}
      <div className="absolute inset-y-0 left-0 w-1/3 flex items-center justify-start px-6 opacity-0 group-hover:opacity-100 transition-opacity">
        <motion.div
          className="bg-red-500/80 p-4 rounded-full"
          initial={{ scale: 0.8, opacity: 0 }}
          whileHover={{ scale: 1 }}
          whileTap={{ scale: 0.9 }}
        >
          <span className="text-2xl">👎</span>
        </motion.div>
      </div>
      <div className="absolute inset-y-0 right-0 w-1/3 flex items-center justify-end px-6 opacity-0 group-hover:opacity-100 transition-opacity">
        <motion.div
          className="bg-green-500/80 p-4 rounded-full"
          initial={{ scale: 0.8, opacity: 0 }}
          whileHover={{ scale: 1 }}
          whileTap={{ scale: 0.9 }}
        >
          <span className="text-2xl">👍</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default InspirationCard;
