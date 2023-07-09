# util.lua

## distsq

<docs-expose>

v1, v2, v3, v4 => Number

两种形式

- x1:Number, y1:Number, x2:Number, y2:Number => Number

  计算平面点的距离

- v1:Vector3, v2:Vector3 => Number

  计算空间点的距离

</docs-expose>

## FunctionOrValue

<docs-expose>

(a, ...) => any

如果 a 是函数, 则执行 a(...), 否则直接返回 a

</docs-expose>
