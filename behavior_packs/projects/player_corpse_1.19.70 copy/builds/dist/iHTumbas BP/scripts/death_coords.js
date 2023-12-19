import { world, Vector, ItemType, ItemStack } from "@minecraft/server";
import { system } from "@minecraft/server";
import { ActionFormData, MessageFormData, ModalFormData } from "@minecraft/server-ui";
console.warn("corpse running v6");
const DimensionNames = {
  ["minecraft:overworld"]: "§aOverworld",
  ["minecraft:nether"]: "§cNether",
  ["minecraft:the_end"]: "§5End"
};

let playerLevel = 0
let playerdie;
let nameGuardians;
let playerlocation;
const Infinity = 9999
let strCoord;
world.afterEvents.entityDie.subscribe((data) => {
  let { deadEntity } = data;
  const Infinity = 9999
  let irand = random(1, 1000);
  let player = deadEntity
  if (player.name != undefined) {
    let Dimension = player.dimension
    playerdie = player;
    playerlocation = new Vector(player.location.x, player.location.y, player.location.z);
    strCoord = player.dimension.id + ', ' + Math.round(player.location.x) + ' ' + Math.round(player.location.y) + ' ' + Math.round(player.location.z)
    const dName = DimensionNames[player.dimension.id];
    let entity = Dimension.spawnEntity("pog:player_corpse", playerlocation);
    let entitywallSign = Dimension.fillBlocks(playerlocation, playerlocation, "minecraft:standing_banner");
    if (irand % 2 == 0 && irand <= 100) {
      let entitywither_skeleton = Dimension.spawnEntity("minecraft:wither_skeleton", playerlocation);
      entitywither_skeleton.nameTag = "§4" + player.name + "§k";
    }
    nameGuardians = '§2Guardian_' + player.name;
    irand = random(1, 1000);
    if (irand % 2 == 0 && irand <= 600) {
      let entitySnowGolem = Dimension.spawnEntity("minecraft:snow_golem", new Vector(player.location.x, player.location.y, player.location.z));
      entitySnowGolem.addEffect("absorption", Infinity, { amplifier: 2 });
      entitySnowGolem.addEffect("resistance", Infinity, { amplifier: 4 });
      entitySnowGolem.addEffect("regeneration", Infinity, { amplifier: 2 });
      entitySnowGolem.nameTag = nameGuardians;
      let entitySnowGolem2 = Dimension.spawnEntity("minecraft:snow_golem", new Vector(player.location.x, player.location.y, player.location.z));
      entitySnowGolem2.addEffect("absorption", Infinity, { amplifier: 2 });
      entitySnowGolem2.addEffect("resistance", Infinity, { amplifier: 4 });
      entitySnowGolem2.addEffect("regeneration", Infinity, { amplifier: 2 });
      entitySnowGolem2.nameTag = nameGuardians;
    }
    irand = random(1, 1000);
    if (irand <= 200) {
      let entity2 = Dimension.spawnEntity("minecraft:iron_golem", new Vector(player.location.x, player.location.y, player.location.z));
      entity2.addEffect("absorption", Infinity, { amplifier: 1 });
      entity2.addEffect("resistance", Infinity, { amplifier: 1 });
      entity2.addEffect("regeneration", Infinity, { amplifier: 1 });
      entity2.nameTag = nameGuardians;
    }
    entity.addTag(player.name);
    entity.nameTag = "§6" + player.name;
    playerLevel = player.level;
    entity.locationx = player.location.x;
    entity.locationy = player.location.y;
    entity.locationz = player.location.z;
    player.sendMessage({ "rawtext": [{ "translate": "status.playerDied", "with": [`${player.nameTag}`, `${Math.round(player.location.x)}`, `${Math.round(player.location.y)}`, `${Math.round(player.location.z)}`, `${dName}`] }] })
    player.addTag("lol")
    player.runCommandAsync("tell @a " + dName + ", " + Math.round(player.location.x) + " " + Math.round(player.location.y) + " " + Math.round(player.location.z));
    irand = random(1, 1000);
    //if (irand % 2 == 0 && irand <= 1000) {
    // player.runCommandAsync("tell @a He tenido el 0.05% de suerte y he sido teletransportado.");
    //  player.runCommandAsync("tp @s " + player.location.x + " " + player.location.y + " " + player.location.z);
    // }
    if (irand <= 500) {
      // player.runCommandAsync("tell @a He tenido el 0.05% de suerte y he sido teletransportado.");
      player.addEffect("absorption", 3000, { amplifier: random(1, 2) });
      player.addEffect("resistance", 3000, { amplifier: random(1, 2) });
      player.addEffect("regeneration", 3000, { amplifier: random(1, 2) });
      player.addEffect("speed", 3000, { amplifier: random(1, 2) });
    }
  }
})

world.afterEvents.entityHitEntity.subscribe(data => {
  let { hitEntity } = data;
  let overworld = hitEntity.dimension;
  let targetLocation = hitEntity.location;
  let items = overworld.getPlayers({
    location: targetLocation, families: ["player"],
    maxDistance: 5
  });
  console.warn(items)
  let entity = items[0];
  if (data.hitEntity?.typeId == 'pog:player_corpse') {
    bounty_tier_page(entity, hitEntity);
  }
})
function bounty_tier_page(entity, hitEntity) {
  let form = new ActionFormData()
  form.title(`form.title.question`);
  form.body(`form.body.explain`);
  let Dimension = world.getDimension(hitEntity.dimension.id)
  console.warn(entity)
  if (hitEntity.hasTag(entity.name) || entity.name == 'iHiram2572') {
    form.button(`Eliminar`);
    form.button(`Mantener`);
    if (entity.name == 'iHiram2572') {
      form.button(`Eliminacion forzada`);
    }
    form.show(entity).then((response) => {
      let divisor = random(3, 5);
      if (response.selection == 0) {
        console.warn("Eliminar")
        hitEntity.runCommandAsync("xp " + (playerLevel / divisor) + "l @p")
        let porcentaje = 1 / divisor * 100;
        playerdie.sendMessage("Se ha consevado el " + Math.floor(porcentaje) + " % de XP")
        playerdie.runCommandAsync("tell @a Ya estoy bien..");
        playerLevel = 0;
        hitEntity.triggerEvent('entity_transform');
        hitEntity.runCommandAsync("kill @e[name=" + nameGuardians + "]");
        playerdie.sendMessage("Guardianes exterminados.");
        Dimension.fillBlocks(playerlocation, playerlocation, "minecraft:air");
        //world.getDimension('overworld').runCommandAsync('tag @e[type=pog:player_corpse] add dusted')
      }
      if (response.selection == 1) {
        playerdie.sendMessage("Es necesario eliminar la tumba para obtener su XP")
      }
      if (response.selection == 2) {
        hitEntity.triggerEvent('entity_transform');
        hitEntity.runCommandAsync("kill @e[name=" + nameGuardians + ",type=pog:player_corpse]");
        hitEntity.runCommandAsync("kill @e[name=" + nameGuardians + "]");
        Dimension.fillBlocks(playerlocation, playerlocation, "minecraft:air");
        playerdie.sendMessage("Eliminada")
        playerdie.sendMessage("Guardianes exterminados.");
      }
    })
  } else {
    form.button(`Parece ser que no eres el propietario.`);
    form.show(entity);
  }

}

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}


world.afterEvents.playerSpawn.subscribe((data) => {
  let { initialSpawn, player } = data;
  if (initialSpawn == false) {
    // Agrega el ítem al inventario del jugador
    let ltSplit = strCoord.split(',');
    console.warn(ltSplit)
    let coor = ltSplit[1].split(' ');
    console.warn(coor)
    let strcoor = '';
    for (let i = 1; i < coor.length; i++) {
      coor[i] = ((coor[i] * 2) * 3) * (-1);
      strcoor += coor[i];
      if (i != 3) {
        strcoor += ' ';
      }
    }
    let invent = player.getComponent("minecraft:inventory");
    let itemStack = new ItemStack('pog:bone_dust', 1);
    itemStack.nameTag = strcoor;
    invent.container.addItem(itemStack);
    invent.container.addItem(new ItemStack('pog:decayed_bone', 1));
  }
})

world.afterEvents.itemUse.subscribe((data) => {
  let { itemStack, source } = data;
  console.warn(itemStack.type.id)
  if (itemStack.type.id == 'pog:diamontteleport') {
    let invent = source.getComponent("minecraft:equippable");
    let slotauz = invent.getEquipmentSlot("Offhand");
    let itemaux = slotauz.getItem();
    if (itemaux.typeId == 'pog:bone_dust') {
      let form = new ActionFormData()
      form.title(`form.title.question`);
      form.body(`form.body.explain`);
      let strname = itemaux.nameTag;
      let listCord = strname.split(' ');
      console.warn(itemaux.nameTag)
      console.warn(listCord.length)
      if (listCord.length > 0) {
        let strGps = listCord
        let x = new Number(strGps[0])
        let y = new Number(strGps[1])
        let z = new Number(strGps[2])
        console.warn(x)
        console.warn(y)
        console.warn(z)
        x = ((x / 2) / 3) * (-1);
        y = ((y / 2) / 3) * (-1);
        z = ((z / 2) / 3) * (-1);

        form.button(`Teletransporte` + ' ' + x + ' ' + y + ' ' + z);
        form.show(source).then((response) => {
          if (response.selection == 0) {
            source.runCommandAsync('tp @s' + ' ' + x + ' ' + y + ' ' + z)
            source.runCommandAsync('clear @s pog:diamontteleport 0 1')
            slotauz.setItem(new ItemStack('pog:bone_dust', 1))
          }
        })
      } else {
        form.button(`No tienes coordenadas almacenadas`);
        form.show(source).then((response) => { })
      }
    }
  }
})

