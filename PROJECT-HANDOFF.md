# Ralph Studio｜跨电脑项目说明

这份说明用于在另一台电脑上继续维护、预览和部署 Ralph Studio。项目是一个无需后端的 Next.js 静态作品网站，当前线上地址为：

<https://ralphyaorong.github.io/Ralphyaorong/>

## 1. 项目定位与技术信息

- 名称：Ralph Studio
- 内容：视频制作、后期剪辑、直播间基础搭建、AI 内容工作流案例
- 技术：Next.js 15、App Router、TypeScript、Tailwind CSS、静态导出
- 部署：GitHub Pages + GitHub Actions
- 运行时：Node.js 20（建议安装当前 Node 20 LTS；与线上工作流保持一致）
- 仓库：<https://github.com/Ralphyaorong/Ralphyaorong>

网站不依赖数据库、后端、登录、CMS 或外部 API。图片、视频预览和二维码均为本地静态资源。

## 2. 在新电脑上开始使用

### 必需软件

1. Git
2. Node.js 20 LTS
3. 推荐：GitHub CLI（`gh`），用于登录、查看部署状态和推送
4. 可选：FFmpeg，仅在要重新生成视频预览时需要

### 首次安装

```bash
git clone https://github.com/Ralphyaorong/Ralphyaorong.git
cd Ralphyaorong
npm ci
npm run assets:check
npm run dev
```

终端会输出本地访问地址，通常为 <http://localhost:3000>。

如需本地预览部署后的静态文件：

```bash
npm run build
npm run start
```

构建产物位于 `out/`，该目录不提交到 Git。

## 3. 常用命令

```bash
npm run dev              # 本地开发
npm run lint             # ESLint 检查
npm run build            # 类型检查、静态生成并导出 out/
npm run assets:scan      # 扫描原始素材（仅本机有原始素材时使用）
npm run assets:prepare   # 复制/优化素材、生成视频预览与内容草稿
npm run assets:check     # 检查部署资源、封面与文件大小
```

通常的安全工作流程：

```bash
npm run lint
npm run assets:check
npm run build
git status
```

确认无误后再提交和推送。

## 4. 素材与隐私边界

仓库已提交的网页资源在 `public/assets/`，克隆后可直接运行和部署。

原始素材目录（如 `视频制作/`、`AI 工作流/`、`直播间案例/`）以及原始二维码、首页图均被 `.gitignore` 排除，不会随仓库同步。换电脑时：

- 只做网页维护或部署：不需要复制原始素材目录；
- 要新增、替换或重新处理素材：请从原电脑/移动硬盘手动复制原始素材目录到项目根目录；
- 不要把原始完整视频、客户内部文件、源码、账号信息或密钥提交到仓库；
- 网站展示数据使用匿名项目标题，原始中文文件名不可直接写到前台。

已处理并可部署的封面、流程图、截图与二维码在 `public/assets/` 中；页面数据在 `src/data/` 中。

子页面场景首图位于 `public/assets/generated/page-hero-*.webp`：作品、案例、关于、联系和个人发展时间轴各一张。它们对应页面实际工作场景，并与首页人物和低饱和电影感保持一致。时间轴正文的低对比底图为 `public/assets/generated/page-timeline-background.webp`；素材整理脚本会保留这些已生成资源，不会在重新执行 `npm run assets:prepare` 时清除它们。

个人发展时间轴的访问门槛仅是浏览器端交互，作用是避免页面入口被随手浏览；它不是安全保护机制，不应在该页面或仓库中放入真正的私密信息。

## 5. 更新内容的位置

| 需求 | 修改位置 |
| --- | --- |
| 网站名称、邮箱、二维码路径、仓库与线上地址 | `src/config/site.ts` |
| 作品标题、封面、职责、预览视频 | `src/data/works.ts` |
| 案例摘要、流程、输入输出、截图 | `src/data/cases.ts` |
| 首页模块与精选内容 | `src/app/page.tsx` |
| 全站视觉、响应式与动效 | `src/app/globals.css` |
| 页面组件 | `src/components/` |
| GitHub Pages 部署 | `.github/workflows/deploy-pages.yml` |

新增项目时，请先准备 `public/assets/` 中的对应文件，再更新 `works.ts` 或 `cases.ts`。无法确认的业务信息保留保守表述，并设为 `needsReview: true`；该字段不会出现在前台。

## 6. 视频预览处理

网站只发布网页预览版，不发布原始完整视频。视频处理脚本会生成 H.264/AAC 的短预览和 WebP 封面，并记录处理结果。

若新电脑没有全局 FFmpeg，可临时指定可执行文件路径后运行：

```powershell
$env:FFMPEG_PATH='D:\path\to\ffmpeg.exe'
$env:FFPROBE_PATH='D:\path\to\ffprobe.exe'
npm run assets:videos
```

处理前请确认原始素材存在；脚本只读取并复制素材，不应移动、覆盖或删除原文件。构建前运行 `npm run assets:check`，确保 `public/` 内没有超过 100MB 的视频文件。

## 7. Git 与回滚

每次明显的视觉或内容迭代建议都先创建可读的提交：

```bash
git status
git add src public .github README.md PROJECT-HANDOFF.md
git commit -m "Describe the change clearly"
git push origin main
```

当前保留的关键回滚标签：

- `pre-cinematic-systems-20260728`：电影感动效升级前的稳定版本
- `cinematic-systems-v1`：电影感与工作流系统视觉版本
- `subpage-scenario-heroes-v1`：首轮子页面场景横幅版本
- `video-packaging-15s-v1`：视频包装项目预览固定为原片前 15 秒
- `stylized-subpage-heroes-v2`：案例、关于、联系、时间轴的去正脸风格化横幅
- `timeline-readable-background-v1`：时间轴正文底图与文字可读性版本
- `works-hero-headroom-v1`：作品页横幅头部完整取景版本

查看标签和提交：

```bash
git tag --list
git log --oneline --decorate -12
```

如需回到某个版本，建议先创建一个新分支进行检查；不要直接使用会丢失工作区内容的重置命令。可先执行：

```bash
git switch -c review-cinematic-systems cinematic-systems-v1
```

确认后再决定是否合并或恢复。

## 8. 部署到 GitHub Pages

推送到 `main` 会自动执行 `.github/workflows/deploy-pages.yml`：安装依赖、检查资产、构建 `out/`、上传 artifact 并部署。

```bash
git push origin main
```

在新电脑上首次推送前，如需 GitHub CLI 登录：

```bash
gh auth login
```

查看最近一次部署：

```bash
gh run list --repo Ralphyaorong/Ralphyaorong --workflow deploy-pages.yml --limit 1
```

仓库设置中应保持：**Settings → Pages → Build and deployment → Source: GitHub Actions**。

项目已兼容两类 Pages 地址：

- 用户主页仓库：`https://用户名.github.io/`
- 普通项目仓库：`https://用户名.github.io/仓库名/`

不要手动给图片或内部链接拼接仓库名前缀。页面使用 `assetUrl()` 与 Next.js 的 `basePath` 配置，在本地与 Actions 环境间自动适配。

## 9. 当前上线进度（2026-08-03）

- 当前提交：`08783c8`（Keep creator head visible in works hero）
- 当前标签：`works-hero-headroom-v1`
- 当前部署地址：<https://ralphyaorong.github.io/Ralphyaorong/>
- 部署分支：`main`；GitHub Pages 由 Actions 自动发布。

已完成的近期更新：

1. 作品页横幅改为清理过文字的创作者拍摄场景，并单独调整裁切锚点，保证人物头部完整显示；首页与作品页之外的页面不使用该正脸构图。
2. 案例、关于、联系、时间轴四个子页使用按页面功能设计的本地 WebP 横幅：流程系统、工作台背影、雨夜联系桌面、影像档案序列；整体保持暗青黑与低饱和暖金色调。
3. 时间轴解锁后的正文增加了专用低对比档案底图、深色遮罩与文字阴影，保证正文和节点在桌面与手机上清晰可读。
4. `视频包装与节奏设计 01` 的网页预览固定为原视频前 15 秒，输出为 H.264/AAC、1280×720、约 5.25MB；原始视频未被修改。

每次更新后，至少检查：首页、作品列表、一个作品详情、案例列表、一个 AI 工作流详情、时间轴解锁后的正文、联系页和移动端菜单。若线上资源未立即更新，等待 GitHub Actions 完成后刷新页面即可。
