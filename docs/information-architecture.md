# 天问：宇宙之美 · 小程序 v2 信息架构

> 本文件定义 v2 改版的模块归属、页面清单、数据归属与迁移顺序。
> 原则：**不重写讲次内容，只重构信息架构；一份内容只在一个地方定义。**

## 1. 五个一级模块

| 顺序 | Tab | 页面 | 回答的问题 | 内容归属 |
|---|---|---|---|---|
| 1 | 课程 | `pages/index/index` | 这门课讲什么？从哪里开始？ | 课程地图、讲次叙事、第六讲占位 |
| 2 | 主线 | `pages/topic/topic` | 课程的核心观点是什么？ | 6 篇跨讲专题 |
| 3 | 索引 | `pages/reference/reference` | 某个概念/人物/装置是什么？ | 概念词典、人物与装置、思想链 |
| 4 | 探索 | `pages/explore/explore` | 尺度多大？时间多长？还有什么不知道？ | 宇宙尺度、双时间线、未解之谜 |
| 5 | 原页 | `pages/archive/archive` | 原始课件在哪里？ | 讲次原页索引 |

tabBar 正好 5 个，不再增加第 6 个；tab 页面全部留在主包。

## 2. 页面清单

```text
pages/
  index/                 课程（tab）
  topic/                 主线（tab）
  reference/             索引（tab，入口页）
  explore/               探索（tab，入口页）
  archive/               原页（tab）

  glossary/              概念词典列表 + 搜索/筛选
  glossary-detail/       概念详情
  entities/              人物 / 装置 / 思想链列表
  entity-detail/         人物或装置详情
  scale/                 宇宙尺度滑杆
  timeline/              双时间线
  questions/             未解之谜列表
  question-detail/       未解之谜详情

  assignment/            删除（v2 不再存在）
```

讲次详情仍在 `packageL1/`、`packageL2/`、`packageL3/`，不改分包结构。

## 3. 内容归属

| 内容 | 唯一归属 | 其他页面如何引用 |
|---|---|---|
| 讲次导读、问题、金句、原页 | `data/lectures.js` | 首页/索引/探索只链接，不复制全文 |
| 跨讲观点、专题长文 | `data/topics.js` | 索引/探索只链接，不复制全文 |
| 概念定义、别名、分类、相关概念 | `data/glossary.js` | 讲次页保留“本讲语境”并链接词条 |
| 人物/装置的角色、贡献、规格、关系 | `data/entities.js` | 讲次页保留“本讲出场”并链接详情 |
| 宇宙尺度层级与测量方法 | `data/scale.js` | 专题/讲次只链接 |
| 宇宙时间与观测史事件 | `data/timeline.js` | 专题/讲次只链接 |
| 未解之谜的问题、已知、未知 | `data/questions.js` | 专题/讲次只链接 |
| 原始课件图片与页码 | `data/lectures.js` 的 `images` | 原页/讲次共用同一份数据 |

规则：

- 概念、人物、装置、尺度、时间线、问题都通过 ID 引用；不在页面里重复定义。
- 讲次 `concepts[].termId` 指向 `glossary`；`people[].entityId` 指向 `entities`。
- 每个新条目必须有 `lectureIds`、`pages`、`sourceType`（`course` / `supplement`）。
- 没有课件出处的数字或结论，标为“课外补充”或直接不写。
- 第六讲保持 `upcoming`，不编造主题、日期与内容。

## 4. 迁移顺序

1. **文档**：本文件（模块归属与迁移计划）。
2. **删除作业**：删 tab、页面、数据、首页入口、校验/冒烟引用、README 描述；单独提交并打 `v2.0.0-alpha.1`。
3. **索引**：索引入口页 + 概念词典列表/详情 + 讲次概念链接。
4. **人物与装置**：列表/详情 + 思想链 + 讲次人物链接。
5. **探索**：探索入口页 + 宇宙尺度滑杆。
6. **时间线**：宇宙时间 / 观测历史 / 对照说明。
7. **未解之谜**：问题墙 + 详情（已知 / 未知 / 为什么重要）。
8. **收口**：首页、专题、讲次交叉链接；校验脚本、冒烟测试、README/CHANGELOG、包体预算。
9. **验收**：截图/说明、`v2.0.0`。

## 5. 删除清单（第 1 步）

- `app.json`：移除 `pages/assignment/assignment` 与 tabBar“作业”。
- 删除 `miniprogram/pages/assignment/`。
- 删除 `miniprogram/data/assignment.js`。
- 首页：删除 `openAssignment`、作业入口 WXML 与 `assignment-entry` WXSS。
- `scripts/validate-content.js`：删除 `checkAssignment()` 与调用，更新 tabBar 期望值。
- `scripts/smoke-pages.js`：删除作业页测试。
- README / CHANGELOG / docs：清理作业描述，保留 v2 移除记录。
- 新增 `docs/removed-assignment.md` 记录移除日期、原因、原 PDF p.64-65；不打包进小程序。

## 6. 暂不做的内容

- 不新增第 6 个 tab。
- 不修改讲次详情视觉结构，只增加索引/探索链接。
- 不添加课件之外的生平、奖项、国籍或数字。
- 不修改网页仓库、PDF 原件或小程序分包结构。
