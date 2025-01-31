import React from 'react';
import BasicTemplate from '../../templates/Basic';
import DarkTemplate from '../../templates/Dark';
import CardTemplate from '../../templates/Card';

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
}

const Preview: React.FC<PreviewProps> = ({ selectedTemplate, repoName, repoDescription, repoStars, repoForks, repoLanguages, authorName, authorAvatar, homepage }) => {
  switch (selectedTemplate) {
    case 'basic':
      return <BasicTemplate
        repoName={repoName}
        repoDescription={repoDescription}
        repoStars={repoStars}
        repoForks={repoForks}
        repoLanguages={repoLanguages}
        authorName={authorName}
        homepage={homepage}
      />;
    case 'dark':
      return <DarkTemplate
        repoName={repoName}
        repoDescription={repoDescription}
        repoStars={repoStars}
        repoForks={repoForks}
        repoLanguages={repoLanguages}
        authorName={authorName}
        authorAvatar={authorAvatar}
        homepage={homepage}
      />;
    case 'card':
      return <CardTemplate
        repoName={repoName}
        repoDescription={repoDescription}
        repoStars={repoStars}
        repoForks={repoForks}
        repoLanguages={repoLanguages}
        authorName={authorName}
        authorAvatar={authorAvatar}
        homepage={homepage}
      />;
    default:
      return <div>未找到对应的模板: {selectedTemplate}</div>;
  }
};

export default Preview;