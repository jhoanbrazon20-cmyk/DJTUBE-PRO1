import React, { useState } from 'react';
import { Search, Download, X, Music, Video, Sparkles, Link as LinkIcon, Play } from 'lucide-react';
import { SearchResult } from '../types';

interface MainScreenProps {
  searchResults: SearchResult[];
  onDownloadClick: (item: SearchResult) => void;
  onPlayItem: (item: SearchResult) => void;
}

export const MainScreen: React.FC<MainScreenProps> = ({
  searchResults,
  onDownloadClick,
  onPlayItem,
}) => {
  const [query, setQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('Todos');

  const tags = ['Todos', 'Ozuna', 'Bryant Myers', 'Mezclas DJ 2026', 'Trap Latino', 'Electro Guaracha'];

  const filteredResults = searchResults.filter((item) => {
    const matchesTag =
      selectedTag === 'Todos' ||
      item.artist.toLowerCase().includes(selectedTag.toLowerCase()) ||
      item.title.toLowerCase().includes(selectedTag.toLowerCase());

    const matchesQuery =
      query.trim() === '' ||
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.artist.toLowerCase().includes(query.toLowerCase());

    return matchesTag && matchesQuery;
  });

  const isUrl = query.startsWith('http://') || query.startsWith('https://');

  return (
    <div className="flex flex-col gap-4 pb-20">
      {/* Top Header / App Brand */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-[#00E676] flex items-center justify-center text-black font-extrabold shadow-lg shadow-[#00E676]/20">
            <Music className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-white tracking-wide">
              DJ TUBE
            </h1>
            <p className="text-[11px] text-gray-400 font-medium">
              Buscador y Descargador de Música & Videos
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-[#1E1E1E] px-2.5 py-1 rounded-full border border-[#2A2A2A]">
          <span className="w-2 h-2 rounded-full bg-[#00E676] animate-pulse"></span>
          <span className="text-[10px] font-bold text-gray-300">Modo Oscuro v2.4</span>
        </div>
      </div>

      {/* Main Search Bar (Accepts URLs and Artist Names) */}
      <div className="relative flex flex-col gap-1.5">
        <div className="relative flex items-center">
          <div className="absolute left-3.5 text-[#00E676]">
            {isUrl ? <LinkIcon className="w-5 h-5" /> : <Search className="w-5 h-5" />}
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pega un enlace (URL) o busca artistas (ej: Ozuna, Bryant Myers...)"
            className="w-full pl-11 pr-10 py-3.5 bg-[#1E1E1E] text-white placeholder-gray-400 text-sm rounded-2xl border border-[#2A2A2A] focus:border-[#00E676] focus:ring-1 focus:ring-[#00E676] outline-none transition-all shadow-inner"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {isUrl && (
          <div className="flex items-center gap-1.5 px-3 py-1 bg-[#00381C]/60 rounded-lg border border-[#00E676]/30 text-[#00E676] text-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Enlace detectado. Listo para extraer audio MP3 o video MP4.</span>
          </div>
        )}
      </div>

      {/* Quick Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
              selectedTag === tag
                ? 'bg-[#00E676] text-black border-[#00E676] shadow-md shadow-[#00E676]/20'
                : 'bg-[#1E1E1E] text-gray-300 border-[#2A2A2A] hover:border-gray-500'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Search Results List */}
      <div className="flex flex-col gap-3 mt-1">
        <div className="flex items-center justify-between text-xs text-gray-400 px-1">
          <span>
            {filteredResults.length} resultados encontrados
          </span>
          <span className="text-gray-500">Formato MP3 / MP4</span>
        </div>

        {filteredResults.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center bg-[#1E1E1E]/50 rounded-2xl border border-dashed border-[#2A2A2A] p-6">
            <Search className="w-12 h-12 text-gray-600 mb-2" />
            <p className="text-gray-300 font-semibold text-sm">No se encontraron resultados</p>
            <p className="text-gray-500 text-xs max-w-xs mt-1">
              Prueba buscando nombres de artistas como "Ozuna", "Bryant Myers" o pega la URL del video.
            </p>
          </div>
        ) : (
          filteredResults.map((item) => (
            <div
              key={item.id}
              className="group bg-[#1E1E1E] hover:bg-[#252525] p-3 rounded-2xl border border-[#2A2A2A] hover:border-[#00E676]/40 transition-all flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between"
            >
              <div
                className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer group/card"
                onClick={() => onPlayItem(item)}
                title="Toca para escuchar vista previa en vivo"
              >
                {/* Thumbnail with duration badge & play preview button overlay */}
                <div className="relative w-28 h-20 rounded-xl overflow-hidden bg-black flex-shrink-0 group-hover/card:scale-105 transition-transform duration-300">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover/card:bg-black/20 transition-colors flex items-center justify-center">
                    <div className="w-9 h-9 rounded-full bg-[#00E676] text-black flex items-center justify-center shadow-lg shadow-[#00E676]/40 group-hover/card:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-black ml-0.5" />
                    </div>
                  </div>
                  <span className="absolute bottom-1 right-1 bg-black/85 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                    {item.duration}
                  </span>
                  <span className="absolute top-1 left-1 bg-black/75 text-[#00E676] p-1 rounded-md">
                    {item.type === 'video' ? (
                      <Video className="w-3 h-3" />
                    ) : (
                      <Music className="w-3 h-3" />
                    )}
                  </span>
                </div>

                {/* Details */}
                <div className="flex flex-col min-w-0 pr-1">
                  <h3 className="text-sm font-semibold text-white line-clamp-2 leading-snug group-hover/card:text-[#00E676] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5 truncate">
                    {item.artist}
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-[11px] text-gray-500 flex-wrap">
                    <span className="text-[#00E676] font-bold text-[10px] bg-[#00381C] px-1.5 py-0.5 rounded border border-[#00E676]/30 flex items-center gap-1">
                      <Play className="w-2.5 h-2.5 fill-[#00E676]" />
                      Escuchar vista previa
                    </span>
                    <span>•</span>
                    <span>{item.views}</span>
                  </div>
                </div>
              </div>

              {/* Download Action Button */}
              <button
                onClick={() => onDownloadClick(item)}
                className="w-full sm:w-auto px-4 py-2.5 bg-[#00E676] hover:bg-[#00C853] active:scale-95 text-black font-extrabold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md shadow-[#00E676]/20 flex-shrink-0"
              >
                <Download className="w-4 h-4 stroke-[2.5]" />
                <span>Descargar</span>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
