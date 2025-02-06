// 基础模板属性接口
export interface BaseTemplateProps {
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

// 带有作者头像的模板属性接口
export interface AvatarTemplateProps extends BaseTemplateProps {
  authorAvatar?: string;
  showAuthorAvatar?: boolean;
}

// 导出具体模板的类型定义
export type BasicTemplateProps = BaseTemplateProps;
export type InkTemplateProps = BaseTemplateProps;
export type ModernTemplateProps = BaseTemplateProps;
export type ElegantTemplateProps = BaseTemplateProps;
export type LuxuryTemplateProps = BaseTemplateProps;
export type PixelTemplateProps = AvatarTemplateProps;
export type CardTemplateProps = AvatarTemplateProps;