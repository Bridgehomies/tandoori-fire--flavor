"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame } from "lucide-react";

const spiceLevels = [
  { level: 1, name: "Mild", color: "#ffba08", description: "Gentle warmth, perfect for beginners" },
  { level: 2, name: "Medium", color: "#f48c06", description: "A pleasant kick with balanced flavor" },
  { level: 3, name: "Hot", color: "#e85d04", description: "Bold heat for spice enthusiasts" },
  { level: 4, name: "Extra Hot", color: "#dc2f02", description: "Intense fire, not for the faint-hearted" },
  { level: 5, name: "Inferno", color: "#c44536", description: "Extreme heat - proceed with caution!" },
];

export function SpiceMeter() {
  const [selectedLevel, setSelectedLevel] = useState(2);
  const [isHovering, setIsHovering] = useState<number | null>(null);

  const activeLevel = isHovering ?? selectedLevel;

  return (
    <div className="bg-[#231c18] rounded-2xl p-6 md:p-8 border border-[#3d322c]">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-serif text-[#faf5f0] mb-2">
          What&apos;s Your <span className="text-[#d4a574]">Spice Tolerance?</span>
        </h3>
        <p className="text-[#a89890] text-sm">
          Hover or click to discover your heat level
        </p>
      </div>

      {/* Spice Level Selector */}
      <div className="flex justify-center items-end gap-3 md:gap-4 mb-6">
        {spiceLevels.map((spice, index) => (
          <motion.button
            key={spice.level}
            onMouseEnter={() => setIsHovering(index)}
            onMouseLeave={() => setIsHovering(null)}
            onClick={() => setSelectedLevel(index)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative flex flex-col items-center"
          >
            <motion.div
              animate={{
                height: activeLevel >= index ? 40 + index * 15 : 20,
                opacity: activeLevel >= index ? 1 : 0.3,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-8 md:w-10 rounded-t-full flex items-end justify-center pb-2"
              style={{
                background: activeLevel >= index
                  ? `linear-gradient(to top, ${spice.color}, ${spice.color}80)`
                  : "#3d322c",
                boxShadow: activeLevel >= index ? `0 0 20px ${spice.color}60` : "none",
              }}
            >
              <AnimatePresence>
                {activeLevel >= index && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                  >
                    <Flame
                      className="w-4 h-4"
                      style={{ color: activeLevel === index ? "#fff" : "#ffffff80" }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            <span className="text-xs text-[#a89890] mt-2 hidden md:block">
              {spice.level}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Active Level Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeLevel}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            {[...Array(spiceLevels[activeLevel].level)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <Flame
                  className="w-5 h-5"
                  style={{ color: spiceLevels[activeLevel].color }}
                  fill={spiceLevels[activeLevel].color}
                />
              </motion.div>
            ))}
          </div>
          <h4
            className="text-xl font-bold font-serif mb-1"
            style={{ color: spiceLevels[activeLevel].color }}
          >
            {spiceLevels[activeLevel].name}
          </h4>
          <p className="text-[#a89890] text-sm">
            {spiceLevels[activeLevel].description}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Animated Fire Base */}
      <div className="relative h-8 mt-6 overflow-hidden">
        <motion.div
          animate={{
            background: [
              `linear-gradient(90deg, transparent, ${spiceLevels[activeLevel].color}40, transparent)`,
              `linear-gradient(90deg, ${spiceLevels[activeLevel].color}40, transparent, ${spiceLevels[activeLevel].color}40)`,
              `linear-gradient(90deg, transparent, ${spiceLevels[activeLevel].color}40, transparent)`,
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-full blur-xl"
        />
      </div>
    </div>
  );
}
