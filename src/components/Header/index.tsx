import React, { useState } from 'react';
import { Layout, Typography, Button, notification } from 'antd';
import { StepBackwardFilled, StepForwardFilled, DownloadOutlined } from '@ant-design/icons';
import Bowser from 'bowser';
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
  selectedResolution: 'x8' | 'x4' | 'x2';
  selectedFormat: 'png' | 'jpeg';
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, onSubmit, leftSiderCollapsed, rightSiderCollapsed, onLeftSiderCollapse, onRightSiderCollapse, selectedResolution, selectedFormat }) => {
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
      const success = await downloadPreviewImage({ scale: scaleMap[selectedResolution], format: selectedFormat });
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
      {contextHolder}
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