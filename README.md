# 吴欣睿 · 个人简历网站

面向 AI 产品经理岗位的个人简历与作品集网站。简洁、数据驱动、可持续更新。

## 本地运行

```bash
npm install
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000)

## 构建与部署

```bash
npm run build
npm start
```

## GitHub 托管与自动同步

**仓库地址：** https://github.com/MalenthaWu/wuxinrui-portfolio

### 一次性设置（约 2 分钟）

1. 打开 **[vercel.com/new](https://vercel.com/new)** 并登录
2. 点击 **Import Git Repository**，选择 `MalenthaWu/wuxinrui-portfolio`
3. 保持默认配置（Framework: Next.js），点击 **Deploy**
4. 部署完成后会得到线上地址，例如 `https://wuxinrui-portfolio.vercel.app`

之后每次向 GitHub 的 `main` 分支 **push**，Vercel 会 **自动重新构建并上线**（约 1～2 分钟）。

### 日常更新流程

```bash
cd ~/Projects/wuxinrui-portfolio

# 1. 修改 content/ 下的 JSON 或页面代码
# 2. 提交并推送
git add .
git commit -m "更新：描述你改了什么"
git push
```

推送后无需其他操作，线上网站会自动同步。

### 常用命令

```bash
# 本地预览
npm run dev

# 本地构建检查
npm run build
```

## 站点结构

| 路由 | 板块 |
|------|------|
| `/` | 关于我（建筑 → AI PM 叙事 + 能力映射表） |
| `/education` | 教育经历 |
| `/projects` | 项目经历（按类型分类） |
| `/works` | 作品集（摄影 / 建筑 / 设计） |
| `/skills` | 技能 + 自媒体实践 |

联系信息在全局页脚。

## 如何添加新项目

1. 复制模板：
   ```bash
   cp content/projects/_template.json content/projects/my-new-project.json
   ```

2. 编辑 JSON，设置正确的 `category`：
   - `ai-product` — AI 产品
   - `vibecoding-tool` — Vibecoding 工具
   - `website` — 网站搭建
   - `research-workshop` — 研究 / 工作坊
   - `campus-ops` — 校园 / 运营

3. 保存后刷新页面即可看到新项目。

## 如何修改其他内容

| 内容 | 文件 |
|------|------|
| 首页关于我 | `content/home.json` |
| 页脚联系信息 | `content/footer.json` |
| 教育经历 | `content/education.json` |
| 技能与自媒体 | `content/skills.json` |
| 项目类型配置 | `content/project-categories.json` |
| 单个项目 | `content/projects/*.json` |
| 单个作品 | `content/works/*.json` |

## 技术栈

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- JSON 内容数据层
