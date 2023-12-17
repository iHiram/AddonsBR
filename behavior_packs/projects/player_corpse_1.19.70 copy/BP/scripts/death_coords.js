import { world, Vector, MinecraftBlockTypes, ItemType, ItemStack } from "@minecraft/server";
import { system } from "@minecraft/server";
import { MinecraftEntityTypes, DynamicPropertiesDefinition } from "@minecraft/server";
import { ActionFormData, MessageFormData, ModalFormData } from "@minecraft/server-ui";
console.warn("corpse running v4");
world.afterEvents.worldInitialize.subscribe((eventData) => {
  let playerCompShowTick = new DynamicPropertiesDefinition();
  playerCompShowTick.defineBoolean("hardcoreDeath");
  playerCompShowTick.defineBoolean("hardcoreOption");
  playerCompShowTick.defineBoolean("joined");
  eventData.propertyRegistry.registerEntityTypeDynamicProperties(playerCompShowTick, MinecraftEntityTypes["player"]);
})
const DimensionNames = {
  ["minecraft:overworld"]: "§aOverworld",
  ["minecraft:nether"]: "§cNether",
  ["minecraft:the_end"]: "§5End"
};

let playerLevel = 0
let playerdie;
let nameGuardians;
let playerlocation;
var mapDie = new Map();
const Infinity = 9999
let strCoord;
let listCord = new Array();
world.afterEvents.entityDie.subscribe((data) => {
  let { deadEntity } = data;
  let irand = random(1, 1000);
  let player = deadEntity
  if (player.name != undefined) {
    let Dimension = world.getDimension(player.dimension.id)
    playerdie = player;
    playerlocation = new Vector(player.location.x, player.location.y, player.location.z);
    strCoord = player.dimension.id + ', ' + Math.round(player.location.x) + ' ' + Math.round(player.location.y) + ' ' + Math.round(player.location.z)

    listCord = new Array();
    console.warn('length')
    console.warn('xxx')
    console.warn(listCord.length)
    if (mapDie.has(player.name)) {
      console.warn(mapDie.get(player.name).length)
      console.warn('tttt')
      console.warn(listCord.length)
      listCord = mapDie.get(player.name);
    }
    listCord.push(strCoord)
    console.warn(listCord.length)
    mapDie.delete(player.name)
    mapDie.set(player.name, listCord)
    console.warn(mapDie.get(player.name).length)
    const dName = DimensionNames[player.dimension.id];
    let entity = Dimension.spawnEntity("pog:player_corpse", playerlocation);
    let entitywallSign = Dimension.fillBlocks(playerlocation, playerlocation, MinecraftBlockTypes.standingBanner);
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
    if (irand <= 300) {
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

world.events.entityHit.subscribe(data => {
  let { entity, hitEntity } = data;
  if (data.hitEntity?.typeId == 'pog:player_corpse') {
    bounty_tier_page(entity, hitEntity);
  }
})
function bounty_tier_page(entity, hitEntity) {
  let form = new ActionFormData()
  form.title(`form.title.question`);
  form.body(`form.body.explain`);
  let Dimension = world.getDimension(hitEntity.dimension.id)
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
        Dimension.fillBlocks(playerlocation, playerlocation, MinecraftBlockTypes.air);
        //world.getDimension('overworld').runCommandAsync('tag @e[type=pog:player_corpse] add dusted')
      }
      if (response.selection == 1) {
        playerdie.sendMessage("Es necesario eliminar la tumba para obtener su XP")
      }
      if (response.selection == 2) {
        hitEntity.triggerEvent('entity_transform');
        hitEntity.runCommandAsync("kill @e[name=" + nameGuardians + ",type=pog:player_corpse]");
        hitEntity.runCommandAsync("kill @e[name=" + nameGuardians + "]");
        Dimension.fillBlocks(playerlocation, playerlocation, MinecraftBlockTypes.air);
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
    let ltSplit =  strCoord.split(',');
    let enc = new TextEncoder();
    player.runCommandAsync('/give @s pog:bone_dust 1 0 {display:{Name:"'+enc.encode(ltSplit[1])+'"}')
  }
})

world.afterEvents.itemUse.subscribe((data) => {
  let { itemStack, source } = data;
  console.warn(itemStack.type.id)
  if (itemStack.type.id == 'pog:diamontteleport') {
    console.warn(itemStack.type.id)
    let form = new ActionFormData()
    form.title(`form.title.question`);
    form.body(`form.body.explain`);
    let listCord = new Array();
    if (mapDie.has(source.name)) {
      listCord = (mapDie.get(source.name));
    }
    console.warn(listCord.length)
    console.warn('listCord')
    if (listCord.length > 0) {
      form.button(`Teletransporte`);
      form.button(`Eliminar`);
      form.show(source).then((response) => {
        if (response.selection == 0) {
          let formTP = new ActionFormData()
          formTP.title(`form.title.question`);
          formTP.body(`form.body.explain`);
          for (let i = 0; i < listCord.length; i++) {
            let text = new String(listCord[i]);
            console.warn(text)
            let arraystr = text.split(', ')
            formTP.button(arraystr[0].replace('minecraft:', '') + '\n' + arraystr[1]);
          }
          formTP.show(source).then((response) => {
            let text = new String(listCord[response.selection]);
            console.warn(text)
            let enc = new TextDecoder();
            let arraystr = enc.decode(itemStack.nameTag);
            let strGps = arraystr[1].split(' ')
            let x = new Number(strGps[0])
            let y = new Number(strGps[1])
            let z = new Number(strGps[2])
            console.warn(x)
            let rowVec = new Vector(x.valueOf(), y.valueOf(), z.valueOf());
            let dimm = new String(arraystr[0].replace('minecraft:', ''));
            source.teleport(rowVec)
            listCord = removeCoord(response.selection, listCord)
            mapDie.set(source.name, listCord)
            source.runCommandAsync('clear @s pog:diamontteleport 0 1')
          })

        } else if (response.selection == 1) {
          let formTP = new ActionFormData()
          formTP.title(`form.title.question`);
          formTP.body(`form.body.explain`);
          for (let i = 0; i < listCord.length; i++) {
            let text = new String(listCord[i]);
            console.warn(text)
            let arraystr = text.split(', ')
            formTP.button(arraystr[0].replace('minecraft:', '') + '\n' + arraystr[1]);
          }
          formTP.show(source).then((response) => {
            listCord = removeCoord(response.selection, listCord)
            mapDie.set(source.name, listCord)
          })
        }
      })
    } else {
      form.button(`No tienes coordenadas almacenadas`);
      form.show(source).then((response) => { })
    }
  }



  function removeCoord(option, listParam) {
    if (option == 0) {
      listParam.shift();
    } else if (option == listCord.length - 1) {
      listParam.pop();
    }
    else {
      listParam.splice(option - 1, option)
    }
    return listParam
  }

})
