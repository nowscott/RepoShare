import React from 'react';
import { Menu } from 'antd';
import templates from '../../config/templates';

interface SidebarProps {
  selectedTemplate: string;
  onTemplateSelect: (templateId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedTemplate, onTemplateSelect }) => {
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