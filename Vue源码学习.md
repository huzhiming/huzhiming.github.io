##### 基础知识部分

```javascript
// 性能监测
window.performance 
// 判断一个对象是否存在某属性
Object.prototype.hasOwnProperty.call(obj,'key'); 
// 是普通对象
isPlainObject (*obj*: *any*): *boolean* {
  return Object.prototype.toString.call(obj) === '[object Object]'
}
// 判断是数组
Array.isArray([])
```



##### 流程部分

```javascript
1、vm.uid 、window.performance 定义uid 以及性能监测
2、vm.$options 合并选项
3、data props compute watch 初始化

initMixin(Vue) // 这里主要注册了_init
stateMixin(Vue) // $set,$delete,$watch
eventsMixin(Vue) // $on, $once, $off, $emit
lifecycleMixin(Vue) //  _update, $forceUpdate,$destroy
renderMixin(Vue) // $nextTick, _render 
```



### 会议总结

##### // 12.18

1、targetStack 作用？(watcher)
2、props,data,computed,watch 的响应式原理？(Wather, defineReactive)
3、data数据怎么挂载到vm实例上面的？（initData）
4、Object/Array拦截？
5、watcher 异步更新？