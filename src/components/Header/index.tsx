import React, { useState } from 'react';
import { Layout, Typography, Button, message } from 'antd';
import { StepBackwardFilled, StepForwardFilled, DownloadOutlined } from '@ant-design/icons';
import RepoInput from '../Input';
import { downloadPreviewImage } from '../../utils/download';

const { Header: AntHeader } = Layout;
const { Title } = Typography;

interface HeaderProps {
  isDarkMode: boolean;
  onSubmit: (repoUrl: string) => void;
  leftSiderCollapsed: boolean;
  rightSiderCollapsed: boolean;
  onLeftSiderCollapse: () => void;
  onRightSiderCollapse: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, onSubmit, leftSiderCollapsed, rightSiderCollapsed, onLeftSiderCollapse, onRightSiderCollapse }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    message.loading('正在渲染图片...', 0);
    try {
      await downloadPreviewImage();
    } finally {
      setIsDownloading(false);
      message.destroy();
    }
  };
  return (
    <AntHeader
      className="app-header"
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px',
        backgroundColor: isDarkMode ? '#141414' : '#fff',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        height: '64px',
        position: 'sticky',
        top: 0,
        zIndex: 1,
        width: '100%',
        borderBottom: `1px solid ${isDarkMode ? '#303030' : '#f0f0f0'}`
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: '0 0 200px', justifyContent: 'flex-start' }}>        
        <Button
          type="default"
          icon={leftSiderCollapsed ? (
            <StepForwardFilled style={{ color: '#1C68DC' }} />
          ) : (
            <StepBackwardFilled style={{ color: isDarkMode ? '#ffffff' : '#000000' }} />
          )}
          onClick={onLeftSiderCollapse}
          style={{
            padding: 0,
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        />
        <Title
          level={4}
          style={{
            margin: 0,
            color: isDarkMode ? '#ffffff' : '#000000',
            fontSize: '18px',
            lineHeight: '64px'
          }}
        >
          <a
            href="https://github.com/nowscott/RepoShare"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'inherit',
              textDecoration: 'none',
              transition: 'opacity 0.2s',
            }}
          >
            RepoShare
          </a>
        </Title>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: '1 1 auto' }}>
        <RepoInput onSubmit={onSubmit} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: '0 0 200px', justifyContent: 'flex-end' }}>
        <Button
          type="default"
          icon={<DownloadOutlined style={{ color: isDarkMode ? '#ffffff' : '#000000' }} />}
          onClick={handleDownload}
          disabled={isDownloading}
          style={{
            padding: 0,
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        />
        <Button
          type="default"
          icon={rightSiderCollapsed ? (
            <StepBackwardFilled style={{ color: '#1C68DC' }} />
          ) : (
            <StepForwardFilled style={{ color: isDarkMode ? '#ffffff' : '#000000' }} />
          )}
          onClick={onRightSiderCollapse}
          style={{
            padding: 0,
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        />
      </div>
    </AntHeader>
  );
};

export default Header;