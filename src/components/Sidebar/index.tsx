import React from 'react';
import { Menu } from 'antd';
import { LayoutOutlined } from '@ant-design/icons';

interface SidebarProps {
  selectedTemplate: string;
  onTemplateSelect: (templateId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedTemplate, onTemplateSelect }) => {
  // 临时模板数据，后续将从模板系统中获取
  const templates = [
    { id: 'basic', name: '基础模板', icon: <LayoutOutlined /> },
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