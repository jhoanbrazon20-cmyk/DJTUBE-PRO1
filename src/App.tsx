import React, { useState } from 'react';
import { MainScreen } from './components/MainScreen';
import { DownloadOptionsBottomSheet } from './components/DownloadOptionsBottomSheet';
import { DownloadsScreen } from './components/DownloadsScreen';
import { MediaPlayerScreen } from './components/MediaPlayerScreen';
import { CodeViewer } from './components/CodeViewer';
import { Navigation } from './components/Navigation';
import { INITIAL_SEARCH_RESULTS, INITIAL_DOWNLOADS } from './data/mockData';
import { SearchResult, DownloadItem, ActiveTab } from './types';
import { Music, Play, Pause, Smartphone, Monitor } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('main');
  const [searchResults] = useState<SearchResult[]>(INITIAL_SEARCH_RESULTS);
  const [downloads, setDownloads] = useState<DownloadItem[]>(INITIAL_DOWNLOADS);

  // Bottom sheet state
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  // Media Player state
  const [playingItem, setPlayingItem] = useState<DownloadItem | SearchResult | null>(
    INITIAL_DOWNLOADS[0]
  );
  const [isPlaying, setIsPlaying] = useState(false);

  // Layout mode (Mobile device container vs Expanded desktop view)
  const [isMobileFrame, setIsMobileFrame] = useState(true);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleOpenDownloadSheet = (item: SearchResult) => {
    setSelectedResult(item);
    setIsBottomSheetOpen(true);
  };

  const handleConfirmDownload = (
    item: SearchResult,
    format: 'MP3' | 'MP4',
    quality: string,
    size: string
  ) => {
    setIsBottomSheetOpen(false);

    const newDownload: DownloadItem = {
      id: `d_${Date.now()}`,
      title: item.title,
      artist: item.artist,
      duration: item.duration,
      thumbnail: item.thumbnail,
      quality,
      format,
      type: format === 'MP3' ? 'music' : 'video',
      fileSize: size,
      progress: 0,
      status: 'downloading',
      downloadedAt: 'Descargando...',
    };

    setDownloads((prev) => [newDownload, ...prev]);
    showToast(`¡Descarga iniciada! (${format} - ${quality})`);
    setActiveTab('downloads');

    // Simulate download progress
    let currentProg = 0;
    const interval = setInterval(() => {
      currentProg += 20;
      setDownloads((prev) =>
        prev.map((d) =>
          d.id === newDownload.id
            ? {
                ...d,
                progress: Math.min(100, currentProg),
                status: currentProg >= 100 ? 'completed' : 'downloading',
                downloadedAt: currentProg >= 100 ? 'Hace un momento' : 'Descargando...',
              }
            : d
        )
      );

      if (currentProg >= 100) {
        clearInterval(interval);
        showToast(`¡Descarga completada! ${item.title}`);
      }
    }, 800);
  };

  const handleDeleteDownload = (id: string) => {
    setDownloads((prev) => prev.filter((item) => item.id !== id));
    showToast('Archivo eliminado de la biblioteca');
  };

  const handleShareDownload = (item: DownloadItem) => {
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: `Escucha ${item.title} en DJ TUBE`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      showToast(`Enlace copiado: ${item.title}`);
    }
  };

  const handlePlayItem = (item: DownloadItem | SearchResult) => {
    setPlayingItem(item);
    setIsPlaying(true);
    setActiveTab('player');
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col items-center justify-between font-sans selection:bg-[#00E676] selection:text-black">
      {/* Top Banner Control Bar (Device Frame & Mode Toggle) */}
      <header className="w-full bg-[#121212] border-b border-[#262626] px-4 py-2 flex items-center justify-between z-30">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#00E676] text-black font-extrabold flex items-center justify-center text-xs">
            DJ
          </div>
          <span className="font-extrabold tracking-wider text-sm text-white">
            DJ TUBE <span className="text-[#00E676] font-mono text-xs">Android Jetpack Compose UI</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMobileFrame(!isMobileFrame)}
            className="flex items-center gap-1.5 px-3 py-1 bg-[#1E1E1E] hover:bg-[#2A2A2A] rounded-lg border border-[#2A2A2A] text-xs font-semibold text-gray-300 transition-all"
          >
            {isMobileFrame ? (
              <>
                <Monitor className="w-3.5 h-3.5 text-[#00E676]" />
                <span className="hidden sm:inline">Vista Extendida</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-[#00E676]" />
                <span className="hidden sm:inline">Marco Móvil</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Content Stage */}
      <main
        className={`w-full flex-1 flex flex-col transition-all duration-300 ${
          isMobileFrame
            ? 'max-w-md my-0 sm:my-4 sm:rounded-3xl sm:border-4 sm:border-[#262626] sm:shadow-2xl overflow-hidden bg-[#121212]'
            : 'max-w-4xl px-4 py-4 bg-[#121212]'
        }`}
      >
        <div className="flex-1 p-4 overflow-y-auto no-scrollbar">
          {activeTab === 'main' && (
            <MainScreen
              searchResults={searchResults}
              onDownloadClick={handleOpenDownloadSheet}
              onPlayItem={handlePlayItem}
            />
          )}

          {activeTab === 'downloads' && (
            <DownloadsScreen
              downloads={downloads}
              onPlayItem={handlePlayItem}
              onDeleteItem={handleDeleteDownload}
              onShareItem={handleShareDownload}
            />
          )}

          {activeTab === 'player' && (
            <MediaPlayerScreen
              currentItem={playingItem}
              isPlaying={isPlaying}
              onPlayPauseToggle={() => setIsPlaying(!isPlaying)}
            />
          )}

          {activeTab === 'code' && <CodeViewer />}
        </div>

        {/* Floating Mini Player (visible on other tabs when playing) */}
        {playingItem && activeTab !== 'player' && (
          <div
            onClick={() => setActiveTab('player')}
            className="bg-[#1E1E1E] border-t border-[#00E676]/30 px-4 py-2.5 flex items-center justify-between cursor-pointer hover:bg-[#252525] transition-all"
          >
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={playingItem.thumbnail}
                alt={playingItem.title}
                className="w-10 h-10 rounded-lg object-cover bg-black flex-shrink-0"
              />
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate">
                  {playingItem.title}
                </p>
                <p className="text-[11px] text-[#00E676] truncate font-semibold">
                  {playingItem.artist}
                </p>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsPlaying(!isPlaying);
              }}
              className="w-9 h-9 rounded-full bg-[#00E676] text-black flex items-center justify-center flex-shrink-0 shadow-md"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-black" />
              ) : (
                <Play className="w-5 h-5 fill-black ml-0.5" />
              )}
            </button>
          </div>
        )}

        {/* Android Style Bottom Navigation Bar */}
        <Navigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
          downloadCount={downloads.length}
        />
      </main>

      {/* Download Options Bottom Sheet */}
      <DownloadOptionsBottomSheet
        item={selectedResult}
        isOpen={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
        onConfirm={handleConfirmDownload}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 bg-[#00E676] text-black text-xs font-extrabold px-4 py-2.5 rounded-full shadow-2xl z-50 flex items-center gap-2 border border-black/10 animate-bounce">
          <Music className="w-4 h-4 fill-black" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
