# 课程小程序展示与打开方式

本目录是《天问：宇宙之美》课程小程序的作业展示材料，版本 v2.3.0（七讲完结）。

## 文件

| 文件 | 用途 |
|---|---|
| `天问宇宙之美-课程小程序-展示.pdf` | **优先阅读**；13 页，含模块说明、页面截图、技术实现与验收结果 |
| `showcase.html` | 展示文件的可打印源文件 |
| `assets/` | 展示用页面截图与课件关键页 |

> PDF 在本地生成，因仓库禁止追踪 PDF，不进入 Git；提交包 `dist/天问宇宙之美-课程小程序-提交包.zip` 中包含 PDF。若需重新生成：

```powershell
& "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" `
  --headless=new --disable-gpu --no-pdf-header-footer `
  --print-to-pdf="docs\showcase\天问宇宙之美-课程小程序-展示.pdf" `
  "file:///E:/AaaMyFiles/tianwen-cosmos/docs/showcase/showcase.html"
```

## 打开小程序

1. 安装稳定版微信开发者工具，登录有权限的微信账号。
2. 选择“导入项目”，项目目录选择压缩包解压后的**根目录**（`project.config.json` 所在目录），不要选 `miniprogram/` 子目录。
3. `miniprogramRoot` 已配置为 `miniprogram/`；AppID 为 `wx2e8e3cde13016238`。没有权限时请管理员添加开发者。
4. 导入后点击“编译”（Ctrl+R），模拟器会打开课程首页。
5. 首页即课程星图，点击任意讲次进入详情；底部 tab 可切换课程 / 主线 / 索引 / 探索 / 原页。

## 只查看展示

直接打开 `天问宇宙之美-课程小程序-展示.pdf`。PDF 内含：

- 课程首页与第七讲详情
- 主线专题与关联链接
- 索引三卡、概念词典、人物与装置、人物详情
- 宇宙尺度、双时间线、未解之谜
- 原页索引与第七讲关键页
- 技术实现、数据规模、包体与验收结果

## 截图说明

- 首页、索引、原页、概念词典、人物与装置、第七讲详情为按当前数据与小程序样式生成的界面截图。
- 尺度、时间线、未解之谜、专题、人物生平与讲次详情取自微信开发者工具 v2.1.0 验收运行；界面结构未变，数据已更新至 v2.3.0。
- 课件原页图片版权归授课教师及原作者所有，仅用于课程学习与展示。

## 校验命令

```bash
node scripts/validate-content.js
node scripts/smoke-pages.js
```
