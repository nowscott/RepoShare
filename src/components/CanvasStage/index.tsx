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
    <main className="canvas-stage" ref={viewportRef}>
      <div
        className="canvas-stage__scaled-frame"
        style={{ width: framedWidth * scale, height: framedHeight * scale }}
      >
        <div
          className="canvas-stage__frame"
          style={{
            width: framedWidth,
            height: framedHeight,
            transform: `scale(${scale})`,
          }}
        >
          <div
            className="canvas-stage__preview"
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
