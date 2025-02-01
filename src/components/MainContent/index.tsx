import React from 'react';
import { Layout } from 'antd';
import Sidebar from '../Sidebar';
import Preview from '../Preview';

const { Content, Sider } = Layout;

interface MainContentProps {
  selectedTemplate: string;
  onTemplateSelect: (templateId: string) => void;
  isDarkMode: boolean;
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
  repoData
}) => {
  return (
    <Layout hasSider>
      <Sider
        width={200}
        className="app-sider"
        theme={isDarkMode ? 'dark' : 'light'}
      >
        <Sidebar
          selectedTemplate={selectedTemplate}
          onTemplateSelect={onTemplateSelect}
        />
      </Sider>
      <Content className="app-content" style={{ padding: '24px', minHeight: '90vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: '750px', minWidth: '750px', flex: '0 0 750px' }}>
          <Preview selectedTemplate={selectedTemplate} {...repoData} />
        </div>
      </Content>
    </Layout>
  );
};

export default MainContent;