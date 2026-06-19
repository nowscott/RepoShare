import { GalleryHorizontalEnd, ImageDown, LayoutPanelTop, LoaderCircle, SlidersHorizontal } from 'lucide-react';
import { forwardRef } from 'react';
import { GlassSurface } from '../ui/glass-surface';
import { cn } from '../../lib/utils';
import { EditorTool } from '../../types/editor';

interface WorkspaceDockProps {
  activeTool: EditorTool | null;
  onToolChange: (tool: EditorTool) => void;
  onDownload: () => void;
  isDownloading: boolean;
  onTriggerRef: (tool: EditorTool, node: HTMLButtonElement | null) => void;
}

const tools = [
  { id: 'templates' as const, label: '模板', icon: GalleryHorizontalEnd },
  { id: 'content' as const, label: '内容', icon: SlidersHorizontal },
  { id: 'canvas' as const, label: '画布', icon: LayoutPanelTop },
];

const WorkspaceDock = forwardRef<HTMLDivElement, WorkspaceDockProps>(({
  activeTool,
  onToolChange,
  onDownload,
  isDownloading,
  onTriggerRef,
}, ref) => (
  <div
    ref={ref}
    className="fixed bottom-[calc(16px+env(safe-area-inset-bottom))] left-1/2 z-[var(--rs-z-command-bar)] -translate-x-1/2 max-md:right-2 max-md:bottom-[calc(8px+env(safe-area-inset-bottom))] max-md:left-2 max-md:translate-x-0"
  >
    <GlassSurface
      as="nav"
      strength="vivid"
      className="h-[var(--rs-dock-height)] min-w-[366px] rounded-full shadow-[var(--rs-shadow-glass)]! [&>div:last-child]:flex [&>div:last-child]:h-full [&>div:last-child]:items-center [&>div:last-child]:gap-1.5 [&>div:last-child]:p-1.5 max-md:h-[var(--rs-dock-height-compact)] max-md:w-full max-md:min-w-0 max-md:[&>div:last-child]:grid max-md:[&>div:last-child]:grid-cols-[minmax(0,3fr)_1px_minmax(64px,1fr)] max-md:[&>div:last-child]:gap-1 max-md:[&>div:last-child]:p-1"
      aria-label="编辑与导出"
    >
      <div className="flex h-full items-center gap-0.5 max-md:grid max-md:grid-cols-3 max-md:gap-0">
        {tools.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            ref={(node) => onTriggerRef(id, node)}
            type="button"
            className={cn(
              'relative flex h-full min-w-[76px] cursor-pointer flex-col items-center justify-center gap-0.5 rounded-full border border-transparent bg-transparent text-xs leading-4 text-[var(--rs-color-text-secondary)] transition-[transform,background,color] duration-[var(--rs-duration-standard)] [transition-timing-function:cubic-bezier(.2,.9,.2,1.25)] hover:-translate-y-0.5 hover:bg-[color-mix(in_srgb,var(--rs-color-surface-hover)_68%,transparent)] hover:text-[var(--rs-color-text)] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rs-color-focus)] [&_svg]:size-5 max-md:min-w-0 max-[420px]:text-[11px] max-[420px]:[&_svg]:size-[19px]',
              activeTool === id && 'border-[color-mix(in_srgb,var(--rs-color-accent)_32%,var(--rs-glass-border))] bg-[linear-gradient(145deg,color-mix(in_srgb,var(--rs-color-surface)_72%,transparent),color-mix(in_srgb,var(--rs-glass-accent)_48%,transparent))] text-[var(--rs-color-accent-selected)] shadow-[inset_0_1px_0_var(--rs-glass-highlight),0_8px_20px_color-mix(in_srgb,var(--rs-glass-accent)_46%,transparent)]',
            )}
            onClick={() => onToolChange(id)}
            aria-pressed={activeTool === id}
            aria-expanded={activeTool === id}
            aria-controls={activeTool === id ? 'workspace-inspector' : undefined}
          >
            <Icon />
            <span>{label}</span>
          </button>
        ))}
      </div>
      <span className="mx-0.5 h-9 w-px bg-[var(--rs-color-border)] max-md:m-0 max-md:h-[34px]" aria-hidden="true" />
      <button
        type="button"
        className="flex h-full min-w-[98px] cursor-pointer flex-col items-center justify-center gap-0.5 rounded-full border border-[color-mix(in_srgb,var(--rs-color-accent)_34%,transparent)] bg-[linear-gradient(145deg,color-mix(in_srgb,#8da0ff_82%,transparent),color-mix(in_srgb,var(--rs-color-accent-active)_88%,transparent))] text-xs leading-4 text-white shadow-[inset_0_1px_0_rgba(255,255,255,.5),0_10px_24px_rgba(65,105,225,.3)] transition-[transform,filter] duration-200 hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rs-color-focus)] disabled:cursor-wait disabled:opacity-70 [&_svg]:size-5 max-md:min-w-0 max-[420px]:text-[11px] max-[420px]:[&_svg]:size-[19px]"
        onClick={onDownload}
        disabled={isDownloading}
      >
        {isDownloading ? <LoaderCircle className="animate-spin" /> : <ImageDown />}
        <span>{isDownloading ? '渲染中' : '下载'}</span>
      </button>
    </GlassSurface>
  </div>
));

WorkspaceDock.displayName = 'WorkspaceDock';

export default WorkspaceDock;
