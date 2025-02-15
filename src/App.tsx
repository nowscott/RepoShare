import { Layout, ConfigProvider, theme, notification } from 'antd';
import { useState, useEffect } from 'react';
import 'antd/dist/reset.css';
import Header from './components/Header';
import MainContent from './components/MainContent';
import { fetchRepoInfo } from './utils/github';

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState('card');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationApi, contextHolder] = notification.useNotification();
  const [leftSiderCollapsed, setLeftSiderCollapsed] = useState(false);
  const [rightSiderCollapsed, setRightSiderCollapsed] = useState(false);
  const [selectedResolution, setSelectedResolution] = useState<'x8' | 'x4' | 'x2'>('x4');
  const [selectedFormat, setSelectedFormat] = useState<'png' | 'jpeg'>('png');
  const [repoData, setRepoData] = useState({
    repoName: 'RepoShare',
    repoDescription: '一个用于生成 GitHub 仓库预览图的工具，支持卡片、深色、现代等多种精美模板。可自定义显示仓库信息、作者信息、语言标签等元素，让你的仓库展示更加专业和吸引人。适用于 README 展示、社交分享、项目文档等多种场景。',
    repoStars: Math.floor(Math.random() * 900 + 100),
    repoForks: Math.floor(Math.random() * 90 + 10),
    repoLanguages: ['TypeScript','CSS','HTML'],
    authorName: 'NowScott',
    authorAvatar: "https://avatars.githubusercontent.com/u/86339284?v=4",
    homepage: "https://r.0211120.xyz/"
  });

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
      {contextHolder}
      <Layout style={{ minHeight: '100vh' }}>
        <Header
          isDarkMode={isDarkMode}
          leftSiderCollapsed={leftSiderCollapsed}
          rightSiderCollapsed={rightSiderCollapsed}
          onLeftSiderCollapse={() => setLeftSiderCollapsed(!leftSiderCollapsed)}
          onRightSiderCollapse={() => setRightSiderCollapsed(!rightSiderCollapsed)}
          selectedResolution={selectedResolution}
          selectedFormat={selectedFormat}
          onSubmit={async (repoUrl) => {
            try {
              if (!/^[\w.-]+\/[\w.-]+$/.test(repoUrl)) {
                notificationApi.error({
                  message: '格式错误',
                  description: '仓库地址格式不正确，请使用 username/repo 格式',
                  placement: 'bottomRight'
                });
                return;
              }
              const [owner, repo] = repoUrl.split('/');
              const cacheKey = `${owner}/${repo}`;
              const cachedData = localStorage.getItem(cacheKey);
              if (!cachedData) {
                localStorage.clear();
              } else {
                const parsedData = JSON.parse(cachedData);
                setRepoData(parsedData);
                notificationApi.success({
                  message: '加载成功',
                  description: '已从缓存加载仓库信息',
                  placement: 'bottomRight'
                });
                return;
              }
              const repoData = await fetchRepoInfo(owner, repo);
              setRepoData(repoData);
              localStorage.setItem(cacheKey, JSON.stringify(repoData));
              notificationApi.success({
                message: '获取成功',
                description: '仓库信息获取成功！',
                placement: 'bottomRight'
              });
            } catch (error) {
              console.error('获取仓库信息失败:', error);
              notificationApi.error({
                message: '获取失败',
                description: '获取仓库信息失败，请检查仓库地址是否正确',
                placement: 'bottomRight'
              });
            }
          }}
        />
        <MainContent
          selectedTemplate={selectedTemplate}
          onTemplateSelect={setSelectedTemplate}
          isDarkMode={isDarkMode}
          leftSiderCollapsed={leftSiderCollapsed}
          rightSiderCollapsed={rightSiderCollapsed}
          onLeftSiderCollapse={() => setLeftSiderCollapsed(!leftSiderCollapsed)}
          onRightSiderCollapse={() => setRightSiderCollapsed(!rightSiderCollapsed)}
          onResolutionChange={setSelectedResolution}
          onFormatChange={setSelectedFormat}
          repoData={repoData}
        />
      </Layout>
    </ConfigProvider>
  )
}

export default App
