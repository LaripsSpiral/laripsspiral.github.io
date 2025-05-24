'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

function FrontCard() {
  return (
    <Image 
      src="/profilecard/nfc-front.png" 
      alt="NFC Front" 
      width={1016} 
      height={638}
      className="w-full h-full object-cover backface-hidden"
      draggable={false} // Disable dragging
    />
  )
}

function BackCard() {
  return (
    <Image 
      src="/profilecard/nfc-back.png" 
      alt="NFC Back" 
      width={1016} 
      height={638}
      className="w-full h-full object-cover backface-hidden"
      draggable={false} // Disable dragging
    />
  )
}

export default function Card({ width = 300 }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const aspectRatio = 1016 / 638;
  const height = width / aspectRatio;

  return (
    <div 
      className="cursor-pointer perspective-1000"
      style={{ width: `${width}px`, height: `${height}px` }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ 
          duration: 0.6,
          type: "spring",
          stiffness: 500,
          damping: 30
        }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-full h-full"
      >
        <div 
          className="absolute inset-0 w-full h-full"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <FrontCard />
        </div>
        <div 
          className="absolute inset-0 w-full h-full"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <BackCard />
        </div>
      </motion.div>
    </div>
  );
}