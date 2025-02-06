import domtoimage from 'dom-to-image';
import dayjs from 'dayjs';

interface DownloadOptions {
  scale?: number;
  quality?: number;
  format?: 'png' | 'jpeg';
}

export const downloadPreviewImage = async (options: DownloadOptions = {}) => {
  const previewElement = document.querySelector('.app-content > div') as HTMLElement;
  if (!previewElement) return;

  const { scale = 8, quality = 1, format = 'png' } = options;

  try {
    const config = {
      height: previewElement.offsetHeight * scale,
      width: previewElement.offsetWidth * scale,
      style: {
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        width: `${previewElement.offsetWidth}px`,
        height: `${previewElement.offsetHeight}px`
      },
      quality
    };

    let dataUrl: string;
    if (format === 'jpeg') {
      dataUrl = await domtoimage.toJpeg(previewElement, config);
    } else {
      dataUrl = await domtoimage.toPng(previewElement, config);
    }

    const link = document.createElement('a');
    const repoName = document.querySelector('.app-content')?.querySelector('h1')?.textContent || 'repo';
    const timeCode = String(dayjs().unix()).slice(-6);
    link.download = `${repoName}_${timeCode}.${format}`;
    link.href = dataUrl;
    link.click();
    return true;
  } catch (error) {
    console.error('下载图片时出错:', error);
    return false;
  }
};