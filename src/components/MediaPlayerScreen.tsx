import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, Volume2, Maximize2, Music, Video, Zap, Activity } from 'lucide-react';
import { DownloadItem, SearchResult } from '../types';

interface MediaPlayerScreenProps {
  currentItem: DownloadItem | SearchResult | null;
  isPlaying: boolean;
  onPlayPauseToggle: () => void;
}

export const MediaPlayerScreen: React.FC<MediaPlayerScreenProps> = ({
  currentItem,
  isPlaying,
  onPlayPauseToggle,
}) => {
  const [progress, setProgress] = useState(35);
  const [speed, setSpeed] = useState<'1.0x' | '1.25x' | '1.5x' | '2.0x'>('1.0x');
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(true);

  // Simulated playback time increment when playing
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const defaultTitle = currentItem?.title || 'Ozuna x Bryant Myers - Caramelo Remix';
  const defaultArtist = currentItem?.artist || 'DJ TUBE Studio Mix 320kbps';
  const defaultThumbnail =
    currentItem?.thumbnail ||
    'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80';
  const defaultDuration = currentItem?.duration || '04:15';
  const isVideo = currentItem?.type === 'video';

  return (
    <div className="flex flex-col gap-5 pb-20 items-center max-w-lg mx-auto">
      {/* Header Tag */}
      <div className="w-full flex items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-extrabold text-[#00E676] bg-[#00381C] px-3 py-1 rounded-full border border-[#00E676]/30 flex items-center gap-1.5">
            {isVideo ? <Video className="w-3.5 h-3.5" /> : <Music className="w-3.5 h-3.5" />}
            <span>{isVideo ? 'REPRODUCTOR VIDEO MP4' : 'REPRODUCTOR AUDIO MP3'}</span>
          </span>
        </div>

        {/* Speed Selector */}
        <button
          onClick={() => {
            const speeds: Array<'1.0x' | '1.25x' | '1.5x' | '2.0x'> = ['1.0x', '1.25x', '1.5x', '2.0x'];
            const idx = speeds.indexOf(speed);
            setSpeed(speeds[(idx + 1) % speeds.length]);
          }}
          className="text-xs font-bold text-gray-300 bg-[#1E1E1E] hover:bg-[#2A2A2A] px-3 py-1 rounded-xl border border-[#2A2A2A] transition-all"
        >
          Velocidad: {speed}
        </button>
      </div>

      {/* Main Player Display Stage (Vinyl or Video Screen) */}
      <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-[#161616] border-2 border-[#262626] shadow-2xl flex items-center justify-center group">
        <img
          src={defaultThumbnail}
          alt={defaultTitle}
          className={`w-full h-full object-cover transition-all duration-700 ${
            isPlaying ? 'scale-105 brightness-90' : 'brightness-50'
          }`}
        />

        {/* Overlay Equalizer visualizer */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-between p-4">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs text-[#00E676] font-extrabold bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg">
              <Zap className="w-3.5 h-3.5 fill-[#00E676]" />
              DJ TUBE DSP ENGINE
            </span>
            <button className="text-white hover:text-[#00E676] bg-black/60 p-1.5 rounded-lg">
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Audio Equalizer Frequency Bars animation */}
          {isPlaying && (
            <div className="flex items-end justify-center gap-1.5 h-12 my-auto">
              {[40, 75, 55, 90, 60, 100, 45, 80, 65, 30, 85, 50, 95].map((h, i) => (
                <div
                  key={i}
                  className="w-1.5 bg-[#00E676] rounded-full animate-bounce"
                  style={{
                    height: `${h}%`,
                    animationDuration: `${0.4 + (i % 5) * 0.15}s`,
                    animationDelay: `${i * 0.05}s`,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Track Meta */}
      <div className="w-full text-center flex flex-col gap-1">
        <h2 className="text-lg font-bold text-white line-clamp-2 px-2">
          {defaultTitle}
        </h2>
        <p className="text-sm font-semibold text-[#00E676]">{defaultArtist}</p>
      </div>

      {/* Progress Slider Bar */}
      <div className="w-full flex flex-col gap-1">
        <div
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const newPct = (clickX / rect.width) * 100;
            setProgress(Math.max(0, Math.min(100, newPct)));
          }}
          className="w-full h-2 bg-[#262626] rounded-full overflow-hidden cursor-pointer group relative"
        >
          <div
            className="h-full bg-[#00E676] transition-all rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex justify-between text-xs text-gray-400 font-semibold px-0.5">
          <span>01:28</span>
          <span>{defaultDuration}</span>
        </div>
      </div>

      {/* Playback Controls */}
      <div className="flex items-center justify-center gap-6 my-2">
        <button
          onClick={() => setIsShuffle(!isShuffle)}
          className={`p-2.5 rounded-full transition-all ${
            isShuffle ? 'text-[#00E676] bg-[#00381C]' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Shuffle className="w-5 h-5" />
        </button>

        <button className="text-white hover:text-[#00E676] transition-colors p-2">
          <SkipBack className="w-7 h-7 fill-current" />
        </button>

        {/* Big Neon Play/Pause Button */}
        <button
          onClick={onPlayPauseToggle}
          className="w-16 h-16 rounded-full bg-[#00E676] hover:bg-[#00C853] active:scale-95 text-black flex items-center justify-center shadow-xl shadow-[#00E676]/30 transition-all"
        >
          {isPlaying ? (
            <Pause className="w-8 h-8 fill-black" />
          ) : (
            <Play className="w-8 h-8 fill-black ml-1" />
          )}
        </button>

        <button className="text-white hover:text-[#00E676] transition-colors p-2">
          <SkipForward className="w-7 h-7 fill-current" />
        </button>

        <button
          onClick={() => setIsRepeat(!isRepeat)}
          className={`p-2.5 rounded-full transition-all ${
            isRepeat ? 'text-[#00E676] bg-[#00381C]' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Repeat className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
