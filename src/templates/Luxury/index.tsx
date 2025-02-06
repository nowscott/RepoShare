import React from 'react';
import './style.css';
import { LuxuryTemplateProps } from '../../types/templates';
import { QRCode } from 'antd';

export const LuxuryTemplate: React.FC<LuxuryTemplateProps> = ({
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
    <div className="luxury-template">
      <div className="watermark">Designed by RepoShare © NowScott</div>
      <div className="content-wrapper">
        <div className="header">
          <h1 className="repo-name">{repoName}</h1>
          <div className="homepage-section">
            {showHomepage && homepage && (
              <div className="qrcode-wrapper">
                <QRCode
                  value={homepage}
                  errorLevel={'H'}
                  size={88}
                  color="#ce9b57"
                />
              </div>
            )}
          </div>
        </div>
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
        </div>
        <div className="footer-content">
          <div className="language-tags">
            {repoLanguages.map((lang, index) => (
              <span key={index} className="language-tag">
                {lang}
              </span>
            ))}
          </div>
          {showAuthorName && authorName && (
            <div className="author-info">
              <span className="author-prefix">Crafted with excellence by</span>
              <span className="author-name">{authorName}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LuxuryTemplate;