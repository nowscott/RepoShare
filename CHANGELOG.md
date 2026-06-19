# Changelog

RepoShare 的重要版本变化记录在此。版本号遵循 Semantic Versioning。

## [1.0.2] - 2026-06-19

### Changed

- 模板字体统一迁移至 NowFont 字体服务，并使用按字符切分的 WOFF2 资源加载。
- 为各模板补充可靠的中文字体回退栈，保留原有视觉风格。

### Fixed

- 修复原字体 CDN 返回 403 导致模板字体加载失败的问题。
- 修复字体加载完成后仓库标题、描述、统计图标及作者信息发生遮挡或裁切的问题。
- 修复长仓库名、长描述和主页地址在横竖画布中的溢出问题。

## [1.0.1] - 2026-06-19

### Changed

- 将编辑器重构为顶部命令岛、中央预览舞台与底部统一 Dock。
- 使用 Liquid Glass 材质、大圆角胶囊按钮和统一图标语言重做应用壳层。
- 使用 Tailwind utilities 维护主要布局、响应式尺寸和控件状态。
- 新增 RepoShare 专属 SVG 品牌标识与 favicon。
- 应用壳层统一使用得意黑字体。
- 弹出设置面板改为磨砂高可读背景，并优化展开动画和焦点返回。

### Fixed

- 修复深浅主题下玻璃轮廓、圆角和预览裁切不一致的问题。
- 修复移动端工具结构重复、面板遮挡和横向溢出问题。
- 修复设置面板标题贴近边缘以及 Dock 下载按钮右侧留白不均的问题。

## [1.0.0] - 2026-06-19

### Added

- 引入 Tailwind CSS v4 和 shadcn/ui 风格组件，重构应用工作台。
- 增加中文设计系统文档、语义 design token 和共享布局常量。
- 引入现成的 `@creativoma/liquid-glass`，为命令栏、Inspector 和移动工具栏提供 Liquid Glass 控制层。
- 增加宽屏工具轨道、单上下文 Inspector、平板覆盖面板和移动端 Bottom Sheet。
- 增加浅色/深色主题切换与用户偏好持久化。
- 增加按可用空间自适应缩放的预览主舞台，导出尺寸保持不变。
- 为七套模板补齐稳定的 540x720 竖屏布局。
- 增加模板能力声明，仅在支持时展示作者头像控制项。
- 增加 PNG/JPEG、布局方向和导出倍率控制。

### Changed

- 升级至 React 19.2、Ant Design 6.4、Vite 8、TypeScript 6 和 ESLint 10，并更新全部直接依赖至稳定最新版。
- 应用布局从两个常驻侧栏改为预览优先的单 Inspector 工作台。
- 顶部命令栏、工具轨道、Inspector 和移动工具栏改为悬浮圆角控制层。
- GitHub 数据请求改用官方 API，移除不稳定的第三方代理。
- 仓库缓存升级为带 30 分钟有效期的多仓库缓存，最多保留 10 条记录。
- 语言接口失败时降级为 `Unknown`，不再阻断仓库主体信息展示。
- GitHub API 限流提示会显示预计恢复时间。
- 下载逻辑使用稳定的预览根节点和仓库名，不再依赖页面结构查询。
- 对应用依赖进行拆包，降低主构建产物体积。
- 清理失效和未使用的远程字体，缩短图片导出等待时间。
- 更新 README，使模板、技术栈和实际功能保持一致。

### Fixed

- 修复缓存串仓库和误清空整个 `localStorage` 的问题。
- 修复部分控制项对当前模板无效但仍显示的问题。
- 修复窄屏下顶部栏、侧栏和预览区域重叠的问题。
- 修复多套模板竖屏模式的裁切、溢出和排版问题。
- 修复 Pixel 模板横屏内容超出固定画布的问题。
- 修复 TypeScript 与 ESLint 类型错误和 Hooks 警告。
- 移除未使用的 Axios 依赖及其生产依赖安全告警。

### Removed

- 删除基于 main 分支 push 的自动 Release workflow，发布改为显式手动执行。

[1.0.2]: https://github.com/nowscott/RepoShare/releases/tag/v1.0.2
[1.0.1]: https://github.com/nowscott/RepoShare/releases/tag/v1.0.1
[1.0.0]: https://github.com/nowscott/RepoShare/releases/tag/v1.0.0
