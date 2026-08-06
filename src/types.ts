export type ContentType = 'music' | 'video';

export interface SearchResult {
  id: string;
  title: string;
  artist: string;
  duration: string;
  thumbnail: string;
  views: string;
  uploaded: string;
  type: ContentType;
}

export interface AudioOption {
  id: string;
  bitrate: string; // e.g. "128 kbps", "320 kbps"
  format: 'MP3';
  label: string;
  size: string;
  isHighQuality?: boolean;
}

export interface VideoOption {
  id: string;
  resolution: string; // e.g. "360p", "480p", "720p HD", "1080p Full HD"
  format: 'MP4';
  label: string;
  size: string;
  isHd?: boolean;
}

export interface DownloadItem {
  id: string;
  title: string;
  artist: string;
  duration: string;
  thumbnail: string;
  quality: string;
  format: string;
  type: ContentType;
  fileSize: string;
  progress: number; // 0 to 100
  status: 'downloading' | 'completed' | 'paused' | 'error';
  downloadedAt: string;
}

export type ActiveTab = 'main' | 'downloads' | 'player' | 'code';

export interface KotlinFile {
  id: string;
  filename: string;
  description: string;
  code: string;
}
