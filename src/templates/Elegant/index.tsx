import React from 'react';
import './style.css';

interface ElegantTemplateProps {
  repoName?: string;
  repoDescription?: string;
  repoStars?: number;
  repoForks?: number;
  repoLanguages?: string[];
  authorName?: string;
  homepage?: string;
  showStars?: boolean;
  showForks?: boolean;
  showHomepage?: boolean;
  showAuthorName?: boolean;
}

export const ElegantTemplate: React.FC<ElegantTemplateProps> = ({
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
    <div className="elegant-template">
      <div className="content-container">
        <div className="main-content">
          <h1 className="repo-name">{repoName}</h1>
          <p className="repo-description">{repoDescription}</p>
          <div className="stats-section">
            <div className="stat-group">
              {showStars && (
                <div className="stat-item">
                  <div className="stat-value">{repoStars}</div>
                  <div className="stat-label">Stars</div>
                </div>
              )}
              {showForks && (
                <div className="stat-item">
                  <div className="stat-value">{repoForks}</div>
                  <div className="stat-label">Forks</div>
                </div>
              )}
            </div>
            <div className="languages-section">
              {repoLanguages.map((lang, index) => (
                <span key={index} className="language-tag">{lang}</span>
              ))}
            </div>
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
              <span className="author-prefix">Created with passion by</span>
              <span className="author-name">{authorName}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ElegantTemplate;