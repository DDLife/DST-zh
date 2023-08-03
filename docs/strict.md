# strict.lua

[Programming in Lua : 14.2](https://www.lua.org/pil/14.2.html): Lua keeps its global variables in a regular table, we can use metatables to change its behavior when accessing global variables.

<docs-expose>

约束全局变量的定义, 必须通过 `strict` 模块的 `global` 函数定义

</docs-expose>

## global

<docs-expose>

> function global(...args: string[]): void

定义全局变量

### example

```lua
global("MAIN", "WORLDGEN_MAIN")
```

定义了两个变量 `MAIN` 和 `WORLDGEN_MAIN`

</docs-expose>

## local

### mt-\_\_index

[debug.getinfo ([thread,] function [, what])](https://www.lua.org/manual/5.1/manual.html#pdf-debug.getinfo)

```lua
local w = debug.getinfo(2, "S").what
```

w 相当于当前的文件名, 而`w ~= "main" and w ~= "C"`约束了仅仅是针对`main`文件进行检测
