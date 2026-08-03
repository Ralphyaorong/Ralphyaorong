# Ralph Studio

> 联系方式已配置：`ralphyaorong@gmail.com` 与本地微信二维码。提交前请自行确认二维码和邮箱仍适合公开展示。

Ralph Studio 是一个完全静态的个人作品展示网站，聚焦视频制作、后期剪辑、直播间基础搭建与 AI 内容工作流实践。页面中的项目名称均为匿名通用名称，原始素材文件名和内部业务信息不会在前台展示。

跨电脑维护、当前上线进度、回滚标签和部署检查请优先阅读 [PROJECT-HANDOFF.md](PROJECT-HANDOFF.md)。

## 技术栈

- Next.js App Router、TypeScript（严格模式）、Tailwind CSS
- 静态导出（`output: "export"`）与 GitHub Pages Actions 部署
- 本地系统字体、内联 SVG；运行时无外部字体、外部图片、分析脚本或 API

## 素材目录

原始素材保留在项目根目录的中文文件夹中，脚本只读取并复制，不会修改原文件。

- `AI 工作流/`：工作流流程图与界面截图
- `IP案例/`：内容 IP 项目素材
- `视频制作/`、`视频包装/`：视频作品来源
- `挑选照片6张/`：摄影作品来源
- `直播间案例/`：直播场景素材
- `备用/`：只参与扫描，不默认展示
- `首页照片.png`：首页首屏背景来源

运行 `npm run assets:prepare` 后，网页使用的文件会生成在 `public/assets/`，并在 `assets-manifest.json` 中记录“原文件路径 → 网站文件路径”的映射。展示文件统一使用 ASCII 英文文件名。

`public/assets/` 是部署资源，应一并提交；`assets-manifest.json` 仅保存在本地，以免公开原始素材路径。原始素材目录已在 `.gitignore` 中排除，避免将约 8.8GB 原始文件推送到仓库。GitHub Actions 只检查并使用已准备的资源，不会依赖原始素材重新处理。

## 安装与本地运行

```bash
npm install
npm run assets:scan
npm run assets:prepare
npm run assets:check
npm run dev
```

打开开发服务器显示的地址。构建静态站点：

```bash
npm run lint
npm run build
```

成功后静态产物位于 `out/`。可用 `npm run start` 在本地预览该目录。

## 更新作品和案例

1. 将新的原始素材放到对应的原始素材目录，勿覆盖现有文件。
2. 执行 `npm run assets:scan` 查看体积和格式报告。
3. 执行 `npm run assets:prepare` 生成安全的网页素材和映射。
4. 在 `src/data/works.ts` 或 `src/data/cases.ts` 增加或调整匿名项目条目。
5. 对信息无法确认的项目保留 `needsReview: true`，该字段不会显示在前台。
6. 执行 `npm run assets:check && npm run build`。

当前需要人工确认：所有视频作品的真实预览节选、时长、工具和更精确职责；各案例的具体业务背景与最终输出；是否要将每张摄影素材独立作为作品条目。

## 大视频说明

仓库已包含处理后的网页预览视频和 WebP 封面；原始视频多数超过 25MB（部分超过 GitHub 单文件限制），绝不能直接复制到 `public/` 或提交。当前“视频包装与节奏设计 01”的预览固定为原片前 15 秒，其余项目按脚本中的节选规则处理。

安装 FFmpeg 后，运行 `npm run assets:videos` 或 `npm run assets:prepare`。脚本会生成 H.264 MP4、AAC 音频、yuv420p、faststart 的网页预览与 WebP 封面；默认节选为 20–30 秒，项目有明确固定时长配置时以配置为准。脚本会自动跳过未修改的视频，并将处理状态、时间点、输入输出大小和失败原因记录在 `video-previews-manifest.json`。不要提交原始大视频。

如果 FFmpeg 不在系统 `PATH`，可临时指定可执行文件路径（PowerShell）：

```powershell
$env:FFMPEG_PATH='D:\path\to\ffmpeg.exe'
$env:FFPROBE_PATH='D:\path\to\ffprobe.exe'
npm run assets:videos
```

运行 `npm run content:generate` 会生成 `content-draft.json` 和 `content-review.md`。两者只用于本地开发审核，含原始路径和 `needsReview` 信息，绝不在前台展示或提交到公开仓库。

## 联系方式

在 `src/config/site.ts` 中统一维护网站名称、描述、邮箱、微信二维码、GitHub Pages 地址和仓库地址。当前配置已指向 `Ralphyaorong/Ralphyaorong`。

- 邮箱：填入 `email`。
- 微信二维码：将真实图片保存为如 `public/assets/contact/wechat-qr.webp`，填入 `wechatQrPath: "/assets/contact/wechat-qr.webp"`。

未填写时，联系页面会显示“联系方式待补充”，不会生成假邮箱或假二维码。

## GitHub Pages 部署

仓库内已经包含 `.github/workflows/deploy-pages.yml`。它会安装依赖、准备素材、构建 `out/`、上传 Pages artifact 并部署。不会自动创建远程仓库或推送代码。

1. 新建或选择一个 GitHub 仓库，提交本项目（不提交原始大视频）。
2. 在仓库 **Settings → Pages → Build and deployment** 中，将 Source 选择为 **GitHub Actions**。
3. 推送到 `main` 分支，等待 Actions 中的 `Deploy static site to GitHub Pages` 工作流完成。
4. 在 Actions 的部署结果或 Pages 设置中查看最终访问地址。

### 用户主页仓库与项目仓库

- 用户主页仓库名必须为 `用户名.github.io`，地址为 `https://用户名.github.io/`，构建时不添加 `basePath`。
- 普通项目仓库地址为 `https://用户名.github.io/仓库名/`，GitHub Actions 会基于 `GITHUB_REPOSITORY` 自动设置 `basePath` 和 `assetPrefix` 为 `/仓库名`。
- 本地开发环境不设置 `basePath`。页面链接使用 Next `Link`，图片走 `assetUrl()`，以避免项目仓库部署后的 CSS、图片、视频和页面路径 404。

部署后请打开首页、作品详情、案例详情并刷新一次，确认所有静态页面、图片和预览封面都可以加载。
