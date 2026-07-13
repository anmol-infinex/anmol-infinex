'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface LogoItem {
  id: string;
  name: string;
  logoSrc: string;
  logoAlt: string;
}

interface LogoOrbProps {
  item: LogoItem;
  index: number;
}

const certificationLogos: LogoItem[] = [
  {
    id: 'aws',
    name: 'Amazon Web Services',
    logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/1200px-Amazon_Web_Services_Logo.svg.png',
    logoAlt: 'AWS Logo'
  },
  {
    id: 'deloitte',
    name: 'Deloitte',
    logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Deloitte_US_Logo.svg/1200px-Deloitte_US_Logo.svg.png',
    logoAlt: 'Deloitte Logo'
  },
  {
    id: 'tata',
    name: 'Tata Group',
    logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Tata_logo.svg/1200px-Tata_logo.svg.png',
    logoAlt: 'Tata Group Logo'
  },
  {
    id: 'inamigos',
    name: 'InAmigos Foundation',
    logoSrc: 'https://inamigos.org/assets/logo.png',
    logoAlt: 'InAmigos Foundation Logo'
  },
  {
    id: 'cdmi',
    name: 'Creative Design & Multimedia Institute',
    logoSrc: 'https://cdmi.in/assets/logo.png',
    logoAlt: 'CDMI Logo'
  },
  {
    id: 'parul',
    name: 'Parul University',
    logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Parul_University_Logo.svg/1200px-Parul_University_Logo.svg.png',
    logoAlt: 'Parul University Logo'
  }
];

const LogoOrb: React.FC<LogoOrbProps> = ({ item, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const orbRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (orbRef.current) {
      const rect = orbRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setMousePosition({ x, y });
    }
  };

  return (
    <motion.div
      ref={orbRef}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex justify-center items-center"
    >
      <motion.div
        animate={isHovered ? { y: -10, rotateX: 10 } : { y: 0, rotateX: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          transformStyle: 'preserve-3d',
          transform: `perspective(1200px) rotateX(${isHovered ? 10 : 0}deg) rotateY(${(mousePosition.x - 0.5) * 8}deg) rotateZ(${(mousePosition.y - 0.5) * 5}deg)`,
        }}
      >
        <div
          className={`relative w-32 h-32 md:w-40 md:h-40 rounded-full transition-all duration-300 flex items-center justify-center cursor-pointer
            ${isHovered
              ? 'bg-gradient-to-br from-cyan-400/40 via-purple-400/30 to-pink-400/40 shadow-[0_0_50px_rgba(0,212,255,0.8),inset_-2px_-2px_15px_rgba(255,255,255,0.3)]'
              : 'bg-gradient-to-br from-cyan-400/15 via-purple-400/10 to-pink-400/15 shadow-[0_0_30px_rgba(0,212,255,0.4),inset_-2px_-2px_10px_rgba(255,255,255,0.15)]'
            }
            border-2 backdrop-blur-2xl
            ${isHovered ? 'border-cyan-300/80' : 'border-cyan-300/40'}
          `}
        >
          {/* Glass shine effect */}
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/30 to-transparent opacity-70" />

          {/* Animated glow ring */}
          <motion.div
            animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 20, repeat: Infinity, linear: true }}
            className={`absolute -inset-1 rounded-full border-2 transition-all duration-300
              ${isHovered
                ? 'border-cyan-400 shadow-[0_0_30px_rgba(0,212,255,0.9)]'
                : 'border-purple-400/50 shadow-[0_0_15px_rgba(168,85,247,0.5)]'
              }
            `}
          />

          {/* Secondary rotating glow */}
          <motion.div
            animate={isHovered ? { rotate: -180 } : { rotate: 0 }}
            transition={{ duration: 15, repeat: Infinity, linear: true }}
            className={`absolute -inset-3 rounded-full border border-pink-400/30 transition-opacity duration-300
              ${isHovered ? 'opacity-100' : 'opacity-40'}
              shadow-[0_0_20px_rgba(236,72,153,0.3)]
            `}
          />

          {/* Logo */}
          <motion.div
            animate={isHovered ? { scale: 1.15, rotateY: 360 } : { scale: 1, rotateY: 0 }}
            transition={{ duration: 3 }}
            style={{ transformStyle: 'preserve-3d' }}
            className="relative z-20 w-20 h-20 md:w-24 md:h-24 flex items-center justify-center"
          >
            <img
              src={item.logoSrc}
              alt={item.logoAlt}
              className="w-full h-full object-contain filter drop-shadow-2xl saturate-150 transition-all duration-300"
              onError={(e) => {
                // Fallback if image fails to load
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </motion.div>

          {/* Inner accent circle */}
          <div className={`absolute inset-4 rounded-full border border-cyan-300/30 transition-all duration-300
            ${isHovered ? 'shadow-[inset_0_0_20px_rgba(0,212,255,0.4)]' : 'shadow-[inset_0_0_10px_rgba(0,212,255,0.2)]'}
          `} />
        </div>
      </motion.div>
    </motion.div>
  );
};

export const CertificationsSection: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full py-24 px-4 md:px-8 overflow-hidden bg-gradient-to-b from-[#0B1023] via-[#0F1332] to-[#1A1F3A]">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-600 rounded-full mix-blend-screen filter blur-3xl opacity-5"
        />
        <motion.div
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-5"
        />
        <motion.div
          animate={{ x: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute top-1/2 right-0 w-96 h-96 bg-pink-600 rounded-full mix-blend-screen filter blur-3xl opacity-5"
        />
      </div>

      {/* Grid background pattern */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none z-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,212,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.h2
            className="text-5xl md:text-7xl font-bold mb-6"
            style={{
              backgroundImage: 'linear-gradient(135deg, #00d4ff 0%, #a855f7 50%, #ec4899 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '0.05em'
            }}
          >
            CERTIFICATIONS BY
          </motion.h2>

          {/* Decorative underline */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mx-auto rounded-full"
          />
        </motion.div>

        {/* Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-10 auto-rows-max justify-items-center">
          {certificationLogos.map((logo, index) => (
            <LogoOrb key={logo.id} item={logo} index={index} />
          ))}
        </div>

        {/* Decorative bottom elements */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-24 flex justify-center"
        >
          <div className="flex items-center gap-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-400" />
            <span className="text-cyan-400/60 text-sm font-semibold tracking-widest">
              TRUSTED & CERTIFIED
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-pink-400" />
          </div>
        </motion.div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes float-gentle {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(20px);
          }
        }

        @keyframes glow-pulse {
          0%, 100% {
            box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(0, 212, 255, 0.6);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
      `}</style>
    </section>
  );
};

export default CertificationsSection;
