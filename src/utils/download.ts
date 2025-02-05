
import domtoimage from 'dom-to-image';

interface DownloadOptions {
  scale?: number;
  quality?: number;
}

export const downloadPreviewImage = async (options: DownloadOptions = {}) => {
  const previewElement = document.querySelector('.app-content > div') as HTMLElement;
  if (!previewElement) return;

  const { scale = 8, quality = 1 } = options;

  try {    
    const dataUrl = await domtoimage.toPng(previewElement, {
      height: previewElement.offsetHeight * scale,
      width: previewElement.offsetWidth * scale,
      style: {
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        width: `${previewElement.offsetWidth}px`,
        height: `${previewElement.offsetHeight}px`
      },
      quality
    });

    const link = document.createElement('a');
    const repoName = document.querySelector('.app-content')?.querySelector('h1')?.textContent || 'repo';
    link.download = `${repoName}.png`;
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error('下载图片时出错:', error);
    throw error;
  }
};