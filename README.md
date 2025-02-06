# RepoShare 仓库分享图生成器

RepoShare 是一款专注于提升开源项目展示效果的现代化工具。它能够为 GitHub 仓库生成精美的分享图片，让您的项目在社交媒体和技术社区中脱颖而出。通过结合精心设计的模板系统和灵活的自定义选项，RepoShare 帮助开发者以更专业、更有吸引力的方式展示他们的项目成果。无论是开源库、个人项目还是商业应用，RepoShare 都能为其打造独具特色的视觉标识。

## ✨ 主要特点

### 🎨 丰富多样的模板系统

RepoShare 提供了一套完整的模板系统，涵盖了多种设计风格和布局方案。每个模板都经过精心设计，既能突出项目的核心信息，又能体现独特的视觉美感。用户可以根据项目的性质和个人偏好，选择最适合的模板风格。不仅如此，我们还支持模板的主题色自定义，让您能够完美匹配项目的品牌标识。通过灵活的布局组合方式，您可以创造出独一无二的展示效果。

### 🔄 智能化的实时预览

为了提供最佳的用户体验，RepoShare 采用了先进的实时预览技术。当您调整任何设置或修改样式时，变化会立即反映在预览界面上，实现真正的所见即所得。这种即时反馈机制大大提高了定制效率，让您能够快速找到最理想的展示效果。系统的响应速度经过优化，即使在复杂的样式调整过程中也能保持流畅的操作体验。

### 🎯 强大的自定义能力

RepoShare 不仅提供了丰富的预设选项，更重要的是它具备强大的自定义能力。您可以调整字体样式、修改配色方案、自定义组件布局，让生成的分享图完全符合您的设计理念。这种灵活的自定义特性，使得 RepoShare 能够满足各种专业场景的需求，无论是个人开发者还是企业团队，都能找到适合自己的定制方案。

## 🚀 快速开始

### 在线使用

1. 访问 [RepoShare 官方网站](https://r.0211120.xyz/)
2. 输入 GitHub 仓库地址（格式：用户名/仓库名）
3. 选择喜欢的模板并预览效果
4. 点击下载按钮获取分享图

### 本地开发

```bash
# 克隆项目
git clone https://github.com/nowscott/RepoShare.git

# 进入项目目录
cd RepoShare

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 🎨 模板展示

### 基础模板 (Basic)
Basic 模板采用简洁大方的设计风格，以清晰的层次结构展示仓库的核心信息。这款模板特别注重信息的可读性和直观性，将项目的名称、描述、统计数据等关键信息进行合理布局，是展示各类项目的理想选择。其简约而不简单的设计理念，让项目信息能够快速准确地传达给目标受众。

### 卡片模板 (Card)
Card 模板融合了现代化的卡片布局设计，通过精心调校的阴影效果和间距关系，营造出层次分明的视觉体验。这种设计不仅让信息展示更加有序，还能突出重点内容，特别适合需要展示多维度信息的项目。优雅的过渡动画为静态内容注入了生动的活力。

### 深色模板 (Dark)
Dark 模板为追求独特视觉体验的项目量身打造，采用深色主题设计，配以精心调校的高对比度视觉元素，在保证信息清晰度的同时，带来沉浸式的观感体验。这款模板特别适合在弱光环境下浏览，也非常适合展示技术感较强的项目。

### 优雅模板 (Elegant)
Elegant 模板以精致的排版设计为核心，将优雅与功能性完美结合。每一处细节都经过精心打磨，从字体搭配到间距比例，都体现出专业的设计美学。流畅的动画过渡让信息的展示与切换更加自然，为项目增添了独特的品质感。

### 豪华模板 (Luxury)
Luxury 模板采用高端大气的设计风格，通过丰富的视觉元素和精心设计的布局，展现项目的非凡品质。这款模板特别适合需要突出展示的重点项目，其独特的设计语言和精致的细节处理，能够让您的项目在众多开源作品中脱颖而出。

### 现代模板 (Modern)
Modern 模板秉承极简主义设计理念，以简约的视觉语言传达项目信息。清晰的信息结构和现代感的设计元素完美融合，创造出既简洁又不失个性的展示效果。这款模板特别适合那些注重现代设计美学的项目。

## 🛠️ 技术栈

### 前端框架
RepoShare 选择了 React 18.x 作为核心前端框架，充分利用其强大的组件化架构和先进的状态管理能力。我们采用函数式组件和 Hooks 范式进行开发，不仅确保了代码的可维护性，还提供了出色的性能表现。React 的虚拟 DOM 和高效渲染机制，为复杂的图片生成功能提供了坚实的技术基础。

### UI 框架
项目采用 Ant Design 5.x 作为 UI 框架，这是一套成熟的企业级 UI 设计语言和 React 组件库。通过 Ant Design 提供的丰富组件和主题定制能力，我们能够快速构建美观且功能完备的用户界面。其内置的响应式布局系统，让应用能够完美适配各种屏幕尺寸。

### 开发工具
在开发工具选择上，我们使用 TypeScript 来确保代码的类型安全和可维护性。TypeScript 的静态类型检查和智能提示功能，大大提高了开发效率和代码质量。同时，我们选用 Vite 作为构建工具，其快速的热更新和高效的构建优化，为开发者提供了出色的开发体验。

### 图片处理
在图片处理方面，我们综合运用了 HTML Canvas 和 dom-to-image 技术。HTML Canvas 提供了高性能的绘图能力，支持实时渲染复杂的图形效果。而 dom-to-image 则让我们能够将 DOM 节点无缝转换为多种格式的图片，确保生成的分享图片保持高质量的视觉效果。这两项技术的结合，为实现高质量的图片生成功能提供了强大支持。

## 🤝 贡献指南
### 模板开发指南
#### 模板结构

每个模板都需要包含以下文件：

```
src/templates/YourTemplate/
├── index.tsx    # 模板的主要组件
└── style.css    # 模板的样式文件
```

#### 模板配置

所有模板的配置信息都集中在 `src/config/templates.tsx` 文件中管理。每个模板需要在此文件中添加相应的配置信息，包括：

```typescript
interface TemplateConfig {
  id: string;        // 模板的唯一标识
  name: string;      // 模板的显示名称
  icon: ReactNode;   // 模板的图标组件
  description: string; // 模板的描述信息
  component: React.ComponentType<any>; // 模板的组件
}
```

示例配置：

```typescript
{
  id: 'modern',
  name: '现代模板',
  icon: <AppstoreOutlined />,
  description: '现代简约风格，清晰展示项目信息',
  component: ModernTemplate
}
```

#### 模板属性

每个模板组件都会接收以下属性：

```typescript
interface TemplateProps {
  repoName: string;          // 仓库名称
  repoDescription: string;   // 仓库描述
  repoStars: number;         // Star 数量
  repoForks: number;         // Fork 数量
  repoLanguages: string[];   // 仓库使用的编程语言
  authorName?: string;       // 作者名称
  authorAvatar?: string;     // 作者头像
  homepage?: string;         // 主页链接
  showStars?: boolean;       // 是否显示 Star 数
  showForks?: boolean;       // 是否显示 Fork 数
  showHomepage?: boolean;    // 是否显示主页链接
  showAuthorName?: boolean;  // 是否显示作者名称
  showAuthorAvatar?: boolean; // 是否显示作者头像
}
```

#### 开发步骤

1. **创建模板目录**
   - 在 `src/templates` 目录下创建新的模板文件夹
   - 文件夹名称应使用 PascalCase 命名规范（如 `Modern`, `Elegant`）

2. **实现模板组件**
   ```typescript
   import React from 'react';
   import './style.css';
   import { TemplateProps } from '../../types/templates';

   export const YourTemplate: React.FC<TemplateProps> = ({
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
       <div className="your-template">
         {/* 实现模板布局和样式 */}
       </div>
     );
   };

   export default YourTemplate;
   ```

3. **添加配置信息**
   - 在 `src/config/templates.tsx` 中添加新模板的配置
   - 确保配置信息完整，包括 id、name、icon、description 和 component

4. **添加预览图**
   - 在 `public/previews/` 目录下添加模板预览图
   - 建议图片尺寸保持一致（推荐 750x400px）
   - 使用 PNG 格式以保证最佳显示效果

#### 注意事项

1. **样式隔离**
   - 使用特定的类名前缀避免样式冲突（如 `.your-template-xxx`）
   - 所有样式应在 `style.css` 文件中定义
   - 避免使用全局样式

2. **响应式设计**
   - 确保模板在预览窗口（750px 宽度）中正确显示
   - 使用相对单位（rem, em, %）进行布局
   - 适当使用媒体查询适配不同尺寸

3. **性能优化**
   - 避免不必要的嵌套和复杂的 CSS 选择器
   - 合理使用 React 的 memo 和 useMemo 优化渲染
   - 优化图片和动画性能

4. **可配置性**
   - 支持所有通用的显示控制选项
   - 为所有属性提供合理的默认值
   - 确保配置项的实时预览效果

5. **代码规范**
   - 遵循项目的 TypeScript 和 ESLint 规范
   - 添加必要的代码注释
   - 确保代码的可维护性和可读性

6. **提交准备**
   - 完成完整的本地测试
   - 更新模板展示文档
   - 提供使用示例和效果预览

7. **添加配置信息**
   - 在 `src/config/templates.tsx` 中添加新模板的配置
   - 确保配置信息完整，包括 id、name、icon、description 和 component

8. **添加预览图**
   - 在 `public/previews/` 目录下添加模板预览图
   - 建议图片尺寸保持一致（推荐 750x400px）
   - 使用 PNG 格式以保证最佳显示效果

## 📄 开源协议

本项目采用 MIT 协议开源，详见 [LICENSE](LICENSE) 文件。