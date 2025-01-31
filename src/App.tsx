import { Layout, ConfigProvider, theme } from 'antd';
import { useState, useEffect } from 'react';
import 'antd/dist/reset.css';
import Header from './components/Header';
import MainContent from './components/MainContent';

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState('basic');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          borderRadius: 8,
          colorBgContainer: isDarkMode ? '#141414' : '#ffffff',
          colorBgLayout: isDarkMode ? '#000000' : '#f5f5f5'
        }
      }}
    >
      <Layout style={{ minHeight: '100vh' }}>
        <Header isDarkMode={isDarkMode} onSubmit={() => {}} />
        <MainContent
          selectedTemplate={selectedTemplate}
          onTemplateSelect={setSelectedTemplate}
          isDarkMode={isDarkMode}
        />
      </Layout>
    </ConfigProvider>
  )
}

export default App
