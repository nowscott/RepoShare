import React, { useState } from 'react';
import { Input as AntInput, Button, Space } from 'antd';
import { EyeOutlined, DownloadOutlined } from '@ant-design/icons';

interface InputProps {
  onSubmit: (repoUrl: string) => void;
}

const Input: React.FC<InputProps> = ({ onSubmit }) => {
  const [repoUrl, setRepoUrl] = useState('');

  const handleSubmit = () => {
    if (repoUrl.trim()) {
      onSubmit(repoUrl.trim());
    }
  };

  return (
    <Space style={{ width: '100%' }}>
      <AntInput
        placeholder="username/repo"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
        style={{ flex: 1 }}
      />
      <Button type="primary" icon={<EyeOutlined />} onClick={handleSubmit}>
        生成预览
      </Button>
      <Button icon={<DownloadOutlined />}>下载图片</Button>
    </Space>
  );
};

export default Input;