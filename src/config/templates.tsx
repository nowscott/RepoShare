import React from 'react';
import {BgColorsOutlined, CreditCardOutlined, BulbFilled, CrownOutlined, BuildFilled, SketchOutlined} from '@ant-design/icons';
// import BasicTemplate from '../templates/Basic';
import InkTemplate from '../templates/Ink';
import PixelTemplate from '../templates/Pixel';
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
    name: 'Card',
    icon: <CreditCardOutlined />,
    description: '简洁的卡片式布局，突出展示仓库的核心信息',
    component: CardTemplate
  },
  {
    id: 'luxury',
    name: 'Luxury',
    icon: <SketchOutlined />,
    description: '高端大气的黑金配色，彰显项目价值',
    component: LuxuryTemplate
  },
  {
    id: 'pixel',
    name: 'Pixel',
    icon: <BuildFilled/>,
    description: '像素风格设计，为代码仓库增添复古感',
    component: PixelTemplate
  },
  {
    id: 'modern',
    name: 'Modern',
    icon: <BulbFilled />,
    description: '现代简约风格，清晰展示项目信息',
    component: ModernTemplate
  },
  {
    id: 'elegant',
    name: 'Elegant',
    icon: <CrownOutlined />,
    description: '优雅精致的设计，突出项目品质',
    component: ElegantTemplate
  },
  {
    id: 'ink',
    name: 'Ink',
    icon: <BgColorsOutlined />,
    description: '基础布局模板，清晰实用',
    component: InkTemplate
  }
];

export default templates;