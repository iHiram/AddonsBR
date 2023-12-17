import { world, Vector, MinecraftBlockTypes, MolangVariableMap, MinecraftEffectTypes } from "@minecraft/server";
import { system } from "@minecraft/server";
import { MinecraftEntityTypes, DynamicPropertiesDefinition } from "@minecraft/server";
import { ActionFormData, MessageFormData, ModalFormData } from "@minecraft/server-ui";
let playerG;
system.events.beforeWatchdogTerminate.subscribe(data => {
    data.cancel = true;
});
world.afterEvents.worldInitialize.subscribe((eventData) => {
    let playerCompShowTick = new DynamicPropertiesDefinition();
    eventData.propertyRegistry.registerEntityTypeDynamicProperties(playerCompShowTick, MinecraftEntityTypes["player"]);
})
world.afterEvents.playerJoin.subscribe((row) => {
    console.warn(row.playerName)
    console.warn(world.getPlayers())
    let players = world.getPlayers();
    console.warn(players)
    for (let player of players) {
        console.warn("forr")
        console.warn(player.name)
        playerG = player;
        player.addEffect(MinecraftEffectTypes.nightVision, Infinity, 1);
        setTimeout(() => {
            player.sendMessage("Para elminar el efecto de vision noctura escribe en el chat '/nv off', sin comillas...")
        }, 5)

    }
})
world.beforeEvents.chatSend.subscribe((row) => {
    if (row.message == "nv off" && row.seder.) {
        //row.sender.addEffect(MinecraftEffectTypes.nightVision, 20, 1);
        row.sender.runCommandAsync('effect @s night_vision 0')
    } else if (row.message == "nv on") {
        row.sender.runCommandAsync('effect @s night_vision 999999')
    }
});