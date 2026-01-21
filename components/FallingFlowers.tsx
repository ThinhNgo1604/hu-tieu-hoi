
import React, { useEffect, useState } from 'react';

const FallingFlowers: React.FC = () => {
  const [flowers, setFlowers] = useState<any[]>([]);

  useEffect(() => {
    const flowerTypes = ['🌸', '🌺', '✨', '🍂'];
    const initialFlowers = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 10,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 10,
      type: flowerTypes[Math.floor(Math.random() * flowerTypes.length)],
      opacity: Math.random() * 0.5 + 0.3,
    }));
    setFlowers(initialFlowers);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
      {flowers.map((flower) => (
        <div
          key={flower.id}
          className="absolute animate-float"
          style={{
            left: `${flower.x}%`,
            top: `-50px`,
            fontSize: `${flower.size}px`,
            opacity: flower.opacity,
            animation: `fall ${flower.duration}s linear infinite`,
            animationDelay: `${flower.delay}s`,
          }}
        >
          {flower.type}
        </div>
      ))}
      <style>{`
        @keyframes fall {
          0% {
            transform: translateY(0) rotate(0deg) translateX(0);
          }
          25% {
            transform: translateY(25vh) rotate(90deg) translateX(20px);
          }
          50% {
            transform: translateY(50vh) rotate(180deg) translateX(-20px);
          }
          75% {
            transform: translateY(75vh) rotate(270deg) translateX(20px);
          }
          100% {
            transform: translateY(110vh) rotate(360deg) translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default FallingFlowers;
