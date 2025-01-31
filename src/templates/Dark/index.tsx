import React from 'react';
import './style.css';

interface DarkTemplateProps {
  repoName?: string;
  repoDescription?: string;
  repoStars?: number;
  repoForks?: number;
  repoLanguages?: string[];
  authorName?: string;
  authorAvatar?: string;
  homepage?: string;
}

export const DarkTemplate: React.FC<DarkTemplateProps> = ({
  repoName = 'Repository Name',
  repoDescription = 'Repository Description',
  repoStars = 0,
  repoForks = 0,
  repoLanguages = ['Unknown']
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
          <div className="language-tags">
            {repoLanguages.map((lang, index) => (
              <span key={index} className="language-tag">{lang}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DarkTemplate;