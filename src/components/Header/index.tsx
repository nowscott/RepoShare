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
    <AntHeader className="app-header" style={{ display: 'flex', alignItems: 'center', padding: '0 16px' }}>
      <Title level={4} style={{ margin: 0, color: isDarkMode ? '#ffffff' : '#000000' }}>RepoShare</Title>
      <div style={{ marginLeft: 'auto', flex: 1, maxWidth: '600px' }}>
        <Input onSubmit={onSubmit} />
      </div>
    </AntHeader>
  );
};

export default Header;