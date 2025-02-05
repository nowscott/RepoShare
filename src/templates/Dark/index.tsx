import React from 'react';
import './style.css';
import { DarkTemplateProps } from '../../types/templates';

export const DarkTemplate: React.FC<DarkTemplateProps> = ({
  repoName = 'Repository Name',
  repoDescription = 'Repository Description',
  repoStars = 0,
  repoForks = 0,
  repoLanguages = ['Unknown'],
  authorName,
  authorAvatar,
  homepage,
  showStars = true,
  showForks = true,
  showHomepage = true,
  showAuthorAvatar = true,
  showAuthorName = true
}) => {
  return (
    <div className="dark-template">
      <div className="content">
        <h1 className="repo-name">{repoName}</h1>
        <p className="repo-description">{repoDescription}</p>
        <div className="repo-stats">
          {showStars && (
            <div className="stat-item">
              <span className="stat-value">{repoStars}</span>
              <span className="stat-label">Stars</span>
            </div>
          )}
          {showForks && (
            <div className="stat-item">
              <span className="stat-value">{repoForks}</span>
              <span className="stat-label">Forks</span>
            </div>
          )}
          <div className="language-tags">
            {repoLanguages.map((lang, index) => (
              <span key={index} className="language-tag">{lang}</span>
            ))}
          </div>
        </div>
        <div className="footer">
          {showHomepage && homepage && (
            <a href={homepage} target="_blank" rel="noopener noreferrer" className="homepage-link">
              {homepage}
            </a>
          )}
          {showAuthorName && authorName && (
            <div className="author-info">
              {showAuthorAvatar && authorAvatar && (
                <img src={authorAvatar} alt={authorName} className="author-avatar" />
              )}
              <span className="author-name">{authorName}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DarkTemplate;