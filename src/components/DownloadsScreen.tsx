import React, { useState } from 'react';
import { FolderDown, Play, Share2, Trash2, Music, Video, HardDrive, CheckCircle2, Pause } from 'lucide-react';
import { DownloadItem } from '../types';

interface DownloadsScreenProps {
  downloads: DownloadItem[];
  onPlayItem: (item: DownloadItem) => void;
  onDeleteItem: (id: string) => void;
  onShareItem: (item: DownloadItem) => void;
}

export const DownloadsScreen: React.FC<DownloadsScreenProps> = ({
  downloads,
  onPlayItem,
  onDeleteItem,
  onShareItem,
}) => {
  const [filter, setFilter] = useState<'all' | 'music' | 'video'>('all');

  const filtered = downloads.filter((item) => {
    if (filter === 'music') return item.type === 'music';
    if (filter === 'video') return item.type === 'video';
    return true;
  });

  const totalSize = downloads.reduce((acc, curr) => {
    const sizeNum = parseFloat(curr.fileSize) || 0;
    return acc + sizeNum;
  }, 0);

  return (
    <div className="flex flex-col gap-4 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-[#00E676] flex items-center justify-center text-black font-extrabold shadow-lg shadow-[#00E676]/20">
            <FolderDown className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-white tracking-wide">
              Mis Descargas
            </h1>
            <p className="text-[11px] text-gray-400 font-medium">
              Canciones y Videos listos fuera de línea
            </p>
          </div>
        </div>

        {/* Total Usage Badge */}
        <div className="flex items-center gap-1.5 bg-[#1E1E1E] px-3 py-1.5 rounded-xl border border-[#2A2A2A] text-xs">
          <HardDrive className="w-3.5 h-3.5 text-[#00E676]" />
          <span className="text-gray-300 font-bold">{totalSize.toFixed(1)} MB</span>
        </div>
      </div>

      {/* Tabs Filter (Todas / Música / Videos) */}
      <div className="flex items-center gap-2 bg-[#1E1E1E] p-1 rounded-xl border border-[#2A2A2A]">
        <button
          onClick={() => setFilter('all')}
          className={`flex-1 py-2 text-xs font-extrabold rounded-lg transition-all ${
            filter === 'all'
              ? 'bg-[#00E676] text-black shadow-md'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Todas ({downloads.length})
        </button>
        <button
          onClick={() => setFilter('music')}
          className={`flex-1 py-2 text-xs font-extrabold rounded-lg transition-all flex items-center justify-center gap-1 ${
            filter === 'music'
              ? 'bg-[#00E676] text-black shadow-md'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Music className="w-3.5 h-3.5" />
          <span>Música ({downloads.filter((d) => d.type === 'music').length})</span>
        </button>
        <button
          onClick={() => setFilter('video')}
          className={`flex-1 py-2 text-xs font-extrabold rounded-lg transition-all flex items-center justify-center gap-1 ${
            filter === 'video'
              ? 'bg-[#00E676] text-black shadow-md'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Video className="w-3.5 h-3.5" />
          <span>Videos ({downloads.filter((d) => d.type === 'video').length})</span>
        </button>
      </div>

      {/* Download Items List */}
      <div className="flex flex-col gap-3">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center bg-[#1E1E1E]/50 rounded-2xl border border-dashed border-[#2A2A2A] p-6">
            <FolderDown className="w-12 h-12 text-gray-600 mb-2" />
            <p className="text-gray-300 font-semibold text-sm">No hay descargas en esta categoría</p>
            <p className="text-gray-500 text-xs max-w-xs mt-1">
              Busca tus canciones o videos favoritos y haz clic en "Descargar".
            </p>
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className="bg-[#1E1E1E] p-3.5 rounded-2xl border border-[#2A2A2A] hover:border-[#3A3A3A] transition-all flex flex-col gap-3"
            >
              <div className="flex items-center gap-3">
                {/* Thumbnail */}
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-black flex-shrink-0">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-1 left-1 bg-black/80 text-[#00E676] p-0.5 rounded">
                    {item.type === 'video' ? (
                      <Video className="w-3 h-3" />
                    ) : (
                      <Music className="w-3 h-3" />
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-white truncate">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-400 truncate mt-0.5">{item.artist}</p>

                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-extrabold text-[#00E676] bg-[#00381C] px-2 py-0.5 rounded border border-[#00E676]/30">
                      {item.format} • {item.quality}
                    </span>
                    <span className="text-[11px] text-gray-400 font-medium">
                      {item.fileSize}
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress Bar or Action Bar */}
              {item.status === 'downloading' ? (
                <div className="flex flex-col gap-1.5 pt-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#00E676] font-semibold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-[#00E676] animate-ping" />
                      Descargando archivo...
                    </span>
                    <span className="text-white font-bold">{item.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-[#2A2A2A] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#00E676] transition-all duration-300 rounded-full"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between pt-2 border-t border-[#2A2A2A]">
                  <span className="text-[10px] text-gray-500 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-[#00E676]" />
                    {item.downloadedAt}
                  </span>

                  {/* Buttons for Play, Share, Delete */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onShareItem(item)}
                      title="Compartir"
                      className="p-2 text-gray-400 hover:text-white bg-[#262626] hover:bg-[#333333] rounded-xl transition-all"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteItem(item.id)}
                      title="Eliminar"
                      className="p-2 text-red-400 hover:text-red-300 bg-[#262626] hover:bg-red-950/40 rounded-xl transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onPlayItem(item)}
                      className="px-3.5 py-1.5 bg-[#00E676] hover:bg-[#00C853] text-black font-extrabold text-xs rounded-xl flex items-center gap-1 shadow-md transition-all ml-1"
                    >
                      <Play className="w-3.5 h-3.5 fill-black" />
                      <span>Reproducir</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
