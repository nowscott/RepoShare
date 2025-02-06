import React from 'react';
import { Menu, Checkbox } from 'antd';
import { StarOutlined, ForkOutlined, HomeOutlined, UserOutlined, IdcardOutlined } from '@ant-design/icons';

interface ControlPanelProps {
  onControlChange: (key: string, value: boolean) => void;
  controlSettings: {
    showForks: boolean;
    showStars: boolean;
    showHomepage: boolean;
    showAuthorAvatar: boolean;
    showAuthorName: boolean;
  };
}

const ControlPanel: React.FC<ControlPanelProps> = ({ onControlChange, controlSettings }) => {
  const controlItems = [
    { key: 'showStars', label: 'Star 数', icon: <StarOutlined /> },
    { key: 'showForks', label: 'Fork 数', icon: <ForkOutlined /> },
    { key: 'showHomepage', label: '主页链接', icon: <HomeOutlined /> },
    { key: 'showAuthorName', label: '作者名称', icon: <IdcardOutlined /> },
    { key: 'showAuthorAvatar', label: '作者头像', icon: <UserOutlined /> }
  ];

  const items = [
    {
      type: 'group' as const,
      key: 'controls',
      label: '控制栏',
      children: controlItems.map((item) => ({
        key: item.key,
        onClick: () => onControlChange(item.key, !controlSettings[item.key as keyof typeof controlSettings]),
        label: (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Checkbox checked={controlSettings[item.key as keyof typeof controlSettings]} />
              {item.icon}
              {item.label}
            </div>
          </div>
        )
      }))
    }
  ];

  const selectedKeys = Object.entries(controlSettings)
    .filter(([_, value]) => value)
    .map(([key]) => key);

  return (
    <Menu
      mode="inline"
      selectedKeys={selectedKeys}
      style={{ height: '100%', borderRight: 0 }}
      items={items}
      multiple
    />
  );
};

export default ControlPanel;