import React from 'react';
import { Layout, Typography } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import Input from '../Input';

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
        {leftSiderCollapsed ? (
          <MenuUnfoldOutlined
            style={{
              fontSize: '18px',
              color: isDarkMode ? '#ffffff' : '#000000',
              cursor: 'pointer'
            }}
            onClick={onLeftSiderCollapse}
          />
        ) : (
          <MenuFoldOutlined
            style={{
              fontSize: '18px',
              color: isDarkMode ? '#ffffff' : '#000000',
              cursor: 'pointer'
            }}
            onClick={onLeftSiderCollapse}
          />
        )}
        <Title
          level={4}
          style={{
            margin: 0,
            color: isDarkMode ? '#ffffff' : '#000000',
            fontSize: '18px',
            lineHeight: '64px'
          }}
        >
          RepoShare
        </Title>
      </div>
      <div style={{ marginLeft: 'auto', flex: '0 1 420px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Input onSubmit={onSubmit} />
        {rightSiderCollapsed ? (
          <MenuUnfoldOutlined
            style={{
              fontSize: '18px',
              color: isDarkMode ? '#ffffff' : '#000000',
              cursor: 'pointer'
            }}
            onClick={onRightSiderCollapse}
          />
        ) : (
          <MenuFoldOutlined
            style={{
              fontSize: '18px',
              color: isDarkMode ? '#ffffff' : '#000000',
              cursor: 'pointer'
            }}
            onClick={onRightSiderCollapse}
          />
        )}
      </div>
    </AntHeader>
  );
};

export default Header;