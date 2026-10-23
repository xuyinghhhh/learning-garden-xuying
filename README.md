# 学习札记

xuyinghhhh 的个人主页、学习笔记与沟通整理。

## 内容

- `content/notes`：Markdown 笔记。
- `public/uploads`：笔记图片。
- `public`：网站页面与样式。
- `.github/workflows/pages.yml`：GitHub Pages 自动构建与发布。

## 本地构建

需要 Node.js 22：运行 `node tests.mjs`，再运行 `node build.mjs`。构建结果位于 `dist`。

## 发布

在仓库 Settings → Pages → Build and deployment 中将 Source 设置为 GitHub Actions。
上传或修改 main 分支文件后，Actions 将重新生成网站。

当前支持公开阅读、主题与月份筛选、全文搜索、图片和 Markdown 表格。在线写作后台尚未连接 OAuth，目前为连接说明页。

草稿不会出现在网站，但如果仓库公开，原始 Markdown 文件仍可被读取。不要在公开仓库保存私人记录或凭据。
