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
    />
  )
}

export default function Card() {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="w-[300px] h-[188px] cursor-pointer perspective-1000"
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