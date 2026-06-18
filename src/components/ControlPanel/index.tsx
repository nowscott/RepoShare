import React from 'react';
import { Badge, ChevronDown, FileImage, GitFork, Home, Maximize, Rows3, Star, User } from 'lucide-react';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Separator } from '../ui/separator';

interface ControlPanelProps {
  onControlChange: (key: string, value: boolean) => void;
  onResolutionChange: (resolution: Resolution) => void;
  onFormatChange?: (format: Format) => void;
  onLayoutChange?: (layout: Layout) => void;
  controlSettings: {
    showForks: boolean;
    showStars: boolean;
    showHomepage: boolean;
    showAuthorAvatar: boolean;
    showAuthorName: boolean;
  };
  selectedResolution: Resolution;
  selectedFormat?: Format;
  selectedLayout?: Layout;
  supportsAuthorAvatar?: boolean;
}

type Resolution = 'x8' | 'x4' | 'x2';
type Format = 'png' | 'jpeg';
type Layout = 'default' | 'portrait';

const ControlPanel: React.FC<ControlPanelProps> = ({ onControlChange, onResolutionChange, onFormatChange, onLayoutChange, controlSettings, selectedResolution, selectedFormat = 'png', selectedLayout = 'default', supportsAuthorAvatar = false }) => {
  const controlItems: Array<{ key: keyof typeof controlSettings; label: string; icon: React.ReactNode }> = [
    { key: 'showStars', label: 'Star 数', icon: <Star /> },
    { key: 'showForks', label: 'Fork 数', icon: <GitFork /> },
    { key: 'showHomepage', label: '主页链接', icon: <Home /> },
    { key: 'showAuthorName', label: '作者名称', icon: <Badge /> },
    ...(supportsAuthorAvatar ? [{ key: 'showAuthorAvatar' as const, label: '作者头像', icon: <User /> }] : [])
  ];

  const resolutionItems = [
    { key: 'x8', label: '超高清' },
    { key: 'x4', label: '高清' },
    { key: 'x2', label: '标清' },
  ];

  const formatItems = [
    { key: 'png', label: 'PNG' },
    { key: 'jpeg', label: 'JPEG' },
  ];

  const layoutItems = [
    { key: 'default', label: '默认' },
    { key: 'portrait', label: '竖屏' },
  ];

  const pickerClassName = 'w-full justify-between rounded-lg';

  const renderPicker = <T extends string>(
    label: string,
    icon: React.ReactNode,
    value: T,
    options: Array<{ key: T; label: string }>,
    onChange: (value: T) => void,
  ) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" className={pickerClassName}>
          <span className="flex items-center gap-2">
            {icon}
            {label}
          </span>
          <ChevronDown className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-40">
        <DropdownMenuRadioGroup value={value} onValueChange={(nextValue) => onChange(nextValue as T)}>
          {options.map((item) => (
            <DropdownMenuRadioItem key={item.key} value={item.key}>
              {item.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <div className="flex h-full flex-col p-3">
      <div className="px-2 pb-3 pt-1 text-xs font-extrabold text-neutral-500">控制栏</div>
      <div className="space-y-2">
        {renderPicker('分辨率', <Maximize className="size-4" />, selectedResolution, resolutionItems as Array<{ key: Resolution; label: string }>, onResolutionChange)}
        {renderPicker('布局方向', <Rows3 className="size-4" />, selectedLayout, layoutItems as Array<{ key: Layout; label: string }>, (value) => onLayoutChange?.(value))}
        {renderPicker('文件格式', <FileImage className="size-4" />, selectedFormat, formatItems as Array<{ key: Format; label: string }>, (value) => onFormatChange?.(value))}
      </div>
      <Separator className="my-3" />
      <div className="space-y-2">
        {controlItems.map((item) => (
          <div
            key={item.key}
            role="button"
            tabIndex={0}
            className="flex h-10 w-full items-center gap-2 rounded-lg bg-neutral-950 px-3 text-left text-sm font-semibold text-white transition-colors hover:bg-neutral-800"
            onClick={() => onControlChange(item.key, !controlSettings[item.key])}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onControlChange(item.key, !controlSettings[item.key]);
              }
            }}
          >
            <Checkbox checked={controlSettings[item.key]} className="border-white/25 data-[state=checked]:bg-blue-500" />
            <span className="[&_svg]:size-4">{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ControlPanel;
