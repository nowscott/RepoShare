import React, { useState } from 'react';
import Sidebar from '../Sidebar';
import Preview from '../Preview';
import ControlPanel from '../ControlPanel';
import templates from '../../config/templates';
import { RepoData } from '../../utils/github';

interface MainContentProps {
  selectedTemplate: string;
  onTemplateSelect: (templateId: string) => void;
  isDarkMode: boolean;
  leftSiderCollapsed?: boolean;
  rightSiderCollapsed?: boolean;
  onLeftSiderCollapse: () => void;
  onRightSiderCollapse: () => void;
  onResolutionChange?: (resolution: 'x8' | 'x4' | 'x2') => void;
  onFormatChange?: (format: 'png' | 'jpeg') => void;
  repoData: RepoData;
}

const MainContent: React.FC<MainContentProps> = ({
  selectedTemplate,
  onTemplateSelect,
  leftSiderCollapsed = false,
  rightSiderCollapsed = false,
  onResolutionChange,
  onFormatChange,
  repoData
}) => {
  const [controlSettings, setControlSettings] = useState({
    showForks: true,
    showStars: true,
    showHomepage: true,
    showAuthorAvatar: true,
    showAuthorName: true,
  });

  const [selectedResolution, setSelectedResolution] = useState<'x8' | 'x4' | 'x2'>('x4');
  const [selectedFormat, setSelectedFormat] = useState<'png' | 'jpeg'>('png');
  const [selectedLayout, setSelectedLayout] = useState<'default' | 'portrait'>('default');

  const handleControlChange = (key: string, value: boolean) => {
    setControlSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleResolutionChange = (resolution: 'x8' | 'x4' | 'x2') => {
    setSelectedResolution(resolution);
    onResolutionChange?.(resolution);
  };

  const handleFormatChange = (format: 'png' | 'jpeg') => {
    setSelectedFormat(format);
    onFormatChange?.(format);
  };

  const handleLayoutChange = (layout: 'default' | 'portrait') => {
    setSelectedLayout(layout);
  };

  const selectedTemplateConfig = templates.find((template) => template.id === selectedTemplate);

  return (
    <div className="flex min-h-[calc(100vh-76px)] bg-transparent max-md:flex-col">
      {!leftSiderCollapsed && (
        <aside className="m-[18px] w-[184px] shrink-0 overflow-hidden rounded-lg border border-black/10 bg-white/85 shadow-[0_18px_50px_rgba(25,23,18,0.08)] backdrop-blur-md max-md:m-3 max-md:w-auto">
          <Sidebar
            selectedTemplate={selectedTemplate}
            onTemplateSelect={onTemplateSelect}
          />
        </aside>
      )}
      <main className="canvas-grid flex min-w-0 flex-1 items-center justify-center overflow-auto p-6 max-md:min-h-[640px] max-md:items-start max-md:justify-start max-md:p-3">
        <div className="box-content shrink-0 rounded-lg border border-black/10 bg-white/65 p-3.5 shadow-[0_24px_80px_rgba(25,23,18,0.12)]" style={{
          width: selectedLayout === 'portrait' ? '540px' : '750px', 
          height: selectedLayout === 'portrait' ? '720px' : 'auto',
          boxSizing: 'content-box',
        }}>
          <div className="size-full overflow-hidden rounded-lg bg-white" data-preview-root="true">
            <Preview selectedTemplate={selectedTemplate} layout={selectedLayout} {...repoData} {...controlSettings} />
          </div>
        </div>
      </main>
      {!rightSiderCollapsed && (
        <aside className="m-[18px] w-[184px] shrink-0 overflow-hidden rounded-lg border border-black/10 bg-white/85 shadow-[0_18px_50px_rgba(25,23,18,0.08)] backdrop-blur-md max-md:m-3 max-md:w-auto">
          <ControlPanel
            controlSettings={controlSettings}
            onControlChange={handleControlChange}
            onResolutionChange={handleResolutionChange}
            onFormatChange={handleFormatChange}
            onLayoutChange={handleLayoutChange}
            selectedResolution={selectedResolution}
            selectedFormat={selectedFormat}
            selectedLayout={selectedLayout}
            supportsAuthorAvatar={Boolean(selectedTemplateConfig?.supportsAuthorAvatar)}
          />
        </aside>
      )}
    </div>
  );
};

export default MainContent;
