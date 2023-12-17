import { world, Vector, Items, ItemStack, Entity, ItemEnchantsComponent, ItemTypes, EntityInventoryComponent, Block, Enchantment, MinecraftEnchantmentTypes, MinecraftEffectTypes } from "@minecraft/server"
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
let playerdie;

function onPlayerDeath() {
  let players = world.getPlayers()
  for (let player of players) {
    let playerHealt = player.getComponent("minecraft:health").current
    let isDeath = player.hasTag("death")
    let Dimension = world.getDimension(player.dimension.id)
    if (playerHealt == 0 && isDeath == false) {
      playerdie = player;
      const dName = DimensionNames[player.dimension.id];
      player.addTag("death")
      let posY = player.location.y;
      posY = posY + 1;
      let entity = Dimension.spawnEntity("pog:player_corpse", new Vector(player.location.x, player.location.y, player.location.z));

      entity.nameTag = player.name;
      playerLevel = player.level;
      entity.locationx = player.location.x;
      entity.locationy = player.location.y;
      entity.locationz = player.location.z;
      //player.runCommandAsync(`sendMessageraw @a{"rawtext":[{"translate": "§a${player.nameTag} §rdied at: §l§e${Math.round(player.location.x)}, ${Math.round(player.location.y)}, ${Math.round(player.location.z)},§r§f in The §a${dName}"}]}`)
      //player.sendMessage({"rawtext":[{"text": "§a" + player.nameTag + " §rdied at: §l§e" + Math.round(player.location.x) + ", " + Math.round(player.location.y) + ", " + Math.round(player.location.z) + ", §r§f in The §a " + dName}]})
      player.sendMessage({ "rawtext": [{ "translate": "status.playerDied", "with": [`${player.nameTag}`, `${Math.round(player.location.x)}`, `${Math.round(player.location.y)}`, `${Math.round(player.location.z)}`, `${dName}`] }] })
      player.addTag("lol")
      player.runCommandAsync("tell @a " + dName + ", " + Math.round(player.location.x) + " " + Math.round(player.location.y) + " " + Math.round(player.location.z));
    } else if (playerHealt > 0) {
      player.removeTag("death")
    } else if (playerHealt == 0 && player.hasTag("selected") == true) {
      player.addTag("hardcoreDeath")

    } if (playerHealt == 20 && player.hasTag("hardcoreDeath") == true) {
      player.runCommandAsync("function hardcore")
    }
  }
}

world.events.entitySpawn.subscribe(evnt => {
  let irand = random(1, 10);
  let entity = evnt.entity;
  console.warn("1");
  console.warn(entity.typeId)
  let txtEntity = entity.typeId
  txtEntity = txtEntity.replace("minecraft:", "");
  let objEntuty = MinecraftEntityTypes[txtEntity];
  if (entity.typeId == 'minecraft:zombie_villager_v2') {
    entity.addEffect(MinecraftEffectTypes.speed, 100000, 20);
  } else {

    entity.addEffect(MinecraftEffectTypes.invisibility, 100000, 20);
    entity.addEffect(MinecraftEffectTypes.conduitPower, 100000, 20);
  }
  //if (entity.type_family.includes('mob')) {
  //console.warn("Mobbbb")
  //}
  if (irand % 2 == 0) {
  } else {
  }
})
function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}
system.runInterval(onPlayerDeath)
world.events.entityHit.subscribe(data => {
  let { entity, hitEntity } = data;
  if (data.hitEntity?.typeId == 'pog:player_corpse') {
    console.warn("lol");
    bounty_tier_page(entity, hitEntity)
  }
})
function bounty_tier_page(entity, hitEntity) {
  let form = new ActionFormData()
  form.title(`form.title.question`)
  form.body(`form.body.explain`)
  form.button(`Eliminar!`)
  form.button(`Mantener`)
  form.show(entity).then((response) => {
    if (response.selection == 0) {
      console.warn("Eliminar")
      hitEntity.runCommandAsync("xp " + playerLevel + "l @p")
      hitEntity.runCommandAsync("xp -100000l iCapiii")
      playerdie.runCommandAsync("tell @a Estoy bien..");
      playerLevel = 0;
      hitEntity.triggerEvent('entity_transform')
      //world.getDimension('overworld').runCommandAsync('tag @e[type=pog:player_corpse] add dusted')
    }
    if (response.selection == 1) {
      console.warn("No seeeee")
    }
  })
}