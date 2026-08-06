import React, { useState } from 'react';
import { X, Music, Video, Download, CheckCircle2, Sparkles, ShieldCheck } from 'lucide-react';
import { SearchResult } from '../types';
import { AUDIO_OPTIONS, VIDEO_OPTIONS } from '../data/mockData';

interface DownloadOptionsBottomSheetProps {
  item: SearchResult | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (item: SearchResult, format: 'MP3' | 'MP4', quality: string, size: string) => void;
}

export const DownloadOptionsBottomSheet: React.FC<DownloadOptionsBottomSheetProps> = ({
  item,
  isOpen,
  onClose,
  onConfirm
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'audio' | 'video'>('audio');
  const [selectedAudioId, setSelectedAudioId] = useState<string>('mp3_320');
  const [selectedVideoId, setSelectedVideoId] = useState<string>('v_1080');

  if (!isOpen || !item) return null;

  const currentAudioOption = AUDIO_OPTIONS.find((a) => a.id === selectedAudioId) || AUDIO_OPTIONS[1];
  const currentVideoOption = VIDEO_OPTIONS.find((v) => v.id === selectedVideoId) || VIDEO_OPTIONS[3];

  const handleStartDownload = () => {
    if (selectedCategory === 'audio') {
      onConfirm(item, 'MP3', currentAudioOption.bitrate, currentAudioOption.size);
    } else {
      onConfirm(item, 'MP4', currentVideoOption.resolution, currentVideoOption.size);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-4 animate-fadeIn">
      {/* Backdrop overlay */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Bottom Sheet Card */}
      <div className="relative w-full max-w-lg bg-[#161616] border border-[#2A2A2A] rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl z-10 flex flex-col gap-4 max-h-[90vh] overflow-y-auto no-scrollbar">
        {/* Compose Drag Handle */}
        <div className="w-12 h-1.5 bg-gray-600/60 rounded-full mx-auto self-center mb-1" />

        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#00E676] bg-[#00381C] px-2 py-0.5 rounded">
                DJ TUBE DOWNLOADER
              </span>
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00E676]" />
                Modo Seguro
              </span>
            </div>
            <h2 className="text-lg font-bold text-white mt-1.5 line-clamp-1">
              {item.title}
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">{item.artist}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-full bg-[#222] hover:bg-[#333]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Format Selector Tabs (Audio vs Video) */}
        <div className="grid grid-cols-2 gap-2 bg-[#222222] p-1 rounded-xl">
          <button
            onClick={() => setSelectedCategory('audio')}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold transition-all ${
              selectedCategory === 'audio'
                ? 'bg-[#00E676] text-black shadow-md'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            <Music className="w-4 h-4" />
            <span>SECCIÓN DE MÚSICA (MP3)</span>
          </button>
          <button
            onClick={() => setSelectedCategory('video')}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold transition-all ${
              selectedCategory === 'video'
                ? 'bg-[#00E676] text-black shadow-md'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>SECCIÓN DE VIDEO (MP4)</span>
          </button>
        </div>

        {/* Audio Quality Section */}
        {selectedCategory === 'audio' && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs font-bold text-gray-300">
              <span className="text-[#00E676]">Calidades de Audio Disponibles:</span>
              <span className="text-gray-400">Formato Universal MP3</span>
            </div>

            <div className="flex flex-col gap-2.5">
              {AUDIO_OPTIONS.map((opt) => {
                const isSelected = selectedAudioId === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => setSelectedAudioId(opt.id)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#00381C]/50 border-[#00E676] shadow-sm shadow-[#00E676]/20'
                        : 'bg-[#222222] border-[#333333] hover:border-gray-500'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          isSelected ? 'border-[#00E676] bg-[#00E676]' : 'border-gray-500'
                        }`}
                      >
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-black stroke-[3]" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-white">{opt.bitrate} MP3</span>
                          {opt.isHighQuality && (
                            <span className="text-[10px] font-extrabold bg-[#00E676] text-black px-1.5 py-0.2 rounded">
                              RECOMENDADO DJ
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-400">{opt.label}</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-gray-300 bg-[#161616] px-2.5 py-1 rounded-lg border border-[#333]">
                      {opt.size}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Video Quality Section */}
        {selectedCategory === 'video' && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs font-bold text-gray-300">
              <span className="text-[#00E676]">Resoluciones de Video / Películas:</span>
              <span className="text-gray-400">Formato MP4 HD</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {VIDEO_OPTIONS.map((opt) => {
                const isSelected = selectedVideoId === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => setSelectedVideoId(opt.id)}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#00381C]/50 border-[#00E676] shadow-sm shadow-[#00E676]/20'
                        : 'bg-[#222222] border-[#333333] hover:border-gray-500'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-extrabold text-white">{opt.resolution}</span>
                      {opt.isHd && (
                        <span className="text-[9px] font-extrabold bg-[#00E676] text-black px-1 rounded">
                          HD
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-gray-400">{opt.label}</p>
                    <div className="mt-2 text-right">
                      <span className="text-[11px] font-semibold text-[#00E676]">
                        {opt.size}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Start Download Button */}
        <button
          onClick={handleStartDownload}
          className="w-full mt-2 py-3.5 bg-[#00E676] hover:bg-[#00C853] active:scale-[0.99] text-black font-extrabold text-sm rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-[#00E676]/30 transition-all"
        >
          <Download className="w-5 h-5 stroke-[2.5]" />
          <span>
            DESCARGAR EN {selectedCategory === 'audio' ? `${currentAudioOption.bitrate} MP3` : `${currentVideoOption.resolution} MP4`}
          </span>
        </button>
      </div>
    </div>
  );
};
