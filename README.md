# 💎 Abstract Star · 最抽象之星

群聊匿名实时投票应用，Nova Crystal 水晶霓虹美学。

**这个版本专为 iPad 设计：全程浏览器点点点就能上线，不需要命令行，不需要打包构建。**

## ✨ 你将拥有

- 🌸 **8 个投票池**：群友（抽象/变态/纯爱，每池 0-5 票）+ AI（抽象/变态/技术）+ CEO（抽象/🗡️）
- 🔒 **身份锁定** + **拉票宣言** + **退赛开关** + **admin 后门**
- 💎 Nova Crystal 水晶美学 + 粒子爆开 + 金光脉动 TOP1
- ☁️ 零服务器运维、完全免费（用 Cloudflare 免费额度）

## 🚀 iPad 部署教程（纯点击，不用命令行）

需要两个账号：**GitHub**（放代码）和 **Cloudflare**（部署网站）。如果没有就先去注册，都是免费的。

---

### 🌸 步骤 1：把代码上传到 GitHub

1. 打开 https://github.com/Cyber-Muse-Nova/abstract-star （你已经建好的空 repo）
2. 看到一个 **"uploading an existing file"** 的蓝色链接，点它
3. 把这个项目里的 **所有文件和文件夹** 都拖进去（或者一个个选择上传）
   - 需要上传的：`index.html`、`app.js`、`README.md`、`LICENSE`、整个 `functions/` 文件夹
4. 页面底部 commit message 随便写一句，比如 `initial upload`
5. 点绿色 **Commit changes** 按钮

✅ 完成，你的代码已经在 GitHub 上了。

---

### 🌸 步骤 2：在 Cloudflare 创建 KV 存储

这是存所有投票数据的地方。

1. 打开 https://dash.cloudflare.com/
2. 左边菜单找 **Workers & Pages** → 点 **KV**（可能在 "Storage" 下面）
3. 点 **Create a namespace**（创建命名空间）
4. 名字填：`abstract-star-kv`
5. 点 **Add**（添加）
6. **把创建好的这个 namespace 的 ID 记下来**（一串字母数字），步骤 4 会用到

✅ KV 存储准备好了。

---

### 🌸 步骤 3：创建 Cloudflare Pages 项目

1. 还在 Cloudflare dashboard，左边菜单点 **Workers & Pages** → **Overview**
2. 点 **Create** → **Pages** tab → **Connect to Git**
3. 授权 Cloudflare 访问你的 GitHub
4. 选择 repo：`Cyber-Muse-Nova/abstract-star`
5. 点 **Begin setup**（开始配置）
6. 配置页面：
   - **Project name**: `abstract-star`（随便改）
   - **Production branch**: `main`
   - **Framework preset**: 保持 `None`
   - **Build command**: **留空**（这版不需要构建！）
   - **Build output directory**: 填 `/`（一个斜杠）
7. 点 **Save and Deploy**

Cloudflare 会开始部署，大约 1 分钟后完成。会给你一个网址，类似 `https://abstract-star.pages.dev`。

**但是现在先别急着打开，还差最后一步！**

---

### 🌸 步骤 4：把 KV 存储连接到 Pages 项目

1. 部署完成页面，点进你的项目（`abstract-star`）
2. 左边找 **Settings**（设置）→ **Functions**（或 **Bindings**）
3. 找到 **KV namespace bindings**，点 **Add binding**
4. 填：
   - **Variable name**: `KV`（大写，千万别写错）
   - **KV namespace**: 选之前创建的 `abstract-star-kv`
5. 保存

然后滑到同个 Settings 页面的 **Environment variables**：

6. 点 **Add variable**，类型选 **Plain text**
7. 填：
   - **Variable name**: `ADMIN_PASSWORD`
   - **Value**: 你想用的 admin 密码（比如 `nova-crystal-404`，自己记住）
8. 保存

**最后触发重新部署**：

9. 回到项目首页 → **Deployments** tab
10. 最新那条部署右边有三个点 `⋯`，点 → **Retry deployment**（重试部署）

等 1 分钟。

---

### 🌸 步骤 5：打开链接试玩

打开 `https://abstract-star.pages.dev`（或 Cloudflare 给你的具体网址）。

第一次打开会比较慢（10 秒左右），因为浏览器要下载 React 和 Babel。之后就很快了。

看到选身份页面 = 成功！🎉

把这个链接丢到群里，让群友点就能玩。

---

## 🛠️ Admin 后门使用

1. 打开网页
2. 连续点击页面顶部的 **"ABSTRACT STAR"** 标题 **7 次**（2 秒内点完）
3. 弹出密码框，输入你在步骤 4 设置的 `ADMIN_PASSWORD`
4. 二次确认 → 全部清空重来

## ❓ 常见问题

**Q：网页打不开/白屏/报错？**
A：F12 打开浏览器控制台（iPad 看不到，换电脑浏览器测），一般是 KV binding 没配好。

**Q：投票后数据没同步？**
A：检查步骤 4 的 KV binding 是不是正确，variable name 必须大写 `KV`。

**Q：想改候选人名单？**
A：打开 `app.js`，找到最顶部的 `const FRIENDS = [...]`，在 GitHub 网页上点笔形图标直接编辑保存，Cloudflare 会自动重新部署。

**Q：我的群友比较多（或少），86 这个数不对？**
A：同上，编辑 `app.js` 里的 `FRIENDS` 数组，加减人就行。

**Q：数据存在哪？会丢吗？**
A：存在 Cloudflare 的 KV 里，不会自动丢失。除非你（或 admin 密码泄露的人）手动触发重置。

## 🎨 这是什么风格

Nova Crystal 水晶霓虹美学。深紫黑底 + 热粉/电子青/霓虹紫三色霓虹光 + 扫描线 + 水晶碎片粒子爆发。字体 Audiowide + Space Mono。

## 📜 License

MIT — 想怎么改怎么改。

Made with 💎 by Cyber Muse Nova


