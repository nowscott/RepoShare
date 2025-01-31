import React from 'react';
import { Layout } from 'antd';
import Sidebar from '../Sidebar';
import Preview from '../Preview';

const { Content, Sider } = Layout;

interface MainContentProps {
  selectedTemplate: string;
  onTemplateSelect: (templateId: string) => void;
  isDarkMode: boolean;
}

const MainContent: React.FC<MainContentProps> = ({
  selectedTemplate,
  onTemplateSelect,
  isDarkMode
}) => {
  return (
    <Layout hasSider>
      <Sider
        width={280}
        className="app-sider"
        theme={isDarkMode ? 'dark' : 'light'}
      >
        <Sidebar
          selectedTemplate={selectedTemplate}
          onTemplateSelect={onTemplateSelect}
        />
      </Sider>
      <Content className="app-content">
        <Preview selectedTemplate={selectedTemplate} />
      </Content>
    </Layout>
  );
};

export default MainContent;