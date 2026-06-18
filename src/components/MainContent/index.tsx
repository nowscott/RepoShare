import { useEffect } from 'react';
import templates from '../../config/templates';
import { RepoData } from '../../utils/github';
import { CanvasLayout, ContentSettings, EditorTool, ExportFormat, Resolution } from '../../types/editor';
import ToolRail from '../ToolRail';
import Inspector from '../Inspector';
import MobileToolbar from '../MobileToolbar';
import CanvasStage from '../CanvasStage';

interface MainContentProps {
  selectedTemplate: string;
  onTemplateSelect: (templateId: string) => void;
  activeTool: EditorTool | null;
  onToolChange: (tool: EditorTool | null) => void;
  contentSettings: ContentSettings;
  onContentChange: (key: keyof ContentSettings, value: boolean) => void;
  selectedResolution: Resolution;
  selectedFormat: ExportFormat;
  selectedLayout: CanvasLayout;
  onResolutionChange: (resolution: Resolution) => void;
  onFormatChange: (format: ExportFormat) => void;
  onLayoutChange: (layout: CanvasLayout) => void;
  onDownload: () => void;
  isDownloading: boolean;
  repoData: RepoData;
}

const MainContent: React.FC<MainContentProps> = ({
  selectedTemplate,
  onTemplateSelect,
  activeTool,
  onToolChange,
  contentSettings,
  onContentChange,
  selectedResolution,
  selectedFormat,
  selectedLayout,
  onResolutionChange,
  onFormatChange,
  onLayoutChange,
  onDownload,
  isDownloading,
  repoData,
}) => {
  const selectedTemplateConfig = templates.find((template) => template.id === selectedTemplate);

  useEffect(() => {
    if (!activeTool) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onToolChange(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTool, onToolChange]);

  const toggleTool = (tool: EditorTool) => {
    onToolChange(activeTool === tool ? null : tool);
  };

  return (
    <div className="editor-shell">
      <ToolRail activeTool={activeTool} onToolChange={toggleTool} />

      {activeTool && (
        <>
          <button
            type="button"
            className="inspector-scrim"
            onClick={() => onToolChange(null)}
            aria-label="关闭设置遮罩"
          />
          <Inspector
            activeTool={activeTool}
            selectedTemplate={selectedTemplate}
            onTemplateSelect={onTemplateSelect}
            contentSettings={contentSettings}
            onContentChange={onContentChange}
            selectedResolution={selectedResolution}
            selectedFormat={selectedFormat}
            selectedLayout={selectedLayout}
            onResolutionChange={onResolutionChange}
            onFormatChange={onFormatChange}
            onLayoutChange={onLayoutChange}
            supportsAuthorAvatar={Boolean(selectedTemplateConfig?.supportsAuthorAvatar)}
            onClose={() => onToolChange(null)}
          />
        </>
      )}

      <CanvasStage
        selectedTemplate={selectedTemplate}
        layout={selectedLayout}
        {...repoData}
        {...contentSettings}
      />

      <MobileToolbar
        activeTool={activeTool}
        onToolChange={toggleTool}
        onDownload={onDownload}
        isDownloading={isDownloading}
      />
    </div>
  );
};

export default MainContent;
