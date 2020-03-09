#### 用 node 模拟Apache 服务器

```javascript
const http = require('http');
const path = require('path');
const fs = require('fs');

const mime = require('mime'); // yarn add mime -S

// node 模拟Apache 服务器，支持响应任何文件类型，未找到文件就返回 404
http.createServer(function createServerCallback(req,res) {
  // var publicDir = path.join(__dirname,'public');
  var publicDir = path.join(__dirname,'./');
  var filename = path.join(publicDir, req.url);

  fs.readFile(filename, function (err, data) {
    if (err) {
      res.setHeader(404,'Not Found', {
        'Content-Type': 'text/plain; charset=utf-8'
      });

      res.end('文件不存在 404')
    } else {
      res.writeHead(200, 'OK', {
        'Content-Type': `${mime.getType(filename)}; charset=utf-8`,
        'Set-Cookie': 'type=ninja; language=javascript'
      });

      res.end(data);
    }
  });
}).listen(9000, () => {
  console.log('http://localhost:9000')
});


// request、 response 常用方法：
// ========= request(http.IncomingMessage 类) ========
// req.headers
// req.rawHeaders
// req.httpVersion
// req.method
// req.url

// ========= response(http.ServerResponse 类) ========
// res.setHeader
// res.statusCode
// res.statusMessage
// res.write ***
// res.end





```

#### npm介绍

```bash
npm install npm@latest -g // 更新为最新的npm
// 注意：全局安装的包，只有一重含义，让它可以作为一个命令行来使用
```



#### 模块（Modules) 和 包（package) 的区别：

**模块** 可以是一个文件或目录（目录下可以有多个文件），只要能被node通过 `require` 即可，即认定是模块

**包 **是一个文件或目录（目录下可以有多个文件）必须有一个`package.json`文件来描述，就认为是一个包





