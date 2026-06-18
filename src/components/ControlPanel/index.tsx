import { Badge, FileImage, GitFork, Home, Maximize, Rows3, Star, User } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';
import { cn } from '../../lib/utils';
import { CanvasLayout, ContentSettings, ExportFormat, Resolution } from '../../types/editor';

interface ControlPanelProps {
  section: 'content' | 'canvas';
  onControlChange: (key: keyof ContentSettings, value: boolean) => void;
  controlSettings: ContentSettings;
  onResolutionChange?: (resolution: Resolution) => void;
  onFormatChange?: (format: ExportFormat) => void;
  onLayoutChange?: (layout: CanvasLayout) => void;
  selectedResolution?: Resolution;
  selectedFormat?: ExportFormat;
  selectedLayout?: CanvasLayout;
  supportsAuthorAvatar?: boolean;
}

const contentItems: Array<{
  key: keyof ContentSettings;
  label: string;
  description: string;
  icon: React.ReactNode;
}> = [
  { key: 'showStars', label: 'Star 数', description: '显示仓库收藏数量', icon: <Star /> },
  { key: 'showForks', label: 'Fork 数', description: '显示仓库分叉数量', icon: <GitFork /> },
  { key: 'showHomepage', label: '主页链接', description: '显示项目主页或仓库地址', icon: <Home /> },
  { key: 'showAuthorName', label: '作者名称', description: '显示仓库所有者名称', icon: <Badge /> },
  { key: 'showAuthorAvatar', label: '作者头像', description: '仅部分模板支持', icon: <User /> },
];

interface SegmentedControlProps<T extends string> {
  label: string;
  icon: React.ReactNode;
  value: T;
  options: Array<{ value: T; label: string }>;
  onChange?: (value: T) => void;
}

const SegmentedControl = <T extends string>({ label, icon, value, options, onChange }: SegmentedControlProps<T>) => (
  <fieldset className="setting-group">
    <legend>
      <span>{icon}</span>
      {label}
    </legend>
    <div className="segmented-control">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={cn(value === option.value && 'is-selected')}
          onClick={() => onChange?.(option.value)}
          aria-pressed={value === option.value}
        >
          {option.label}
        </button>
      ))}
    </div>
  </fieldset>
);

const ControlPanel: React.FC<ControlPanelProps> = ({
  section,
  onControlChange,
  controlSettings,
  onResolutionChange,
  onFormatChange,
  onLayoutChange,
  selectedResolution = 'x4',
  selectedFormat = 'png',
  selectedLayout = 'default',
  supportsAuthorAvatar = false,
}) => {
  if (section === 'content') {
    return (
      <div className="content-settings">
        {contentItems
          .filter((item) => item.key !== 'showAuthorAvatar' || supportsAuthorAvatar)
          .map((item) => (
            <label key={item.key} className="setting-row">
              <span className="setting-row__icon">{item.icon}</span>
              <span className="setting-row__copy">
                <strong>{item.label}</strong>
                <span>{item.description}</span>
              </span>
              <Checkbox
                checked={controlSettings[item.key]}
                onCheckedChange={(checked) => onControlChange(item.key, checked === true)}
                aria-label={item.label}
              />
            </label>
          ))}
      </div>
    );
  }

  return (
    <div className="canvas-settings">
      <SegmentedControl
        label="布局方向"
        icon={<Rows3 />}
        value={selectedLayout}
        options={[
          { value: 'default', label: '横屏' },
          { value: 'portrait', label: '竖屏' },
        ]}
        onChange={onLayoutChange}
      />
      <SegmentedControl
        label="导出倍率"
        icon={<Maximize />}
        value={selectedResolution}
        options={[
          { value: 'x2', label: '2x' },
          { value: 'x4', label: '4x' },
          { value: 'x8', label: '8x' },
        ]}
        onChange={onResolutionChange}
      />
      <SegmentedControl
        label="文件格式"
        icon={<FileImage />}
        value={selectedFormat}
        options={[
          { value: 'png', label: 'PNG' },
          { value: 'jpeg', label: 'JPEG' },
        ]}
        onChange={onFormatChange}
      />
    </div>
  );
};

export default ControlPanel;
