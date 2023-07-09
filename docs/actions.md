# actions.lua

- require "class"
- require "bufferedaction"
- require "debugtools"
- require "util"
- require "vecutil"
- require "components/embarker"

<docs-expose>

定义各种各样的动作, 如 eat, equip

</docs-expose>

## Action

<docs-expose>

Action = data, priority, instant, rmb, distance

- data: 用于扩展的数据
- priority
- instant
- rmb
- distance

Action:

- priority
- fn: #fn
- strfn
- testfn
- instant
- rmb
- distance
- mount_enabled

</docs-expose>

mount_enabled 就是通过 data 来初始化的

```lua
self.mount_enabled = data.mount_enabled or false
```

## ACTIONS

<docs-expose>

一系列的动作挂载在上面的 table

</docs-expose>

## ACTIONS-EAT-fn

<docs-expose>

执行 eat 的动作

</docs-expose>

可以作用对象挂载在 target 或者 invobject 上面

## local

### DefaultRangeCheck

<docs-expose>

doer, target => Boolean

target 是否处于 doer 的默认范围内

</docs-expose>

1. 获取 doer, target 坐标 @Transform-GetWorldPosition
2. 计算距离 @distsq

### CheckFishingOceanRange

<docs-expose>

doer, dest => Boolean

</docs-expose>

1. 获取测试点 $P_\text{test} = P_\text{doer} + 0.25 * \text{dir}$
2. 判断是否是地面 ( @TheWorld - @Map-IsVisualGroundAtPoint ) 或者 ( @TheWorld - @Map-GetPlatformAtPoint )

### CheckRowRange

<docs-expose>

doer, dest => Boolean

</docs-expose>

TODO 没看懂是针对什么

### CheckIsOnPlatform

<docs-expose>

doer, dest => Boolean

</docs-expose>

### CheckOceanFishingCastRange

<docs-expose>

doer, dest => Boolean

与 @CheckFishingOceanRange 代码内容一致

</docs-expose>

### fn

<docs-expose>

act => any

- any: component 的返回值

动作的执行时通过 component 来操作的

</docs-expose>

### strfn

<docs-expose>

动作的描述

</docs-expose>
