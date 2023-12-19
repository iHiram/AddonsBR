import { world, Dimension, EntityEffectOptions } from '@minecraft/server';
import { system } from '@minecraft/server';
const zombie_villager_v2 = 'minecraft:zombie_villager_v2'
const spider = 'minecraft:spider';
const cave_spider = 'minecraft:cave_spider';
const enderman = 'minecraft:enderman';
const piglin = 'minecraft:piglin';
const zombiepig = 'minecraft:zombiepig';
const blaze = 'minecraft:blaze';
const creeper = 'minecraft:creeper';
const evoker = 'minecraft:evoker';
const phantom = 'minecraft:phantom';
const skeleton = 'minecraft:skeleton';
const slime = 'minecraft:slime';
const vex = 'minecraft:vex';
const vindicator = 'minecraft:vindicator';
const witch = 'minecraft:witch';
const wither_skeleton = 'minecraft:wither_skeleton';
const zoglin = 'minecraft:zoglin';
const zombie = 'minecraft:zombie';
const stray = 'minecraft:stray';
const drowned = 'minecraft:drowned';
const pillager = 'minecraft:pillager'
const endermite = 'minecraft:endermite'
const piglinBrute = 'minecraft:piglin_brute'
const wither = 'minecraft:wither'
const shulker = 'minecraft:shulker'
const ghast = 'minecraft:ghast'
const enderDragon = 'minecraft:ender_dragon'
const warden = 'minecraft:warden'
const hoglin = 'minecraft:hoglin'
const ravager = 'minecraft:ravager'
const magmaCube = 'minecraft:magma_cube'
const listMobs = [
    zombie_villager_v2, spider, cave_spider, enderman, piglin, zombiepig, blaze,
    creeper, evoker, phantom, skeleton, slime, vex, vindicator, witch, wither_skeleton, zoglin, zombie, stray, drowned,
    endermite, piglinBrute, wither, shulker, ghast, enderDragon, warden, hoglin, pillager, ravager, magmaCube
];
const listMobsRegular = [zombie_villager_v2, evoker, vex, phantom, vindicator, witch, wither_skeleton, skeleton, vindicator, witch, zombie, stray, drowned, endermite, zoglin, pillager, ravager];
const listMobsSpider = [spider, cave_spider];
const listMobsRare = [magmaCube, enderman, piglin, zombiepig, blaze, slime, piglinBrute, wither, shulker, ghast, enderDragon];
const listMobsExceptions = [creeper, warden, hoglin];
const objExplosionOption = { 'allowUnderwater': true, 'breaksBlocks': false, 'causesFire': true };
const Infinity = 10000000;
const tProb = 1000;
const tProbMobsRegular = tProb * 0.6;
const tProbMobsSpider = tProb * 0.6;
const tProbMobsRare = tProb * 0.4;
const tProbMobsExceptions = tProb * 0.3;
const iSoCommun = (tProb * 0.7);
const iCommun = (tProb * 0.6);
const iRare = (tProb * 0.4);
const iSoRare = (tProb * 0.25);
const iLegent = (tProb * 0.15);
const iSoLegent = (tProb * 0.03);
let irand = random(1, tProb);
let bSpawn = false;
console.warn("Version 1.1.11");
world.afterEvents.entitySpawn.subscribe(evnt => {
    let entity = evnt.entity;
    irand = random(1, tProb);
    if (listMobs.includes(entity.typeId) && entity.nameTag == "") {
        if (irand <= iCommun && !bSpawn && entity.typeId != zombie_villager_v2) {
            let dimension = world.getDimension(entity.dimension.id);
            dimension.spawnEntity(entity.typeId, entity.location);
            bSpawn = true;
        } else {
            bSpawn = false;
        }
        console.warn('spideriff')
        console.warn(spider)
        console.warn(entity.typeId)
        console.warn('-----')
        if (entity.typeId == spider) {
            console.warn('spider')
            changeMob(entity);
        }
        if (irand <= iRare) {
            console.warn('effects main')
            addEffects(entity);
        }
    }
    /* else if (entity.nameTag != "") {
        entity.runCommandAsync("effect @s clear");
    }*/

})
world.afterEvents.projectileHitEntity.subscribe(data => {
    let { projectile, source } = data;
    let entityhit = data.getEntityHit();
    if (entityhit != undefined) {
        if (source.typeId == drowned && projectile.typeId == 'minecraft:thrown_trident' && !source.hasTag('ef-lightningBolt') && !source.hasTag('checklightningBolt')) {
            irand = random(1, tProb);
            if (irand <= (iSoCommun)) {
                source.addTag('ef-lightningBolt');
            }
            source.addTag('checklightningBolt');
        }
        runEffect(entityhit.entity, source);
        if (source.hasTag('ef-attract')) {
            irand = random(1, tProb);
            if (irand <= iSoCommun) {
                let disX = source.location.x - entityhit.entity.location.x;
                let disZ = source.location.z - entityhit.entity.location.z;
                entityhit.entity.applyKnockback((disX / 2), (disZ / 2), random(1, 8), 0)
            }
        }
        if (source.hasTag('ef-knockback')) {
            irand = random(1, tProb);
            if (irand <= iSoCommun) {
                entityhit.entity.applyKnockback(0, 0, 0, random(1, 2))
            }
        }

    }
})

world.afterEvents.entityHurt.subscribe(data => {
    let { damageSource, hurtEntity } = data;
    let hitEntity = hurtEntity
    let entity = damageSource.damagingEntity
    if (hitEntity != undefined) {
        if (listMobs.includes(entity.typeId)) {
            runEffect(data.hitEntity, data.entity);
            if (entity.hasTag('ef-knockback')) {
                irand = random(1, tProb);
                if (irand <= iSoCommun) {
                    hitEntity.applyKnockback(0, 0, 0, random(1, 2))
                }
            }
        }
    }
})
function addEffects(entity) {
    irand = random(1, tProb);
    if (listMobsRegular.includes(entity.typeId)) {
        console.warn(entity.typeId)
        console.warn('Effectospeedd22')
        entity.addEffect("speed", Infinity, { "amplifier": random(1, 2), showParticles: true });
        if (irand <= tProbMobsRegular) {
            console.warn('Effecto')
            irand = random(1, tProb);

            if (irand <= iSoCommun) {
                entity.addEffect("speed", Infinity, { "amplifier": random(1, 2), showParticles: true });
            }
            irand = random(1, tProb);
            if (irand <= iSoRare) {
                entity.addEffect("absorption", Infinity, random(1, 2));
            }
            irand = random(1, tProb);
            if (irand <= iCommun) {
                entity.addEffect("strength", Infinity, random(1, 2));
            }
            irand = random(1, tProb);
            if (irand <= iSoRare) {
                entity.addEffect("resistance", Infinity, random(1, 2));
            }
            irand = random(1, tProb);
            if (irand <= iLegent) {
                entity.addEffect("regeneration", Infinity, random(1, 4));
            }
            irand = random(1, tProb);
            if (irand <= iRare) {
                entity.addEffect("invisibility", Infinity, 20);
            }
            irand = random(1, tProb);
            if (irand <= iLegent) {
                entity.addTag('ef-wither');
            }
            irand = random(1, tProb);
            if (irand <= iSoCommun) {
                entity.addTag('ef-nightvision');
            }
            irand = random(1, tProb);
            if (irand <= iRare) {
                entity.addTag('ef-darkness');
            }
            irand = random(1, tProb);
            if (irand <= iSoLegent) {
                entity.addTag('ef-levitation');
            }
            irand = random(1, tProb);
            if (irand <= iSoRare) {
                entity.addTag('ef-weakness');
            }
            irand = random(1, tProb);
            if (irand <= iSoRare) {
                entity.addTag('ef-slowness');
            }
            irand = random(1, tProb);
            if (irand <= iSoRare) {
                entity.addTag('ef-nausea');
            }
            irand = random(1, tProb);
            if (irand <= iSoRare) {
                entity.addTag('ef-blindness');
            }
            irand = random(1, tProb);
            if (irand <= iSoRare) {
                entity.addTag('ef-hunger');
            }
            irand = random(1, tProb);
            if (irand <= iLegent) {
                entity.addTag('ef-poison');
            }
            irand = random(1, tProb);
            if (irand <= iLegent) {
                entity.addTag('ef-web');
            }
            irand = random(1, tProb);
            if (irand <= iSoLegent && !entity.hasTag('bornEffect')) {
                entity.addTag('ef-lightningBolt');
            } else {
                irand = random(1, tProb);
                if (irand <= iSoLegent && !entity.hasTag('bornEffect')) {
                    entity.addTag('ef-explosion');
                }
            }
            irand = random(1, tProb);
            if (irand <= iCommun) {
                entity.addTag('ef-knockback');
            }
            irand = random(1, tProb);
            if (irand <= iCommun) {
                entity.addTag('ef-attract');
            }
        }
    } else if (listMobsSpider.includes(entity.typeId)) {
        if (irand <= tProbMobsSpider) {
            irand = random(1, tProb);
            if (irand <= iSoRare) {
                entity.addEffect("speed", Infinity, random(1, 2));
            }
            irand = random(1, tProb);
            if (irand <= iSoRare) {
                entity.addEffect("absorption", Infinity, random(1));
            }
            irand = random(1, tProb);
            if (irand <= iSoRare) {
                entity.addEffect("strength", Infinity, random(1, 2));
            }
            irand = random(1, tProb);
            if (irand <= iSoRare) {
                entity.addEffect("resistance", Infinity, random(1));
            }
            irand = random(1, tProb);
            if (irand <= iSoCommun) {
                entity.addEffect("regeneration", Infinity, random(1));
            }
            irand = random(1, tProb);
            if (irand <= iRare) {
                entity.addEffect("invisibility", Infinity, 20);
            }
            irand = random(1, tProb);
            if (irand <= iSoRare) {
                entity.addTag('ef-wither');
            }
            irand = random(1, tProb);
            if (irand <= iSoCommun) {
                entity.addTag('ef-nightvision');
            }
            irand = random(1, tProb);
            if (irand <= iSoRare) {
                entity.addTag('ef-darkness');
            }
            irand = random(1, tProb);
            if (irand <= iSoLegent) {
                entity.addTag('ef-levitation');
            }
            irand = random(1, tProb);
            if (irand <= iSoRare) {
                entity.addTag('ef-weakness');
            }
            irand = random(1, tProb);
            if (irand <= iSoRare) {
                entity.addTag('ef-slowness');
            }
            irand = random(1, tProb);
            if (irand <= iSoRare) {
                entity.addTag('ef-nausea');
            }
            irand = random(1, tProb);
            if (irand <= iSoRare) {
                entity.addTag('ef-blindness');
            }
            irand = random(1, tProb);
            if (irand <= iSoRare) {
                entity.addTag('ef-hunger');
            }
            irand = random(1, tProb);
            if (irand <= iLegent) {
                entity.addTag('ef-web');
            }
            irand = random(1, tProb);
            if (irand <= iSoLegent && !entity.hasTag('bornEffect')) {
                entity.addTag('ef-lightningBolt');
            } else {
                irand = random(1, tProb);
                if (irand <= iSoLegent && !entity.hasTag('bornEffect')) {
                    entity.addTag('ef-explosion');
                }
            }
            irand = random(1, tProb);
            if (irand <= iCommun) {
                entity.addTag('ef-knockback');
            }
            irand = random(1, tProb);
            if (irand <= iCommun) {
                entity.addTag('ef-attract');
            }
        }
    } else if (listMobsRare.includes(entity.typeId)) {
        if (irand <= tProbMobsRare) {
            irand = random(1, tProb);
            if (irand <= iSoRare) {
                entity.addEffect("speed", Infinity, random(1, 2));
            }
            irand = random(1, tProb);
            if (irand <= iSoRare) {
                entity.addEffect("absorption", Infinity, random(1, 2));
            }
            irand = random(1, tProb);
            if (irand <= iSoRare) {
                entity.addEffect("strength", Infinity, random(1, 2));
            }
            irand = random(1, tProb);
            if (irand <= iSoRare) {
                entity.addEffect("resistance", Infinity, random(1, 2));
            }
            irand = random(1, tProb);
            if (irand <= iLegent) {
                entity.addEffect("regeneration", Infinity, random(1, 4));
            }
            irand = random(1, tProb);
            if (irand <= iLegent) {
                entity.addEffect("invisibility", Infinity, 20);
            }
            irand = random(1, tProb);
            if (irand <= iSoRare) {
                entity.addTag('ef-wither');
            }
            irand = random(1, tProb);
            if (irand <= iSoCommun) {
                entity.addTag('ef-nightvision');
            }
            irand = random(1, tProb);
            if (irand <= iSoRare) {
                entity.addTag('ef-darkness');
            }
            irand = random(1, tProb);
            if (irand <= iSoLegent) {
                entity.addTag('ef-levitation');
            }
            irand = random(1, tProb);
            if (irand <= iSoRare) {
                entity.addTag('ef-weakness');
            }
            irand = random(1, tProb);
            if (irand <= iSoRare) {
                entity.addTag('ef-slowness');
            }
            irand = random(1, tProb);
            if (irand <= iSoRare) {
                entity.addTag('ef-nausea');
            }
            irand = random(1, tProb);
            if (irand <= iSoRare) {
                entity.addTag('ef-blindness');
            }
            irand = random(1, tProb);
            if (irand <= iSoRare) {
                entity.addTag('ef-hunger');
            }
            irand = random(1, tProb);
            if (irand <= iLegent) {
                entity.addTag('ef-poison');
            }
            irand = random(1, tProb);
            if (irand <= iLegent) {
                entity.addTag('ef-web');
            }
            irand = random(1, tProb);
            if (irand <= iSoLegent && !entity.hasTag('bornEffect')) {
                entity.addTag('ef-lightningBolt');
            } else {
                irand = random(1, tProb);
                if (irand <= iSoLegent && !entity.hasTag('bornEffect')) {
                    entity.addTag('ef-explosion');
                }
            }
            irand = random(1, tProb);
            if (irand <= iCommun) {
                entity.addTag('ef-knockback');
            }
            irand = random(1, tProb);
            if (irand <= iCommun) {
                entity.addTag('ef-attract');
            }
        }
    } else if (listMobsExceptions.includes(entity.typeId)) {
        if (irand <= tProbMobsExceptions) {
            irand = random(1, tProb);
            if (irand <= iLegent) {
                entity.addEffect("speed", Infinity, random(1, 2));
            }
            irand = random(1, tProb);
            if (irand <= iSoRare) {
                entity.addEffect("absorption", Infinity, random(1, 2));
            }
            irand = random(1, tProb);
            if (irand <= iSoRare) {
                entity.addEffect("resistance", Infinity, random(1, 2));
            }
            irand = random(1, tProb);
            if (irand <= iSoRare) {
                entity.addEffect("regeneration", Infinity, random(1, 2));
            }
            irand = random(1, tProb);
            if (irand <= iLegent) {
                entity.addEffect("invisibility", Infinity, 20);
            }
            irand = random(1, tProb);
            if (irand <= iSoRare) {
                entity.addTag('ef-wither');
            }
            irand = random(1, tProb);
            if (irand <= iSoCommun) {
                entity.addTag('ef-nightvision');
            }
            irand = random(1, tProb);
            if (irand <= iSoRare) {
                entity.addTag('ef-darkness');
            }
            irand = random(1, tProb);
            if (irand <= iSoLegent) {
                entity.addTag('ef-levitation');
            }
            irand = random(1, tProb);
            if (irand <= iSoRare) {
                entity.addTag('ef-weakness');
            }
            irand = random(1, tProb);
            if (irand <= iSoRare) {
                entity.addTag('ef-slowness');
            }
            irand = random(1, tProb);
            if (irand <= iSoRare) {
                entity.addTag('ef-nausea');
            }
            irand = random(1, tProb);
            if (irand <= iSoRare) {
                entity.addTag('ef-blindness');
            }
            irand = random(1, tProb);
            if (irand <= iSoRare) {
                entity.addTag('ef-hunger');
            }
            irand = random(1, tProb);
            if (irand <= iLegent) {
                entity.addTag('ef-poison');
            }
            irand = random(1, tProb);
            if (irand <= iLegent) {
                entity.addTag('ef-web');
            }
            irand = random(1, tProb);
            if (irand <= iSoLegent) {
                entity.addTag('ef-lightningBolt');
            } else {
                irand = random(1, tProb);
                if (irand <= iSoLegent) {
                    entity.addTag('ef-explosion');
                }
            }
            irand = random(1, tProb);
            if (irand <= iCommun) {
                entity.addTag('ef-knockback');
            }
            irand = random(1, tProb);
            if (irand <= iCommun) {
                entity.addTag('ef-attract');
            }
        }
    }

}
function runEffect(entityHit, sourceEntity) {
    let dimension = entityHit.dimension;
    if (sourceEntity.hasTag('ef-wither')) {
        entityHit.addEffect("wither", random(50, 200), 1);
    }
    if (sourceEntity.hasTag('ef-nightvision')) {
        entityHit.addEffect("night_vision", random(50, 200), 20);
    }
    if (sourceEntity.hasTag('ef-darkness')) {
        entityHit.addEffect("darkness", random(50, 200), 2);
    }
    if (sourceEntity.hasTag('ef-levitation')) {
        entityHit.addEffect("levitation", random(50, 200), 1);
    }
    if (sourceEntity.hasTag('ef-weakness')) {
        entityHit.addEffect("weakness", random(50, 200), random(1, 2));
    }
    if (sourceEntity.hasTag('ef-slowness')) {
        entityHit.addEffect("slowness", random(50, 200), random(1, 2));
    }
    if (sourceEntity.hasTag('ef-nausea')) {
        entityHit.addEffect("nausea", random(50, 200), 1);
    }
    if (sourceEntity.hasTag('ef-blindness')) {
        entityHit.addEffect("blindness", random(50, 300), 1);
    }
    if (sourceEntity.hasTag('ef-hunger')) {
        entityHit.addEffect("hunger", random(50, 200), random(1, 3));
    }
    if (sourceEntity.hasTag('ef-poison')) {
        entityHit.addEffect("hunger", random(50, 200), 1);
    }
    if (sourceEntity.hasTag('ef-web')) {
        irand = random(1, tProb);
        if (irand <= iSoRare) {
            dimension.fillBlocks(entityHit.location, entityHit.location, "web");
        }
    }
    if (sourceEntity.hasTag('ef-lightningBolt')) {
        irand = random(1, tProb);
        if (irand <= iSoCommun) {
            sourceEntity.addEffect("resistance", 10, 2);
            sourceEntity.addEffect("absorption", 10, 2);
            dimension.spawnEntity('minecraft:lightning_bolt', entityHit.location);
            irand = random(1, tProb);
            if (irand <= (iRare)) {
                entityHit.addEffect("resistance", 5, 1);
                entityHit.addEffect("blindness", random(30, 50), 1);
                let objEndermite1 = dimension.spawnEntity(endermite, entityHit.location);
                let objEndermite2 = dimension.spawnEntity(endermite, entityHit.location);
                let objEndermite3 = dimension.spawnEntity(endermite, entityHit.location);
                objEndermite1.addTag('bornEffect')
                objEndermite2.addTag('bornEffect')
                objEndermite3.addTag('bornEffect')
                objEndermite1.addEffect("speed", Infinity, 1);
                objEndermite2.addEffect("speed", Infinity, 1);
                objEndermite3.addEffect("speed", Infinity, 1);
            }
        }
    }
    if (sourceEntity.hasTag('ef-explosion')) {
        irand = random(1, tProb);
        if (irand <= iSoCommun) {
            sourceEntity.addEffect("resistance", 10, 2);
            sourceEntity.addEffect("absorption", 10, 2);
            dimension.createExplosion(entityHit.location, 1, objExplosionOption);
            irand = random(1, tProb);
            if (irand <= (iRare)) {
                entityHit.addEffect("resistance", 5, 1);
                entityHit.addEffect("blindness", random(30, 50), 1);
                let objEndermite1 = dimension.spawnEntity(endermite, entityHit.location);
                let objEndermite2 = dimension.spawnEntity(endermite, entityHit.location);
                let objEndermite3 = dimension.spawnEntity(endermite, entityHit.location);
                objEndermite1.addTag('bornEffect')
                objEndermite2.addTag('bornEffect')
                objEndermite3.addTag('bornEffect')
                objEndermite1.addEffect("speed", Infinity, 1);
                objEndermite2.addEffect("speed", Infinity, 1);
                objEndermite3.addEffect("speed", Infinity, 1);
            }
        }
    }
}
function changeMob(entity) {
    if (entity.typeId == spider) {
        irand = random(1, tProb);
        if (irand <= iRare) {
            console.warn('spider changed')
            entity.kill();
            entity.runCommandAsync('kill @e[type=item,r=1]');
            entity.runCommandAsync('summon cave_spider ' + ' ' + entity.location.x + ' ' + entity.location.y + ' ' + entity.location.z);
        }
    } else if (entity.typeId == creeper) {
        irand = random(1, tProb);
        if (irand <= iSoRare) {
            console.warn('spider changed')
            entity.kill();
            entity.runCommandAsync('kill @e[type=item,r=1]');
            entity.runCommandAsync('summon creeper ' + ' ' + entity.location.x + ' ' + entity.location.y + ' ' + entity.location.z + ' {powered:1}');
        }
    }
}
function random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}