"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageCarouselProps {
  images: string[];
}

export function ImageCarousel({ images }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [images.length]);

  if (!images || images.length === 0) {
    return <div className="h-full w-full bg-surface-hover" />;
  }

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[1.65rem]">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${images[currentIndex]})` }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-80" />
    </div>
  );
}
