# behavior tree

GitHub Copilot: Sure, here are some resources that you may find helpful for learning more about behavior trees:

1. The original paper on behavior trees by Michiel van der Panne, John Sullivan, and Don Hopkins: http://www.gameaipro.com/GameAIPro/GameAIPro_Chapter06_The_Behavior_Tree_Starter_Kit.pdf

2. A tutorial on behavior trees by Chris Simpson: https://www.gamasutra.com/blogs/ChrisSimpson/20140717/221339/Behavior_trees_for_AI_How_they_work.php

3. A video tutorial series on behavior trees by Sebastian Lague: https://www.youtube.com/watch?v=ZtYzsfjaD9M&list=PLFt_AvWsXl0fEx02iXR8uhDsVGhmM9Pse

4. A book on game AI programming that covers behavior trees by Mat Buckland: https://www.amazon.com/Programming-Game-Example-Mat-Buckland/dp/1556220782

5. A GitHub repository with a collection of behavior tree resources and implementations: https://github.com/behavior3

通过一个 brainManager 来管理全部的 brain, 在 brain 的 start 的时候会向 brainManager 注册. brainManager 对于二次开发是透明的, 只需要理解 brain 即可. 而 brain 是对 behavior tree 的封装

action 是对一些基础动作定义, 比如 read, eat, bufferedaction 是在这上面进一步的封装

```lua
BufferedAction(
    doer, -- EntityScript: the entity performing the action
    target, -- EntityScript: the entity being targeted by the action
    action, -- ACTIONS: the action being performed
    invobject, -- EntityScript: the inventory object being used for the action
    pos, -- Vector3: the position of the action
    recipe, -- Recipe: the recipe being used for the action
    distance, -- number: the distance to the target
    forced, -- boolean: whether the action is being forced
    rotation, -- number: the rotation of the action
    num_loops -- number: the number of times to perform the action
)

BufferedAction:SetActionPoint(pos) -- sets the position of the action
BufferedAction:GetActionPoint() -- gets the position of the action as a Vector3 or nil
BufferedAction:GetDynamicActionPoint() -- gets the position of the action as a DynamicPosition or nil
BufferedAction:AddSuccessAction(fn) -- adds a success callback function to the action
BufferedAction:AddFailAction(fn) -- adds a failure callback function to the action
BufferedAction:Do() -- executes the action
BufferedAction:Succeed() -- calls the success callback functions and clears the success and failure callback lists
```

如:

- doer: maxwell
- target: tree
- action: chop
- inventory object: axe

等等抽象为一个 bufferedaction

对 componentaction 与 action 不是很清晰
