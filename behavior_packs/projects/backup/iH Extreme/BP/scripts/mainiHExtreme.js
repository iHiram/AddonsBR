import { world, MinecraftEffectTypes } from "@minecraft/server";
import { system } from "@minecraft/server";
const zombie_villager_v2 = 'minecraft:zombie_villager_v2'
const spider = 'minecraft:spider';
const cave_spider = 'minecraft:cave_spider';
const enderman = 'minecraft:enderman';
const piglin = 'minecraft:piglin';
const zombiepig = 'minecraft:zombiepig';
const blaze = 'minecraft:blaze';
const creeper = 'minecraft:creeper';
const evoker = 'minecraft:evoker';
const Ghast = 'minecraft:Ghast';
const Hoglin = 'minecraft:Hoglin';
const Illusioner = 'minecraft:Illusioner';
const phantom = 'minecraft:phantom';
const PiglinBrute = 'minecraft:Piglin Brute';
const Pillager = 'minecraft:Pillager';
const Shulker = 'minecraft:Shulker';
const skeleton = 'minecraft:skeleton';
const slime = 'minecraft:slime';
const vex = 'minecraft:vex';
const vindicator = 'minecraft:vindicator';
const Warden = 'minecraft:Warden';
const witch = 'minecraft:witch';
const Wither = 'minecraft:Wither';
const wither_skeleton = 'minecraft:wither_skeleton';
const zoglin = 'minecraft:zoglin';
const zombie = 'minecraft:zombie';
const stray = 'minecraft:stray';
const arrow = 'minecraft:arrow';

console.warn("Extrmeeeeeee");

/*
Chicken Jockey
D
Drowned
E
Elder Guardian
Ender Dragon
EndermiteG
Giant
Guardian
H
Minecraft Dungeons:Heart of Ender
Husk
J
Jockey
Minecraft Dungeons:Jungle Abomination
M
Magma Cube
Mob(removed entity)
N
Nerd Creeper
P
Minecraft Legends: Piglin
Pillager
R
Ravager
Redstone Bug
S

Silverfish
Skeleton Horseman
Slime
Smiling Creeper
Spider Jockey
T
The Killer Bunny
*/
system.events.beforeWatchdogTerminate.subscribe(data => {
    data.cancel = true;
});
const infinite = 100000000;
const tProb = 850;
world.events.entitySpawn.subscribe(evnt => {
    let entity = evnt.entity;
    console.warn(entity.typeId);
    entity.runCommandAsync("tell @a Estoy bien..");
    switch (entity.typeId) {
        case spider:
            entity.kill();
            changeMob(entity);
            break;
    }
    addEffects(entity);

})
function changeMob(mob) {
    switch (mob.typeId) {
        case spider:
            mob.runCommandAsync("kill @e[type=item,r=1]");
            mob.runCommandAsync("summon cave_spider " + " " + mob.location.x + " " + mob.location.y + " " + mob.location.z);
            break;

        default:
    }
}
function random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}
function addEffects(entity) {
    let irand = random(1, tProb);
    switch (entity.typeId) {
        case zombie:
        case zoglin:
        case vindicator:
        case witch:
        case skeleton:
        case stray:
        case phantom:
        case evoker:
        case zombie_villager_v2:
            console.warn("1");
            if (irand <= 600) {
                irand = random(1, tProb);
                if (irand % 2 == 0 && irand <= 400) {
                    entity.addEffect(MinecraftEffectTypes.speed, infinite, random(1, 2));
                }
                irand = random(1, tProb);
                if (irand % 2 == 0 && irand <= 200) {
                    entity.addEffect(MinecraftEffectTypes.absorption, infinite, random(1, 2));
                }
                irand = random(1, tProb);
                if (irand % 2 == 0 && irand <= 200) {
                    entity.addEffect(MinecraftEffectTypes.strength, infinite, random(1, 2));
                }
                irand = random(1, tProb);
                if (irand % 2 == 0 && irand <= 200) {
                    entity.addEffect(MinecraftEffectTypes.resistance, infinite, random(1, 2));
                }
                irand = random(1, tProb);
                if (irand % 2 == 0 && irand <= 100) {
                    entity.addEffect(MinecraftEffectTypes.regeneration, infinite, random(1, 4));
                }
                irand = random(1, tProb);
                if (irand % 2 == 0 && irand <= 600) {
                    entity.addEffect(MinecraftEffectTypes.invisibility, infinite, 20);
                }



                irand = random(1, tProb);
                if (irand <= 200) {
                    entity.addTag("ef-wither");
                }
                irand = random(1, tProb);
                if (irand <= 500) {
                    entity.addTag("ef-nightvision");
                }
                irand = random(1, tProb);
                if (irand <= 200) {
                    entity.addTag("ef-darkness");
                }
                irand = random(1, tProb);
                if (irand <= 100) {
                    entity.addTag("ef-levitation");
                }
                irand = random(1, tProb);
                if (irand <= 200) {
                    entity.addTag("ef-weakness");
                }
            }
            break;
        case cave_spider:
            if (irand <= 600) {
                irand = random(1, tProb);
                if (irand % 2 == 0 && irand <= 100) {
                    entity.addEffect(MinecraftEffectTypes.speed, infinite, random(1, 2));
                }
                irand = random(1, tProb);
                if (irand <= 200) {
                    entity.addEffect(MinecraftEffectTypes.absorption, infinite, random(1, 2));
                }
                irand = random(1, tProb);
                if (irand % 2 == 0 && irand <= 200) {
                    entity.addEffect(MinecraftEffectTypes.strength, infinite, random(1, 2));
                }
                irand = random(1, tProb);
                if (irand % 2 == 0 && irand <= 200) {
                    entity.addEffect(MinecraftEffectTypes.resistance, infinite, random(1, 2));
                }
                irand = random(1, tProb);
                if (irand % 2 == 0 && irand <= 500) {
                    entity.addEffect(MinecraftEffectTypes.regeneration, infinite, random(1, 4));
                }
                irand = random(1, tProb);
                if (irand <= 600) {
                    entity.addEffect(MinecraftEffectTypes.invisibility, infinite, 20);
                }

                irand = random(1, tProb);
                if (irand <= 200) {
                    entity.addTag("ef-wither");
                }
                irand = random(1, tProb);
                if (irand <= 500) {
                    entity.addTag("ef-nightvision");
                }
                irand = random(1, tProb);
                if (irand <= 200) {
                    entity.addTag("ef-darkness");
                }
                irand = random(1, tProb);
                if (irand <= 100) {
                    entity.addTag("ef-levitation");
                }
                irand = random(1, tProb);
                if (irand <= 200) {
                    entity.addTag("ef-weakness");
                }
            }
            break;
        case zombiepig:
        case piglin:
        case blaze:
        case slime:
        case vex:
        case enderman:
            if (irand <= 400) {
                irand = random(1, tProb);
                if (irand % 2 == 0 && irand <= 100) {
                    entity.addEffect(MinecraftEffectTypes.speed, infinite, random(1, 2));
                }
                irand = random(1, tProb);
                if (irand <= 200) {
                    entity.addEffect(MinecraftEffectTypes.absorption, infinite, random(1, 2));
                }
                irand = random(1, tProb);
                if (irand <= 200) {
                    entity.addEffect(MinecraftEffectTypes.strength, infinite, random(1, 2));
                }
                irand = random(1, tProb);
                if (irand <= 200) {
                    entity.addEffect(MinecraftEffectTypes.resistance, infinite, random(1, 2));
                }
                irand = random(1, tProb);
                if (irand % 2 == 0 && irand <= 100) {
                    entity.addEffect(MinecraftEffectTypes.regeneration, infinite, random(1, 4));
                }
                irand = random(1, tProb);
                if (irand <= 100) {
                    entity.addEffect(MinecraftEffectTypes.invisibility, infinite, 20);
                }
                irand = random(1, tProb);
                if (irand <= 200) {
                    entity.addTag("ef-wither");
                }
                irand = random(1, tProb);
                if (irand <= 500) {
                    entity.addTag("ef-nightvision");
                }
                irand = random(1, tProb);
                if (irand <= 200) {
                    entity.addTag("ef-darkness");
                }
                irand = random(1, tProb);
                if (irand <= 100) {
                    entity.addTag("ef-levitation");
                }
                irand = random(1, tProb);
                if (irand <= 200) {
                    entity.addTag("ef-weakness");
                }
            }
            break;
        case creeper:
            if (irand <= 300) {
                irand = random(1, tProb);
                if (irand % 2 == 0 && irand <= 100) {
                    entity.addEffect(MinecraftEffectTypes.speed, infinite, random(1, 2));
                }
                irand = random(1, tProb);
                if (irand <= 200) {
                    entity.addEffect(MinecraftEffectTypes.absorption, infinite, random(1, 2));
                }
                irand = random(1, tProb);
                if (irand % 2 == 0 && irand <= 200) {
                    entity.addEffect(MinecraftEffectTypes.resistance, infinite, random(1, 2));
                }
                irand = random(1, tProb);
                if (irand % 2 == 0 && irand <= 200) {
                    entity.addEffect(MinecraftEffectTypes.regeneration, infinite, random(1, 4));
                }
                irand = random(1, tProb);
                if (irand % 2 == 0 && irand <= 100) {
                    entity.addEffect(MinecraftEffectTypes.invisibility, infinite, 20);
                }
            }
            break;
    }
}
world.events.projectileHit.subscribe(data => {
    let { projectile, source, entityHit } = data;
    let entityhit = data.getEntityHit();
    if (data.source.hasTag("ef-wither")) {
        entityhit.entity.addEffect(MinecraftEffectTypes.wither, random(50, 200), 1);
    }
    if (data.source.hasTag("ef-nightvision")) {
        entityhit.entity.addEffect(MinecraftEffectTypes.nightvision, random(50, 200), 1);
    }
    if (data.source.hasTag("ef-darkness")) {
        entityhit.entity.addEffect(MinecraftEffectTypes.darkness, random(50, 200), 2);
    }
    if (data.source.hasTag("ef-levitation")) {
        entityhit.entity.addEffect(MinecraftEffectTypes.levitation, random(50, 200), 1);
    }
    if (data.source.hasTag("ef-weakness")) {
        entityhit.entity.addEffect(MinecraftEffectTypes.weakness, random(50, 200), random(1, 2));
    }
})
world.events.entityHit.subscribe(data => {
    let { entity, hitEntity } = data;
    if (data.entity.hasTag("ef-wither")) {
        data.hitEntity.addEffect(MinecraftEffectTypes.wither, random(50, 200), 1);
    }
    if (data.entity.hasTag("ef-nightvision")) {
        data.hitEntity?.addEffect(MinecraftEffectTypes.night_vision, random(50, 200), 1);
    }
    if (data.entity.hasTag("ef-darkness")) {
        data.hitEntity?.addEffect(MinecraftEffectTypes.darkness, random(50, 200), 2);
    }
    if (data.entity.hasTag("ef-levitation")) {
        data.hitEntity?.addEffect(MinecraftEffectTypes.levitation, random(50, 200), 1);
    }
    if (data.entity.hasTag("ef-weakness")) {
        data.hitEntity?.addEffect(MinecraftEffectTypes.weakness, random(50, 200), random(1, 2));
    }
})