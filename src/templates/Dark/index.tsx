import React from 'react';
import './style.css';

interface DarkTemplateProps {
  repoName?: string;
  repoDescription?: string;
  repoStars?: number;
  repoForks?: number;
  repoLanguage?: string;
}

export const DarkTemplate: React.FC<DarkTemplateProps> = ({
  repoName = 'Repository Name',
  repoDescription = 'Repository Description',
  repoStars = 0,
  repoForks = 0,
  repoLanguage = 'Unknown'
}) => {
  return (
    <div className="dark-template">
      <div className="content">
        <h1 className="repo-name">{repoName}</h1>
        <p className="repo-description">{repoDescription}</p>
        <div className="repo-stats">
          <div className="stat-item">
            <span className="stat-value">{repoStars}</span>
            <span className="stat-label">Stars</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{repoForks}</span>
            <span className="stat-label">Forks</span>
          </div>
          <div className="stat-item language">
            <span className="stat-value">{repoLanguage}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DarkTemplate;