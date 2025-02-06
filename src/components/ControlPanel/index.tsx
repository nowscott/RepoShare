import React from 'react';
import { Menu, Checkbox } from 'antd';
import { StarOutlined, ForkOutlined, HomeOutlined, UserOutlined, IdcardOutlined, ExpandOutlined } from '@ant-design/icons';

interface ControlPanelProps {
  onControlChange: (key: string, value: boolean) => void;
  onResolutionChange: (resolution: Resolution) => void;
  controlSettings: {
    showForks: boolean;
    showStars: boolean;
    showHomepage: boolean;
    showAuthorAvatar: boolean;
    showAuthorName: boolean;
  };
  selectedResolution: Resolution;
}

type Resolution = 'x8' | 'x4' | 'x2';

const ControlPanel: React.FC<ControlPanelProps> = ({ onControlChange, onResolutionChange, controlSettings, selectedResolution }) => {
  const controlItems = [
    { key: 'showStars', label: 'Star 数', icon: <StarOutlined /> },
    { key: 'showForks', label: 'Fork 数', icon: <ForkOutlined /> },
    { key: 'showHomepage', label: '主页链接', icon: <HomeOutlined /> },
    { key: 'showAuthorName', label: '作者名称', icon: <IdcardOutlined /> },
    { key: 'showAuthorAvatar', label: '作者头像', icon: <UserOutlined /> }
  ];

  const resolutionItems = [
    { key: 'x8', label: '8倍尺寸' },
    { key: 'x4', label: '4倍尺寸' },
    { key: 'x2', label: '2倍尺寸' },
  ];

  const items = [
    {
      key: 'controls',
      label: '控制栏',
      type: 'group' as const,
      children: [
        {
          key: 'resolution',
          label: '分辨率',
          icon: <ExpandOutlined />,
          style: { borderTop: '1px solid rgba(0, 0, 0, 0.06)' },
          children: resolutionItems.map((item) => ({
            key: item.key,
            label: item.label,
            onClick: () => onResolutionChange(item.key as Resolution)
          }))
        },
        {
          type: 'divider' as const
        },
        ...controlItems.map((item) => ({
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
      ]
    }
  ];

  const selectedKeys = [
    ...Object.entries(controlSettings)
      .filter(([_, value]) => value)
      .map(([key]) => key)
  ];

  if (selectedResolution) {
    selectedKeys.push(selectedResolution);
  }

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