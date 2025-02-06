import React from 'react';
import './style.css';
import { CardTemplateProps } from '../../types/templates';

export const CardTemplate: React.FC<CardTemplateProps> = ({
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
    <div className="card-template">
      <div className="watermark">Designed by RepoShare © NowScott</div>
      <div className="card">
        <div className="card-header">
          <div className="header-content">
            <div className="title-row">
              <h1 className="repo-name">{repoName}</h1>
              <div className="language-tags">
                {repoLanguages.map((lang, index) => (
                  <span key={index} className="language-tag">{lang}</span>
                ))}
              </div>
            </div>
            <p className="repo-description">{repoDescription}</p>
          </div>
        </div>
        <div className="card-body">
          <div className="repo-stats">
            {showStars && (
              <div className="stat-item">
                <span className="stat-icon">★</span>
                <span className="stat-value">{repoStars}</span>
              </div>
            )}
            {showForks && (
              <div className="stat-item">
                <span className="stat-icon">⑂</span>
                <span className="stat-value">{repoForks}</span>
              </div>
            )}
          </div>
        </div>
        <div className="card-footer">
          <div className="footer-left">
            {showHomepage && homepage && (
              <a href={homepage} target="_blank" rel="noopener noreferrer" className="homepage-link">
                {homepage}
              </a>
            )}
          </div>
          <div className="footer-right">
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
    </div>
  );
};

export default CardTemplate;