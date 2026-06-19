import { useLayoutEffect, useRef, useState } from 'react';
import Preview from '../Preview';
import { canvasSizes } from '../../lib/design';
import { ContentSettings, CanvasLayout } from '../../types/editor';
import { RepoData } from '../../utils/github';

interface CanvasStageProps extends RepoData, ContentSettings {
  selectedTemplate: string;
  layout: CanvasLayout;
}

const FRAME_PADDING = 12;

const CanvasStage: React.FC<CanvasStageProps> = ({ selectedTemplate, layout, ...previewProps }) => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const canvas = canvasSizes[layout];
  const framedWidth = canvas.width + FRAME_PADDING * 2;
  const framedHeight = canvas.height + FRAME_PADDING * 2;

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const updateScale = () => {
      const availableWidth = Math.max(0, viewport.clientWidth - 32);
      const availableHeight = Math.max(0, viewport.clientHeight - 32);
      setScale(Math.min(1, availableWidth / framedWidth, availableHeight / framedHeight));
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [framedHeight, framedWidth]);

  return (
    <main
      className="canvas-stage-atmosphere relative isolate flex h-full w-full min-w-0 items-center justify-center overflow-hidden px-[var(--rs-canvas-padding-regular)] pt-[104px] pb-[116px] min-[1400px]:px-[var(--rs-canvas-padding-wide)] max-md:px-3 max-md:pt-[88px] max-md:pb-[calc(var(--rs-dock-height-compact)+48px+env(safe-area-inset-bottom))]"
      ref={viewportRef}
    >
      <div
        className="relative shrink-0"
        style={{ width: framedWidth * scale, height: framedHeight * scale }}
      >
        <div
          className="absolute top-0 left-0 [transform-origin:top_left]"
          style={{
            width: framedWidth,
            height: framedHeight,
            transform: `scale(${scale})`,
          }}
        >
          <div
            className="absolute top-3 left-3 overflow-hidden rounded-[26px] bg-white shadow-[var(--rs-shadow-preview)] [clip-path:inset(0_round_26px)] [transform:translateZ(0)]"
            data-preview-root="true"
            style={{ width: canvas.width, height: canvas.height }}
          >
            <Preview selectedTemplate={selectedTemplate} layout={layout} {...previewProps} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default CanvasStage;
