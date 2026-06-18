import { Frame, LayoutTemplate, SlidersHorizontal } from 'lucide-react';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { cn } from '../../lib/utils';
import { EditorTool } from '../../types/editor';

interface ToolRailProps {
  activeTool: EditorTool | null;
  onToolChange: (tool: EditorTool) => void;
}

const tools = [
  { id: 'templates' as const, label: '模板', icon: LayoutTemplate },
  { id: 'content' as const, label: '内容', icon: SlidersHorizontal },
  { id: 'canvas' as const, label: '画布', icon: Frame },
];

const ToolRail: React.FC<ToolRailProps> = ({ activeTool, onToolChange }) => (
  <nav className="tool-rail" aria-label="编辑工具">
    {tools.map(({ id, label, icon: Icon }) => (
      <Tooltip key={id}>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={cn('tool-rail__button', activeTool === id && 'is-active')}
            onClick={() => onToolChange(id)}
            aria-label={label}
            aria-pressed={activeTool === id}
          >
            <Icon />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">{label}</TooltipContent>
      </Tooltip>
    ))}
  </nav>
);

export default ToolRail;
