##### 命令行帮助翻译

```bash
Usage:	docker [OPTIONS] COMMAND

A self-sufficient runtime for containers

Options:
      --config string      Location of client config files (default "/Users/zhiming/.docker") 客户端配置文件的位置（默认为“ /Users/zhiming/.docker”）
  -c, --context string     Name of the context to use to connect to the daemon (overrides DOCKER_HOST env var and
                           default context set with "docker context use") 用于连接到守护程序的上下文的名称（覆盖DOCKER_HOST env var和默认上下文设置为“ docker context use”）
  -D, --debug              Enable debug mode 启用调试模式
  -H, --host list          Daemon socket(s) to connect to 要连接的守护程序套接字
  -l, --log-level string   Set the logging level ("debug"|"info"|"warn"|"error"|"fatal") (default "info") 设置日志记录级别（“调试” |“信息” |“警告” |“错误” |“致命”）（默认为“信息”）
      --tls                Use TLS; implied by --tlsverify 使用TLS; --tlsverify暗示
      --tlscacert string   Trust certs signed only by this CA (default "/Users/zhiming/.docker/ca.pem") 仅由该CA签名的信任证书（默认为“ /Users/zhiming/.docker/ca.pem”）
      --tlscert string     Path to TLS certificate file (default "/Users/zhiming/.docker/cert.pem") TLS证书文件的路径（默认为“ /Users/zhiming/.docker/cert.pem”）
      --tlskey string      Path to TLS key file (default "/Users/zhiming/.docker/key.pem") TLS密钥文件的路径（默认为“ /Users/zhiming/.docker/key.pem”）
      --tlsverify          Use TLS and verify the remote 使用TLS并验证远程
  -v, --version            Print version information and quit 打印版本信息并退出

Management Commands: 管理命令：
  builder     Manage builds 管理构建
  checkpoint  Manage checkpoints 管理检查点
  config      Manage Docker configs 管理docker配置
  container   Manage containers 管理容器
  context     Manage contexts 管理上下文
  image       Manage images 管理镜像
  network     Manage networks 管理网络
  node        Manage Swarm nodes 管理群节点
  plugin      Manage plugins 管理插件
  secret      Manage Docker secrets Docker机密
  service     Manage services 管理服务
  stack       Manage Docker stacks 管理Docker堆栈
  swarm       Manage Swarm 管理群
  system      Manage Docker 管理docker
  trust       Manage trust on Docker images 管理对Docker映像的信任
  volume      Manage volumes 管理宗卷

Commands:
  attach      Attach local standard input, output, and error streams to a running container 将本地标准输入，输出和错误流附加到正在运行的容器
  build       Build an image from a Dockerfile 构建一个映像从Dockerfile
  commit      Create a new image from a container's changes 根据容器的更改创建新镜像
  cp          Copy files/folders between a container and the local filesystem 在容器和本地文件系统之间复制文件/文件夹
  create      Create a new container 创建一个容器
  deploy      Deploy a new stack or update an existing stack 部署新栈或更新现有堆栈
  diff        Inspect changes to files or directories on a container's filesystem 检查容器文件系统上文件或目录的更改
  events      Get real time events from the server 从服务器获取实时事件
  exec        Run a command in a running container 在正在运行的容器中运行命令
  export      Export a container's filesystem as a tar archive 将容器的文件系统导出为tar存档
  history     Show the history of an image 显示镜像的历史记录
  images      List images 镜像列表
  import      Import the contents from a tarball to create a filesystem image 从tarball导入内容以创建文件系统映像
  info        Display system-wide information 显示系统范围的信息
  inspect     Return low-level information on Docker objects 返回有关Docker对象的低级信息
  kill        Kill one or more running containers 杀死一个或多个正在运行的容器
  load        Load an image from a tar archive or STDIN 从tar存档或STDIN加载镜像
  login       Log in to a Docker registry 登录Docker注册表
  logout      Log out from a Docker registry 从Docker注册表注销
  logs        Fetch the logs of a container 提取容器的日志
  pause       Pause all processes within one or more containers 暂停一个或多个容器中的所有进程
  port        List port mappings or a specific mapping for the container 列出端口映射或容器的特定映射
  ps          List containers 容器列表
  pull        Pull an image or a repository from a registry 拉取一个镜像或仓库从镜像仓库
  push        Push an image or a repository to a registry 推送一个镜像或仓库到镜像仓库
  rename      Rename a container 重命名容器
  restart     Restart one or more containers 重启一个或多个容器
  rm          Remove one or more containers 移除一个或多个容器
  rmi         Remove one or more images 移除一个容器
  run         Run a command in a new container 运行一个命令在新容器
  save        Save one or more images to a tar archive (streamed to STDOUT by default) 保存一个或多个镜像到tar存档（默认情况下流式传输到STDOUT）
  search      Search the Docker Hub for images 在Docker Hub中搜索镜像
  start       Start one or more stopped containers 启动一个或多个已停止的容器
  stats       Display a live stream of container(s) resource usage statistics 显示容器资源使用统计信息的实时流
  stop        Stop one or more running containers 停止一个或多个正在运行的容器
  tag         Create a tag TARGET_IMAGE that refers to SOURCE_IMAGE 创建引用了SOURCE_IMAGE的标签TARGET_IMAGE
  top         Display the running processes of a container 显示容器的运行进程
  unpause     Unpause all processes within one or more containers 取消暂停一个或多个容器中的所有进程
  update      Update configuration of one or more containers 更新一个或多个容器的配置
  version     Show the Docker version information 显示Docker版本信息
  wait        Block until one or more containers stop, then print their exit codes 阻塞直到一个或多个容器停止，然后打印其退出代码

Run 'docker COMMAND --help' for more information on a command. 运行“ docker COMMAND --help”以获取有关命令的更多信息。
```



##### 镜像相关

```zsh
docker images # 查看镜像列表
docker rmi <image id> # 删除指定id的镜像
docker rmi $(docker images -q) # 删除全部的images
docker rmi -f $(docker images -q) # 当要删除的iamges和其他的镜像有关联而无法删除时

docker run -i -t <image id> /bin/bash # 通过镜像$id运行一个容器
-a stdin: 指定标准输入输出内容类型，可选 STDIN/STDOUT/STDERR 三项；

-d: 后台运行容器，并返回容器ID；

-i: 以交互模式运行容器，通常与 -t 同时使用；

-P: 随机端口映射，容器内部端口随机映射到主机的端口

-p: 指定端口映射，格式为：主机(宿主)端口:容器端口

-t: 为容器重新分配一个伪输入终端，通常与 -i 同时使用；

--name="nginx-lb": 为容器指定一个名称；

--dns 8.8.8.8: 指定容器使用的DNS服务器，默认和宿主一致；

--dns-search example.com: 指定容器DNS搜索域名，默认和宿主一致；

-h "mars": 指定容器的hostname；

-e username="ritchie": 设置环境变量；

--env-file=[]: 从指定文件读入环境变量；

--cpuset="0-2" or --cpuset="0,1,2": 绑定容器到指定CPU运行；

-m :设置容器使用内存最大值；

--net="bridge": 指定容器的网络连接类型，支持 bridge/host/none/container: 四种类型；

--link=[]: 添加链接到另一个容器；

--expose=[]: 开放一个端口或一组端口；

--volume , -v: 绑定一个卷
```

容器相关

```zsh
docker ps # 查看容器列表
docker stop <CONTAINER_ID> # 停止一个容器


# 将一个容器重新打包为镜像
docker commit -m="描述信息" -a="作者" <容器id> <imageName>
```

##### nginx



##### docker下gitlab安装配置使用(完整版)

```zsh
参考文章： https://www.jianshu.com/p/080a962c35b6

1、本地配置环境变量
$HOME = ~
export GITLAB_HOME=$HOME/gitlab

docker run -d  -p 443:443 -p 80:80 -p 222:22 --name gitlab --restart always -v $GITLAB_HOME/config:/etc/gitlab -v $GITLAB_HOME/logs:/var/log/gitlab -v $GITLAB_HOME/data:/var/opt/gitlab gitlab/gitlab-ce
# -d：后台运行
# -p：将容器内部端口向外映射
# --name：命名容器名称
# -v：将容器内数据文件夹或者日志、配置等文件夹挂载到宿主机指定目录

./gitlab/config/gitlab.rb 添加
# 自定义配置 huzhiming
external_url 'http://gitlab.zhiming.com'
# 配置ssh协议所使用的访问地址和端口
gitlab_rails['gitlab_ssh_host'] = 'gitlab.zhiming.com'
gitlab_rails['gitlab_shell_ssh_port'] = 222 # 此端口是run时22端口映射的222端口



### docker 配置gitlab-runner
参考文章：https://docs.gitlab.com/runner/install/docker.html#install-the-docker-image-and-start-the-container

# 1、创建Docker卷：
docker volume create gitlab-runner-config

# 2、使用我们刚刚创建的卷启动Runner容器：
docker run -d --name gitlab-runner --restart always \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v gitlab-runner-config:/etc/gitlab-runner \
    gitlab/gitlab-runner:latest

# 3、最后一步是注册一个新的Runner
docker run --rm -it -v gitlab-runner-config:/etc/gitlab-runner gitlab/gitlab-runner:latest register

https://juejin.im/post/6844903608731828232#heading-7
https://juejin.im/post/6844903747747856391#heading-3
```



##### 配置YAML文件

```yaml
stages:
  - test
  - build
  - deploy

cache:
  key: ${CI_COMMIT_REF_NAME}
  paths:
  - node_modules/

test_dev:
  image: node:alpine
  stage: test
  only:
    - dev
  tags:
    - tengxun
  script:
    - npm run test


build:
  image: node:alpine
  stage: build
  only:
    - master
    - dev
  tags:
    - tengxun
  script:
    - npm set registry https://registry.npm.taobao.org # 设置淘宝镜像地址
    - npm install --progress=false
    - npm run build
  artifacts:  
    expire_in: 1 week
    paths:
      - dist

deploy_dev:
  image: alpine
  stage: deploy
  only:
    - dev
  tags:
    - tengxun
  script:
    - echo "http://mirrors.aliyun.com/alpine/v3.7/main/" > /etc/apk/repositories
    - apk add --no-cache rsync openssh
    - mkdir -p ~/.ssh
    - echo "$SSH_PRIVATE_KEY" >> ~/.ssh/id_dsa
    - chmod 600 ~/.ssh/id_dsa
    - echo -e "Host *\n\tStrictHostKeyChecking no\n\n" > ~/.ssh/config
    - rsync -rav --delete dist/ "$SERVER_USER_HOST:$SERVER_DEV_PATH"

deploy_master:
  image: alpine
  stage: deploy
  only:
    - master
  tags:
    - tengxun
  script:
    - echo "http://mirrors.aliyun.com/alpine/v3.7/main/" > /etc/apk/repositories
    - apk add --no-cache rsync openssh
    - mkdir -p ~/.ssh
    - echo "$SSH_PRIVATE_KEY" >> ~/.ssh/id_dsa
    - chmod 600 ~/.ssh/id_dsa
    - echo -e "Host *\n\tStrictHostKeyChecking no\n\n" > ~/.ssh/config
    - rsync -rav --delete dist/ "$SERVER_USER_HOST:$SERVER_MASTER_PATH"
  when: manual
```

