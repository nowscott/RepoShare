# Changelog

RepoShare 的重要版本变化记录在此。版本号遵循 Semantic Versioning。

## [1.0.0] - 2026-06-19

### Added

- 引入 Tailwind CSS v4 和 shadcn/ui 风格组件，重构应用工作台。
- 为七套模板补齐稳定的 540x720 竖屏布局。
- 增加模板能力声明，仅在支持时展示作者头像控制项。
- 增加 PNG/JPEG、布局方向和导出倍率控制。

### Changed

- GitHub 数据请求改用官方 API，移除不稳定的第三方代理。
- 仓库缓存升级为带 30 分钟有效期的多仓库缓存，最多保留 10 条记录。
- 语言接口失败时降级为 `Unknown`，不再阻断仓库主体信息展示。
- GitHub API 限流提示会显示预计恢复时间。
- 下载逻辑使用稳定的预览根节点和仓库名，不再依赖页面结构查询。
- 对应用依赖进行拆包，降低主构建产物体积。
- 更新 README，使模板、技术栈和实际功能保持一致。

### Fixed

- 修复缓存串仓库和误清空整个 `localStorage` 的问题。
- 修复部分控制项对当前模板无效但仍显示的问题。
- 修复窄屏下顶部栏、侧栏和预览区域重叠的问题。
- 修复多套模板竖屏模式的裁切、溢出和排版问题。
- 修复 TypeScript 与 ESLint 类型错误和 Hooks 警告。
- 移除未使用的 Axios 依赖及其生产依赖安全告警。

### Removed

- 删除基于 main 分支 push 的自动 Release workflow，发布改为显式手动执行。

[1.0.0]: https://github.com/nowscott/RepoShare/releases/tag/v1.0.0
