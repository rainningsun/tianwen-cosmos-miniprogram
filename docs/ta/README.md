# 作业展示材料

本目录是给助教/老师查看的阶段性作业材料，版本 v2.1.0。

## 文件

| 文件 | 用途 |
|---|---|
| `assignment-showcase.pdf` | **优先发送这个**；15 页，含 15 张页面截图、模块说明、技术实现与验收结果。该 PDF 在本地生成，因仓库禁止追踪 PDF，不进入 Git；可通过 DOCX 另存或下方命令重新生成 |
| `assignment-showcase.docx` | 可编辑版本；填写姓名/学号或改文字后，可另存为 PDF |
| `assignment-showcase.md` | Markdown 源文件；图片引用 `../screenshots/` |
| `assignment-showcase.html` | 打印样式源文件；用于重新生成 PDF |
| `ta-questions.md` | 助教确认问题清单；含优先级、完整清单和可直接发送的简短版本 |
| `ta-questions.docx` | 问题清单的 Word 版本，便于勾选/修改 |

## 发送前

1. 在 `assignment-showcase.docx` 或 `assignment-showcase.html` 中填写：
   - 学生姓名
   - 学号
2. 如果修改了 HTML，用 Edge 无头模式重新导出 PDF：

```powershell
& "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" `
  --headless=new --disable-gpu --no-pdf-header-footer `
  --print-to-pdf="docs\ta\assignment-showcase.pdf" `
  "file:///E:/MyFiles/tianwen-cosmos/docs/ta/assignment-showcase.html"
```

3. 如果修改了 Markdown，重新生成 DOCX：

```powershell
pandoc docs\ta\assignment-showcase.md -o docs\ta\assignment-showcase.docx `
  --metadata title="天问：宇宙之美 · 课程小程序作业展示" `
  --resource-path=docs/ta
```

## 截图

截图位于 `docs/screenshots/`，按编号排列：

- `01-home.png` 首页与第一讲 p.16 封面
- `02b-reference-cards.png` 索引三卡
- `14-glossary.png`、`15-glossary-detail.png` 概念词典
- `03-entities.png`、`09-entity-bio.png` 人物与装置
- `10-topic.png`、`11-topic-links.png` 思想主线
- `04-scale.png` 宇宙尺度
- `05-timeline.png` 双时间线
- `06-questions.png`、`07-question-detail.png` 未解之谜
- `16-lecture-detail.png`、`08-lecture-explore.png` 讲次详情与继续探索
- `12-archive.png` 原页索引与第六讲占位

## 注意

- 当前仓库 private，未上传体验版；如助教需要运行，需要邀请或提供体验成员权限。
- 第六讲仍是“待更新”占位；人物/装置图片尚未加入，等授权素材。
- 代码质量扫描仅“图片/音频总量 200K”建议项未通过，不影响当前运行；原因见主 README。
