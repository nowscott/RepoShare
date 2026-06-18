import { useState } from 'react';
import { ArrowRight, LoaderCircle } from 'lucide-react';
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
    <div className="repo-input">
      <Input
        aria-label="GitHub 仓库"
        placeholder="owner/repository"
        value={repoUrl}
        onChange={(event) => setRepoUrl(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') handleSubmit();
        }}
      />
      <Button type="button" onClick={handleSubmit} size="icon" disabled={isLoading} aria-label="获取仓库信息">
        {isLoading ? <LoaderCircle className="animate-spin" /> : <ArrowRight />}
      </Button>
    </div>
  );
};

export default RepoInput;
