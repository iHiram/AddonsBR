import { world } from "@minecraft/server";
import { system } from "@minecraft/server";
import { MinecraftEntityTypes, DynamicPropertiesDefinition } from "@minecraft/server";
import { ActionFormData, MessageFormData, ModalFormData } from "@minecraft/server-ui";
const Infinity = 10000000;
let playerG;
system.events.beforeWatchdogTerminate.subscribe(data => {
    data.cancel = true;
});

world.beforeEvents.chatSend.subscribe((row) => {
    //methdPlayer(row.sender);
    console.warn(row.sender.name)
    let players = world.getPlayers({ "name": row.sender.name });
    if (row.message == "nv off") {
        //row.sender.addEffect("night_vision", 20, 1);
        players[0].runCommandAsync('effect @s night_vision 0')
    } else if (row.message == "nv on") {
        players[0].runCommandAsync('effect @s night_vision 999999')
    } else if (row.message == "delete items" && row.sender.name == "iHiram2572") {
        players[0].runCommandAsync('kill @e[type=item]')
    }
});

function detectEvents() {
    let players = world.getPlayers();
    for (let player of players) {
        let a = player.getComponent("minecraft:equipment_inventory")
        let items = a.getEquipmentSlot("Head");
        let ss = items.getItem();
        if (items.typeId == "bridge:netherite_nv_helmet" && player.hasTag("HelmetNV_ON") == false) {
            player.removeTag("HelmetNV_Off")
            player.addTag("HelmetNV_ON")
            player.addEffect("night_vision", 320)
        } else if (!player.hasTag("HelmetNV_Off") && items.typeId
            != "bridge:netherite_nv_helmet" && items.typeId
            != "bridge:netherite_nv_helmet_notch") {
            player.addTag("HelmetNV_Off")
            player.removeTag("HelmetNV_ON")
            player.runCommandAsync('effect @s night_vision 0')
        } else if (items.typeId == "bridge:netherite_nv_helmet_notch" && player.hasTag("HelmetNV_ON")) {
            player.addTag("HelmetNV_Off")
            player.removeTag("HelmetNV_ON")
        }
        if (items.typeId == "bridge:netherite_nv_helmet_notch" && player.hasTag("HelmetNV_ON_notch") == false) {
            player.removeTag("HelmetNV_Off_notch")
            player.addTag("HelmetNV_ON_notch")
            player.addEffect("night_vision", Infinity)
        } else if (!player.hasTag("HelmetNV_Off_notch") && items.typeId
            != "bridge:netherite_nv_helmet" && items.typeId
            != "bridge:netherite_nv_helmet_notch") {
            player.addTag("HelmetNV_Off_notch")
            player.removeTag("HelmetNV_ON_notch")
            player.runCommandAsync('effect @s night_vision 0')
            player.runCommandAsync('effect @s night_vision 4')
        } else if (items.typeId == "bridge:netherite_nv_helmet" && player.hasTag("HelmetNV_ON_notch")) {
            player.addTag("HelmetNV_Off_notch")
            player.removeTag("HelmetNV_ON_notch")
            player.runCommandAsync('effect @s night_vision 0').then(() => {
                player.addEffect("night_vision", 320)
            })
        }
    }
}

system.runInterval(detectEvents)