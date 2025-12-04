"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface Ember {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export function InteractiveEmbers() {
  const [embers, setEmbers] = useState<Ember[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Generate initial embers
    const initialEmbers: Ember[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 2,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 5,
    }));
    setEmbers(initialEmbers);

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      {embers.map((ember) => {
        // Calculate distance from mouse and apply attraction
        const dx = mousePos.x - ember.x;
        const dy = mousePos.y - ember.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 30;
        const attraction = Math.max(0, 1 - distance / maxDistance);
        
        const attractX = dx * attraction * 0.15;
        const attractY = dy * attraction * 0.15;

        return (
          <motion.div
            key={ember.id}
            className="absolute rounded-full"
            initial={{
              left: `${ember.x}%`,
              top: `${ember.y}%`,
              opacity: 0,
            }}
            animate={{
              left: `${ember.x + attractX}%`,
              top: `${ember.y + attractY - 20}%`,
              opacity: [0, 0.8, 0.8, 0],
              scale: [0.5, 1, 1, 0.3],
            }}
            transition={{
              duration: ember.duration,
              delay: ember.delay,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              width: ember.size,
              height: ember.size,
              background: `radial-gradient(circle, #ffba08 0%, #e85d04 50%, #c44536 100%)`,
              boxShadow: `0 0 ${ember.size * 2}px #e85d0480`,
            }}
          />
        );
      })}

      {/* Glow effect near mouse */}
      <motion.div
        className="absolute w-64 h-64 rounded-full pointer-events-none"
        animate={{
          left: `${mousePos.x}%`,
          top: `${mousePos.y}%`,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
        style={{
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(228, 93, 4, 0.1) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
