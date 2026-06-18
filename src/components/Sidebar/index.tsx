import templates from '../../config/templates';
import { cn } from '../../lib/utils';

interface SidebarProps {
  selectedTemplate: string;
  onTemplateSelect: (templateId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedTemplate, onTemplateSelect }) => (
  <div className="template-list" role="list">
    {templates.map((template) => {
      const selected = selectedTemplate === template.id;
      return (
        <button
          key={template.id}
          type="button"
          className={cn('template-list__item', selected && 'is-selected')}
          onClick={() => onTemplateSelect(template.id)}
          aria-pressed={selected}
        >
          <span className="template-list__icon">{template.icon}</span>
          <span className="template-list__copy">
            <strong>{template.name}</strong>
            <span>{template.description}</span>
          </span>
        </button>
      );
    })}
  </div>
);

export default Sidebar;
