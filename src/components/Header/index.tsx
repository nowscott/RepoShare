import React, { useState } from 'react';
import { notification } from 'antd';
import { Download, PanelLeftClose, PanelLeftOpen, PanelRightClose, PanelRightOpen } from 'lucide-react';
import Bowser from 'bowser';
import RepoInput from '../Input';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { downloadPreviewImage } from '../../utils/download';

interface HeaderProps {
  isDarkMode: boolean;
  onSubmit: (repoUrl: string) => void;
  leftSiderCollapsed: boolean;
  rightSiderCollapsed: boolean;
  onLeftSiderCollapse: () => void;
  onRightSiderCollapse: () => void;
  selectedResolution: 'x8' | 'x4' | 'x2';
  selectedFormat: 'png' | 'jpeg';
  repoName: string;
}

const Header: React.FC<HeaderProps> = ({ onSubmit, leftSiderCollapsed, rightSiderCollapsed, onLeftSiderCollapse, onRightSiderCollapse, selectedResolution, selectedFormat, repoName }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [notificationApi, contextHolder] = notification.useNotification();

  const handleDownload = async () => {
    const browser = Bowser.getParser(window.navigator.userAgent);
    const isValidBrowser = browser.satisfies({
      chrome: '>=49',
      firefox: '>=45'
    });

    if (!isValidBrowser) {
      const browserName = browser.getBrowserName();
      if (browserName === 'Safari') {
        notificationApi.open({
          message: '浏览器不支持',
          description: 'Safari浏览器暂不支持，这是由于Safari对SVG foreignObject标签采用了更严格的安全模型。请使用Chrome或Firefox浏览器。',
          placement: 'bottomRight',
          duration: 5,
          showProgress: true,
          pauseOnHover: true
        });
        return;
      } else if (browserName === 'Internet Explorer') {
        notificationApi.open({
          message: '浏览器不支持',
          description: 'Internet Explorer浏览器不支持，这是由于IE不支持SVG foreignObject标签。请使用Chrome或Firefox浏览器。',
          placement: 'bottomRight',
          duration: 5,
          showProgress: true,
          pauseOnHover: true
        });
        return;
      } else {
        notificationApi.open({
          message: '浏览器可能不兼容',
          description: '当前浏览器可能不兼容，建议使用Chrome 49+或Firefox 45+以获得最佳体验。',
          placement: 'bottomRight',
          duration: 5,
          showProgress: true,
          pauseOnHover: true
        });
        return;
      }
    }

    setIsDownloading(true);
    const key = 'rendering';
    notificationApi.info({
      key,
      message: '正在渲染',
      description: '正在渲染图片...',
      placement: 'bottomRight',
      duration: 3
    });
    try {
      const scaleMap = {
        'x8': 8,
        'x4': 4,
        'x2': 2
      };
      const success = await downloadPreviewImage({ scale: scaleMap[selectedResolution], format: selectedFormat, repoName });
      if (success) {
        notificationApi.success({
          message: '保存成功',
          description: '图片已成功保存！',
          placement: 'bottomRight'
        });
      } else {
        notificationApi.error({
          message: '保存失败',
          description: '保存图片失败，请稍后重试',
          placement: 'bottomRight'
        });
      }
    } finally {
      setIsDownloading(false);
    }
  };
  return (
    <header className="sticky top-0 z-30 flex min-h-[76px] flex-wrap items-center gap-4 border-b border-black/10 bg-[#faf8f2]/85 px-5 py-3 backdrop-blur-xl">
      {contextHolder}
      <TooltipProvider delayDuration={200}>
      <div className="flex min-w-0 flex-1 basis-52 items-center gap-3">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={onLeftSiderCollapse}
              aria-label={leftSiderCollapsed ? '展开模板栏' : '折叠模板栏'}
            >
              {leftSiderCollapsed ? <PanelLeftOpen /> : <PanelLeftClose />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>{leftSiderCollapsed ? '展开模板栏' : '折叠模板栏'}</TooltipContent>
        </Tooltip>
        <a
          className="inline-flex items-center gap-3 text-neutral-950 no-underline"
          href="https://github.com/nowscott/RepoShare"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="grid size-9 place-items-center rounded-lg border border-black/10 bg-white font-extrabold text-blue-600 shadow-[0_8px_24px_rgba(20,18,14,0.08)]">R</span>
          <span className="text-lg font-extrabold">RepoShare</span>
        </a>
      </div>
      <div className="order-3 flex min-w-0 flex-[2_1_360px] justify-center md:order-none">
        <RepoInput onSubmit={onSubmit} />
      </div>
      <div className="flex min-w-0 flex-1 basis-28 items-center justify-end gap-3">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handleDownload}
              disabled={isDownloading}
              aria-label="下载预览图"
            >
              <Download />
            </Button>
          </TooltipTrigger>
          <TooltipContent>下载预览图</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={onRightSiderCollapse}
              aria-label={rightSiderCollapsed ? '展开控制栏' : '折叠控制栏'}
            >
              {rightSiderCollapsed ? <PanelRightOpen /> : <PanelRightClose />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>{rightSiderCollapsed ? '展开控制栏' : '折叠控制栏'}</TooltipContent>
        </Tooltip>
      </div>
      </TooltipProvider>
    </header>
  );
};

export default Header;
