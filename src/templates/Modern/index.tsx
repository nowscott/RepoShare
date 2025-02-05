import React from 'react';
import './style.css';

import { ModernTemplateProps } from '../../types/templates';

export const ModernTemplate: React.FC<ModernTemplateProps> = ({
  repoName = 'Repository Name',
  repoDescription = 'Repository Description',
  repoStars = 0,
  repoForks = 0,
  repoLanguages = ['Unknown'],
  authorName,
  homepage,
  showStars = true,
  showForks = true,
  showHomepage = true,
  showAuthorName = true
}) => {
  return (
    <div className="modern-template">
      <div className="content-wrapper">
        <div className="header">
          <h1 className="repo-name">{repoName}</h1>
          {showHomepage && homepage && (
            <a href={homepage} target="_blank" rel="noopener noreferrer" className="homepage-link">
              {homepage}
            </a>
          )}
        </div>
        <p className="repo-description">{repoDescription}</p>
        <div className="stats-container">
          <div className="stats-wrapper">
            {showStars && (
              <div className="stat-item">
                <span className="stat-icon">★</span>
                <span className="stat-value">{repoStars}</span>
                <span className="stat-label">Stars</span>
              </div>
            )}
            {showForks && (
              <div className="stat-item">
                <span className="stat-icon">⑂</span>
                <span className="stat-value">{repoForks}</span>
                <span className="stat-label">Forks</span>
              </div>
            )}
          </div>
          <div className="languages-wrapper">
            {repoLanguages.map((lang, index) => (
              <span key={index} className="language-tag">{lang}</span>
            ))}
          </div>
        </div>
        {showAuthorName && authorName && (
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