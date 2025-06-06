'use client';

import { motion } from "framer-motion";
import Card from "@/app/components/card";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-6xl font-bold mb-4"
      >
        Sirasit
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-xl text-gray-600"
      >
        Software Developer
      </motion.p>
      
      <Card 
        width={500}
      />
    </div>
  );
}