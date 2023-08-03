# debugprint.lua

<docs-expose>

个人角色可以在 DST 的控制台设置

```lua
PRINT_SOURCE = false
```

然后, 使得 print 能够打印出来文件名和行号

</docs-expose>

添加了 consolelog 的 listener

## CWD

## escape_lua_pattern

根据 matches 里面定义的规则进行映射

```hs
import Data.List (intercalate)

escapeLuaPattern :: String -> String
escapeLuaPattern s = intercalate "" (map escapeChar s)
  where
    escapeChar :: Char -> String
    escapeChar c = case c of
      '^' -> "%^"
      '$' -> "%$"
      '(' -> "%("
      ')' -> "%)"
      '%' -> "%%"
      '.' -> "%."
      '[' -> "%["
      ']' -> "%]"
      '*' -> "%*"
      '+' -> "%+"
      '-' -> "%-"
      '?' -> "%?"
      '{' -> "%{"
      '}' -> "%}"
      '\\' -> "%\\"
      _ -> [c]
```

<docs-expose>

```ts
function escape_lua_pattern(s: string): string;
```

For example, if `s` is `"hello.world?"`, the `escape_lua_pattern` function will return `"hello%.world%?"`. The `.` character is escaped as `%.`, and the `?` character is escaped as `%?`.

</docs-expose>

## print

<docs-expose>

```ts
function print(...args: any[]): void;
```

The custom implementation wraps the original print function in code that shows what line number it is coming from, and pushes it out to all of the print loggers.

</docs-expose>

会调用 print 的 listener

## nolineprint

<docs-expose>

```ts
function nolineprint(...args: any[]): void;
```

</docs-expose>

## AddPrintLogger

<docs-expose>

```ts
function AddPrintLogger(fn: (string) => void): void;
```

相当于给 print 添加一个 listener

</docs-expose>

## GetConsoleOutputList

<docs-expose>

```ts
function GetConsoleOutputList(): string[];
```

获取 consolelog 的内容

</docs-expose>

## local

### packstring

<docs-expose>

```ts
function packstring(...args: string[]): string;
```

convert a variable number of arguments into a single string

</docs-expose>

### consolelog

<docs-expose>

```ts
function consolelog(...args: any[]): void;
```

一个 print 的 listener, 内容保存在 debugstr 中, 调用 @GetConsoleOutputList 获得

只会保存最近的 20 条记录

</docs-expose>
