import { SearchResult, AudioOption, VideoOption, DownloadItem } from '../types';

export const INITIAL_SEARCH_RESULTS: SearchResult[] = [
  {
    id: '1',
    title: 'Ozuna x Bryant Myers - Caramelo & Remix (DJ TUBE Exclusive Mix 2026)',
    artist: 'Ozuna & Bryant Myers ft. DJ Tube',
    duration: '04:15',
    thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
    views: '2.4M vistas',
    uploaded: 'Hace 2 días',
    type: 'music'
  },
  {
    id: '2',
    title: 'Bryant Myers - Como Panita (Official Video Ultra HD)',
    artist: 'Bryant Myers',
    duration: '03:48',
    thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
    views: '8.1M vistas',
    uploaded: 'Hace 1 semana',
    type: 'video'
  },
  {
    id: '3',
    title: 'Megamix Reggaeton Old School vs New Wave - DJ TUBE Live Set',
    artist: 'DJ Tube Official',
    duration: '45:30',
    thumbnail: 'https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?auto=format&fit=crop&w=600&q=80',
    views: '540K vistas',
    uploaded: 'Hace 3 días',
    type: 'music'
  },
  {
    id: '4',
    title: 'Ozuna - El Farsante (DJ Bass Boosted Club Edit)',
    artist: 'Ozuna',
    duration: '03:55',
    thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80',
    views: '1.2M vistas',
    uploaded: 'Hace 5 días',
    type: 'music'
  },
  {
    id: '5',
    title: 'Electro & Guaracha Neon Party Mix 2026 (Full Concert Video)',
    artist: 'DJ Tube Studio',
    duration: '1:12:00',
    thumbnail: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80',
    views: '3.9M vistas',
    uploaded: 'Hace 2 semanas',
    type: 'video'
  },
  {
    id: '6',
    title: 'Bryant Myers x Trap Latino Classics - Session #04',
    artist: 'Bryant Myers',
    duration: '05:12',
    thumbnail: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=600&q=80',
    views: '970K vistas',
    uploaded: 'Hace 1 mes',
    type: 'music'
  }
];

export const AUDIO_OPTIONS: AudioOption[] = [
  {
    id: 'mp3_128',
    bitrate: '128 kbps',
    format: 'MP3',
    label: 'Baja Calidad (Ahorro de datos)',
    size: '3.8 MB',
    isHighQuality: false
  },
  {
    id: 'mp3_320',
    bitrate: '320 kbps',
    format: 'MP3',
    label: 'Alta Calidad HD (Recomendado DJ)',
    size: '9.4 MB',
    isHighQuality: true
  }
];

export const VIDEO_OPTIONS: VideoOption[] = [
  {
    id: 'v_360',
    resolution: '360p',
    format: 'MP4',
    label: 'Calidad Básica',
    size: '14.2 MB',
    isHd: false
  },
  {
    id: 'v_480',
    resolution: '480p',
    format: 'MP4',
    label: 'Calidad Estándar',
    size: '28.5 MB',
    isHd: false
  },
  {
    id: 'v_720',
    resolution: '720p HD',
    format: 'MP4',
    label: 'Alta Definición HD',
    size: '64.0 MB',
    isHd: true
  },
  {
    id: 'v_1080',
    resolution: '1080p Full HD',
    format: 'MP4',
    label: 'Ultra Definición Full HD',
    size: '145.8 MB',
    isHd: true
  }
];

export const INITIAL_DOWNLOADS: DownloadItem[] = [
  {
    id: 'd1',
    title: 'Ozuna x Bryant Myers - Caramelo Remix (DJ Mix)',
    artist: 'Ozuna ft. Bryant Myers',
    duration: '04:15',
    thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
    quality: '320 kbps',
    format: 'MP3',
    type: 'music',
    fileSize: '9.4 MB',
    progress: 100,
    status: 'completed',
    downloadedAt: 'Ayer, 18:42'
  },
  {
    id: 'd2',
    title: 'Bryant Myers - Como Panita (Video Clip)',
    artist: 'Bryant Myers',
    duration: '03:48',
    thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
    quality: '1080p Full HD',
    format: 'MP4',
    type: 'video',
    fileSize: '145.8 MB',
    progress: 100,
    status: 'completed',
    downloadedAt: 'Hoy, 10:15'
  },
  {
    id: 'd3',
    title: 'Megamix Reggaeton Old School - Live DJ Set',
    artist: 'DJ Tube Official',
    duration: '45:30',
    thumbnail: 'https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?auto=format&fit=crop&w=600&q=80',
    quality: '320 kbps',
    format: 'MP3',
    type: 'music',
    fileSize: '104.2 MB',
    progress: 68,
    status: 'downloading',
    downloadedAt: 'Descargando...'
  }
];
