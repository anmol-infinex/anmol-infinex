'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

interface Certificate {
  id: string;
  companyName: string;
  certificateName: string;
  issueDate: string;
  credentialType: string;
  logoSrc: string;
  logoAlt: string;
  credentialUrl: string;
  category?: string;
}

interface CertificateCardProps {
  certificate: Certificate;
  index: number;
}

const certificates: Certificate[] = [
  {
    id: 'inamigos-internship',
    companyName: 'InAmigos Foundation',
    certificateName: 'Web Development Internship',
    issueDate: 'May 2026',
    credentialType: 'Internship Certification',
    logoSrc: 'https://inamigos.org/logo.svg',
    logoAlt: 'InAmigos Foundation Logo',
    credentialUrl: 'https://inamigos.org/verify',
    category: 'Professional Experience'
  },
  {
    id: 'google-ai',
    companyName: 'Google',
    certificateName: 'Google AI Essentials',
    issueDate: 'June 2026',
    credentialType: 'Professional Certificate',
    logoSrc: 'https://www.gstatic.com/images/branding/product/1x/googleg_40.svg',
    logoAlt: 'Google Logo',
    credentialUrl: 'https://www.coursera.org/verify/professional-cert/GOOGLE-AI',
    category: 'AI & Machine Learning'
  },
  {
    id: 'microsoft-azure',
    companyName: 'Microsoft',
    certificateName: 'Azure Fundamentals',
    issueDate: 'April 2026',
    credentialType: 'Official Microsoft Certification',
    logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/220px-Microsoft_logo.svg.png',
    logoAlt: 'Microsoft Logo',
    credentialUrl: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals',
    category: 'Cloud Computing'
  },
  {
    id: 'cisco-ccna',
    companyName: 'Cisco',
    certificateName: 'CCNA Introduction',
    issueDate: 'March 2026',
    credentialType: 'Cisco Certification',
    logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Cisco_logo_blue_2015.svg/220px-Cisco_logo_blue_2015.svg.png',
    logoAlt: 'Cisco Logo',
    credentialUrl: 'https://www.cisco.com/c/en/us/training-events/training-certifications.html',
    category: 'Networking'
  },
  {
    id: 'aws-developer',
    companyName: 'Amazon Web Services',
    certificateName: 'AWS Developer Associate',
    issueDate: 'February 2026',
    credentialType: 'Professional Certification',
    logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/220px-Amazon_Web_Services_Logo.svg.png',
    logoAlt: 'AWS Logo',
    credentialUrl: 'https://aws.amazon.com/certification',
    category: 'Cloud Computing'
  },
  {
    id: 'github-security',
    companyName: 'GitHub',
    certificateName: 'GitHub Security Fundamentals',
    issueDate: 'January 2026',
    credentialType: 'GitHub Skills',
    logoSrc: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
    logoAlt: 'GitHub Logo',
    credentialUrl: 'https://github.com/skills',
    category: 'Security & DevOps'
  },
  {
    id: 'python-meta',
    companyName: 'Meta',
    certificateName: 'Python for Everybody',
    issueDate: 'December 2025',
    credentialType: 'Professional Certificate',
    logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Meta_Platforms_logo.svg/220px-Meta_Platforms_logo.svg.png',
    logoAlt: 'Meta Logo',
    credentialUrl: 'https://www.coursera.org/specializations/python-for-everybody',
    category: 'Programming'
  },
  {
    id: 'ibm-ai',
    companyName: 'IBM',
    certificateName: 'AI Engineering Fundamentals',
    issueDate: 'November 2025',
    credentialType: 'Professional Certificate',
    logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/220px-IBM_logo.svg.png',
    logoAlt: 'IBM Logo',
    credentialUrl: 'https://www.ibm.com/training/badge',
    category: 'AI & Machine Learning'
  }
];

const CertificateCard: React.FC<CertificateCardProps> = ({ certificate, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setMousePosition({ x, y });
    }
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="h-full"
    >
      <motion.div
        animate={isHovered ? { y: -8, rotateX: 5 } : { y: 0, rotateX: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          transformStyle: 'preserve-3d',
          transform: `perspective(1200px) rotateX(${isHovered ? 5 : 0}deg) rotateY(${(mousePosition.x - 0.5) * 5}deg)`,
        }}
        className="h-full"
      >
        <div
          className={`relative h-full rounded-2xl p-6 border backdrop-blur-xl overflow-hidden group transition-all duration-300
            ${isHovered
              ? 'border-cyan-400 bg-gradient-to-br from-cyan-500/20 via-purple-500/10 to-pink-500/20 shadow-2xl'
              : 'border-purple-500/30 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5'
            }
          `}
        >
          {/* Animated gradient background */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
          </div>

          {/* Neon glow layers */}
          <div className={`absolute -inset-1 rounded-2xl blur-2xl transition-all duration-300 ${
            isHovered 
              ? 'opacity-100 shadow-[0_0_30px_rgba(0,212,255,0.5),inset_0_0_30px_rgba(168,85,247,0.3)]' 
              : 'opacity-50 shadow-[0_0_15px_rgba(0,212,255,0.2)]'
          }`} />

          {/* Particle glow effect */}
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-300" />

          {/* Content container */}
          <div className="relative z-10 flex flex-col h-full">
            {/* Logo Section - Glass Orb */}
            <div className="flex justify-center mb-6 pt-2">
              <motion.div
                animate={isHovered ? { rotateY: 360 } : { rotateY: 0 }}
                transition={{ duration: 3 }}
                style={{ transformStyle: 'preserve-3d' }}
                className="relative"
              >
                {/* Glass orb container */}
                <div className={`w-24 h-24 rounded-full transition-all duration-300
                  ${isHovered 
                    ? 'bg-gradient-to-br from-cyan-400/40 via-purple-400/20 to-pink-400/40 shadow-[0_0_30px_rgba(0,212,255,0.6),inset_-2px_-2px_10px_rgba(255,255,255,0.2)]' 
                    : 'bg-gradient-to-br from-cyan-400/20 via-purple-400/10 to-pink-400/20 shadow-[0_0_20px_rgba(0,212,255,0.3)]'
                  }
                  border border-cyan-300/40 backdrop-blur-xl flex items-center justify-center
                `}>
                  {/* Inner shine effect */}
                  <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-60" />

                  {/* Logo */}
                  <div className="relative z-20 w-16 h-16 flex items-center justify-center">
                    <img
                      src={certificate.logoSrc}
                      alt={certificate.logoAlt}
                      className="w-full h-full object-contain filter drop-shadow-lg transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>

                  {/* Outer glow ring */}
                  <div className={`absolute -inset-1 rounded-full border-2 transition-all duration-300
                    ${isHovered 
                      ? 'border-cyan-400 shadow-[0_0_20px_rgba(0,212,255,0.8)]' 
                      : 'border-purple-400/50 shadow-[0_0_10px_rgba(168,85,247,0.4)]'
                    }
                  `} />
                </div>
              </motion.div>
            </div>

            {/* Certificate Name */}
            <div className="text-center mb-4 flex-grow">
              <motion.h3
                animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
                className="text-lg font-bold bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent transition-all duration-300"
              >
                {certificate.certificateName}
              </motion.h3>
            </div>

            {/* Metadata Section */}
            <div className="space-y-2 text-sm mb-4">
              <div className="flex items-center justify-center gap-2 text-gray-300">
                <span className="text-cyan-400/70">•</span>
                <span>{certificate.companyName}</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-gray-400">
                <span className="text-purple-400/70">•</span>
                <span>{certificate.issueDate}</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-gray-400 text-xs">
                <span className="text-pink-400/70">•</span>
                <span className="bg-purple-500/20 px-2 py-1 rounded-full border border-purple-400/30">
                  {certificate.credentialType}
                </span>
              </div>
            </div>

            {/* View Credential Button */}
            <motion.a
              href={certificate.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-2 px-4 rounded-lg font-semibold text-center transition-all duration-300
                bg-gradient-to-r from-cyan-500/20 to-purple-500/20 hover:from-cyan-500/40 hover:to-purple-500/40
                border border-cyan-400/50 hover:border-cyan-300
                text-cyan-300 hover:text-cyan-100
                shadow-lg hover:shadow-[0_0_20px_rgba(0,212,255,0.4)]
                flex items-center justify-center gap-2
              "
            >
              View Credential
              <ExternalLink className="w-4 h-4" />
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const CertificationsSection: React.FC = () => {
  const [visibleCerts, setVisibleCerts] = useState<Certificate[]>(certificates);

  useEffect(() => {
    // Stagger animation for initial load
    setVisibleCerts([]);
    const timer = setTimeout(() => setVisibleCerts(certificates), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen w-full py-20 px-4 md:px-8 overflow-hidden bg-gradient-to-b from-[#0B1023] via-[#0F1332] to-[#1A1F3A]">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-600 rounded-full mix-blend-screen filter blur-3xl opacity-5 animate-float" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-5 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-pink-600 rounded-full mix-blend-screen filter blur-3xl opacity-5 animate-float" style={{ animationDelay: '4s' }} />
      </div>

      {/* Grid background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,212,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-5xl md:text-6xl font-bold mb-4"
            style={{
              backgroundImage: 'linear-gradient(135deg, #00d4ff 0%, #a855f7 50%, #ec4899 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Professional Certifications
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto"
          >
            Industry-recognized credentials demonstrating expertise in cutting-edge technologies and cloud platforms.
          </motion.p>
        </motion.div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-max">
          <AnimatePresence>
            {visibleCerts.map((cert, index) => (
              <CertificateCard
                key={cert.id}
                certificate={cert}
                index={index}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <p className="text-gray-400 text-sm md:text-base">
            <span className="text-cyan-400">✓</span> All credentials are verified and current
            <span className="mx-2 text-gray-600">•</span>
            <span className="text-purple-400">✓</span> Continuous learning and skill development
          </p>
        </motion.div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(30px) translateX(10px);
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
      `}</style>
    </section>
  );
};

export default CertificationsSection;
