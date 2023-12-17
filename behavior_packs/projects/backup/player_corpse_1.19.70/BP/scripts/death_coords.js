import { world, Vector, Items, ItemStack, Entity, ItemEnchantsComponent, ItemTypes, EntityInventoryComponent, Block, Enchantment, MinecraftEnchantmentTypes } from "@minecraft/server"
import { system } from "@minecraft/server";
import { MinecraftEntityTypes, DynamicPropertiesDefinition } from "@minecraft/server"
import { ActionFormData, MessageFormData, ModalFormData } from "@minecraft/server-ui"

world.events.worldInitialize.subscribe((eventData) => {
  let playerCompShowTick = new DynamicPropertiesDefinition()
  playerCompShowTick.defineBoolean("hardcoreDeath")
  playerCompShowTick.defineBoolean("hardcoreOption")
  playerCompShowTick.defineBoolean("joined")
  eventData.propertyRegistry.registerEntityTypeDynamicProperties(playerCompShowTick, MinecraftEntityTypes["player"])
})

system.events.beforeWatchdogTerminate.subscribe(data => {
  data.cancel = true;
});
      const DimensionNames = {
        ["minecraft:overworld"]: "§aOverworld",
        ["minecraft:nether"]: "§cNether",
        ["minecraft:the_end"]: "§5End"
      };

      ///
      let playerLevel = 0
      function onPlayerDeath() {
          let players = world.getPlayers()
          for (let player of players) {
            let playerHealt = player.getComponent("minecraft:health").current
            let isDeath = player.hasTag("death")
            let Dimension = world.getDimension(player.dimension.id)
            if (playerHealt == 0 && isDeath == false) {
              const dName = DimensionNames[player.dimension.id];
              player.addTag("death")
              let entity = Dimension.spawnEntity("pog:player_corpse", new Vector(player.location.x, player.location.y, player.location.z));
              entity.nameTag = "Corpse of " + player.name;
              //player.runCommandAsync(`sendMessageraw @s{"rawtext":[{"text": "§a${player.nameTag} §rdied at: §l§e${Math.round(player.location.x)}, ${Math.round(player.location.y)}, ${Math.round(player.location.z)},§r§f in The §a${dName}"}]}`)
              //player.sendMessage({"rawtext":[{"text": "§a" + player.nameTag + " §rdied at: §l§e" + Math.round(player.location.x) + ", " + Math.round(player.location.y) + ", " + Math.round(player.location.z) + ", §r§f in The §a " + dName}]})
              player.sendMessage({"rawtext":[{"translate": "status.playerDied", "with": [`${player.nameTag}`, `${Math.round(player.location.x)}`, `${Math.round(player.location.y)}`, `${Math.round(player.location.z)}`, `${dName}`]}]})
              player.addTag("lol")
              playerLevel = player.level
              console.warn(playerLevel)
            } else if (playerHealt > 0) {
              player.removeTag("death")
            } else if(playerHealt == 0 && player.hasTag("selected") == true) {
              player.addTag("hardcoreDeath")
              
            } if(playerHealt == 20 && player.hasTag("hardcoreDeath") == true) {
              player.runCommandAsync("function hardcore")
            }
        }
        }
      
      
        system.runInterval(onPlayerDeath)
        world.events.entityHit.subscribe(data => {
          let { entity, hitEntity } = data;
      if(data.hitEntity?.typeId == 'pog:player_corpse'){
        console.warn("lol");
        bounty_tier_page(entity, hitEntity)
          }})
      
          function bounty_tier_page(entity, hitEntity) {
            let form = new ActionFormData()
              form.title(`form.title.question`)
              form.body(`form.body.explain`)
              ///buttons
              form.button(`Dust It!`)
              form.button(`Keep Corpse`)
              form.show(entity).then((response) => {
                if (response.selection == 0) {
                  console.warn("Dust")
                  hitEntity.runCommandAsync("xp " + playerLevel + "l @p")
                  hitEntity.triggerEvent('entity_transform')
                  //world.getDimension('overworld').runCommandAsync('tag @e[type=pog:player_corpse] add dusted')
                }
                if (response.selection == 1) {
                  console.warn("Spare")
                }
              })
          }