# class.lua

self

- require "abstract/class"

<docs-expose>

lua 没有 class. 这是为 lua 设计的 class, 具体实现见 @Class

</docs-expose>

## ClassRegistry

<docs-expose>

ClassRegistry = {}

当 TrackClassInstances = true 时, 里面存放 @Class 生成的类

</docs-expose>

## makereadonly

将 @setter 设置为 @onreadonly

<docs-expose>

t, k => ()

使得 key 变为只读

</docs-expose>

## addsetter

<docs-expose>

t, k, fn : @setter => ()

使得 key 变为只读

</docs-expose>

## removesetter

## Class

从这些角度考虑:

- instance
- class
- constructor
- base

通过 class 定义的方法会放到 class 里面, 定义的属性会 copy 到 obj 这样实现了 method 共享, data 独立

---

<docs-expose>

base: class | function, \_ctor : function, props => class

- base: base class
- \_ctor: constructor function
- props: 定义 @setter, 用于 data proxy

  ```js
  {key1: setter1, ...}
  ```

class:

- (self, ...): 构造函数
- self.\_ctor: constructor function
- self.\_base: base class, 用来调用父类方法实现方法的扩展
- self.is_a: @\_is_a
- self.is_instance: class.is_instance(obj)

注意:

1. (func, nil, ?) == (nil, func, ?), 即说明 base 就是一个 constructor
2. (func1, func2, ?) == (nil, func2, ?), \_ctor 的优先级高 base

进一步可见[Class](https://atjiu.github.io/dstmod-tutorial/#/class)

setter 和 makereadonly 的用法:

```lua
local Person = Class(nil, function(self, age)
    self._ = { age = age }
    addsetter(self, "age", function(self, value)
        assert(value >= 0 and value <= 120, "Age must be between 0 and 120")
        self._.age = value
    end)
end)

local p = Person(30)
print(p.age) -- prints 30
p.age = 150 -- throws an error
```

</docs-expose>

---

- class -> mt, mt 里面只是存放了一个\_\_call 方法
- obj -> class

没有 props, 只有 method 的类的 obj 的结构为:

```js
const Class = {
  ...base,
  method1: func1,
  method2: func2,
  __index: Class,
  _ctor: constructor,
  _base: base,
};
const obj = {
  __meta: Class,
};
```

有 props 的类的 obj 的结构为:

```js
const Class = {
  ...base,
  method1: func1,
  method2: func2,
  __index: __index,
  __newIndex: __newIndex,
  _ctor: constructor,
  _base: base,
};
const obj = {
  _: {
    key1: [value1, setter1],
    key2: [value2, setter2],
  },
  __meta: Class,
};
```

---

.(self, ...):

1. 先初始化属性, 把 props 的键值对 , 放入到 obj 中

   ```js
   {
     _: {
       key1: [nil, setter1],
       key2: [nil, setter2],
     },
   }
   ```

2. obj -> class
3. 调用构造函数 class.\_ctor(obj, ...), 即内部的 self = obj

## local

### \_is_a

<docs-expose>

self, klass => Boolean

判断 self 是否是 klass 的实例

</docs-expose>

就是递归地找继承链

1. 获取类, 即 obj 的 metatable
2. 类通过 \_base 链接起来, 递归遍历

### \_is_class

<docs-expose>

self => Boolean

是否为 @Class

</docs-expose>

实际上即检查是否有 is_instance 属性

### \_\_index

先读取当前 table 的 setter(即`_`)里面是否有属性, 没有就到 metatable 中找

<docs-expose>

t, k => any

用于 data proxy 时候, 类似于 js 的 getter

</docs-expose>

### \_\_newindex

写入的时候, 先找是否有 setter, 没有则写入当前的 table, 如果有, 则调用 setter

<docs-expose>

t, k, v => ()

用于 data proxy 时候, 类似于 js 的 setter, 与 [Writing doesn’t use prototype](https://javascript.info/prototype-inheritance#writing-doesn-t-use-prototype)设计一致

</docs-expose>

### \_\_dummy

<docs-expose>

() => ()

dummy: 假动作

</docs-expose>

### onreadonly

<docs-expose>

实际上就是一个 @setter

</docs-expose>
