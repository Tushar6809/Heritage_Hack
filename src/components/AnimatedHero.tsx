"use client";

import { motion } from "framer-motion";
import { LocationInput } from "./LocationInput";
import type { Site } from "@/lib/data";

interface AnimatedHeroProps {
  sites: Site[];
}

export function AnimatedHero({ sites }: AnimatedHeroProps) {
  // No floating images


  return (
    <div className="relative mb-12 flex flex-col items-center text-center w-full min-h-[60vh] justify-center overflow-visible">
      
      {/* Background SVG Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ rotate: -360, scale: [1, 1.2, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -right-[10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl"
        />
        
        {/* SVG Decorative Indian Motif (Abstract) */}
        <motion.svg 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 2 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] text-accent pointer-events-none" 
          viewBox="0 0 200 200" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M100 0C100 0 100 50 150 50C150 50 100 50 100 100C100 100 100 50 50 50C50 50 100 50 100 0Z" fill="currentColor"/>
          <path d="M100 200C100 200 100 150 150 150C150 150 100 150 100 100C100 100 100 150 50 150C50 150 100 150 100 200Z" fill="currentColor"/>
          <circle cx="100" cy="100" r="20" fill="currentColor"/>
        </motion.svg>
      </div>

      {/* Removed Floating Images as per request */}

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10"
      >
        <h1 className="font-serif text-[3.7rem] font-bold leading-[0.85] tracking-tight text-foreground sm:text-[5rem] md:text-[6rem]">
          Discover India&apos;s
          <br />
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-accent inline-block"
          >
            Hidden Heritage
          </motion.span>
        </h1>
      </motion.div>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-6 max-w-2xl text-lg font-semibold text-foreground/80 sm:text-xl z-10"
      >
        Explore hidden monuments, traditions, food and cultural experiences around you — while helping preserve and support the communities behind them.
      </motion.p>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="mt-8 z-10 w-full flex justify-center relative"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-accent/0 via-accent/50 to-accent/0 rounded-full blur opacity-50 pointer-events-none -z-10"></div>
        <div className="relative z-10 w-full flex justify-center">
          <LocationInput />
        </div>
      </motion.div>
    </div>
  );
}
