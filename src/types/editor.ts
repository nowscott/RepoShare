export type EditorTool = 'templates' | 'content' | 'canvas';
export type Resolution = 'x8' | 'x4' | 'x2';
export type ExportFormat = 'png' | 'jpeg';
export type CanvasLayout = 'default' | 'portrait';

export interface ContentSettings {
  showForks: boolean;
  showStars: boolean;
  showHomepage: boolean;
  showAuthorAvatar: boolean;
  showAuthorName: boolean;
}
