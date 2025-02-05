import React from 'react';
import { Layout, Typography, Button } from 'antd';
import { StepBackwardFilled, StepForwardFilled, ShareAltOutlined } from '@ant-design/icons';
import Input from '../Input';
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
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>        
        <Button
          type="default"
          icon={leftSiderCollapsed ? (
            <StepForwardFilled style={{ color: '#fa8c16' }} />
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
      <div style={{ flex: '1 1 auto', display: 'flex', alignItems: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', width: '420px' }}>
          <Input onSubmit={onSubmit} />
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Button
            type="default"
            icon={<ShareAltOutlined style={{ color: isDarkMode ? '#ffffff' : '#000000' }} />}
            onClick={() => downloadPreviewImage()}
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
              <StepBackwardFilled style={{ color: '#fa8c16' }} />
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
      </div>
    </AntHeader>
  );
};

export default Header;