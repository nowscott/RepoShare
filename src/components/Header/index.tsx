import { MoonStar, SunMedium } from 'lucide-react';
import BrandGlyph from '../BrandGlyph';
import RepoInput from '../Input';
import { Button } from '../ui/button';
import { GlassSurface } from '../ui/glass-surface';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

interface HeaderProps {
  isDarkMode: boolean;
  onThemeToggle: () => void;
  onSubmit: (repoUrl: string) => Promise<void> | void;
  isLoadingRepo: boolean;
}

const Header: React.FC<HeaderProps> = ({
  isDarkMode,
  onThemeToggle,
  onSubmit,
  isLoadingRepo,
}) => (
  <header className="fixed left-1/2 top-3 z-[var(--rs-z-command-bar)] h-[var(--rs-command-bar-height)] w-[min(calc(100%-48px),var(--rs-command-bar-width))] -translate-x-1/2 max-md:top-2 max-md:h-[var(--rs-command-bar-height-compact)] max-md:w-[calc(100%-16px)]">
    <GlassSurface
      strength="vivid"
      className="h-full w-full rounded-full shadow-[var(--rs-shadow-glass)]! [&>div:last-child]:grid [&>div:last-child]:h-full [&>div:last-child]:grid-cols-[max-content_minmax(260px,1fr)_max-content] [&>div:last-child]:items-center [&>div:last-child]:gap-4 [&>div:last-child]:px-2 [&>div:last-child]:py-1.5 max-md:[&>div:last-child]:grid-cols-[40px_minmax(0,1fr)_40px] max-md:[&>div:last-child]:gap-1 max-md:[&>div:last-child]:p-1"
    >
      <a
        className="inline-flex min-w-0 items-center gap-2 pr-2 font-bold text-[var(--rs-color-text)] no-underline max-md:pr-0"
        href="https://github.com/nowscott/RepoShare"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="RepoShare GitHub"
      >
        <span className="grid size-10 place-items-center rounded-[18px] border border-white/30 bg-gradient-to-br from-[#8aa0ff] via-[var(--rs-color-accent)] to-[var(--rs-color-accent-active)] text-white shadow-[inset_0_1px_0_rgba(255,255,255,.48),0_8px_18px_rgba(65,105,225,.24)]">
          <BrandGlyph className="size-[22px]" />
        </span>
        <span className="overflow-hidden text-base text-ellipsis whitespace-nowrap max-md:hidden">RepoShare</span>
      </a>

      <div className="min-w-0">
        <RepoInput onSubmit={onSubmit} isLoading={isLoadingRepo} />
      </div>

      <div className="flex justify-end">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="rounded-full border border-transparent bg-[color-mix(in_srgb,var(--rs-color-surface)_42%,transparent)] shadow-[inset_0_1px_0_rgba(255,255,255,.18)] hover:border-[color-mix(in_srgb,var(--rs-color-accent)_24%,transparent)] hover:bg-[color-mix(in_srgb,var(--rs-color-surface-hover)_76%,transparent)] focus-visible:ring-0 focus-visible:shadow-[inset_0_0_0_2px_var(--rs-color-focus),inset_0_1px_0_rgba(255,255,255,.24)]"
              onClick={onThemeToggle}
              aria-label={isDarkMode ? '切换浅色模式' : '切换深色模式'}
            >
              {isDarkMode ? <SunMedium /> : <MoonStar />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>{isDarkMode ? '浅色模式' : '深色模式'}</TooltipContent>
        </Tooltip>
      </div>
    </GlassSurface>
  </header>
);

export default Header;
