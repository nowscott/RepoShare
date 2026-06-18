import { X } from 'lucide-react';
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

const Inspector: React.FC<InspectorProps> = ({
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
}) => (
  <GlassSurface as="aside" className="inspector" aria-label={toolTitles[activeTool]}>
    <div className="inspector__header">
      <h2>{toolTitles[activeTool]}</h2>
      <Button type="button" variant="ghost" size="icon" onClick={onClose} aria-label="关闭设置面板">
        <X />
      </Button>
    </div>
    <div className="inspector__body">
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
);

export default Inspector;
