import { Layout, ConfigProvider, theme, message } from 'antd';
import { useState, useEffect } from 'react';
import { Octokit } from '@octokit/rest';
import 'antd/dist/reset.css';
import Header from './components/Header';
import MainContent from './components/MainContent';

const octokit = new Octokit();

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState('card');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [leftSiderCollapsed, setLeftSiderCollapsed] = useState(false);
  const [rightSiderCollapsed, setRightSiderCollapsed] = useState(false);
  const [repoData, setRepoData] = useState({
    repoName: 'RepoShare',
    repoDescription: '一个用于生成 GitHub 仓库预览图的工具，支持卡片、深色、现代等多种精美模板。可自定义显示仓库信息、作者信息、语言标签等元素，让你的仓库展示更加专业和吸引人。适用于 README 展示、社交分享、项目文档等多种场景。',
    repoStars: 999,
    repoForks: 66,
    repoLanguages: ['TypeScript','CSS'],
    authorName: 'NowScott',
    authorAvatar: "https://avatars.githubusercontent.com/u/86339284?v=4",
    homepage: "https://nowscott.top/"
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
          onSubmit={async (repoUrl) => {
          try {
            console.log('开始获取仓库信息:', repoUrl);
            const [owner, repo] = repoUrl.split('/');
            
            console.log('获取仓库基本信息...');
            const { data: repoInfo } = await octokit.repos.get({
              owner,
              repo,
            });
            console.log('仓库基本信息:', repoInfo);

            console.log('获取仓库主要编程语言...');
            const { data: languages } = await octokit.repos.listLanguages({
              owner,
              repo,
            });
            const sortedLanguages = Object.entries(languages)
              .sort(([, a], [, b]) => b - a)
              .slice(0, 3)
              .map(([lang]) => lang);
            console.log('仓库主要语言:', sortedLanguages);

            setRepoData({
              repoName: repoInfo.name,
              repoDescription: repoInfo.description || '暂无描述',
              repoStars: repoInfo.stargazers_count,
              repoForks: repoInfo.forks_count,
              repoLanguages: sortedLanguages.length > 0 ? sortedLanguages : ['Unknown'],
              authorName: repoInfo.owner.login,
              authorAvatar: repoInfo.owner.avatar_url,
              homepage: repoInfo.homepage || ''
            });

            messageApi.success('仓库信息获取成功！');
          } catch (error) {
            console.error('获取仓库信息失败:', error);
            messageApi.error('获取仓库信息失败，请检查仓库地址是否正确');
          }
        }} />
        <MainContent
          selectedTemplate={selectedTemplate}
          onTemplateSelect={setSelectedTemplate}
          isDarkMode={isDarkMode}
          leftSiderCollapsed={leftSiderCollapsed}
          rightSiderCollapsed={rightSiderCollapsed}
          repoData={repoData}
        />
      </Layout>
    </ConfigProvider>
  )
}

export default App
