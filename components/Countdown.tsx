
import React, { useState, useEffect } from 'react';
import { CountdownTime } from '../types';

const Countdown: React.FC = () => {
  const targetDate = new Date('2026-01-31T00:00:00').getTime();
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(timer);
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeUnit = ({ label, value }: { label: string; value: number }) => (
    <div className="flex flex-col items-center bg-white/20 backdrop-blur-md rounded-2xl p-4 min-w-[80px] md:min-w-[100px] border border-white/30 shadow-xl transition-all hover:scale-105">
      <span className="text-3xl md:text-5xl font-bold text-white mb-1">
        {value.toString().padStart(2, '0')}
      </span>
      <span className="text-xs md:text-sm uppercase tracking-widest text-orange-100 font-medium">{label}</span>
    </div>
  );

  return (
    <div className="flex flex-wrap justify-center gap-4 py-10">
      <TimeUnit label="Ngày" value={timeLeft.days} />
      <TimeUnit label="Giờ" value={timeLeft.hours} />
      <TimeUnit label="Phút" value={timeLeft.minutes} />
      <TimeUnit label="Giây" value={timeLeft.seconds} />
    </div>
  );
};

export default Countdown;
