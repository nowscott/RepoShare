import React from 'react';
import './style.css';

interface CardTemplateProps {
  repoName?: string;
  repoDescription?: string;
  repoStars?: number;
  repoForks?: number;
  repoLanguages?: string[];
  authorName?: string;
  authorAvatar?: string;
  homepage?: string;
}

export const CardTemplate: React.FC<CardTemplateProps> = ({
  repoName = 'Repository Name',
  repoDescription = 'Repository Description',
  repoStars = 0,
  repoForks = 0,
  repoLanguages = ['Unknown'],
  authorName,
  authorAvatar,
  homepage
}) => {
  return (
    <div className="card-template">
      <div className="card">
        <div className="card-header">
          <h1 className="repo-name">{repoName}</h1>
          <div className="language-tags">
            {repoLanguages.map((lang, index) => (
              <span key={index} className="language-tag">{lang}</span>
            ))}
          </div>
        </div>
        <p className="repo-description">{repoDescription}</p>
        <div className="repo-stats">
          <div className="stat-item">
            <span className="stat-icon">★</span>
            <span className="stat-value">{repoStars}</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">⑂</span>
            <span className="stat-value">{repoForks}</span>
          </div>
        </div>
        <div className="card-footer">
          {homepage && (
            <a href={homepage} target="_blank" rel="noopener noreferrer" className="homepage-link">
              {homepage}
            </a>
          )}
          {authorName && (
            <div className="author-info">
              {authorAvatar && (
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

export default CardTemplate;