import { useState } from 'react';
import { GitBranch, LoaderCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface InputProps {
  onSubmit: (url: string) => Promise<void> | void;
  isLoading?: boolean;
}

const RepoInput: React.FC<InputProps> = ({ onSubmit, isLoading = false }) => {
  const [repoUrl, setRepoUrl] = useState('');

  const handleSubmit = () => {
    const trimmedUrl = repoUrl.trim();
    if (trimmedUrl && !isLoading) onSubmit(trimmedUrl);
  };

  return (
    <div className="grid w-full grid-cols-[minmax(0,1fr)_var(--rs-control-height-primary)] gap-1 rounded-[var(--rs-radius-glass-inner)] border border-[var(--rs-color-border)] bg-[color-mix(in_srgb,var(--rs-color-surface)_74%,transparent)] p-1 shadow-[inset_0_1px_2px_rgba(23,25,29,.05)] max-md:grid-cols-[minmax(0,1fr)_40px] max-md:border-0 max-md:bg-transparent max-md:p-0 max-md:shadow-none">
      <Input
        className="border-0 bg-transparent shadow-none focus-visible:ring-0 max-md:h-10 max-md:rounded-[18px] max-md:border max-md:border-[var(--rs-color-border)] max-md:bg-[color-mix(in_srgb,var(--rs-color-surface)_72%,transparent)] max-md:px-3"
        aria-label="GitHub 仓库"
        placeholder="owner/repository"
        value={repoUrl}
        onChange={(event) => setRepoUrl(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') handleSubmit();
        }}
      />
      <Button className="rounded-full border border-white/20 bg-gradient-to-br from-[#8398ff] to-[var(--rs-color-accent-active)] shadow-[inset_0_1px_0_rgba(255,255,255,.42),0_6px_14px_rgba(65,105,225,.24)] focus-visible:ring-0 focus-visible:shadow-[inset_0_0_0_2px_rgba(255,255,255,.8),0_6px_14px_rgba(65,105,225,.24)] max-md:size-10" type="button" onClick={handleSubmit} size="icon" disabled={isLoading} aria-label="获取仓库信息">
        {isLoading ? <LoaderCircle className="animate-spin" /> : <GitBranch />}
      </Button>
    </div>
  );
};

export default RepoInput;
