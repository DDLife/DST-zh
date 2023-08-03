# main.lua

- require "strict"
- require "debugprint"
- require "config"
- require "vector3"
- require "mainfunctions"

```lua
-- Override the package.path in luaconf.h because it is impossible to find
package.path = "scripts\\?.lua;scriptlibs\\?.lua"
```

可以知道, 有一个`luaconf.h`预定义了一些变量

---

@AddPrintLogger `TheSim:LuaPrint`

## loadfile

<docs-expose>

对 @loadfn 进行封装

</docs-expose>

之所以这样觉得是 don't starve 没有 scripts 目录, 而 DST 有

## local

### loadfn

<docs-expose>

> const loadfn: (modulename: string) => any | string

</docs-expose>

1. 规范化, 路径`\` or `.` -> `/`

For example, if the `modulename` variable contains the string `"foo.bar"`, this code will return the string `"foo/bar"`. Similarly, if `modulename` contains the string `"foo\\bar"`, this code will return the string `"foo/bar"`.

2. It then iterates over each path in the `package.path` string, which is a semicolon-separated list of directories that Lua searches for modules.

`"([^;]+)"` 代表了分号分隔的模式

3. the loader function checks if the path has been seen before. If it hasn't, it extracts the manifest name from the path, which is the name of the mod that the path belongs to.

```lua
local manifest, matches = string.gsub(path, MODS_ROOT.."([^\\]+)\\scripts\\%?%.lua", "%1", 1)
```

For example, if `MODS_ROOT` is `"C:/Program Files (x86)/Steam/steamapps/common/Don't Starve Together/mods/"` and `path` is `"C:/Program Files (x86)/Steam/steamapps/common/Don't Starve Together/mods/workshop-123456789/scripts/foo.lua"`, this code will set `manifest` to `"workshop-123456789"`.

4. load file

```lua
local result = kleiloadlua(filename, pathdata.manifest, "scripts/"..modulepath..".lua")
```

更底层应该看不见了
