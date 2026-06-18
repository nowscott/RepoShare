import { Download, Moon, Share2, Sun } from 'lucide-react';
import RepoInput from '../Input';
import { Button } from '../ui/button';
import { GlassSurface } from '../ui/glass-surface';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

interface HeaderProps {
  isDarkMode: boolean;
  onThemeToggle: () => void;
  onSubmit: (repoUrl: string) => Promise<void> | void;
  onDownload: () => void;
  isLoadingRepo: boolean;
  isDownloading: boolean;
}

const Header: React.FC<HeaderProps> = ({
  isDarkMode,
  onThemeToggle,
  onSubmit,
  onDownload,
  isLoadingRepo,
  isDownloading,
}) => (
  <header className="command-bar">
    <GlassSurface strength="subtle" className="command-bar__glass">
      <a
        className="brand"
        href="https://github.com/nowscott/RepoShare"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="RepoShare GitHub"
      >
        <span className="brand__mark"><Share2 /></span>
        <span className="brand__name">RepoShare</span>
      </a>

      <div className="command-bar__search">
        <RepoInput onSubmit={onSubmit} isLoading={isLoadingRepo} />
      </div>

      <div className="command-bar__actions">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onThemeToggle}
              aria-label={isDarkMode ? '切换浅色模式' : '切换深色模式'}
            >
              {isDarkMode ? <Sun /> : <Moon />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>{isDarkMode ? '浅色模式' : '深色模式'}</TooltipContent>
        </Tooltip>
        <Button
          type="button"
          onClick={onDownload}
          disabled={isDownloading}
          className="command-bar__download"
        >
          <Download />
          <span>{isDownloading ? '渲染中' : '下载'}</span>
        </Button>
      </div>
    </GlassSurface>
  </header>
);

export default Header;
