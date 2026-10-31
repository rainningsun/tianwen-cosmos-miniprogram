# 第六讲接入清单

> 第六讲目前保持 `status: 'upcoming'`，不生成详情页，也不编造标题、日期或内容。
> 课件到位后，按本清单把内容接入五个模块；不要只改首页或原页。

## 0. 当前占位

- `data/lectures.js` 中第六讲仍为 `upcoming`。
- 首页课程星图与原页索引显示“待更新”。
- 没有第六讲详情页，也没有假链接。

## 1. 课件与原页

1. 把第六讲 PDF 放本地 `source/`（已忽略，不提交）。
2. 导出页面图，逐页核对文字与页码。
3. 每讲选 6-10 张关键页，长边 1000-1200px，单张 ≤120KB；缩略图 ≤20KB。
4. 放入对应 `packageLx/assets/pages/` 和 `thumbs/`。
5. 生成一张主包封面（≤30KB），放到 `assets/covers/`。
6. 不修改 PDF 原件。

## 2. `data/lectures.js`

把第六讲从 `upcoming` 改为 `published`，并补全：

```js
{
  id: 'lecture-6',
  order: 6,
  status: 'published',
  title: '待课件确认',
  date: '待课件确认',
  pagePath: '/packageL3/pages/lecture/lecture',
  cover: '/assets/covers/l6.jpg',
  summary: '只写课件能支持的导读。',
  questions: ['从课件原文提炼的问题'],
  concepts: [
    {
      term: '本讲概念',
      termId: 'glossary-id',    // 必须存在
      desc: '本讲语境，不复制词条定义',
      page: 12
    }
  ],
  people: [
    {
      name: '人物或装置',
      en: 'Name',
      entityId: 'entity-id',    // 必须存在
      note: '本讲中的角色',
      page: 15
    }
  ],
  quotes: [],
  images: [
    {
      src: '/packageL3/assets/pages/l6-p12.jpg',
      thumb: '/packageL3/assets/thumbs/l6-p12.jpg',
      caption: '页面图注',
      page: 12
    }
  ]
}
```

如果第六讲放进新分包，先更新 `app.json` 的 `subpackages` 和 `pagePath`，不要改 tabBar。

## 3. 概念词典 `data/glossary.js`

- 本讲出现的新概念：新增词条，`lectureIds` 至少包含 `lecture-6`，`pages` 写课件页。
- 已有概念：在 `lectureIds` 中加入 `lecture-6`，必要时补 `pages`。
- 每条必须有：`id`、`term`、`en`、`category`、`definition`、`aliases`、`lectureIds`、`pages`、`sourceType`。
- 相关 ID 必须能解析：`relatedTermIds`、`relatedEntityIds`、`relatedTopicIds`、`relatedQuestionIds`。
- 第六讲概念卡的“查看词条”会自动出现，不需要改讲次模板。

## 4. 人物与装置 `data/entities.js`

- 新人物/装置：新增条目，`lectureIds` 包含 `lecture-6`。
- 已有人物/装置：在 `lectureIds` 中加入 `lecture-6`，补本讲页码。
- 每条必须有：`type`（`person` / `device`）、`name`、`en`、`category`、`role`、`contribution`、`bio`、`bioSource`、`lectureIds`、`pages`、`specs`、`sourceType`。
- `bio` 为课外补充的生平/背景，页面会标“课外补充”；没有可靠资料就写课程内角色，不要编造。
- 如新增人物关系，更新 `chains` 的 `entityIds` 和 `lectureIds`。
- 人物/装置图片可选：把授权图片放本地，在条目加 `image`、`imageCaption`、`imageCredit`；没有授权不要放肖像。

## 5. 主线 `data/topics.js`

至少把 `lecture-6` 加入一个相关专题的 `lectureIds`。如果第六讲带来新的跨讲观点：

- 新增专题或增加 `sections`；
- 补 `relatedGlossaryIds`、`relatedEntityIds`；
- 如有新的探索入口，补 `relatedExplore`（`scale` / `timeline` / `question`）；
- 专题页会自动显示相关讲次和索引/探索链接。

## 6. 双时间线 `data/timeline.js`

- 如果第六讲有可定位的宇宙事件或观测史事件，加入 `cosmic` / `human` 轨道。
- 事件必须有 `timeLabel`、`title`、`description`、`lectureIds`、`pages`、`sourceType`。
- 时间或页码不确定就不要加，不要用课外常识补成课件结论。

## 7. 未解之谜 `data/questions.js`

- 如果第六讲明确留下开放问题，新增问题或把 `lecture-6` 加入已有问题的 `lectureIds`。
- 每个问题必须是“课件已知 / 仍未知 / 为什么重要”，不要写成科普答案。
- 没有明确开放问题就不加，保持 6 条也可以。

## 8. 宇宙尺度 `data/scale.js`

只有第六讲新增了尺度层级或测量方法时才更新；保持 `order` 连续、`distanceMeters` 单调递增，并区分 `course` / `supplement`。

## 9. 自动进入的栏目

以下不需要手工复制内容，更新数据后会自动出现：

- 首页课程星图与“已上线 N 讲”；
- 原页索引与第六讲详情；
- 概念词典/人物与装置的相关讲次；
- 专题页相关讲次；
- 时间线/问题/尺度的相关讲次链接。

## 10. 校验与验收

```bash
node scripts/validate-content.js
node scripts/smoke-pages.js
```

校验会强制检查：

- 已上线讲次至少有一个概念词条、一个人物/装置条目、一个专题覆盖；
- 第六讲 `pagePath` 在分包配置中；
- 所有 `termId` / `entityId` 可解析；
- 图片、缩略图、封面存在且不超限；
- 主包/分包/总包体积。

如果第六讲尚未进入双时间线，校验会给提醒；问题关联为可选。

最后在微信开发者工具中检查：首页第六讲卡片、详情 10 张原页、上一讲/下一讲、概念/人物链接、专题相关讲次、原页索引与“继续探索”。

## 11. 提交

建议单独提交：

```text
content: add lecture 6
```

并在 `CHANGELOG.md` 记录第六讲上线；验收后打新的 `v2.x` tag。不要修改网页仓库或 PDF 原件。
