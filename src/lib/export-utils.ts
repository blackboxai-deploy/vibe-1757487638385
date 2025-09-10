import html2canvas from 'html2canvas';
import { RoomConfig } from '@/types/furniture';

export const exportRoomAsImage = async (
  canvas: HTMLCanvasElement,
  roomConfig: RoomConfig,
  format: 'png' | 'jpeg' = 'png',
  quality: number = 0.9
): Promise<string> => {
  try {
    // Create a high-resolution render of the canvas
    const dataURL = canvas.toDataURL(`image/${format}`, quality);
    return dataURL;
  } catch (error) {
    console.error('Error exporting room image:', error);
    throw new Error('Failed to export room image');
  }
};

export const downloadImage = (dataURL: string, filename: string = 'room-design') => {
  const link = document.createElement('a');
  link.download = `${filename}-${Date.now()}.png`;
  link.href = dataURL;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportRoomConfig = (roomConfig: RoomConfig): string => {
  return JSON.stringify(roomConfig, null, 2);
};

export const importRoomConfig = (jsonString: string): RoomConfig | null => {
  try {
    const config = JSON.parse(jsonString);
    // Basic validation
    if (config.id && config.name && config.dimensions && config.placedFurniture) {
      return config as RoomConfig;
    }
    return null;
  } catch (error) {
    console.error('Error importing room config:', error);
    return null;
  }
};

export const shareRoomConfig = async (roomConfig: RoomConfig): Promise<string> => {
  // Create a shareable URL with room configuration
  const encodedConfig = encodeURIComponent(JSON.stringify(roomConfig));
  const shareUrl = `${window.location.origin}${window.location.pathname}?room=${encodedConfig}`;
  
  if (navigator.share) {
    try {
      await navigator.share({
        title: `Room Design: ${roomConfig.name}`,
        text: 'Check out my room design!',
        url: shareUrl,
      });
      return 'shared';
    } catch (error) {
      console.log('Error sharing:', error);
    }
  }
  
  // Fallback: copy to clipboard
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(shareUrl);
    return shareUrl;
  }
  
  return shareUrl;
};

export const captureRoomScreenshot = async (
  elementId: string,
  options: {
    width?: number;
    height?: number;
    backgroundColor?: string;
    quality?: number;
  } = {}
): Promise<string> => {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Element not found');
  }

  const canvas = await html2canvas(element, {
    width: options.width || 1920,
    height: options.height || 1080,
    backgroundColor: options.backgroundColor || '#ffffff',
    scale: 2, // Higher resolution
    useCORS: true,
    allowTaint: false,
  });

  return canvas.toDataURL('image/png', options.quality || 0.9);
};

// Generate room thumbnails for saved rooms
export const generateRoomThumbnail = async (
  canvas: HTMLCanvasElement,
  maxWidth: number = 300,
  maxHeight: number = 200
): Promise<string> => {
  // Create a smaller thumbnail version
  const thumbnailCanvas = document.createElement('canvas');
  const ctx = thumbnailCanvas.getContext('2d');
  
  if (!ctx) {
    throw new Error('Cannot create canvas context');
  }
  
  // Calculate aspect ratio
  const aspectRatio = canvas.width / canvas.height;
  let thumbnailWidth = maxWidth;
  let thumbnailHeight = maxWidth / aspectRatio;
  
  if (thumbnailHeight > maxHeight) {
    thumbnailHeight = maxHeight;
    thumbnailWidth = maxHeight * aspectRatio;
  }
  
  thumbnailCanvas.width = thumbnailWidth;
  thumbnailCanvas.height = thumbnailHeight;
  
  // Draw scaled version
  ctx.drawImage(canvas, 0, 0, thumbnailWidth, thumbnailHeight);
  
  return thumbnailCanvas.toDataURL('image/jpeg', 0.7);
};

export const validateImageFormat = (format: string): format is 'png' | 'jpeg' | 'webp' => {
  return ['png', 'jpeg', 'webp'].includes(format);
};

export const getOptimalImageFormat = (): 'png' | 'jpeg' | 'webp' => {
  // Check browser support for modern formats
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  
  if (canvas.toDataURL('image/webp').includes('data:image/webp')) {
    return 'webp';
  }
  
  return 'png'; // Fallback to PNG for quality
};