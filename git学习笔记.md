详细可参考廖雪峰老师[Git教程](https://www.liaoxuefeng.com/wiki/896043488029600)，以下列举

```bash
# 创建新版本库
git clone git@gitlab.wawaeg.com:web/wawaMall.git
cd wawaMall
touch README.md
git add README.md
git commit -m "add README"
git push -u origin master

# 已存在的文件夹 
cd existing_folder
git init
git remote add origin git@gitlab.wawaeg.com:web/wawaMall.git
git add .
git commit -m "feat(初始化)：初始化提交"
git push -u origin master

# 已存在的 Git 版本库
cd existing_repo
git remote add origin git@gitlab.wawaeg.com:web/wawaMall.git
git push -u origin --all
git push -u origin --tags

# 在远程版本库创建了一个分支后，在本地创建远程追踪分支
git remote update

# 修剪/查看本地版本库上那些失效的远程追踪分支
git remote prune origin --dry-run 查看

# 基于远端master创建本地temp分支
git fetch origin master:temp

# 合并feat分支指定的文件到当前分支
git checkout --patch feat f.txt

# 适用于进行中的dev没法提交，但是，必须先临时修复issue用（把dev工作现场“储藏”起来，解决完issue继续dev工作）
git stash 暂存草稿
git stash list 列出草稿
git stash apply 使用草稿 用git stash drop删除
git stash pop 恢复并删除

# 创建tag
git tag -a <tagname> -m "blablabla..."
# 用命令git show <tagname>可以看到说明文字
git show <tagname>
# git push并不会把tag标签传送到远端服务器上，只有通过显式命令才能分享标签到远端仓库
git push origin v1.0 #将本地v1.0的tag推送到远端服务器
git push origin --tags # 所有tag推送到远端服务器
```

