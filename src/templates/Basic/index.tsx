import React from 'react';
import './style.css';
import { BasicTemplateProps } from '../../types/templates';

export const BasicTemplate: React.FC<BasicTemplateProps> = ({
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
    <div className="basic-template">
      <div className="content-wrapper">
        <div className="header">
          <h1 className="repo-name">{repoName}</h1>
          {showHomepage && homepage && (
            <a href={homepage} target="_blank" rel="noopener noreferrer" className="repo-homepage">
              {homepage}
            </a>
          )}
        </div>
        <p className="repo-description">{repoDescription}</p>
        <div className="repo-stats">
          <div className="stats-group">
            {showStars && (
              <div className="stat-item">
                <span className="stat-label">Stars:</span>
                <span className="stat-value">{repoStars}</span>
              </div>
            )}
            {showForks && (
              <div className="stat-item">
                <span className="stat-label">Forks:</span>
                <span className="stat-value">{repoForks}</span>
              </div>
            )}
          </div>
          <div className="stat-item languages">
            <span className="stat-label">Languages:</span>
            <div className="language-tags">
              {repoLanguages.map((lang, index) => (
                <span key={index} className="language-tag">{lang}</span>
              ))}
            </div>
          </div>
        </div>
        {showAuthorName && authorName && (
          <div className="author-info">
            <span className="copyright">©</span>
            <span className="author-name">{authorName}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default BasicTemplate;