import { Download, Frame, LayoutTemplate, SlidersHorizontal } from 'lucide-react';
import { GlassSurface } from '../ui/glass-surface';
import { cn } from '../../lib/utils';
import { EditorTool } from '../../types/editor';

interface MobileToolbarProps {
  activeTool: EditorTool | null;
  onToolChange: (tool: EditorTool) => void;
  onDownload: () => void;
  isDownloading: boolean;
}

const MobileToolbar: React.FC<MobileToolbarProps> = ({ activeTool, onToolChange, onDownload, isDownloading }) => (
  <GlassSurface as="nav" className="mobile-toolbar" aria-label="移动端编辑工具">
    <button
      type="button"
      className={cn('mobile-toolbar__button', activeTool === 'templates' && 'is-active')}
      onClick={() => onToolChange('templates')}
      aria-pressed={activeTool === 'templates'}
    >
      <LayoutTemplate />
      <span>模板</span>
    </button>
    <button
      type="button"
      className={cn('mobile-toolbar__button', activeTool === 'content' && 'is-active')}
      onClick={() => onToolChange('content')}
      aria-pressed={activeTool === 'content'}
    >
      <SlidersHorizontal />
      <span>内容</span>
    </button>
    <button
      type="button"
      className={cn('mobile-toolbar__button', activeTool === 'canvas' && 'is-active')}
      onClick={() => onToolChange('canvas')}
      aria-pressed={activeTool === 'canvas'}
    >
      <Frame />
      <span>画布</span>
    </button>
    <button type="button" className="mobile-toolbar__button is-primary" onClick={onDownload} disabled={isDownloading}>
      <Download />
      <span>{isDownloading ? '渲染中' : '下载'}</span>
    </button>
  </GlassSurface>
);

export default MobileToolbar;
