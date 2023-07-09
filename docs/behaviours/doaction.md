# doaction.lua

self

- require "bufferedaction"

<docs-expose>

behaviour node, 常做叶节点

</docs-expose>

## DoAction

<docs-expose>

DoAction = (inst, getactionfn, name = "DoAction", run, timeout) extends @BehaviourNode

- getactionfn: inst => action: @BufferedAction

</docs-expose>

## DoAction-OnFail

<docs-expose>

() => ()

self.pendingstatus = @FAILED

</docs-expose>

## DoAction-OnSucceed

<docs-expose>

() => ()

self.pendingstatus = @SUCCESS

</docs-expose>

## DoAction-Visit

<docs-expose>

() => ()

</docs-expose>
