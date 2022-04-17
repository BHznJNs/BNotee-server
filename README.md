# BNotee-server

English description: [README_EN.md](https://github.com/BHznJNs/BNotee-server/blob/master/README_EN.md)

[GitPage](https://bhznjns.github.io/BNotee/dist/)

[BNotee](https://github.com/BHznJNs/BNotee)的 Server 版本。

## 特点

这是一个特殊的笔记程序，它的特殊在于你必须自行部署它的服务器端（在你的电脑上），然后你就可以在任何一个带有浏览器的设备上编辑你的笔记（IE 除外 ;>）。

并且，由于技术限制，它目前还不支持编辑行内元素的样式，因此我又将它叫做 “穷文本” 编辑器。

## 项目依赖

sqlite3 && nodejs >= 14.x

## 安装

``` bash
git clone https://github.com/BHznJNs/BNotee-server.git

cd BNotee-server

npm install

npm start
```

## 已实现

- 标题 （Headings）
- 段落 （paragraph）
- 分割线（Horizontal Rules || 程序内称为 `割线`）
- 列表（Unordered/Ordered List || 序列 / 乱列）
- 表格（Table）
- 详情(Details)
- 黑暗模式
- 全屏（阅读模式）
- 触屏模式
- Server 部分


## TODO

- [ ] 代码块（Python、JavaScript、C）
