# 创建Git仓库并配置团队协作指南

## 1. 安装Git

首先需要在您的计算机上安装Git。请按照以下步骤操作：

### Windows系统：
1. 访问Git官网：https://git-scm.com/download/win
2. 下载适合您系统的Git安装包（通常是64位版本）
3. 双击安装包，按照默认选项进行安装即可（建议勾选"Git Bash Here"选项）
4. 安装完成后，打开命令提示符或Git Bash，输入`git --version`验证是否安装成功

### macOS系统：
1. 使用Homebrew安装：`brew install git`
2. 或从官网下载安装包：https://git-scm.com/download/mac

### Linux系统：
- Ubuntu/Debian：`sudo apt-get install git`
- CentOS/RHEL：`sudo yum install git`

## 2. 初始化本地Git仓库

安装完成Git后，在项目根目录执行以下命令：

```bash
git init
git config user.name "您的姓名"
git config user.email "您的邮箱"
```

## 3. 创建.gitignore文件

创建一个`.gitignore`文件来忽略不需要提交的文件，如node_modules、日志文件等：

```bash
touch .gitignore
```

将以下内容添加到`.gitignore`文件中：

```
# 依赖目录
node_modules/
# 日志文件
logs/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
# 编辑器目录和文件
.idea/
.vscode/
*.swp
*.swo
*~
# 环境变量文件
.env
.env.local
.env.*.local
# 构建输出
/dist/
build/
# 操作系统文件
.DS_Store
Thumbs.db
# 测试覆盖率
coverage/
.nyc_output/
```

## 4. 提交初始代码

```bash
git add .
git commit -m "Initial commit"
```

## 5. 创建远程仓库

您可以选择GitHub、Gitee、GitLab等平台创建远程仓库：

### GitHub示例：
1. 访问GitHub官网：https://github.com/
2. 登录账号，点击右上角"+"按钮，选择"New repository"
3. 填写仓库名称（如"Industrial-admin"），选择公开或私有
4. 点击"Create repository"

## 6. 关联远程仓库

在创建好的远程仓库页面，复制仓库URL，然后执行以下命令：

```bash
git remote add origin https://github.com/您的用户名/Industrial-admin.git
git push -u origin master
```

如果使用的是SSH协议（需要配置SSH密钥）：

```bash
git remote add origin git@github.com:您的用户名/Industrial-admin.git
git push -u origin master
```

## 7. 团队协作配置

### 为团队成员添加访问权限：
- GitHub：在仓库Settings → Manage access → Invite a collaborator
- Gitee：在仓库管理 → 仓库成员管理 → 添加成员

### 团队成员操作流程：

1. 克隆仓库：
   ```bash
   git clone https://github.com/您的用户名/Industrial-admin.git
   ```

2. 创建分支开发：
   ```bash
   git checkout -b feature/新功能
   ```

3. 开发完成后提交代码：
   ```bash
   git add .
   git commit -m "完成新功能开发"
   ```

4. 推送分支到远程：
   ```bash
   git push origin feature/新功能
   ```

5. 创建Pull Request/Merge Request进行代码审查

6. 合并到主分支后，更新本地主分支：
   ```bash
   git checkout master
   git pull origin master
   ```

## 8. 常用Git命令

- 查看状态：`git status`
- 查看日志：`git log`
- 查看分支：`git branch`
- 切换分支：`git checkout 分支名`
- 创建分支：`git branch 分支名`
- 合并分支：`git merge 分支名`
- 拉取代码：`git pull`
- 推送代码：`git push`

## 9. 注意事项

1. 定期拉取最新代码，避免冲突
2. 不要提交敏感信息（如数据库密码、API密钥等）
3. 提交信息要清晰明了，说明本次修改的内容
4. 大型功能开发建议创建独立分支
5. 定期备份代码，确保远程仓库正常运行

如果您在操作过程中遇到问题，可以随时查看Git文档或搜索相关教程。