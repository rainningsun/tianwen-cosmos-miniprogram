# 天问：宇宙之美 · 课程小程序

《天问：宇宙之美》课程导览小程序。原生微信小程序（WXML / WXSS / JS），不使用 `web-view` 套壳。

- 课程名：天问：宇宙之美
- 主讲：李菂
- 当前状态：仓库骨架搭建中，尚未发布第一个可浏览版本。

## 在微信开发者工具中打开

1. 打开微信开发者工具，选择“导入项目”。
2. 项目目录选择本仓库根目录（`project.config.json` 所在目录）。
3. `miniprogramRoot` 已配置为 `miniprogram/`，无需再选子目录。
4. 没有 AppID 时选择“测试号”，或保持 `project.config.json` 中的 `touristappid`。
5. 导入后直接编译即可。

> 真机预览、上传体验版需要课程负责人提供正式 AppID；仓库中不保存任何上传私钥。

## 目录结构

```
project.config.json
miniprogram/
  app.js / app.json / app.wxss / sitemap.json
  pages/            主包页面（课程、主线、原页、作业）
  packageL1/        第 1-2 讲详情与图片
  packageL2/        第 3-4 讲详情与图片
  packageL3/        第 5-6 讲详情与图片
  data/             讲次与专题数据（唯一内容源）
  utils/            公共逻辑
  components/       通用组件
scripts/
  validate-content.js
docs/
  add-lecture.md
  content-sources.md
```

## 内容来源

所有课程观点、引文、人物、时间与数字均来自本地 5 份课程 PDF，页码对照见
[`docs/content-sources.md`](docs/content-sources.md)。

课件图片版权归授课教师及原作者所有，仅用于课程学习与展示。

## 新增讲次

见 [`docs/add-lecture.md`](docs/add-lecture.md)。新增讲次只需改数据与资源，不改页面渲染逻辑。

## 包体预算

- 主包 ≤ 1.8 MB
- 每个分包 ≤ 1.8 MB
- 总包 ≤ 20 MB
- 原页图单张 ≤ 120 KB，缩略图 ≤ 20 KB

当前体积：待首次构建后填入。

## 校验

```bash
node scripts/validate-content.js
```

## 已知待确认项

- 第 3 讲 p.20 的宇宙年龄与宇宙构成数字存在课件内部矛盾，按原文呈现，未做修正。
- 第 6 讲尚未提供课件，仅保留“待更新”占位。
