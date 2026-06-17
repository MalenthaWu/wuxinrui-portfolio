# 吴欣睿简历网站 — 项目速查（给 AI / 后续对话用）

**路径**: `~/Projects/wuxinrui-portfolio`  
**线上**: https://wuxinrui-portfolio.vercel.app  
**本地**: `npm run dev` → http://localhost:3000

## 导航（6 项，顺序固定）

关于我 `/` | 教育经历 `/education` | 工作经历 `/experience` | 项目经历 `/projects` | 作品集 `/works` | 技能 `/skills`  
联系信息仅在页脚，无 `/contact`。

## 首页 `/`

- 大字英文：**Hi I'm WUXINRUI** + 中文名/标签/简介
- 右侧：照片 + About Me 卡片
- 底部按钮：**个人简历**（`/resume.pdf`）、**联系方式**（mailto）
- **不写具体产品项目**；下方有「关于我」段落 + 能力映射表
- 文案：`content/home.json`

## 工作经历 `/experience`

- Tab：**实习经历** | **学生工作经历**
- 数据：`content/experience.json`
- 已从 `/projects` 移出：浙大新媒体、CUMT 团委、CUMT 党站

## 项目经历 `/projects`

- 分类 Tab：AI 产品 / Vibecoding 工具 / 网站搭建 / 研究工作坊 / 校园运营（校园类已清空）
- 小卡片 + **产品逻辑**标签（痛点·用户·方案·AI·结果），点击展开
- 每项目一个 JSON：`content/projects/*.json`，模板 `_template.json`
- 旗舰：LensLink（`lenslink.json`）

## 作品集 `/works`

- 14 组作品，图片在 `public/works/assets/`（已压缩 ~78MB）
- 详情页：`/works/[slug]` 图集
- 数据：`content/works/*.json`
- 摄影含人像系列（小河公园、粉玉兰等）、风光、建筑摄影；建筑含 Evolo、绿色高校、PDF 作品集

## 教育经历 `/education`

- 交互地图 + 院校 Logo（`public/logos/`）+ 荣誉/竞赛
- 数据：`content/education.json`

## 技能 `/skills`

- 上半技能地图 + 下半自媒体 `#media`（肆 Fours / 小红书抖音问一问）
- 数据：`content/skills.json`

## 技术栈

Next.js 16 App Router · TypeScript · Tailwind v4 · JSON 内容层 · Vercel

## 改内容

| 改什么 | 文件 |
|--------|------|
| 首页 | `content/home.json` |
| 工作经历 | `content/experience.json` |
| 新项目 | 复制 `content/projects/_template.json` |
| 新作品 | 加图到 `public/works/assets/` + 新建 `content/works/*.json` |
| 页脚 | `content/footer.json` |

## 部署

```bash
git push && npx vercel deploy --prod
```

## 待定 / 用户可补充

- 实习公司名与精确日期（`experience.json`）
- 自媒体真实链接（`footer.json` / `skills.json`）
- 更多设计子类（钢笔画、手绘、PPT）可继续加 works

## 设计取向

苹果风：浅底 `#fbfbfd`、字 `#1d1d1f`、强调色 `#0071e3`、大留白、毛玻璃导航
