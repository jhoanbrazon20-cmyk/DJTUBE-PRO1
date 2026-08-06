import React from 'react';
import { Search, FolderDown, Music, Code } from 'lucide-react';
import { ActiveTab } from '../types';

interface NavigationProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  downloadCount: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onTabChange,
  downloadCount
}) => {
  return (
    <div className="bg-[#121212] border-t border-[#262626] px-4 py-2 flex justify-around items-center sticky bottom-0 z-40">
      <button
        onClick={() => onTabChange('main')}
        className={`flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl transition-all ${
          activeTab === 'main'
            ? 'text-[#00E676] bg-[#00381C]/40 font-bold'
            : 'text-gray-400 hover:text-gray-200'
        }`}
      >
        <Search className="w-5 h-5" />
        <span className="text-[11px]">Buscar</span>
      </button>

      <button
        onClick={() => onTabChange('downloads')}
        className={`relative flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl transition-all ${
          activeTab === 'downloads'
            ? 'text-[#00E676] bg-[#00381C]/40 font-bold'
            : 'text-gray-400 hover:text-gray-200'
        }`}
      >
        <FolderDown className="w-5 h-5" />
        <span className="text-[11px]">Descargas</span>
        {downloadCount > 0 && (
          <span className="absolute -top-1 right-3 bg-[#00E676] text-black text-[10px] font-extrabold px-1.5 py-0.2 rounded-full shadow-lg">
            {downloadCount}
          </span>
        )}
      </button>

      <button
        onClick={() => onTabChange('player')}
        className={`flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl transition-all ${
          activeTab === 'player'
            ? 'text-[#00E676] bg-[#00381C]/40 font-bold'
            : 'text-gray-400 hover:text-gray-200'
        }`}
      >
        <Music className="w-5 h-5" />
        <span className="text-[11px]">Reproductor</span>
      </button>

      <button
        onClick={() => onTabChange('code')}
        className={`flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl transition-all ${
          activeTab === 'code'
            ? 'text-[#00E676] bg-[#00381C]/40 font-bold'
            : 'text-gray-400 hover:text-gray-200'
        }`}
      >
        <Code className="w-5 h-5" />
        <span className="text-[11px]">Código Kotlin</span>
      </button>
    </div>
  );
};
