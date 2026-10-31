# 天问：宇宙之美 · 课程小程序

《天问：宇宙之美》课程导览小程序。原生微信小程序（WXML / WXSS / JS），不使用 `web-view` 套壳，不引入 npm 依赖。

- 课程名：天问：宇宙之美
- 主讲：李菂
- 当前状态：5 讲已上线；第六讲保留“待更新”占位
- 仓库：`https://github.com/rainningsun/tianwen-cosmos-miniprogram`（private）

## 界面截图

> 截图占位：当前开发机未安装微信开发者工具，尚未取得工具内截图。导入后建议补一张首页与一张讲次详情页截图。

## 在微信开发者工具中打开

1. 打开微信开发者工具，选择“导入项目”。
2. 项目目录选择本仓库根目录（`project.config.json` 所在目录）。
3. `miniprogramRoot` 已配置为 `miniprogram/`，无需再选子目录。
4. 没有 AppID 时选择“测试号”，或保持 `project.config.json` 中的测试号 AppID。
5. 导入后直接编译即可。

> 当前 `project.config.json` 使用微信开发者工具生成的测试号 AppID `wxb8ac32e0ae7d0dff`，用于模拟器编译；它绑定当前测试号，不是正式 AppID。拿到课程正式 AppID 后，只替换这一字段，不要提交上传私钥。

> 真机预览、上传体验版需要课程负责人提供正式 AppID；仓库中不保存任何上传私钥。

## 页面

- **课程**：课程名、主讲、《天问》引文、动态“已上线 N 讲”、纵向课程星图、第六讲待更新占位、思想主线入口、作业入口。
- **主线**：6 个可切换专题，相关讲次由数据推导。
- **原页**：按讲次索引课件关键页，点击跳到详情页 `#pages` 区域；第六讲显示待更新。
- **作业**：完整呈现 `m1015.pdf` p.64-65；四类参考选题可勾选，状态保存在本机。

## 目录结构

```text
project.config.json
miniprogram/
  app.js / app.json / app.wxss / sitemap.json
  assets/covers/          5 张讲次封面（主包）
  components/             lecture-card / section-head / quote-block
  data/
    lectures.js           唯一讲次内容源
    topics.js             6 个思想主线专题
    assignment.js         作业说明与 17 条参考选题
  pages/                  课程 / 主线 / 原页 / 作业
  packageL1/              第 1-2 讲详情与原页
  packageL2/              第 3-4 讲详情与原页
  packageL3/              第 5-6 讲详情与原页
  styles/                 详情页共享样式
  templates/              详情页共享 WXML 模板
  utils/
    lecture-page.js       详情页公共逻辑
    format.js             讲次序号与页码格式化
scripts/
  validate-content.js     内容、资源、包体与敏感文件校验
  smoke-pages.js         页面逻辑冒烟测试（wx / Page 桩）
docs/
  add-lecture.md          新增讲次操作手册
  content-sources.md      内容来源、页码与待确认项
.github/workflows/
  validate.yml            CI：静态校验 + 拒绝追踪 PDF
```

## 新增第 6 讲

第 6 讲及后续讲次只改数据与资源，不改页面渲染逻辑。完整步骤见
[`docs/add-lecture.md`](docs/add-lecture.md)。

概要：

1. 新 PDF 放本地 `source/`（已忽略，不进仓库）；
2. 用 PyMuPDF 导出页面图，逐页核对；
3. 每讲选 6-10 张关键页，长边 1000-1200px，单张 ≤120KB；
4. 放入对应 `packageLx/assets/pages/`，缩略图 ≤20KB；
5. 在 `data/lectures.js` 增加条目；
6. 运行 `node scripts/validate-content.js`；
7. 在微信开发者工具中检查首页、详情、原页、上下讲；
8. 提交 `content: add lecture 6` 并推送。

第 6 讲未到位时，保持 `status: 'upcoming'`，不要填假内容。

## 内容来源

所有课程观点、引文、人物、时间与数字均来自本地 5 份课程 PDF，页码对照与待确认项见
[`docs/content-sources.md`](docs/content-sources.md)。

已知的课件内部矛盾（例如第 3 讲 p.20 的宇宙年龄与宇宙构成数字）按页面原文保留，未擅自修正。

## 包体预算

| 包 | 当前体积 | 上限 |
|---|---:|---:|
| 主包 | 254.5 KB | 1.8 MB |
| `packageL1`（第 1-2 讲） | 1.30 MB | 1.8 MB |
| `packageL2`（第 3-4 讲） | 1.53 MB | 1.8 MB |
| `packageL3`（第 5-6 讲） | 704.4 KB | 1.8 MB |
| 总包 | 约 3.7 MB | 20 MB |

原页图单张 ≤120KB（实际 ≤110KB），缩略图 ≤20KB，封面 ≤30KB。
如果新分包超过 1.8MB，按 `docs/add-lecture.md` 拆到下一个 `packageLx`。

## 校验

```bash
node scripts/validate-content.js
node scripts/smoke-pages.js
```

页面逻辑冒烟测试用最小 `wx` / `Page` 桩验证首页、专题、原页、作业、5 讲详情与第六讲占位；它不替代微信开发者工具编译。

脚本会检查：

- `app.json` / `project.config.json` / 所有数据文件可解析；
- 讲次 id 唯一、order 连续；
- 已发布讲次的导读、问题、概念、人物、金句、图片数量；
- `pagePath` 与分包配置；
- 图片、缩略图、封面存在且不超限；
- 6 个专题与作业数据；
- 主包/分包/总包体积；
- 仓库中没有被追踪的 PDF、`project.private.config.json`、`*.key`；
- 所有 JS 通过 `node --check`。

GitHub Actions 在 push / PR 时运行校验与页面逻辑冒烟测试，并再次检查 `git ls-files '*.pdf'`。

## 验证状态与已知待确认项

- 静态校验通过；包体预算通过。
- **当前开发机未安装微信开发者工具**，因此没有做工具内编译截图，也没有真机预览。导入后请按 `docs/add-lecture.md` 第 8 节检查 360/390/430px 宽度。
- 第 3 讲 p.20 的“138 亿 / 137 亿年”和“83% + 23% + 4%”按原文保留。
- 第 4 讲 p.65 原文“你会涉及一台怎样的望远镜”疑为“设计”，作业页按原文保留并加注。
- 第 5 讲 p.24 的行星数量为课件估算，保留“≥ / 约”措辞。
- 第 6 讲尚未提供课件，只保留待更新占位。

## 版权

课件图片版权归授课教师及原作者所有，仅用于课程学习与展示。
仓库保持 private；未经课程负责人确认不改为 public。
