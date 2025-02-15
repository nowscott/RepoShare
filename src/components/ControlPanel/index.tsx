import React from 'react';
import { Menu, Checkbox } from 'antd';
import { StarOutlined, ForkOutlined, HomeOutlined, UserOutlined, IdcardOutlined, ExpandOutlined, FileImageOutlined, ColumnHeightOutlined } from '@ant-design/icons';

interface ControlPanelProps {
  onControlChange: (key: string, value: boolean) => void;
  onResolutionChange: (resolution: Resolution) => void;
  onFormatChange?: (format: Format) => void;
  onLayoutChange?: (layout: Layout) => void;
  controlSettings: {
    showForks: boolean;
    showStars: boolean;
    showHomepage: boolean;
    showAuthorAvatar: boolean;
    showAuthorName: boolean;
  };
  selectedResolution: Resolution;
  selectedFormat?: Format;
  selectedLayout?: Layout;
}

type Resolution = 'x8' | 'x4' | 'x2';
type Format = 'png' | 'jpeg';
type Layout = 'default' | 'portrait';

const ControlPanel: React.FC<ControlPanelProps> = ({ onControlChange, onResolutionChange, onFormatChange, onLayoutChange, controlSettings, selectedResolution, selectedFormat = 'png', selectedLayout = 'default' }) => {
  const controlItems = [
    { key: 'showStars', label: 'Star 数', icon: <StarOutlined /> },
    { key: 'showForks', label: 'Fork 数', icon: <ForkOutlined /> },
    { key: 'showHomepage', label: '主页链接', icon: <HomeOutlined /> },
    { key: 'showAuthorName', label: '作者名称', icon: <IdcardOutlined /> },
    { key: 'showAuthorAvatar', label: '作者头像', icon: <UserOutlined /> }
  ];

  const resolutionItems = [
    { key: 'x8', label: '超高清' },
    { key: 'x4', label: '高清' },
    { key: 'x2', label: '标清' },
  ];

  const formatItems = [
    { key: 'png', label: 'PNG' },
    { key: 'jpeg', label: 'JPEG' },
  ];

  const layoutItems = [
    { key: 'default', label: '默认' },
    { key: 'portrait', label: '竖屏' },
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
          children: resolutionItems.map((item) => ({
            key: item.key,
            label: item.label,
            onClick: () => onResolutionChange(item.key as Resolution)
          }))
        },
        {
          key: 'layout',
          label: '布局方向',
          icon: <ColumnHeightOutlined />,
          children: layoutItems.map((item) => ({
            key: item.key,
            label: item.label,
            onClick: () => onLayoutChange?.(item.key as Layout)
          }))
        },
        {
          key: 'format',
          label: '文件格式',
          icon: <FileImageOutlined />,
          children: formatItems.map((item) => ({
            key: item.key,
            label: item.label,
            onClick: () => onFormatChange?.(item.key as Format)
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

  if (selectedFormat) {
    selectedKeys.push(selectedFormat);
  }

  if (selectedLayout) {
    selectedKeys.push(selectedLayout);
  }

  return (
    <Menu
      mode="inline"
      selectedKeys={selectedKeys}
      items={items}
    />
  );
};

export default ControlPanel;