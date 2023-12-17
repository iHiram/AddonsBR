import { world, MinecraftEffectTypes } from "@minecraft/server";
import { system } from "@minecraft/server";

system.events.beforeWatchdogTerminate.subscribe(data => {
    data.cancel = true;
});
let players = world.getAllPlayers();
console.warn(players);
console.warn("Map running");
for (let rowaux of players) {
    console.warn(rowaux.dimension.id);

    let blocks = world.getDimension(rowaux.dimension.id).getBlockFromRay();
    for (let row of blocks) {
        let tags = row.getTags();
        console.warn(tags[0]);
    }
}