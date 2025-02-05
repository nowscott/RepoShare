import React from 'react';
import { Menu, Checkbox } from 'antd';
import { StarOutlined, ForkOutlined, HomeOutlined, UserOutlined, IdcardOutlined } from '@ant-design/icons';

interface PreviewControlProps {
  onControlChange: (key: string, value: boolean) => void;
  controls: {
    showForks: boolean;
    showStars: boolean;
    showHomepage: boolean;
    showAuthorAvatar: boolean;
    showAuthorName: boolean;
  };
}

const PreviewControl: React.FC<PreviewControlProps> = ({ onControlChange, controls }) => {
  const controlItems = [
    { key: 'showStars', label: 'Star 数', icon: <StarOutlined /> },
    { key: 'showForks', label: 'Fork 数', icon: <ForkOutlined /> },
    { key: 'showHomepage', label: '主页链接', icon: <HomeOutlined /> },
    { key: 'showAuthorAvatar', label: '作者头像', icon: <UserOutlined /> },
    { key: 'showAuthorName', label: '作者名称', icon: <IdcardOutlined /> },
  ];

  const items = [
    {
      type: 'group' as const,
      key: 'controls',
      label: '显示控制',
      children: controlItems.map((item) => ({
        key: item.key,
        onClick: () => onControlChange(item.key, !controls[item.key as keyof typeof controls]),
        label: (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Checkbox checked={controls[item.key as keyof typeof controls]} />
              {item.icon}
              {item.label}
            </div>
          </div>
        )
      }))
    }
  ];

  const selectedKeys = Object.entries(controls)
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

export default PreviewControl;