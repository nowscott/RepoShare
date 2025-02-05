import React from 'react';
import './style.css';

interface BasicTemplateProps {
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
    <div className="basic-template-wrapper">
      <div className="basic-template">
        <h1 className="repo-name">{repoName}</h1>
        {showHomepage && homepage && (
          <a href={homepage} target="_blank" rel="noopener noreferrer" className="repo-homepage">
            {homepage}
          </a>
        )}
        <p className="repo-description">{repoDescription}</p>
        <div className="repo-stats">
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