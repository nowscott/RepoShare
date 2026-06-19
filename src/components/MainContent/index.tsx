import { useCallback, useEffect, useRef } from 'react';
import templates from '../../config/templates';
import { RepoData } from '../../utils/github';
import { CanvasLayout, ContentSettings, EditorTool, ExportFormat, Resolution } from '../../types/editor';
import Inspector from '../Inspector';
import WorkspaceDock from '../WorkspaceDock';
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
  const dockRef = useRef<HTMLDivElement>(null);
  const inspectorRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<Partial<Record<EditorTool, HTMLButtonElement | null>>>({});
  const lastActiveTool = useRef<EditorTool | null>(null);

  useEffect(() => {
    if (!activeTool) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        lastActiveTool.current = activeTool;
        onToolChange(null);
      }
    };
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (inspectorRef.current?.contains(target) || dockRef.current?.contains(target)) return;
      lastActiveTool.current = activeTool;
      onToolChange(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('pointerdown', handlePointerDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [activeTool, onToolChange]);

  useEffect(() => {
    if (!activeTool && lastActiveTool.current) {
      triggerRefs.current[lastActiveTool.current]?.focus();
      lastActiveTool.current = null;
    }
  }, [activeTool]);

  const toggleTool = (tool: EditorTool) => {
    if (activeTool === tool) {
      lastActiveTool.current = tool;
      onToolChange(null);
      return;
    }
    onToolChange(tool);
  };

  const closeInspector = useCallback(() => {
    if (activeTool) lastActiveTool.current = activeTool;
    onToolChange(null);
  }, [activeTool, onToolChange]);

  return (
    <div className="relative h-dvh w-full overflow-hidden">
      {activeTool && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-[calc(var(--rs-z-sheet)-1)] hidden border-0 bg-[color-mix(in_srgb,var(--rs-color-overlay)_64%,transparent)] backdrop-blur-[4px] max-md:block"
            onClick={closeInspector}
            aria-label="关闭设置遮罩"
          />
          <Inspector
            ref={inspectorRef}
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
            onClose={closeInspector}
          />
        </>
      )}

      <CanvasStage
        selectedTemplate={selectedTemplate}
        layout={selectedLayout}
        {...repoData}
        {...contentSettings}
      />

      <WorkspaceDock
        ref={dockRef}
        activeTool={activeTool}
        onToolChange={toggleTool}
        onDownload={onDownload}
        isDownloading={isDownloading}
        onTriggerRef={(tool, node) => {
          triggerRefs.current[tool] = node;
        }}
      />
    </div>
  );
};

export default MainContent;
