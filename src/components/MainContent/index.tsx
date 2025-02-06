import React, { useState } from 'react';
import { Layout } from 'antd';
import Sidebar from '../Sidebar';
import Preview from '../Preview';
import ControlPanel from '../ControlPanel';

const { Content, Sider } = Layout;

interface MainContentProps {
  selectedTemplate: string;
  onTemplateSelect: (templateId: string) => void;
  isDarkMode: boolean;
  leftSiderCollapsed?: boolean;
  rightSiderCollapsed?: boolean;
  onLeftSiderCollapse: () => void;
  onRightSiderCollapse: () => void;
  onResolutionChange?: (resolution: 'x8' | 'x4' | 'x2') => void;
  repoData: {
    repoName: string;
    repoDescription: string;
    repoStars: number;
    repoForks: number;
    repoLanguages: string[];
    authorName?: string;
    authorAvatar?: string;
    homepage?: string;
  };
}

const MainContent: React.FC<MainContentProps> = ({
  selectedTemplate,
  onTemplateSelect,
  isDarkMode,
  leftSiderCollapsed = false,
  rightSiderCollapsed = false,
  onResolutionChange,
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

  React.useEffect(() => {
    onResolutionChange?.('x4');
  }, []);

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

  return (
    <Layout hasSider>
      <Sider
        width={160}
        className="app-sider"
        theme={isDarkMode ? 'dark' : 'light'}
        collapsed={leftSiderCollapsed}
        collapsedWidth={0}
        style={{ position: 'fixed', left: 0, height: '90vh', top: '64px', zIndex: 20, borderRight: `1px solid ${isDarkMode ? '#303030' : '#f0f0f0'}`, overflow: 'hidden' }}
      >
        <Sidebar
          selectedTemplate={selectedTemplate}
          onTemplateSelect={onTemplateSelect}
        />
      </Sider>
      <Content className="app-content" style={{ padding: '24px', minHeight: '90vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: isDarkMode ? '#141414' : '#fff', borderLeft: `1px solid ${isDarkMode ? '#303030' : '#f0f0f0'}`, borderRight: `1px solid ${isDarkMode ? '#303030' : '#f0f0f0'}`,  overflow: 'auto' }}>
        <div style={{ width: '750px', flex: 'none' }}>
          <Preview selectedTemplate={selectedTemplate} {...repoData} {...controlSettings} />
        </div>
      </Content>
      <Sider
        width={160}
        className="app-sider"
        theme={isDarkMode ? 'dark' : 'light'}
        collapsed={rightSiderCollapsed}
        collapsedWidth={0}
        style={{ position: 'fixed', right: 0, height: '90vh', top: '64px', zIndex: 20, borderLeft: `1px solid ${isDarkMode ? '#303030' : '#f0f0f0'}` }}
      >
        <ControlPanel
          controlSettings={controlSettings}
          onControlChange={handleControlChange}
          onResolutionChange={handleResolutionChange}
          selectedResolution={selectedResolution}
        />
      </Sider>
    </Layout>
  );
};

export default MainContent;