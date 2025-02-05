import React, { useState } from 'react';
import { Input, Space, Button, message } from 'antd';
import { RedoOutlined } from '@ant-design/icons';

interface InputProps {
  onSubmit: (url: string) => void;
}

const RepoInput: React.FC<InputProps> = ({ onSubmit }) => {
  const [repoUrl, setRepoUrl] = useState('');
  const [lastSubmittedUrl, setLastSubmittedUrl] = useState('');

  const handleSubmit = () => {
    const trimmedUrl = repoUrl.trim();
    if (trimmedUrl) {
      if (trimmedUrl === lastSubmittedUrl) {
        message.info('该仓库已在预览中');
        return;
      }
      setLastSubmittedUrl(trimmedUrl);
      onSubmit(trimmedUrl);
    }
  };

  return (
    <Space.Compact style={{ minWidth: '260px', maxWidth: '420px', width: 'auto', borderRadius: '24px'}}>
      <Input
        placeholder="username/repo"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
        style={{ borderRadius: '24px 0 0 24px', fontWeight: 'bold', flex: '1 1 auto' }}
        onPressEnter={handleSubmit}
      />
      <Button 
        type="primary" 
        onClick={handleSubmit} 
        icon={<RedoOutlined />}
        style={{ borderRadius: '0 24px 24px 0', flex: '0 0 auto' }}
      />
    </Space.Compact>
  );
};

export default RepoInput;