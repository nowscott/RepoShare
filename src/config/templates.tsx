import React from 'react';
import { LayoutOutlined, BgColorsOutlined, CreditCardOutlined, AppstoreOutlined, CrownOutlined, GoldOutlined } from '@ant-design/icons';
import BasicTemplate from '../templates/Basic';
import DarkTemplate from '../templates/Dark';
import CardTemplate from '../templates/Card';
import ModernTemplate from '../templates/Modern';
import ElegantTemplate from '../templates/Elegant';
import LuxuryTemplate from '../templates/Luxury';

export interface TemplateConfig {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  component: React.ComponentType<any>;
}

const templates: TemplateConfig[] = [
  {
    id: 'card',
    name: '卡片模板',
    icon: <CreditCardOutlined />,
    description: '简洁的卡片式布局，突出展示仓库的核心信息',
    component: CardTemplate
  },
  {
    id: 'dark',
    name: '深色模板',
    icon: <BgColorsOutlined />,
    description: '暗色主题设计，为代码仓库增添专业感',
    component: DarkTemplate
  },
  {
    id: 'modern',
    name: '现代模板',
    icon: <AppstoreOutlined />,
    description: '现代简约风格，清晰展示项目信息',
    component: ModernTemplate
  },
  {
    id: 'elegant',
    name: '优雅模板',
    icon: <CrownOutlined />,
    description: '优雅精致的设计，突出项目品质',
    component: ElegantTemplate
  },
  {
    id: 'luxury',
    name: '黑金模板',
    icon: <GoldOutlined />,
    description: '高端大气的黑金配色，彰显项目价值',
    component: LuxuryTemplate
  },
  {
    id: 'basic',
    name: '基础模板',
    icon: <LayoutOutlined />,
    description: '基础布局模板，清晰实用',
    component: BasicTemplate
  }
];

export default templates;