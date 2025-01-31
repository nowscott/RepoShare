import React from 'react';
import './style.css';

interface BasicTemplateProps {
  repoName?: string;
  repoDescription?: string;
  repoStars?: number;
  repoForks?: number;
  repoLanguage?: string;
}

export const BasicTemplate: React.FC<BasicTemplateProps> = ({

  repoName = 'Repository Name',
  repoDescription = 'Repository Description',
  repoStars = 0,
  repoForks = 0,
  repoLanguage = 'Unknown'
}) => {
  return (
    <div className="basic-template">
      <h1 className="repo-name">{repoName}</h1>
      <p className="repo-description">{repoDescription}</p>
      <div className="repo-stats">
        <div className="stat-item">
          <span className="stat-label">Stars:</span>
          <span className="stat-value">{repoStars}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Forks:</span>
          <span className="stat-value">{repoForks}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Language:</span>
          <span className="stat-value">{repoLanguage}</span>
        </div>
      </div>
    </div>
  );
};

export default BasicTemplate;