
import React, { useState, useRef, useEffect } from 'react';
import { Music, Music2, VolumeX, Volume2 } from 'lucide-react';

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("User interaction required for music"));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <audio
        ref={audioRef}
        loop
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
      />
      <button
        onClick={togglePlay}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 transform hover:scale-110 ${
          isPlaying ? 'bg-orange-500 text-white animate-pulse' : 'bg-white text-orange-500 border-2 border-orange-500'
        }`}
      >
        {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>
      {isPlaying && (
        <div className="absolute -top-12 right-0 bg-white px-3 py-1 rounded-full text-xs font-semibold shadow-md whitespace-nowrap text-orange-600 animate-bounce">
          Đang phát nhạc chill...
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;
