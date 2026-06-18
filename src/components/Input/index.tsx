import React, { useState } from 'react';
import { RotateCw } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface InputProps {
  onSubmit: (url: string) => void;
}

const RepoInput: React.FC<InputProps> = ({ onSubmit }) => {
  const [repoUrl, setRepoUrl] = useState('');

  const handleSubmit = () => {
    const trimmedUrl = repoUrl.trim();
    if (trimmedUrl) {
      onSubmit(trimmedUrl);
    }
  };

  return (
    <div className="flex w-full max-w-[520px] items-center rounded-full border border-black/10 bg-white p-1 shadow-[0_14px_40px_rgba(25,23,18,0.08)]">
      <Input
        placeholder="username/repo"
        value={repoUrl}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setRepoUrl(event.target.value)}
        className="h-10 flex-1 rounded-full border-0 bg-transparent shadow-none focus-visible:ring-0"
        onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
          if (event.key === 'Enter') handleSubmit();
        }}
      />
      <Button 
        onClick={handleSubmit} 
        size="icon"
        className="rounded-full"
        aria-label="获取仓库信息"
      >
        <RotateCw className="size-4" />
      </Button>
    </div>
  );
};

export default RepoInput;
