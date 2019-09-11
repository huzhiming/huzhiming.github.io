详细可参考廖雪峰老师[Git教程](https://www.liaoxuefeng.com/wiki/896043488029600)，以下列举

```bash
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
```

