import React from 'react';
import './style.css';
import { PixelTemplateProps } from '../../types/templates';
import { QRCode } from 'antd';

export const PixelTemplate: React.FC<PixelTemplateProps> = ({
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
    <div className="pixel-template">
      <div className="watermark">Designed by RepoShare © NowScott</div>
      <div className="content">
        <h1 className="repo-name">{repoName}</h1>
        <p className="repo-description">{repoDescription}</p>
        <div className="repo-stats">
          <div className="stat-items">
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
          <div className="language-tags">
            {repoLanguages.map((lang, index) => (
              <span key={index} className="language-tag">{lang}</span>
            ))}
          </div>
        </div>
        <div className="footer">
        {showHomepage && homepage && (
            <div className="qrcode-wrapper">
              <QRCode
                value={homepage}
                errorLevel='M'
                size={64}
                color="#59A6FF"
                bordered={false}
              />
            </div>
          )}
          <div className="author-info">
            {showAuthorAvatar && authorAvatar && (
              <img src={authorAvatar} alt="author" className="author-avatar" />
            )}
            {showAuthorName && authorName && (
              <span className="author-name">{authorName}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PixelTemplate;