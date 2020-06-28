详细可参考廖雪峰老师[Git教程](https://www.liaoxuefeng.com/wiki/896043488029600)，以下列举

```bash
ssh-keygen -t rsa -C "your.email@example.com"
pbcopy < ~/.ssh/id_rsa.pub

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

# 验证是否有权限连接
ssh -T git@git.yoho.cn
# 添加私钥
ssh-add ~/.ssh/id_rsa
# 确认私钥列表和
ssh-add -l 
# 清空私钥列表
ssh-add -D

# 修改全局用户名和邮箱地址,局部去掉--global参数
cd ~/you project                
git config user.name --global "huzhiming"  
git config user.email --global "zhiming.hu@yoho.cn"

git config --global user.name huzhiming
git config --global user.email huzhiming@yunzhangfang.com

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

# 图形化展示日志
git log --graph

# 创建tag
git tag -a <tagname> -m "blablabla..."
# 用命令git show <tagname>可以看到说明文字
git show <tagname>
# git push并不会把tag标签传送到远端服务器上，只有通过显式命令才能分享标签到远端仓库
git push origin v1.0 #将本地v1.0的tag推送到远端服务器
git push origin --tags # 所有tag推送到远端服务器

# 撤销commit 
git reset --soft HEAD^
# 修改注释
git commit --amend

# 设置 swoole 的远程上游地址，适用于fork的下游项目
git remote add upstream https://github.com/swoole/swoole-src.git
git pull upstream master
```

#### 提交规范：

- **feat：**提交新功能 reviewed  by  tao.huang
- **fix**：修复了bug
- **docs**：只修改了文档
- **style**：调整代码格式，未修改代码逻辑（比如修改空格、格式化、缺少分号等）
- **refactor**：代码重构，既没修复bug也没有添加新功能
- **perf**：性能优化，提高性能的代码更改
- **test**：添加或修改代码测试
- **chore**：对构建流程或辅助工具和依赖库（如文档生成等）的更改
- **revert:**  This reverts commit <hash>

[Git提交规范范本-知乎](https://zhuanlan.zhihu.com/p/67804026)



```bash
常用命令
# https://git-lfs.github.com/
git lfs install

git lfs help // 查看git lfs的帮助

git lfs version  // 查看git lfs的版本号

git lfs track // 查看git lfs的文件追踪信息

git lfs track '*.dll' // dll文件用lfs来管理，会在根目录的.gitattributes文件中添加：*.dll filter=lfs diff=lfs merge=lfs -text

git lfs track 'Guid.upk' // Guid.upk文件用lfs来管理，会在根目录的.gitattributes文件中添加：Guid.upk filter=lfs diff=lfs merge=lfs -text

git lfs track 'maps/*' // 根目录下maps文件夹中的所有文件用lfs来管理，会在根目录的.gitattributes文件中添加：maps/* filter=lfs diff=lfs merge=lfs -text

git lfs untrack 'Guid.upk' // Guid.upk文件不再使用lfs来管理

git lfs status  // 查看当前git lfs对象的状态

git lfs ls-files  // 查看当前哪些文件是使用lfs管理的

git lfs clone https://github.com/kekec/Test.git // 克隆包含Git LFS的远程仓库到本地

git lfs env  // 查看环境信息
```

