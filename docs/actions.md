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

| Property                     | Description                                                                      |
| ---------------------------- | -------------------------------------------------------------------------------- |
| `priority`                   | The priority of the action.                                                      |
| `fn`                         | The function that is called when the action is performed.                        |
| `strfn`                      | The string function that is used to display the name of the action.              |
| `instant`                    | Whether the action can be performed instantly.                                   |
| `rmb`                        | Whether the right mouse button needs to be held down to perform the action.      |
| `distance`                   | The distance at which the action can be performed.                               |
| `mindistance`                | The minimum distance at which the action can be performed.                       |
| `ghost_exclusive`            | Whether the action can only be performed on ghost objects.                       |
| `ghost_valid`                | Whether the action can be performed on ghost objects.                            |
| `mount_valid`                | Whether the action can be performed while mounted.                               |
| `encumbered_valid`           | Whether the action can be performed while encumbered.                            |
| `canforce`                   | Whether the action can be forced.                                                |
| `rangecheckfn`               | The function that is used to check the range of the action.                      |
| `mod_name`                   | The name of the mod that defines the action.                                     |
| `silent_fail`                | Whether the action should fail silently.                                         |
| `paused_valid`               | Whether the action can be performed while the game is paused.                    |
| `actionmeter`                | Whether the action has an action meter.                                          |
| `customarrivecheck`          | The function that is used to check if the entity has arrived at the destination. |
| `is_relative_to_platform`    | Whether the action is relative to the platform.                                  |
| `disable_platform_hopping`   | Whether platform hopping is disabled for the action.                             |
| `skip_locomotor_facing`      | Whether the locomotor facing should be skipped for the action.                   |
| `do_not_locomote`            | Whether the entity should not locomote for the action.                           |
| `extra_arrive_dist`          | The extra distance that the entity should arrive at the destination.             |
| `tile_placer`                | The tile placer object that is used for the action.                              |
| `show_tile_placer_fn`        | The function that is used to show the tile placer.                               |
| `theme_music`                | The theme music that is played during the action.                                |
| `theme_music_fn`             | The client-side function that is used to play the theme music.                   |
| `pre_action_cb`              | The function that is called before the action is performed.                      |
| `invalid_hold_action`        | Whether the action is invalid if it is held down.                                |
| `show_primary_input_left`    | Whether the primary input should be shown on the left.                           |
| `show_secondary_input_right` | Whether the secondary input should be shown on the right.                        |
| `map_action`                 | Whether the action is a map action.                                              |

</docs-expose>

mount_enabled 就是通过 data 来初始化的

```lua
self.mount_enabled = data.mount_enabled or false
```

## ACTIONS

<docs-expose>

一系列的动作挂载在上面的 table

### general

| Action                  | Description                                                    |
| ----------------------- | -------------------------------------------------------------- |
| REPAIR                  | Repairs a structure.                                           |
| READ                    | Reads a book.                                                  |
| DROP                    | Drops an item from the inventory.                              |
| TRAVEL                  | Travels to a location.                                         |
| CHOP                    | Chops down a tree.                                             |
| ATTACK                  | Attacks a target.                                              |
| EAT                     | Eats food.                                                     |
| PICK                    | Picks an item from the ground.                                 |
| PICKUP                  | Picks up an item from the ground and puts it in the inventory. |
| MINE                    | Mines a rock.                                                  |
| DIG                     | Digs the ground.                                               |
| GIVE                    | Gives an item to a target.                                     |
| GIVETOPLAYER            | Gives an item to a player.                                     |
| GIVEALLTOPLAYER         | Gives all items to a player.                                   |
| FEEDPLAYER              | Feeds a player.                                                |
| DECORATEVASE            | Decorates a vase.                                              |
| COOK                    | Cooks food.                                                    |
| FILL                    | Fills a container with water.                                  |
| FILL_OCEAN              | Fills a container with ocean water.                            |
| DRY                     | Dries a wet item.                                              |
| ADDFUEL                 | Adds fuel to a fire.                                           |
| ADDWETFUEL              | Adds wet fuel to a fire.                                       |
| LIGHT                   | Lights a fire.                                                 |
| EXTINGUISH              | Extinguishes a fire.                                           |
| LOOKAT                  | Looks at a target.                                             |
| TALKTO                  | Talks to a target.                                             |
| WALKTO                  | Walks to a target.                                             |
| INTERACT_WITH           | Interacts with a target.                                       |
| BAIT                    | Baits a trap.                                                  |
| CHECKTRAP               | Checks a trap.                                                 |
| BUILD                   | Builds a structure.                                            |
| PLANT                   | Plants a seed.                                                 |
| HARVEST                 | Harvests a crop.                                               |
| GOHOME                  | Goes home.                                                     |
| SLEEPIN                 | Sleeps in a bed.                                               |
| CHANGEIN                | Changes clothes.                                               |
| HITCHUP                 | Hitches up a mount.                                            |
| MARK                    | Marks a location.                                              |
| UNHITCH                 | Unhitches a mount.                                             |
| HITCH                   | Hitches a mount.                                               |
| EQUIP                   | Equips an item.                                                |
| UNEQUIP                 | Unequips an item.                                              |
| SHAVE                   | Shaves fur.                                                    |
| STORE                   | Stores an item.                                                |
| RUMMAGE                 | Searches for an item.                                          |
| DEPLOY                  | Deploys a structure.                                           |
| DEPLOY_TILEARRIVE       | Deploys a structure on a tile.                                 |
| PLAY                    | Plays an instrument.                                           |
| CREATE                  | Creates an item.                                               |
| JOIN                    | Joins a game.                                                  |
| NET                     | Catches a fish with a net.                                     |
| CATCH                   | Catches a fish.                                                |
| FISH_OCEAN              | Fishes in the ocean.                                           |
| FISH                    | Fishes.                                                        |
| REEL                    | Reels in a fish.                                               |
| OCEAN_FISHING_POND      | Fishes in a pond.                                              |
| OCEAN_FISHING_CAST      | Casts a line in the ocean.                                     |
| OCEAN_FISHING_REEL      | Reels in a fish while ocean fishing.                           |
| OCEAN_FISHING_STOP      | Stops ocean fishing.                                           |
| OCEAN_FISHING_CATCH     | Catches a fish while ocean fishing.                            |
| CHANGE_TACKLE           | Changes fishing tackle.                                        |
| POLLINATE               | Pollinates a flower.                                           |
| FERTILIZE               | Fertilizes a plant.                                            |
| SMOTHER                 | Smothers a fire.                                               |
| MANUALEXTINGUISH        | Extinguishes a fire manually.                                  |
| LAYEGG                  | Lays an egg.                                                   |
| HAMMER                  | Hammers a structure.                                           |
| TERRAFORM               | Terraforms the ground.                                         |
| JUMPIN                  | Jumps into a wormhole.                                         |
| TELEPORT                | Teleports to a location.                                       |
| RESETMINE               | Resets a mined rock.                                           |
| ACTIVATE                | Activates a structure.                                         |
| OPEN_CRAFTING           | Opens a crafting menu.                                         |
| MURDER                  | Murders a target.                                              |
| HEAL                    | Heals a target.                                                |
| INVESTIGATE             | Investigates a target.                                         |
| UNLOCK                  | Unlocks a structure.                                           |
| USEKLAUSSACKKEY         | Uses a key to open a chest.                                    |
| TEACH                   | Teaches a recipe.                                              |
| TURNON                  | Turns on a structure.                                          |
| TURNOFF                 | Turns off a structure.                                         |
| SEW                     | Sews an item.                                                  |
| STEAL                   | Steals an item.                                                |
| USEITEM                 | Uses an item.                                                  |
| USEITEMON               | Uses an item on a target.                                      |
| STOPUSINGITEM           | Stops using an item.                                           |
| TAKEITEM                | Takes an item from a container.                                |
| MAKEBALLOON             | Makes a balloon.                                               |
| CASTSPELL               | Casts a spell.                                                 |
| CAST_POCKETWATCH        | Casts a spell with a pocket watch.                             |
| BLINK                   | Blinks to a location.                                          |
| BLINK_MAP               | Blinks to a location on the map.                               |
| COMBINESTACK            | Combines stacks of items.                                      |
| TOGGLE_DEPLOY_MODE      | Toggles deploy mode.                                           |
| SUMMONGUARDIAN          | Summons a guardian.                                            |
| HAUNT                   | Haunts a target.                                               |
| UNPIN                   | Unpins a target.                                               |
| STEALMOLEBAIT           | Steals mole bait.                                              |
| MAKEMOLEHILL            | Makes a molehill.                                              |
| MOLEPEEK                | Peeks into a molehill.                                         |
| FEED                    | Feeds an animal.                                               |
| UPGRADE                 | Upgrades a structure.                                          |
| HAIRBALL                | Coughs up a hairball.                                          |
| CATPLAYGROUND           | Plays in a cat playground.                                     |
| CATPLAYAIR              | Plays in the air.                                              |
| FAN                     | Uses a fan.                                                    |
| ERASE_PAPER             | Erases a drawing.                                              |
| DRAW                    | Draws a picture.                                               |
| BUNDLE                  | Bundles items.                                                 |
| BUNDLESTORE             | Stores a bundle.                                               |
| WRAPBUNDLE              | Wraps a bundle.                                                |
| UNWRAP                  | Unwraps a bundle.                                              |
| BREAK                   | Breaks a structure.                                            |
| CONSTRUCT               | Constructs a structure.                                        |
| STOPCONSTRUCTION        | Stops constructing a structure.                                |
| APPLYCONSTRUCTION       | Applies construction to a structure.                           |
| STARTCHANNELING         | Starts channeling.                                             |
| STOPCHANNELING          | Stops channeling.                                              |
| APPLYPRESERVATIVE       | Applies preservative to an item.                               |
| COMPARE_WEIGHABLE       | Compares the weight of two items.                              |
| WEIGH_ITEM              | Weighs an item.                                                |
| START_CARRAT_RACE       | Starts a carrat race.                                          |
| CASTSUMMON              | Casts a summoning spell.                                       |
| CASTUNSUMMON            | Casts an unsummoning spell.                                    |
| COMMUNEWITHSUMMONED     | Communicates with a summoned creature.                         |
| TELLSTORY               | Tells a story.                                                 |
| PERFORM                 | Performs an action.                                            |
| TOSS                    | Toss an item.                                                  |
| NUZZLE                  | Nuzzle.                                                        |
| WRITE                   | Write.                                                         |
| ATTUNE                  | Attune.                                                        |
| REMOTERESURRECT         | Remotely resurrect.                                            |
| REVIVE_CORPSE           | Revive a corpse.                                               |
| MIGRATE                 | Migrate.                                                       |
| MOUNT                   | Mount.                                                         |
| DISMOUNT                | Dismount.                                                      |
| SADDLE                  | Saddle.                                                        |
| UNSADDLE                | Unsaddle.                                                      |
| BRUSH                   | Brush.                                                         |
| ABANDON                 | Abandon.                                                       |
| PET                     | Pet.                                                           |
| DISMANTLE               | Dismantle.                                                     |
| TACKLE                  | Tackle.                                                        |
| GIVE_TACKLESKETCH       | Give tackle sketch.                                            |
| REMOVE_FROM_TROPHYSCALE | Remove from trophy scale.                                      |
| CYCLE                   | Cycle.                                                         |
| CASTAOE                 | Cast area of effect.                                           |
| HALLOWEENMOONMUTATE     | Mutate during Halloween moon event.                            |
| WINTERSFEAST_FEAST      | Feast during winter's feast event.                             |
| BEGIN_QUEST             | Begin a quest.                                                 |
| ABANDON_QUEST           | Abandon a quest.                                               |
| SING                    | Sing.                                                          |
| SING_FAIL               | Fail singing.                                                  |

### Quagmire

| Action     | Description |
| ---------- | ----------- |
| TILL       | Till.       |
| PLANTSOIL  | Plant soil. |
| INSTALL    | Install.    |
| TAPTREE    | Tap tree.   |
| SLAUGHTER  | Slaughter.  |
| REPLATE    | Replate.    |
| SALT       | Salt.       |
| BATHBOMB   | Bath bomb.  |
| COMMENT    | Comment.    |
| WATER_TOSS | Water toss. |

### boat

| Action                       | Description                   |
| ---------------------------- | ----------------------------- |
| RAISE_SAIL                   | Raise sail.                   |
| LOWER_SAIL                   | Lower sail.                   |
| LOWER_SAIL_BOOST             | Lower sail boost.             |
| LOWER_SAIL_FAIL              | Lower sail fail.              |
| RAISE_ANCHOR                 | Raise anchor.                 |
| LOWER_ANCHOR                 | Lower anchor.                 |
| EXTEND_PLANK                 | Extend plank.                 |
| RETRACT_PLANK                | Retract plank.                |
| ABANDON_SHIP                 | Abandon ship.                 |
| MOUNT_PLANK                  | Mount plank.                  |
| DISMOUNT_PLANK               | Dismount plank.               |
| REPAIR_LEAK                  | Repair leak.                  |
| STEER_BOAT                   | Steer boat.                   |
| SET_HEADING                  | Set heading.                  |
| STOP_STEERING_BOAT           | Stop steering boat.           |
| CAST_NET                     | Cast net.                     |
| ROW_FAIL                     | Row fail.                     |
| ROW                          | Row.                          |
| ROW_CONTROLLER               | Row controller.               |
| BOARDPLATFORM                | Board platform.               |
| OCEAN_TOSS                   | Ocean toss.                   |
| UNPATCH                      | Unpatch.                      |
| POUR_WATER                   | Pour water.                   |
| POUR_WATER_GROUNDTILE        | Pour water ground tile.       |
| PLANTREGISTRY_RESEARCH_FAIL  | Plant registry research fail. |
| PLANTREGISTRY_RESEARCH       | Plant registry research.      |
| ASSESSPLANTHAPPINESS         | Assess plant happiness.       |
| ATTACKPLANT                  | Attack plant.                 |
| PLANTWEED                    | Plant weed.                   |
| ADDCOMPOSTABLE               | Add compostable.              |
| WAX                          | Wax.                          |
| APPRAISE                     | Appraise.                     |
| UNLOAD_WINCH                 | Unload winch.                 |
| USE_HEAVY_OBSTACLE           | Use heavy obstacle.           |
| ADVANCE_TREE_GROWTH          | Advance tree growth.          |
| ROTATE_BOAT_CLOCKWISE        | Rotate boat clockwise.        |
| ROTATE_BOAT_COUNTERCLOCKWISE | Rotate boat counterclockwise. |
| ROTATE_BOAT_STOP             | Rotate boat stop.             |
| BOAT_MAGNET_ACTIVATE         | Boat magnet activate.         |
| BOAT_MAGNET_DEACTIVATE       | Boat magnet deactivate.       |
| BOAT_MAGNET_BEACON_TURN_ON   | Boat magnet beacon turn on.   |
| BOAT_MAGNET_BEACON_TURN_OFF  | Boat magnet beacon turn off.  |
| BOAT_CANNON_LOAD_AMMO        | Boat cannon load ammo.        |
| BOAT_CANNON_START_AIMING     | Boat cannon start aiming.     |
| BOAT_CANNON_SHOOT            | Boat cannon shoot.            |
| BOAT_CANNON_STOP_AIMING      | Boat cannon stop aiming.      |
| OCEAN_TRAWLER_LOWER          | Ocean trawler lower.          |
| OCEAN_TRAWLER_RAISE          | Ocean trawler raise.          |
| OCEAN_TRAWLER_FIX            | Ocean trawler fix.            |
| EMPTY_CONTAINER              | Empty container.              |
| CARNIVAL_HOST_SUMMON         | Carnival host summon.         |

### special

| Action                   | Subject     | Description               |
| ------------------------ | ----------- | ------------------------- |
| YOTB_SEW                 | YOTB        | YOTB sew.                 |
| YOTB_STARTCONTEST        | YOTB        | YOTB start contest.       |
| YOTB_UNLOCKSKIN          | YOTB        | YOTB unlock skin.         |
| CARNIVALGAME_FEED        | -           | Carnival game feed.       |
| RETURN_FOLLOWER          | YOT_Catcoon | Return follower.          |
| HIDEANSEEK_FIND          | YOT_Catcoon | Hide and seek find.       |
| MUTATE_SPIDER            | WEBBER      | Mutate spider.            |
| HERD_FOLLOWERS           | WEBBER      | Herd followers.           |
| REPEL                    | WEBBER      | Repel.                    |
| BEDAZZLE                 | WEBBER      | Bedazzle.                 |
| DISMANTLE_POCKETWATCH    | WANDA       | Dismantle pocket watch.   |
| LIFT_DUMBBELL            | WOLFGANG    | Lift dumbbell.            |
| STOP_LIFT_DUMBBELL       | WOLFGANG    | Stop lift dumbbell.       |
| ENTER_GYM                | WOLFGANG    | Enter gym.                |
| UNLOAD_GYM               | WOLFGANG    | Unload gym.               |
| LEAVE_GYM                | WOLFGANG    | Leave gym.                |
| LIFT_GYM_SUCCEED_PERFECT | WOLFGANG    | Lift gym succeed perfect. |
| LIFT_GYM_SUCCEED         | WOLFGANG    | Lift gym succeed.         |
| LIFT_GYM_FAIL            | WOLFGANG    | Lift gym fail.            |
| APPLYMODULE              | WX78        | Apply module.             |
| APPLYMODULE_FAIL         | WX78        | Apply module fail.        |
| REMOVEMODULES            | WX78        | Remove modules.           |
| REMOVEMODULES_FAIL       | WX78        | Remove modules fail.      |
| CHARGE_FROM              | WX78        | Charge from.              |
| ROTATE_FENCE             | -           | Rotate fence.             |
| USEMAGICTOOL             | MAXWELL     | Use magic tool.           |
| STOPUSINGMAGICTOOL       | MAXWELL     | Stop using magic tool.    |
| USESPELLBOOK             | MAXWELL     | Use spell book.           |
| CLOSESPELLBOOK           | MAXWELL     | Close spell book.         |
| CAST_SPELLBOOK           | MAXWELL     | Cast spell book.          |

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
