import { X } from 'lucide-react';
import { forwardRef } from 'react';
import { Button } from '../ui/button';
import { GlassSurface } from '../ui/glass-surface';
import Sidebar from '../Sidebar';
import ControlPanel from '../ControlPanel';
import { CanvasLayout, ContentSettings, EditorTool, ExportFormat, Resolution } from '../../types/editor';

interface InspectorProps {
  activeTool: EditorTool;
  selectedTemplate: string;
  onTemplateSelect: (templateId: string) => void;
  contentSettings: ContentSettings;
  onContentChange: (key: keyof ContentSettings, value: boolean) => void;
  selectedResolution: Resolution;
  selectedFormat: ExportFormat;
  selectedLayout: CanvasLayout;
  onResolutionChange: (resolution: Resolution) => void;
  onFormatChange: (format: ExportFormat) => void;
  onLayoutChange: (layout: CanvasLayout) => void;
  supportsAuthorAvatar: boolean;
  onClose: () => void;
}

const toolTitles: Record<EditorTool, string> = {
  templates: '选择模板',
  content: '显示内容',
  canvas: '画布与导出',
};

const Inspector = forwardRef<HTMLDivElement, InspectorProps>(({
  activeTool,
  selectedTemplate,
  onTemplateSelect,
  contentSettings,
  onContentChange,
  selectedResolution,
  selectedFormat,
  selectedLayout,
  onResolutionChange,
  onFormatChange,
  onLayoutChange,
  supportsAuthorAvatar,
  onClose,
}, ref) => (
  <div
    ref={ref}
    id="workspace-inspector"
    className={`inspector-anchor inspector-anchor--${activeTool} fixed bottom-[calc(var(--rs-dock-height)+24px+env(safe-area-inset-bottom))] left-1/2 z-[var(--rs-z-sheet)] max-h-[min(620px,calc(100dvh-208px))] w-[var(--rs-inspector-width)] -translate-x-1/2 origin-bottom max-md:right-3 max-md:bottom-[calc(var(--rs-dock-height-compact)+20px+env(safe-area-inset-bottom))] max-md:left-3 max-md:max-h-[min(var(--rs-sheet-max-height),calc(100dvh-176px))] max-md:w-auto max-md:translate-x-0`}
  >
    <GlassSurface
      as="aside"
      strength="standard"
      className="inspector inspector-liquid-panel max-h-[inherit] w-full rounded-[40px] shadow-[var(--rs-shadow-overlay)]! [&>div:last-child]:flex [&>div:last-child]:max-h-[inherit] [&>div:last-child]:flex-col max-md:rounded-[36px]"
      aria-label={toolTitles[activeTool]}
    >
      <div className="inspector__reading-header flex min-h-[80px] items-center justify-between gap-2 border-b border-[color-mix(in_srgb,var(--rs-color-border)_72%,transparent)] px-5 pt-4 pb-3">
        <div>
          <span className="inspector__eyebrow block text-[10px] leading-[14px] font-semibold uppercase">编辑设置</span>
          <h2 className="inspector__title m-0 text-base leading-6 font-semibold">{toolTitles[activeTool]}</h2>
        </div>
        <Button className="rounded-full bg-[color-mix(in_srgb,var(--rs-inspector-frost-strong)_72%,transparent)]" type="button" variant="ghost" size="icon" onClick={onClose} aria-label="关闭设置面板">
          <X />
        </Button>
      </div>
      <div className="inspector__reading-body min-h-0 flex-[0_1_auto] overflow-y-auto p-4">
        {activeTool === 'templates' && (
          <Sidebar selectedTemplate={selectedTemplate} onTemplateSelect={onTemplateSelect} />
        )}
        {activeTool === 'content' && (
          <ControlPanel
            section="content"
            controlSettings={contentSettings}
            onControlChange={onContentChange}
            supportsAuthorAvatar={supportsAuthorAvatar}
          />
        )}
        {activeTool === 'canvas' && (
          <ControlPanel
            section="canvas"
            controlSettings={contentSettings}
            onControlChange={onContentChange}
            selectedResolution={selectedResolution}
            selectedFormat={selectedFormat}
            selectedLayout={selectedLayout}
            onResolutionChange={onResolutionChange}
            onFormatChange={onFormatChange}
            onLayoutChange={onLayoutChange}
          />
        )}
      </div>
    </GlassSurface>
  </div>
));

Inspector.displayName = 'Inspector';

export default Inspector;
