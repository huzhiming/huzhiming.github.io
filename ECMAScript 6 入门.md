---
ECMAScript 6 入门 - 读书学习笔记
---

## 前言与简介

本书为中级难度，适合已经掌握 ES5 的读者，用来了解这门语言的最新发展；也可当作参考手册，查寻新增的语法点。如果你是 JavaScript 语言的初学者，建议先学完[《JavaScript 语言入门教程》](https://wangdoc.com/javascript/)，再来看本书。

##### 语法提案的批准流程

- Stage 0 - Strawman（展示阶段）
- Stage 1 - Proposal（征求意见阶段）
- Stage 2 - Draft（草案阶段）
- Stage 3 - Candidate（候选人阶段）
- Stage 4 - Finished（定案阶段）

##### 为什么需要块级作用域?

原因在于变量提升，导致内层的`tmp`变量覆盖了外层的`tmp`变量;

用来计数的循环变量泄露为全局变量

##### ES6 的块级作用域

```js
// ES6 允许块级作用域的任意嵌套,内层作用域可以定义外层作用域的同名变量
{{{{
  let insane = 'Hello World';
  {let insane = 'Hello World'}
}}}};
// 立即执行函数写法 =可替换为=> 块级作用域写法
(function () { ... })() ====> { ... } // 此处是一个常用点
```

ES6 引入了块级作用域，明确`允许在块级作用域之中声明函数`。之前ES5是规定不能在块级作用域声明。

```js
// 块级作用域内部，优先使用函数表达式
{
  let a = 'secret';
  let f = function () {
    return a;
  };
}
// ES6 的块级作用域必须有大括号
if (true) let x = 1; //  ==> if (true) { let x = 1 }

// 不报错, 严格模式下，函数只能声明在当前作用域的顶层
'use strict';
if (true) {
  function f() { ... } // 此函数不会被变量提升，大括号外访问不到f函数
}
// 报错
'use strict';
if (true)
  function f() {}
```

##### const 命令

`const`声明一个只读的常量。一旦声明，常量的值就不能改变。⚠️注意：不可变的只是这个地址，但对象本身是可变的，所以依然可以为其添加新属性。

```js
const foo = {};
// 为 foo 添加一个属性，可以成功
foo.prop = 123;
foo.prop // 123

// 将 foo 指向另一个对象，就会报错
foo = {}; // TypeError: "foo" is read-only

const a = [];
a.push('Hello'); // 可执行
a.length = 0;    // 可执行
a = ['Dave'];    // 报错

// 如果真的想将对象冻结，应该使用Object.freeze方法
const foo = Object.freeze({});
// 常规模式时，下面一行不起作用；
// 严格模式时，该行会报错
foo.prop = 123;

// 除了将对象本身冻结，对象的属性也应该冻结。下面是一个将对象彻底冻结的函数。
var constantize = (obj) => {
  Object.freeze(obj);
  Object.keys(obj).forEach( (key, i) => {
    if ( typeof obj[key] === 'object' ) {
      constantize( obj[key] );
    }
  });
};
```

##### ES6 声明变量的六种方法 

`var`命令和`function`命令, ES6 除了添加`let`和`const`命令，还有另外两种声明变量的方法：`import`命令和`class`命令

##### 顶层对象的属性

顶层对象，在浏览器环境指的是`window`对象，在 Node 指的是`global`对象。ES5 之中，顶层对象的属性与全局变量是等价的。【顶层对象的属性与全局变量挂钩，被认为是 JavaScript 语言最大的设计败笔之一】

ES6 为了改变这一点，一方面规定，为了保持兼容性，`var`命令和`function`命令声明的全局变量，依旧是顶层对象的属性；另一方面规定，`let`命令、`const`命令、`class`命令声明的全局变量，不属于顶层对象的属性。也就是说，从 ES6 开始，全局变量将逐步与顶层对象的属性脱钩。

```js
var a = 1;
// 如果在 Node 的 REPL 环境，可以写成 global.a
// 或者采用通用方法，写成 this.a
window.a // 1

let b = 1;
window.b // undefined
```

##### globalThis 对象

JavaScript 语言存在一个顶层对象，它提供全局环境（即全局作用域），所有代码都是在这个环境中运行，但是，顶层对象在各种实现里面是不统一的。

- 浏览器里面，顶层对象是`window`，但 Node 和 Web Worker 没有`window`。
- 浏览器和 Web Worker 里面，`self`也指向顶层对象，但是 Node 没有`self`。
- Node 里面，顶层对象是`global`，但其他环境都不支持。

同一段代码为了能够在各种环境，都能取到顶层对象，现在一般是使用`this`变量，但是有局限性。

- 全局环境中，`this`会返回顶层对象。但是，Node 模块和 ES6 模块中，`this`返回的是当前模块。
- 函数里面的`this`，如果函数不是作为对象的方法运行，而是单纯作为函数运行，`this`会指向顶层对象。但是，严格模式下，这时`this`会返回`undefined`。
- 不管是严格模式，还是普通模式，`new Function('return this')()`，总是会返回全局对象。但是，如果浏览器用了 CSP（Content Security Policy，内容安全策略），那么`eval`、`new Function`这些方法都可能无法使用。

```js
// 综上所述，很难找到一种方法，可以在所有情况下，都取到顶层对象。下面是两种勉强可以使用的方法。
// 方法一
(typeof window !== 'undefined'
   ? window
   : (typeof process === 'object' &&
      typeof require === 'function' &&
      typeof global === 'object')
     ? global
     : this);

// 方法二
var getGlobal = function () {
  if (typeof self !== 'undefined') { return self; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  throw new Error('unable to locate global object');
};
```



## 变量的解构赋值

ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构; 

可以从数组中提取值，按照对应位置，对变量赋值，称为赋值；

##### 数组的解构赋值

```js
let [foo, [[bar], baz]] = [1, [[2], 3]];
foo // 1
bar // 2
baz // 3

let [ , , third] = ["foo", "bar", "baz"];
third // "baz"

let [x, , y] = [1, 2, 3];
x // 1
y // 3

let [head, ...tail] = [1, 2, 3, 4];
head // 1
tail // [2, 3, 4]

let [x, y, ...z] = ['a'];
x // "a"
y // undefined
z // []

// 如果解构不成功，变量的值就等于undefined
let [foo] = []; // foo === undefined
let [bar, foo] = [1]; // foo === undefined

// 另一种情况是不完全解构，即等号左边的模式，只匹配一部分的等号右边的数组。这种情况下，解构依然可以成功
let [x, y] = [1, 2, 3];
x // 1
y // 2

let [a, [b], d] = [1, [2, 3], 4];
a // 1
b // 2
d // 4

// 对于 Set 结构，也可以使用数组的解构赋值。
let [x, y, z] = new Set(['a', 'b', 'c']);

// let [foo = true] = [];
```

事实上，只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值

```js
function* fibs() {
  let a = 0;
  let b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

let [first, second, third, fourth, fifth, sixth] = fibs();
sixth // 5
```

##### 默认值

```js
let [foo = true] = []; // foo = true
let [x, y = 'b'] = ['a']; // x='a', y='b'
let [x, y = 'b'] = ['a', undefined]; // x='a', y='b'

// 注意，ES6 内部使用严格相等运算符（`===`），判断一个位置是否有值。
// 所以，只有当一个数组成员严格等于`undefined`，默认值才会生效。
let [x = 1] = [undefined]; x // 1 生效
let [x = 1] = [null]; x // null 不生效 原理：null!==undefined

// 如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值。
function f() {
  console.log('aaa');
}
let [x = f()] = [1]; // 因为x能取到值，所以函数f根本不会执行

// 默认值可以引用解构赋值的其他变量，但该变量必须已经声明
let [x = 1, y = x] = [];     // x=1; y=1
let [x = 1, y = x] = [2];    // x=2; y=2
let [x = 1, y = x] = [1, 2]; // x=1; y=2
let [x = y, y = 1] = [];     // ReferenceError: y is not defined 
```

##### 对象的解构赋值

```js
let { foo, bar } = { foo: 'aaa', bar: 'bbb' }; 
foo // "aaa" 
bar // "bbb"

// 如果解构失败，变量的值等于undefined
let { baz } = { foo: 'aaa', bar: 'bbb' }; 
baz // undefined
let { foo } = {bar: 'baz'};
foo // undefined

// [常用]对象的解构赋值，可以很方便地将现有对象的方法，赋值到某个变量
let { log, sin, cos } = Math;
const { log } = console;

对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量
// [常用]如果变量名与属性名不一致，必须写成下面这样
let { foo: baz } = { foo: 'aaa', bar: 'bbb' }; foo是匹配的模式，baz才是变量 
baz // "aaa" 


let obj = { first: 'hello', last: 'world' };
let { first: f, last: l } = obj;
f // 'hello'
l // 'world'

// 与数组一样，解构也可以用于嵌套结构的对象
let obj = {
  p: [
    'Hello',
    { y: 'World' }
  ]
};
如果p也要作为变量赋值，可以写成下面这样
let { p, p: [x, { y }] } = obj;
x // "Hello"
y // "World"
p // ["Hello", {y: "World"}]

// 报错。解构时因为foo等于undefined，再取子属性就会报错
let {foo: {bar}} = {baz: 'baz'};
```

**注意，对象的解构赋值可以取到继承的属性**

```js
const obj1 = {};
const obj2 = { foo: 'bar' };
Object.setPrototypeOf(obj1, obj2); // 设置obj1的原型为obj2

const { foo } = obj1;
foo // "bar"
```

##### 默认值

```javascript
var {x = 3} = {};
x // 3

var {x, y = 5} = {x: 1};
x // 1
y // 5

var {x: y = 3} = {};
y // 3

var {x: y = 3} = {x: 5};
y // 5

var { message: msg = 'Something went wrong' } = {};
msg // "Something went wrong"

```

默认值生效的条件是，对象的属性值严格等于`undefined`

```js
var {x = 3} = {x: undefined};
x // 3

var {x = 3} = {x: null};
x // null
```

注意点

```js
如果要将一个已经声明的变量用于解构赋值，必须非常小心
// 正确的写法
let x;
({x} = {x: 1});

由于数组本质是特殊的对象，因此可以对数组进行对象属性的解构
let arr = [1, 2, 3];
let {0 : first, [arr.length - 1] : last} = arr; 
first // 1
last // 3
```

##### 字符串、数值、布尔值的解构赋值

字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象

```js
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"

类似数组的对象都有一个length属性，因此还可以对这个属性解构赋值
let {length : len} = 'hello';
len // 5
```

解构赋值时，如果等号右边是数值和布尔值，则会先转为对象

```js
解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象
let {toString: s} = 123;
s === Number.prototype.toString // true

let {toString: s} = true;
s === Boolean.prototype.toString // true

由于`undefined`和`null`无法转为对象，所以对它们进行解构赋值，都会报错
let { prop: x } = undefined; // TypeError
let { prop: y } = null; // TypeError
```

##### [常用]函数参数的解构赋值

```js
// 函数的参数也可以使用解构赋值
function add([x, y]){
  return x + y;
}
add([1, 2]); // 3

[[1, 2], [3, 4]].map(([a, b]) => a + b);
// [ 3, 7 ]

// 函数参数的解构也可以使用默认值
function move({x = 0, y = 0} = {}) { // (为变量x和y指定默认值)
  return [x, y];
}
move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, 0]
move({}); // [0, 0]
move(); // [0, 0]

// 注意，下面的写法会得到不一样的结果
function move({x, y} = { x: 0, y: 0 }) { // (为函数move的参数指定默认值)
  return [x, y];
}
move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, undefined]
move({}); // [undefined, undefined]
move(); // [0, 0]

// undefined就会触发函数参数的默认值
[1, undefined, 3].map((x = 'yes') => x);
// [ 1, 'yes', 3 ]
```

##### 变量的解构赋值用途很多

- 交换变量的值
- 从函数返回多个值
- 函数参数的定义
- 提取 JSON 数据
- 函数参数的默认值
- 遍历 Map 结构
- 输入模块的指定方法

```js
交换变量的值
let x = 1;
let y = 2;
[x, y] = [y, x];

从函数返回多个值
// 返回一个数组
function example() {
  return [1, 2, 3];
}
let [a, b, c] = example();

// [常用] 返回一个对象
function example() {
  return {
    foo: 1,
    bar: 2
  };
}
let { foo, bar } = example();

函数参数的定义 
解构赋值可以方便地将一组参数与变量名对应起来
// 参数是一组有次序的值
function f([x, y, z]) { ... }
f([1, 2, 3]);
// [常用] 参数是一组无次序的值
function f({x, y, z}) { ... }
f({z: 3, y: 2, x: 1});

[常用] 提取 JSON 数据
解构赋值对提取 JSON 对象中的数据，尤其有用
let jsonData = {
  id: 42,
  status: "OK",
  data: [867, 5309]
};
let { id, status, data: number } = jsonData;
console.log(id, status, number);
// 42, "OK", [867, 5309]

函数参数的默认值
jQuery.ajax = function (url, {
  async = true,
  beforeSend = function () {},
  cache = true,
  complete = function () {},
  crossDomain = false,
  global = true,
  // ... more config
} = {}) {
  // ... do stuff
};

遍历 Map 结构
const map = new Map();
map.set('first', 'hello');
map.set('second', 'world'); 

任何部署了 Iterator 接口的对象，都可以用for...of循环遍历
for (let [key, value] of map) {
  console.log(key + " is " + value);
}
// first is hello
// second is world

输入模块的指定方法
加载模块时，往往需要指定输入哪些方法。解构赋值使得输入语句非常清晰
const { SourceMapConsumer, SourceNode } = require("source-map");

```



## 字符串的扩展















