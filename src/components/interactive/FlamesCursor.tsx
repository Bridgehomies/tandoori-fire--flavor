"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
}

export function FlamesCursor() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const createParticle = useCallback((x: number, y: number) => {
    const particle: Particle = {
      id: Date.now() + Math.random(),
      x: x + (Math.random() - 0.5) * 20,
      y: y + (Math.random() - 0.5) * 20,
      size: Math.random() * 8 + 4,
      opacity: Math.random() * 0.6 + 0.4,
    };
    return particle;
  }, []);

  useEffect(() => {
    let animationFrame: number;
    let lastTime = 0;
    const throttleMs = 50;

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTime < throttleMs) return;
      lastTime = now;

      setMousePos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      // Create new particles
      setParticles((prev) => {
        const newParticles = [...prev, createParticle(e.clientX, e.clientY)];
        // Keep only last 15 particles
        return newParticles.slice(-15);
      });
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Clean up old particles
    const cleanup = setInterval(() => {
      setParticles((prev) => prev.slice(-10));
    }, 200);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearInterval(cleanup);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [createParticle]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* Main cursor glow */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute w-6 h-6 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              left: mousePos.x,
              top: mousePos.y,
            }}
          >
            <div className="w-full h-full rounded-full bg-gradient-to-t from-[#c44536] via-[#e85d04] to-[#ffba08] blur-sm animate-pulse" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ember particles trail */}
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{
              x: particle.x,
              y: particle.y,
              scale: 1,
              opacity: particle.opacity,
            }}
            animate={{
              y: particle.y - 60,
              scale: 0,
              opacity: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
            }}
          >
            <div
              className="w-full h-full rounded-full"
              style={{
                background: `radial-gradient(circle, #ffba08 0%, #e85d04 50%, #c44536 100%)`,
                boxShadow: `0 0 ${particle.size}px #e85d04`,
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
