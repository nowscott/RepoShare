import React from 'react';
import { Card } from 'antd';
import BasicTemplate from '../../templates/Basic';

interface PreviewProps {
  selectedTemplate: string;
}

const Preview: React.FC<PreviewProps> = ({ selectedTemplate }) => {
  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'basic':
        return <BasicTemplate />;
      default:
        return <div>未找到对应的模板: {selectedTemplate}</div>;
    }
  };

  return (
    <div style={{ padding: '16px', height: '100%' }}>
      <Card
        style={{
          width: '100%',
          height: '100%',
          overflow: 'hidden'
        }}
        styles={{
          body: {
            width: '100%',
            height: '100%',
            padding: 0
          }
        }}
      >
        {renderTemplate()}
      </Card>
    </div>
  );
};

export default Preview;