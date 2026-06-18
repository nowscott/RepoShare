import React from 'react';
import templates from '../../config/templates';
import { TemplateProps } from '../../types/templates';

interface PreviewProps extends TemplateProps {
  selectedTemplate: string;
}

const Preview: React.FC<PreviewProps> = (props) => {
  const { selectedTemplate, ...commonProps } = props;
  
  const selectedTemplateConfig = templates.find(template => template.id === selectedTemplate);
  
  if (!selectedTemplateConfig) {
    return <div>未找到对应的模板: {selectedTemplate}</div>;
  }

  const TemplateComponent = selectedTemplateConfig.component;
  return <TemplateComponent {...commonProps} />;
};

export default Preview;
