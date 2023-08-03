# componentactions.lua

这里面不少的动作的逻辑是是测试动作的条件, 然后将可行的动作添加到动作列表里面, 如 @Row

## AddComponentAction

<docs-expose>

```ts
AddComponentAction(
  actiontype: string,
  component: string,
  fn: () => void,
  modname: string
): void;
```

```lua
MOD_COMPONENT_ACTIONS[modname][actiontype][component] = fn
```

展现了 actions 的布局, 和 @COMPONENT_ACTIONS 结构一致

```ts
actiontype = "SCENE" | "USEITEM" | "POINT" | "EQUIPPED" | "INVENTORY";
```

component 是名字, 如 pickable, pinnable

</docs-expose>

## EntityScript-RegisterComponentActions

<docs-expose>

```typescript
RegisterComponentActions(name: string): void;
```

The `RegisterComponentActions` method is used to register the actions that can be performed on a component with the specified name.

</docs-expose>

## EntityScript-UnregisterComponentActions

<docs-expose>

```typescript
UnregisterComponentActions(name: string): void;
```

The `UnregisterComponentActions` method is used to unregister the actions that can be performed on a component with the specified name.

</docs-expose>

## EntityScript-CollectActions

<docs-expose>

```typescript
CollectActions(actiontype: string, ...args: any[]): void;
```

The `CollectActions` method is used to collect the actions that can be performed on the entity of the specified action type.

</docs-expose>

## EntityScript-IsActionValid

<docs-expose>

```typescript
IsActionValid(action: any, right: any): boolean;
```

The `IsActionValid` method is used to determine whether the specified action is valid for the entity.

</docs-expose>

## EntityScript-HasActionComponent

<docs-expose>

```typescript
HasActionComponent(name: string): boolean;
```

The `HasActionComponent` method is used to determine whether the entity has a component with the specified name.

</docs-expose>

## local

### Row

<docs-expose>

Overall, the Row function is used to determine what actions are available to the player when they are attempting to row a boat. The function checks various conditions, such as whether the player is hovering over water or their own platform, and adds the appropriate actions to the available actions table.

</docs-expose>

### COMPONENT_ACTIONS

<docs-expose>

The table contains five keys, each of which represents a different type of action that can be performed:

- `SCENE`: This key represents the action of using an object in the game world. The arguments for this action are `inst`, `doer`, `actions`, and `right`.

- `USEITEM`: This key represents the action of using an inventory item on an object in the game world. The arguments for this action are `inst`, `doer`, `target`, `actions`, and `right`.

- `POINT`: This key represents the action of using an inventory item on a point in the game world. The arguments for this action are `inst`, `doer`, `pos`, `actions`, and `right`.

- `EQUIPPED`: This key represents the action of using an equipped item on yourself or a target object in the game world. The arguments for this action are `inst`, `doer`, `target`, `actions`, and `right`.

- `INVENTORY`: This key represents the action of using an inventory item. The arguments for this action are `inst`, `doer`, `actions`, and `right`.

Each key in the `COMPONENT_ACTIONS` table is associated with an Lua table, which can be populated with functions that define the behavior of the action.

</docs-expose>
