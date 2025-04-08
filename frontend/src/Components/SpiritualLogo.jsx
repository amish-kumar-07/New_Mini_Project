import React from 'react';
import '../CSS/LogoAnimation.css';

const SpiritualLogo = () => {
  return (
    <div className="logo-container">
      <svg width="40" height="40" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        {/* Outer circle */}
        <circle cx="100" cy="100" r="90" fill="none" stroke="url(#gradientLogo)" strokeWidth="3"/>
        
        {/* Chakra points */}
        <circle cx="100" cy="32" r="10" fill="#EF5350" className="chakra-point"/>
        <circle cx="100" cy="168" r="10" fill="#7E57C2" className="chakra-point"/>
        <circle cx="32" cy="100" r="10" fill="#29B6F6" className="chakra-point"/>
        <circle cx="168" cy="100" r="10" fill="#66BB6A" className="chakra-point"/>
        <circle cx="139" cy="139" r="10" fill="#FFA726" className="chakra-point"/>
        <circle cx="61" cy="61" r="10" fill="#AB47BC" className="chakra-point"/>
        <circle cx="139" cy="61" r="10" fill="#42A5F5" className="chakra-point"/>
        <circle cx="61" cy="139" r="10" fill="#26A69A" className="chakra-point"/>
        
        {/* Center lotus */}
        <circle cx="100" cy="100" r="25" fill="transparent"/>
        <path d="M100,75 Q110,90 100,100 Q90,90 100,75" fill="#9C27B0" className="lotus-petal"/>
        <path d="M100,75 Q110,90 100,100 Q90,90 100,75" fill="#9C27B0" className="lotus-petal" transform="rotate(45 100 100)"/>
        <path d="M100,75 Q110,90 100,100 Q90,90 100,75" fill="#9C27B0" className="lotus-petal" transform="rotate(90 100 100)"/>
        <path d="M100,75 Q110,90 100,100 Q90,90 100,75" fill="#9C27B0" className="lotus-petal" transform="rotate(135 100 100)"/>
        <path d="M100,75 Q110,90 100,100 Q90,90 100,75" fill="#9C27B0" className="lotus-petal" transform="rotate(180 100 100)"/>
        <path d="M100,75 Q110,90 100,100 Q90,90 100,75" fill="#9C27B0" className="lotus-petal" transform="rotate(225 100 100)"/>
        <path d="M100,75 Q110,90 100,100 Q90,90 100,75" fill="#9C27B0" className="lotus-petal" transform="rotate(270 100 100)"/>
        <path d="M100,75 Q110,90 100,100 Q90,90 100,75" fill="#9C27B0" className="lotus-petal" transform="rotate(315 100 100)"/>
        
        {/* Center dot */}
        <circle cx="100" cy="100" r="8" fill="url(#gradientLogo)"/>
        
        {/* Gradients */}
        <defs>
          <linearGradient id="gradientLogo" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6"/> {/* blue-500 */}
            <stop offset="100%" stopColor="#8B5CF6"/> {/* purple-500 */}
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default SpiritualLogo;