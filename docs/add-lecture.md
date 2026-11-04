# 新增一讲操作手册

本项目的原则是：**新增讲次只加数据与资源，不改页面渲染逻辑。**

第 6 讲及后续讲次到位后，按以下顺序操作。五个模块的详细接入清单见
[`lecture-6-integration.md`](lecture-6-integration.md)。

## 1. 放入本地素材

把新 PDF 放到本地 `source/` 目录（该目录被 `.gitignore` 忽略，不会进入仓库）。
不要移动、改名或覆盖原始 PDF。

```text
source/
  m1029.pdf
```

## 2. 用 PyMuPDF 提取文本与页面图

```bash
python - <<'PY'
import pymupdf
doc = pymupdf.open('source/m1029.pdf')
print('pages:', doc.page_count)
for i, page in enumerate(doc):
    text = page.get_text('text')
    pix = page.get_pixmap(matrix=pymupdf.Matrix(1200 / page.rect.width, 1200 / page.rect.width))
    pix.save(f'source/rendered/p{i + 1:03d}.jpg')
    print(i + 1, len(text.strip()))
PY
```

注意：

- 本课程 PDF 的中文文本层存在字体编码错乱，**不能直接复制文本层作为引文**；必须逐页看图核对。
- 页码一律使用 **PDF 阅读器页码（从 1 开始）**，不是幻灯片页脚。
- 遇到纯图片页，只用截图 + 客观图注，或跳过；不要把猜测写成事实。

## 3. 选取 6-10 张关键页

每讲只收录 6-10 张，不追求全量。优先选择：

- 能代表本讲核心问题的页面；
- 有清晰标题、图表或原话的页面；
- 能支撑概念卡、人物条目或金句的页面。

渲染参数：

- 长边 1000-1200px；
- JPEG 质量约 68-75；
- 单张 ≤ 120KB（本项目实际控制在 ≤110KB）；
- 缩略图宽约 300-320px，单张 ≤ 20KB；
- 封面图放主包 `miniprogram/assets/covers/`，单张 ≤ 30KB。

## 4. 放入分包资源

按讲次体积放入对应分包：

- 第 1-2 讲：`miniprogram/packageL1/assets/`
- 第 3-4 讲：`miniprogram/packageL2/assets/`
- 第 5-6 讲：`miniprogram/packageL3/assets/`

目录约定：

```text
packageLx/assets/pages/lN-pXX.jpg
packageLx/assets/thumbs/lN-pXX.jpg
```

## 5. 在 `data/lectures.js` 增加条目

复制一个已发布讲次的结构，至少填齐：

```js
{
  id: 'lecture-6',
  order: 6,
  date: '10/29',
  title: '……',              // 可用描述性拟题，但必须加 titleNote: '编者拟题'
  titleNote: '编者拟题',
  status: 'published',
  pagePath: '/packageL3/pages/lecture/lecture',
  package: 'packageL3',
  sourcePdf: '第六讲：…….pdf',
  keywords: ['……'],
  cover: '/assets/covers/l6.jpg',
  summary: '150-250 字导读',
  questions: ['2-4 个问题'],
  concepts: [{ term: '……', desc: '……', page: 12 }],
  people: [{ name: '……', en: '……', note: '……', page: 12 }],
  quotes: [{ text: '……', author: '……', page: 12 }],
  images: [{
    src: '/packageL3/assets/pages/l6-p12.jpg',
    thumb: '/packageL3/assets/thumbs/l6-p12.jpg',
    caption: '客观图注',
    page: 12
  }],
  nextHint: '通向下一讲的线索'
}
```

要求：

- `date` 可留空；留空时首页日期角标与详情页眉会自动隐藏日期。“原页”索引对所有讲次统一不显示日期。
- `summary` 150-250 字；
- `questions` 2-4 个；
- `concepts` 5-8 个；
- `people` 3-6 个；
- `quotes` 1-3 句；
- `images` 6-10 张；
- 每条概念、人物、金句、图片都写页码；
- `sourcePdf` 写课程 PDF 的正式文件名；
- 引文必须能在对应页面找到；导读与“编者拟题”要明确标识。

## 6. 处理分包体积

- 主包 ≤ 1.5MB；
- 每个分包 ≤ 1.5MB；
- 总包 ≤ 20MB。

如果新分包超过 1.5MB：

1. 新建 `packageL4/`（复制现有详情页壳，只改 `require` 路径层级）；
2. 在 `app.json` 的 `subpackages` 增加 `packageL4`；
3. 把该讲的 `pagePath` 指向 `/packageL4/pages/lecture/lecture`；
4. 不要改首页、详情模板、原页索引的渲染逻辑。

## 7. 运行校验

```bash
node scripts/validate-content.js
node scripts/smoke-pages.js
```

校验会检查：

- JSON 可解析；
- 讲次 id 唯一、order 连续；
- 已发布讲次字段与数量；
- `pagePath` 在 `app.json` 分包中；
- 图片、缩略图、封面存在且不超限；
- 专题数据、概念词条、人物/装置、思想链、尺度、时间线、未解之谜的字段与关联 ID；
- 讲次 `concepts[].termId` 与 `people[].entityId` 都能解析；
- 包体预算；
- 仓库中没有被追踪的 PDF / 私钥；
- 所有 JS 通过 `node --check`。

若新增讲次出现新概念或新人物，同步补 `data/glossary.js` / `data/entities.js`；若新增可开放的课件问题，补 `data/questions.js`，并确保 `lectureIds`、`pages`、`sourceType` 完整。

失败就修，不要带着错误 push。

## 8. 在微信开发者工具中检查

导入仓库根目录，确认：

- 首页“已上线 N 讲”自动增加；
- 讲次卡片可点击；
- 详情页导读、问题、概念、人物、金句、原页画廊；
- 原页 tab 能跳到 `#pages`；
- 上一讲 / 下一讲导航正确；
- 360px、390px、430px 宽度无横向滚动。

## 9. 提交与推送

```bash
git add miniprogram
git commit -m "content: add lecture 6"
git push
```

如果网络失败，先本地 commit，稍后重试 push；在回复中明确说明“尚未推送”。

## 10. 每次新会话的检查

开始新会话时，先检查本地 `source/` 是否有新增 PDF：

```bash
ls source/*.pdf
```

发现第 6 讲或后续课件后，先更新 `docs/content-sources.md` 的盘点，再按本手册增量加入。
第 6 讲未到位时，保持 `status: 'upcoming'` 占位，**不要填假日期、假主题或假内容**。
