<h1 id="目录">目录</h1>
[javascript设计模式 ](#javascript设计模式)

[javascript标准库](#javascript标准库)

[Node.js最佳实践](#Node.js最佳实践)

[基于色键技术的纯客户端实时蒙版弹幕实现](#基于色键技术的纯客户端实时蒙版弹幕实现)







<h1 id="javascript设计模式">javascript设计模式</h1>


[单例模式.md](./javascript设计模式/单例模式.md)

[策略模式.md](./javascript设计模式/策略模式.md)

[代理模式.md](./javascript设计模式/代理模式.md)

[迭代器模式.md](./javascript设计模式/迭代器模式.md)

[观察者模式.md](./javascript设计模式/观察者模式.md)

[命令模式.md](./javascript设计模式/命令模式.md)

[组合模式.md](./javascript设计模式/组合模式.md)

[模版方法模式.md](./javascript设计模式/模版方法模式.md)

[享元模式.md](./javascript设计模式/享元模式.md)

[职责链模式.md](./javascript设计模式/职责链模式.md)

[中介者模式.md](./javascript设计模式/中介者模式.md)

[装饰者模式.md](./javascript设计模式/装饰者模式.md)

[状态模式.md](./javascript设计模式/状态模式.md)

[适配器模式.md](./javascript设计模式/适配器模式.md)





<p align="right"><a href="#目录">⬆ 返回顶部</a></p>
<h1 id="javascript标准库">javascript标准库</h1>


**Arrar构造函数方法**

1. Arrar.form(arrlike,fn,this)：从类数组对象或可迭代对象中创建一个新数组实例

2. Array.of(arg1,arg2,...)：根据一组参数来创建新数组实例，支持任意参数数量和类型

   > 以上两种方法可代替es5实现：Array.prototype.slice.call(类数组对象)

3. Array.isArray(arr): 用来判断某个对象是否是一个数组对象



**Array.prototype方法**

修改器方法：

1. Array.prototype.copyWithin(target, start,end): 在数组内部，将一段元素序列拷贝到另一段元素序列上，覆盖原有值

2. Array.prototype.fill(val, start,end): 将数组中指定区间的所有元素的值，都替换成某个固定的值

   > var array1 = [1, 2, 3, 4]; console.log(array1.fill(0, 2, 4)); // 从第2位填充0到第4位 [1, 2, 0, 0]

3. Array.prototype.pop(): 删除数组的最后一个元素，并返回这个元素

4. Array.prototype.push(): 在数组的末尾增加一个元素或多个元素，并返回该数组新长度。

5. Array.prototype.reverse(): 颠倒数组中的排序顺序，原先的第一个变为最后一个，最后一个变为第一个

6. Array.prototype.shift(): 删除数组的第一个元素，并返回这个元素

7. Array.prototype.unshift(): 在数组的开头增加一个或多个元素，并返回该数组新长度

8. Array.prototype.sort()

9. Array.prototype.splice(start,delIndex,addItem1,...):在任意位置给数组添加或删除任意个元素



动态创建数组：

```js
Array.from({ length: 3 }, () => null);// [null,null,null]
Array(3).fill(null); // [null,null,null]
```



<p align="right"><a href="#目录">⬆ 返回顶部</a></p>
<h1 id="Node.js最佳实践">Node.js最佳实践</h1>
英文文档：https://github.com/i0natan/nodebestpractices

中文翻译：https://github.com/i0natan/nodebestpractices/blob/master/README.chinese.md





<p align="right"><a href="#目录">⬆ 返回顶部</a></p>
<h1 id="基于色键技术的纯客户端实时蒙版弹幕实现">基于色键技术的纯客户端实时蒙版弹幕实现</h1>
文章：https://mp.weixin.qq.com/s/wFnIFa9HWeeVpyAYWAQE4w
源码：https://github.com/parksben/masking-danmaku-demo



# 代码校验Eslint篇

Eslint 配置及规则说明：
https://blog.csdn.net/hsl0530hsl/article/details/78594973

https://www.cnblogs.com/nklong/p/7233631.html



详解JS函数柯里化: <https://www.jianshu.com/p/2975c25e4d71>

















