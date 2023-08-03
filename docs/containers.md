# containers.lua

<docs-expose>

基本的设计模式如下

```lua
--[[
    The icebox container parameters.
    It contains a widget table with the following fields:
        - slotpos: a table with the position of each slot in the container.
        - animbank: the name of the bank used for the container's animation.
        - animbuild: the name of the build used for the container's animation.
        - pos: the position of the container in the world.
        - side_align_tip: the alignment of the container's tooltip.
    It also contains a type field with the value "chest".
]]
params.icebox =
{
    widget =
    {
        slotpos = {},
        animbank = "ui_chest_3x3",
        animbuild = "ui_chest_3x3",
        pos = Vector3(0, 200, 0),
        side_align_tip = 160,
    },
    type = "chest",
}

-- Populates the slotpos table with the position of each slot in the container.
for y = 2, 0, -1 do
    for x = 0, 2 do
        table.insert(params.icebox.widget.slotpos, Vector3(80 * x - 80 * 2 + 80, 80 * y - 80 * 2 + 80, 0))
    end
end
```

</docs-expose>
