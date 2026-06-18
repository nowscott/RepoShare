import domtoimage from 'dom-to-image';
import dayjs from 'dayjs';

interface DownloadOptions {
  scale?: number;
  quality?: number;
  format?: 'png' | 'jpeg';
  repoName?: string;
}

export const downloadPreviewImage = async (options: DownloadOptions = {}) => {
  const previewElement = document.querySelector('[data-preview-root="true"]') as HTMLElement | null;
  if (!previewElement) return;

  const { scale = 8, quality = 1, format = 'png', repoName = 'repo' } = options;

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
    const timeCode = String(dayjs().unix()).slice(-6);
    const safeRepoName = repoName.replace(/[^\w.-]+/g, '_') || 'repo';
    link.download = `${safeRepoName}_${timeCode}.${format}`;
    link.href = dataUrl;
    link.click();
    return true;
  } catch (error) {
    console.error('下载图片时出错:', error);
    return false;
  }
};
