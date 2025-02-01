import React from 'react';
import { Layout, Typography } from 'antd';
import Input from '../Input';

const { Header: AntHeader } = Layout;
const { Title } = Typography;

interface HeaderProps {
  isDarkMode: boolean;
  onSubmit: (repoUrl: string) => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, onSubmit }) => {
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
      <div style={{ marginLeft: 'auto', flex: '0 1 420px' }}>
        <Input onSubmit={onSubmit} />
      </div>
    </AntHeader>
  );
};

export default Header;