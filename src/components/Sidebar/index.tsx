import React from 'react';
import { Menu } from 'antd';
import { LayoutOutlined, BgColorsOutlined, CreditCardOutlined, AppstoreOutlined, CrownOutlined, GoldOutlined } from '@ant-design/icons';

interface SidebarProps {
  selectedTemplate: string;
  onTemplateSelect: (templateId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedTemplate, onTemplateSelect }) => {
  const templates = [
    { id: 'basic', name: '基础模板', icon: <LayoutOutlined /> },
    { id: 'dark', name: '深色模板', icon: <BgColorsOutlined /> },
    { id: 'card', name: '卡片模板', icon: <CreditCardOutlined /> },
    { id: 'modern', name: '现代模板', icon: <AppstoreOutlined /> },
    { id: 'elegant', name: '优雅模板', icon: <CrownOutlined /> },
    { id: 'luxury', name: '黑金模板', icon: <GoldOutlined /> },
  ];

  const items = [
    {
      type: 'group' as const,
      key: 'templates',
      label: '选择模板',
      children: templates.map((template) => ({
        key: template.id,
        icon: template.icon,
        label: template.name,
        onClick: () => onTemplateSelect(template.id)
      }))
    }
  ];

  return (
    <Menu
      mode="inline"
      selectedKeys={[selectedTemplate]}
      style={{ height: '100%', borderRight: 0 }}
      items={items}
    />
  );
};

export default Sidebar;