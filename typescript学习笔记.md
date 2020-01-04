## typescript学习笔记

#### 基础类型：

定义变量类型篇：

```typescript
// 定义布尔
let isDone: boolean = false; 

// 定义数字
let decLiteral: number = 6; // 十进制
let hexLiteral: number = 0xf00d; // 十六进制
let binaryLiteral: number = 0b1010; // 二进制
let octalLiteral: number = 0o744; // 八进制

// 定义字符串
let name: string = "bob";
let sentence: string = `Hello, my name is ${ name }.`

// 数组
let list: number[] = [1, 2, 3];  // 在元素类型后面接上 []，表示由此类型元素组成的一个数组
let list: Array<number> = [1, 2, 3]; // 数组泛型，Array<元素类型>, 两者相同

// 元组
let x = [string, number];
x = ['hello', 10]; // OK
x = [10, 'hello']; // Error

// 枚举
enum Clolr { Red = 1, Green, Blue }; // 默认情况下，从0开始为元素编号, 可手动设置
let c: Color = Color.Green;
let colorName: string = Color[2];
console.log(c, colorName); // 2, Green

// Any，表变量的val可以是任何类型
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean

// void，Null 和 Undefined 很少用
function warnUser(): void { // 当一个函数没有返回值时，你通常会见到其返回值类型是 void
  console.log("This is my warning message");
}
let u: undefined = undefined;
let n: null = null;

# 注意：我们鼓励尽可能地使用`--strictNullChecks `（严格的空检查），开启则以下情况会报错
let someValue: void = null;
let someValue: null = undefined;
let someValue: number = null

// never类型表示的是那些永不存在的值的类型
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}

// Object

```

默认情况下`null`和`undefined`是所有类型的子类型。 就是说你可以把 `null`和`undefined`赋值给`number`类型的变量。

然而，当你指定了`--strictNullChecks`标记，`null`和`undefined`只能赋值给`void`和它们各自。 这能避免 *很多*常见的问题。 也许在某处你想传入一个 `string`或`null`或`undefined`，你可以使用联合类型`string | null | undefined`。 再次说明，稍后我们会介绍联合类型。

> 注意：我们鼓励尽可能地使用`--strictNullChecks `（严格的空检查）



#### 接口

```typescript
interface SquareConfig {
    readonly x: number;// 只读属性
    color?: string; // 可选属性
    width?: number;
    (source: string, subString: string): boolean; // 函数类型
    [propName: string]: any; // 额外的属性检查 `字符串索引签名`
}

function createSquare(config: SquareConfig): void {
    // ...
}
let mySquare = createSquare({ colour: "red", width: 100 });
```

