import { ConfigProvider, notification, theme } from 'antd';
import Bowser from 'bowser';
import { useCallback, useEffect, useState } from 'react';
import 'antd/dist/reset.css';
import Header from './components/Header';
import MainContent from './components/MainContent';
import { TooltipProvider } from './components/ui/tooltip';
import { downloadPreviewImage } from './utils/download';
import { fetchRepoInfo, RepoData, RepoFetchError } from './utils/github';
import { CanvasLayout, ContentSettings, EditorTool, ExportFormat, Resolution } from './types/editor';

const defaultRepoData: RepoData = {
  repoName: 'RepoShare',
  repoDescription: '一个用于生成 GitHub 仓库预览图的工具，支持多种精美模板和横竖屏布局。',
  repoStars: 128,
  repoForks: 24,
  repoLanguages: ['TypeScript', 'CSS', 'HTML'],
  authorName: 'NowScott',
  authorAvatar: 'https://avatars.githubusercontent.com/u/86339284?v=4',
  homepage: 'https://r.0211120.xyz/',
};

const scaleMap: Record<Resolution, number> = {
  x2: 2,
  x4: 4,
  x8: 8,
};

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState('card');
  const [activeTool, setActiveTool] = useState<EditorTool | null>(null);
  const [selectedResolution, setSelectedResolution] = useState<Resolution>('x4');
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('png');
  const [selectedLayout, setSelectedLayout] = useState<CanvasLayout>('default');
  const [contentSettings, setContentSettings] = useState<ContentSettings>({
    showForks: true,
    showStars: true,
    showHomepage: true,
    showAuthorAvatar: true,
    showAuthorName: true,
  });
  const [repoData, setRepoData] = useState<RepoData>(defaultRepoData);
  const [isLoadingRepo, setIsLoadingRepo] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('reposhare_theme');
    return savedTheme ? savedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [notificationApi, contextHolder] = notification.useNotification();

  useEffect(() => {
    document.documentElement.dataset.theme = isDarkMode ? 'dark' : 'light';
  }, [isDarkMode]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event: MediaQueryListEvent) => {
      if (!localStorage.getItem('reposhare_theme')) setIsDarkMode(event.matches);
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleThemeToggle = () => {
    setIsDarkMode((currentTheme) => {
      const nextTheme = !currentTheme;
      localStorage.setItem('reposhare_theme', nextTheme ? 'dark' : 'light');
      return nextTheme;
    });
  };

  const handleRepoSubmit = async (repoUrl: string) => {
    if (!/^[\w.-]+\/[\w.-]+$/.test(repoUrl)) {
      notificationApi.error({
        title: '格式错误',
        description: '请使用 owner/repository 格式',
        placement: 'bottomRight',
      });
      return;
    }

    setIsLoadingRepo(true);
    try {
      const [owner, repo] = repoUrl.split('/');
      const nextRepoData = await fetchRepoInfo(owner, repo);
      setRepoData(nextRepoData);
      notificationApi.success({
        title: '仓库已加载',
        description: `${owner}/${repo}`,
        placement: 'bottomRight',
      });
    } catch (error) {
      const description = error instanceof RepoFetchError
        ? error.message
        : '获取仓库信息失败，请稍后重试';
      notificationApi.error({
        title: '获取失败',
        description,
        placement: 'bottomRight',
      });
    } finally {
      setIsLoadingRepo(false);
    }
  };

  const handleDownload = async () => {
    const browser = Bowser.getParser(window.navigator.userAgent);
    const browserName = browser.getBrowserName();
    if (browserName === 'Safari' || browserName === 'Internet Explorer') {
      notificationApi.warning({
        title: '当前浏览器暂不支持导出',
        description: '请使用 Chrome 或 Firefox 下载图片。',
        placement: 'bottomRight',
      });
      return;
    }

    setIsDownloading(true);
    notificationApi.info({
      key: 'rendering',
      title: '正在渲染',
      description: '高倍率图片可能需要几秒钟。',
      placement: 'bottomRight',
      duration: 2,
    });

    try {
      const success = await downloadPreviewImage({
        scale: scaleMap[selectedResolution],
        format: selectedFormat,
        repoName: repoData.repoName,
      });
      notificationApi[success ? 'success' : 'error']({
        title: success ? '图片已保存' : '保存失败',
        description: success ? `${repoData.repoName}.${selectedFormat}` : '请稍后重试',
        placement: 'bottomRight',
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleContentChange = (key: keyof ContentSettings, value: boolean) => {
    setContentSettings((currentSettings) => ({ ...currentSettings, [key]: value }));
  };

  const handleToolChange = useCallback((tool: EditorTool | null) => {
    setActiveTool(tool);
  }, []);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          borderRadius: 14,
          colorPrimary: isDarkMode ? '#6f8cff' : '#4169e1',
        },
      }}
    >
      {contextHolder}
      <TooltipProvider delayDuration={250}>
        <div className="app-shell" data-theme={isDarkMode ? 'dark' : 'light'}>
          <Header
            isDarkMode={isDarkMode}
            onThemeToggle={handleThemeToggle}
            onSubmit={handleRepoSubmit}
            isLoadingRepo={isLoadingRepo}
          />
          <MainContent
            selectedTemplate={selectedTemplate}
            onTemplateSelect={setSelectedTemplate}
            activeTool={activeTool}
            onToolChange={handleToolChange}
            contentSettings={contentSettings}
            onContentChange={handleContentChange}
            selectedResolution={selectedResolution}
            selectedFormat={selectedFormat}
            selectedLayout={selectedLayout}
            onResolutionChange={setSelectedResolution}
            onFormatChange={setSelectedFormat}
            onLayoutChange={setSelectedLayout}
            onDownload={handleDownload}
            isDownloading={isDownloading}
            repoData={repoData}
          />
        </div>
      </TooltipProvider>
    </ConfigProvider>
  );
}

export default App;
