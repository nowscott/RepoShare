import React from 'react';
import './style.css';

interface ModernTemplateProps {
  repoName?: string;
  repoDescription?: string;
  repoStars?: number;
  repoForks?: number;
  repoLanguages?: string[];
  authorName?: string;
  homepage?: string;
}

export const ModernTemplate: React.FC<ModernTemplateProps> = ({
  repoName = 'Repository Name',
  repoDescription = 'Repository Description',
  repoStars = 0,
  repoForks = 0,
  repoLanguages = ['Unknown'],
  authorName,
  homepage
}) => {
  return (
    <div className="modern-template">
      <div className="content-wrapper">
        <div className="header">
          <h1 className="repo-name">{repoName}</h1>
          {homepage && (
            <a href={homepage} target="_blank" rel="noopener noreferrer" className="homepage-link">
              {homepage}
            </a>
          )}
        </div>
        <p className="repo-description">{repoDescription}</p>
        <div className="stats-container">
          <div className="stats-wrapper">
            <div className="stat-item">
              <span className="stat-icon">★</span>
              <span className="stat-value">{repoStars}</span>
              <span className="stat-label">Stars</span>
            </div>
            <div className="stat-item">
              <span className="stat-icon">⑂</span>
              <span className="stat-value">{repoForks}</span>
              <span className="stat-label">Forks</span>
            </div>
          </div>
          <div className="languages-wrapper">
            {repoLanguages.map((lang, index) => (
              <span key={index} className="language-tag">{lang}</span>
            ))}
          </div>
        </div>
        {authorName && (
          <div className="author-info">
            <span className="author-label">Created by</span>
            <span className="author-name">{authorName}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModernTemplate;