import React, { useState } from 'react';
import { Input as AntInput, Button, Space } from 'antd';
import { EyeOutlined, DownloadOutlined } from '@ant-design/icons';
import domtoimage from 'dom-to-image';

interface InputProps {
  onSubmit: (url: string) => void;
}

const Input: React.FC<InputProps> = ({ onSubmit }) => {
  const [repoUrl, setRepoUrl] = useState('');

  const handleSubmit = () => {
    if (repoUrl.trim()) {
      onSubmit(repoUrl.trim());
    }
  };

  const handleDownload = async () => {
    const previewElement = document.querySelector('.app-content > div') as HTMLElement;
    if (!previewElement) return;

    try {    
      const dataUrl = await domtoimage.toPng(previewElement, {
        height: previewElement.offsetHeight * 8,
        width: previewElement.offsetWidth * 8,
        style: {
          transform: 'scale(8)',
          transformOrigin: 'top left',
          width: `${previewElement.offsetWidth}px`,
          height: `${previewElement.offsetHeight}px`
        },
      });
      const link = document.createElement('a');
      const repoName = document.querySelector('.app-content')?.querySelector('h1')?.textContent || 'repo';
      link.download = `${repoName}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('下载图片时出错:', error);
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
      <Button icon={<DownloadOutlined />} onClick={handleDownload}>
        下载图片
      </Button>
    </Space>
  );
};

export default Input;