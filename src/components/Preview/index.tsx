import React from 'react';
import BasicTemplate from '../../templates/Basic';
import DarkTemplate from '../../templates/Dark';
import CardTemplate from '../../templates/Card';
import ModernTemplate from '../../templates/Modern';
import ElegantTemplate from '../../templates/Elegant';
import LuxuryTemplate from '../../templates/Luxury';

interface PreviewProps {
  selectedTemplate: string;
  repoName: string;
  repoDescription: string;
  repoStars: number;
  repoForks: number;
  repoLanguages: string[];
  authorName?: string;
  authorAvatar?: string;
  homepage?: string;
  showStars: boolean;
  showForks: boolean;
  showHomepage: boolean;
  showAuthorAvatar: boolean;
  showAuthorName: boolean;
}

const Preview: React.FC<PreviewProps> = (props) => {
  const { selectedTemplate, ...commonProps } = props;
  
  const templates = {
    basic: BasicTemplate,
    dark: DarkTemplate,
    card: CardTemplate,
    modern: ModernTemplate,
    elegant: ElegantTemplate,
    luxury: LuxuryTemplate
  };

  const SelectedTemplate = templates[selectedTemplate as keyof typeof templates];

  if (!SelectedTemplate) {
    return <div>未找到对应的模板: {selectedTemplate}</div>;
  }

  return <SelectedTemplate {...commonProps} />;
};

export default Preview;