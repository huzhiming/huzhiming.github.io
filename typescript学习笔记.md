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

// 枚举 可用于表示状态硬编码情况下
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
let obj: object = { x: 1 }
let obj: {x:number} = { x: 1 }


// function 函数声明的四种方式
function add1 (x: number, y: number) {
	return x + y
}
let add2: (x: number, y: number) => number
type add3 = (x: number, y: number) => number
interface add4 {
	(x: number, y:number): number
}
// 函数重载的含义：两个函数如果名称相同，但是参数个数或者参数类型不同，那么就实现了一个函数重载
// 函数重载的好处：不需要为了相似功能的函数选用不同的函数名称，这样增强了函数的可读性

```

默认情况下`null`和`undefined`是所有类型的子类型。 就是说你可以把 `null`和`undefined`赋值给`number`类型的变量。

然而，当你指定了`--strictNullChecks`标记，`null`和`undefined`只能赋值给`void`和它们各自。 这能避免 *很多*常见的问题。 也许在某处你想传入一个 `string`或`null`或`undefined`，你可以使用联合类型`string | null | undefined`。 再次说明，稍后我们会介绍联合类型。

> 注意：我们鼓励尽可能地使用`--strictNullChecks `（严格的空检查）



##### 接口

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

##### 类：继承和成员修饰符

```typescript
// 派生类改写基类方法: 派生类定义基类同名方法
// Animal: 动物 Snake:蛇 Horse:马

class Animal {
    // public修饰符 可以在基类+派生类中、及其（基类+派生类）实例对象均可访问（默认值）
    public name: string;
  
    // private修饰符 仅在基类中可访问，其余均不可访问
    private sex: string = '男'
  	
    // protected修饰符 可以在基类+派生类中可访问，（基类+派生类）实例对象不可访问
    protected age: number = 26;
  
  	// protected修饰符 只读，不可被修改
  	readonly num:number = 55


  	// 对constructor使用修饰符，会产生的影响有哪些？
  	// private + constructor: 此类不可被继承生成派生类
  	// protected + constructor: 此类可被继承作为派生类的基类，但本身不可被实例化
  
    constructor(theName: string) { this.name = theName; }
    // 距离，以米为单位
    move(distanceInMeters: number = 0) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}

class Snake extends Animal {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 5) {
        console.log("Slithering...");
        super.move(distanceInMeters);
    }
}

class Horse extends Animal {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 45) {
        console.log("Galloping...");
        super.move(distanceInMeters);
    }
}

let sam = new Snake("Sammy the Python")
let tom: Animal = new Horse("Tommy the Palomino")

sam.move(22)
// VM296:32 Slithering...
// VM296:21 Sammy the Python moved 22m.
tom.move(33)
// VM296:44 Galloping...
// VM296:21 Tommy the Palomino moved 33m.


```

##### 类：抽象类

抽象类做为其它派生类的基类使用，它自身不可被实例化；
抽象类中的抽象方法（使用abstract关键字定义）不包含具体实现并且必须在派生类中实现

```typescript
// 定义一个抽象类
abstract class Animal {
  	// 定义一个抽象方法，派生类实现具体细节
    abstract makeSound(): void;
    // 定义一个方法的具体实现，以便在子类中调用（复用）
    move(): void {
        console.log('roaming the earch...');
    }
}

多态的定义：在抽象类中定义抽象方法，在多个子类中有不同的实现。会在运行时根据对象的不同做不同的操作，实现运行时的绑定
```

##### 类：类与接口的关系

```typescript
一个接口可以约束类成员有哪些属性以及他们的类型？

// 接口只能约束类的公有成员，不能约束类的构造函数
interface Human {
    name: string
    eat(): void
}
// 1、类实现接口必须实现接口中所有的属性，类中可以定义自己的属性
class Asian implements Human {
    name: string
    eat() {}
}

interface Man extends Human {
  run(): void
}
interface Child {
  try(): void
}
// 接口继承多个接口，使用逗号分隔
// 接口的继承可以抽离出可重用的接口，也可以将多个接口合并成一个接口
interface Boy extends Man, Child {}
let boy: Boy = { name: '', eat() {}, run() {}, try() {} }

```

![image-20200219125626335](/Users/zhiming/Library/Application Support/typora-user-images/image-20200219125626335.png)

1、接口之间是可以相互继承的，实现接口中的复用

2、类之间也可以相互继承，实现方法和属性的复用

3、接口是可以通过类来实现的，但是接口只能约束类的公有成员

4、接口可以抽离出类的成员，包括公有，私有和受保护成员



##### 泛型：泛型函数和泛型接口

很多时候，我们希望一个函数或一个类，可以支持多种数据类型，有很大的灵活性。

泛型的定义：不预先确定的数据类型，具体的类型在使用的时候才能确定

```typescript
// 使用泛型 定义一个函数
function log<T>(value: T):T {
  console.log(value)
  return value;
}
两种调用方式：
log<string[]>(['a','b'])
log(['a','b']) // 推荐的一种 类型推断

// 使用泛型 定义一个函数类型
type Log = <T>(value:T) => T // 采用类型别名的方式定义
let myLog:Log = log


// 使用泛型 定义一个接口
interface Log { // 完全等价于 类型别名的定义方式
  <T>(value: T): T
}

在这里泛型仅仅约束了一个函数，还可以用泛型约束接口的所有成员。写法如下：
interface Log<T = number> {
  (value: T): T
}
// 注意一点在实现的时候，必须指定一个类型
let myLog: Log<number> = log
myLog(1)
```

理解泛型的方法：就是把泛型变量与函数的参数等同对待，它呢是另一个维度的参数，是代表类型而不是代表值的参数。泛型在高级类型中有广泛的应用，属于比较重要的章节

##### 泛型：泛型类与泛型约束

```typescript
// 使用泛型 定义一个类
class Log<T> {
  run(value:T){}
  
  static run2(value:T){} // error 注意点：静态成员不能引用类型参数
}

let log = new Log<number>() // 可以不传类型参数，T代表任意值
log.run(1)

// 使用泛型 定义类型约束
interface Length {
  length: number
}
function log<T extends Length>(value: T):T {
  console.log(value, value.length) // value必须包含length属性，属于类型约束
  return value;
}
```

泛型的好处：

1、函数和类可以轻松的支持多种类型，增强程序的拓展性

2、不必写多条函数重载，冗长的联合类型声明，增强代码可读性

3、灵活控制类型之间的约束

#### 高级类型

交叉类型 T & U

联合类型： T | U







```
内置工具类型：
type A = Partial<T>   //构造一个类型，将T的所有属性设置为可选
type A = Readonly<T>  //构造一个类型，将T的所有属性设置为只读
type A = Recore<K,T>  //构造一个类型，将K的所有属性作为K  将T作为属性值赋值给


// 类型约束
type BaseType = string | number | boolean

// 这里表示 copy 的参数 T 只能是字符串、数字、布尔这几种基础类型
function copy<T extends BaseType>(arg: T): T {
  return arg
}

// a必须是obj的属性
function getValue<T, K extends keyof T>(obj: T, key: K) {
  return obj[key]
}
const obj = { a: 1 }
const a = getValue(obj, 'a')

```
































