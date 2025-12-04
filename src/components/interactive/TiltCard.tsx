"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

export function TiltCard({ children, className = "" }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [brightness, setBrightness] = useState(1);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Calculate rotation (max 15 degrees)
    const rotX = (mouseY / (rect.height / 2)) * -10;
    const rotY = (mouseX / (rect.width / 2)) * 10;

    setRotateX(rotX);
    setRotateY(rotY);
    
    // Calculate brightness based on mouse position (simulating light reflection)
    const bright = 1 + (mouseY / (rect.height / 2)) * -0.1;
    setBrightness(bright);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setBrightness(1);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY,
        filter: `brightness(${brightness})`,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className={className}
    >
      {children}
      
      {/* Glare effect */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        animate={{
          background: `linear-gradient(${135 + rotateY * 2}deg, rgba(255,255,255,0.1) 0%, transparent 50%)`,
        }}
      />
    </motion.div>
  );
}
