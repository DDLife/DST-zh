# vector3.lua

## Vector3

<docs-expose>

```ts
class Vector3 {
  constructor(x?: number, y?: number, z?: number);
  x: number;
  y: number;
  z: number;
  __add(rhs: Vector3): Vector3;
  __sub(rhs: Vector3): Vector3;
  __mul(rhs: number): Vector3;
  __div(rhs: number): Vector3;
  __unm(): Vector3; // negate the value
  Dot(rhs: Vector3): number;
  Cross(rhs: Vector3): Vector3;
  __tostring(): string;
  __eq(rhs: Vector3): boolean;
  DistSq(other: Vector3): number;
  Dist(other: Vector3): number;
  LengthSq(): number;
  Length(): number;
  Normalize(): Vector3;
  GetNormalized(): Vector3;
  GetNormalizedAndLength(): [Vector3, number];
  Get(): [number, number, number];
  IsVector3(): boolean;
}
```

</docs-expose>

## Point

<docs-expose>

Point = Vector3

</docs-expose>

## ToVector3

<docs-expose>

```ts
function ToVector3(
  obj: Vector3 | [number, number, number] | number,
  y?: number,
  z?: number
): Vector3;
```

### example

```lua
local vector3 = require("vector3")

-- v1 = Vector3(1, 2, 3)
local v1 = vector3.new(1, 2, 3)

-- v2 = Vector3(4, 5, 6)
local v2 = vector3.ToVector3({4, 5, 6})

-- v3 = Vector3(7, 8, 9)
local v3 = vector3.ToVector3(7, 8, 9)

-- v4 = Vector3(10, 11, 13)
local v4 = vector3.ToVector3({10, 11, 12}, 13)

-- v5 = Vector3(14, 17, 18)
local v5 = vector3.ToVector3({14, 15, 16}, 17, 18)
```

</docs-expose>

## Vector3FromTheta

<docs-expose>

```ts
function Vector3FromTheta(theta: number, radius?: number): Vector3;
```

$$\text{Vector3FromTheta}(\theta, r) = \begin{bmatrix}r\cos(\theta)\\0\\-r\sin(\theta)\end{bmatrix}$$

</docs-expose>
