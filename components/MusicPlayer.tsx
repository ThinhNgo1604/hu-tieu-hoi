
import React, { useState, useRef } from 'react';
import { VolumeX, Volume2, Music } from 'lucide-react';

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Yêu cầu tương tác người dùng để phát nhạc"));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-8 right-6 md:bottom-10 md:right-10 z-[9999]">
      <audio
        ref={audioRef}
        loop
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
      />
      
      <div className="relative group">
        {/* Nút chính với hiệu ứng lơ lửng bám theo màn hình */}
        <button
          onClick={togglePlay}
          className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-[0_10px_40px_rgba(0,0,0,0.3)] backdrop-blur-md transition-all duration-500 transform hover:scale-110 active:scale-95 animate-floating-music border-2 ${
            isPlaying 
              ? 'bg-orange-500 text-white border-orange-300' 
              : 'bg-white/95 text-orange-500 border-orange-200'
          }`}
        >
          {isPlaying ? (
            <div className="relative">
              <Volume2 size={28} />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
              </span>
            </div>
          ) : (
            <VolumeX size={28} />
          )}
        </button>

        {/* Nốt nhạc bay */}
        {isPlaying && (
          <div className="absolute inset-0 pointer-events-none">
            <Music size={16} className="absolute -top-10 left-2 text-orange-400 animate-note-1 opacity-0" />
            <Music size={14} className="absolute -top-8 -left-2 text-orange-300 animate-note-2 opacity-0" />
          </div>
        )}

        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-4 bg-gray-900/90 backdrop-blur-sm text-white px-4 py-2 rounded-xl text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-2xl border border-white/10">
          {isPlaying ? 'Tắt nhạc' : 'Bật nhạc chill'}
        </div>
      </div>

      <style>{`
        @keyframes floating-music {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes note-1 {
          0% { transform: translateY(0) scale(0.5); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(-60px) translateX(30px) rotate(45deg); opacity: 0; }
        }
        @keyframes note-2 {
          0% { transform: translateY(0) scale(0.5); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(-50px) translateX(-30px) rotate(-45deg); opacity: 0; }
        }
        .animate-floating-music { animation: floating-music 3s ease-in-out infinite; }
        .animate-note-1 { animation: note-1 2s linear infinite; }
        .animate-note-2 { animation: note-2 2.5s linear infinite; }
      `}</style>
    </div>
  );
};

export default MusicPlayer;
