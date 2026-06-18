import React from 'react';
import templates from '../../config/templates';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { cn } from '../../lib/utils';

interface SidebarProps {
  selectedTemplate: string;
  onTemplateSelect: (templateId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedTemplate, onTemplateSelect }) => {
  return (
    <div className="flex h-full flex-col p-3">
      <div className="px-2 pb-3 pt-1 text-xs font-extrabold text-neutral-500">选择模板</div>
      <ScrollArea className="min-h-0 flex-1">
        <div className="space-y-1">
          {templates.map((template) => {
            const selected = selectedTemplate === template.id;
            return (
              <Button
                key={template.id}
                type="button"
                variant={selected ? 'default' : 'ghost'}
                className={cn('w-full justify-start', selected ? '' : 'text-neutral-700')}
                onClick={() => onTemplateSelect(template.id)}
              >
                <span className="[&_svg]:size-4">{template.icon}</span>
                {template.name}
              </Button>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Sidebar;
