import React from 'react';
import BasicTemplate from '../../templates/Basic';
import DarkTemplate from '../../templates/Dark';
import CardTemplate from '../../templates/Card';

interface PreviewProps {
  selectedTemplate: string;
}

const Preview: React.FC<PreviewProps> = ({ selectedTemplate }) => {
  switch (selectedTemplate) {
    case 'basic':
      return <BasicTemplate
        repoName="RepoShare"
        repoDescription="一个用于生成 GitHub 仓库预览图的工具，支持多种模板和自定义样式。"
        repoStars={100}
        repoForks={20}
        repoLanguage="TypeScript"
      />;
    case 'dark':
      return <DarkTemplate
        repoName="RepoShare"
        repoDescription="一个用于生成 GitHub 仓库预览图的工具，支持多种模板和自定义样式。"
        repoStars={100}
        repoForks={20}
        repoLanguage="TypeScript"
      />;
    case 'card':
      return <CardTemplate
        repoName="RepoShare"
        repoDescription="一个用于生成 GitHub 仓库预览图的工具，支持多种模板和自定义样式。"
        repoStars={100}
        repoForks={20}
        repoLanguage="TypeScript"
      />;
    default:
      return <div>未找到对应的模板: {selectedTemplate}</div>;
  }
};

export default Preview;