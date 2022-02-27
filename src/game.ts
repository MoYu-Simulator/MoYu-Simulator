import * as PIXI from 'pixi.js';
import * as bossInfo from './lec_sample.json';

import * as TWEEN from '@tweenjs/tween.js'
import { addScore } from './score';
import { gg } from './gg';
const graphics = new PIXI.Graphics();
const Keyboard = require('pixi.js-keyboard');
const Mouse = require('pixi.js-mouse');
const WIDTH0 = 1280;
const HEIGHT0 = 720;

const appCanvas = document.createElement("canvas");
appCanvas.style.cssText = `
    position: fixed;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    z-index: 1;
`;
document.body.appendChild(appCanvas);
export const app = new PIXI.Application({
    transparent: true,
    view: appCanvas,
    autoStart: false,
});
app.renderer.resize(window.innerWidth, window.innerHeight);

// create a new Sprite from an image path
const character = PIXI.AnimatedSprite.fromImages([
    'assets/mascot/00.png',
    'assets/mascot/01.png',
    'assets/mascot/02.png',
    'assets/mascot/03.png',
    'assets/mascot/04.png',
    'assets/mascot/05.png',
    'assets/mascot/06.png',
    'assets/mascot/07.png',
    'assets/mascot/08.png',
    'assets/mascot/09.png',
    'assets/mascot/10.png',
]);
// center the sprite's anchor point
character.anchor.set(0.5);
character.animationSpeed = 0.25;
character.width /= 3;
character.height /= 3;
character.play();
// move the sprite to the center of the screen
character.x = app.screen.width / 2;
character.y = app.screen.height / 2;

app.stage.addChild(character);
app.stage.addChild(graphics);

let secondsElapsed = 0;
let lastTick = 0;




export class Enemy {

    sprite: PIXI.Sprite;
    invicible: Boolean;
    life_time: number = 0;
    app: PIXI.Application;
    constructor(sprite: PIXI.Sprite, invicible: Boolean, app: PIXI.Application) {
        this.sprite = sprite;
        this.invicible = invicible;
        this.app = app;
    }

    // deploy(){}
    // attack(){}
    // activate(){}
    // destroy(){}
    update() { }
}

class Turret extends Enemy {
    character: PIXI.Sprite;
    xTarget: number;
    yTarget: number;
    isArrived: Boolean = false;
    bulletCooldown: number = 0;

    constructor(sprite: PIXI.Sprite, app: PIXI.Application, xSpawn: number, ySpawn: number, character: PIXI.Sprite) {
        super(sprite, false, app);
        this.character = character;
        this.xTarget = Math.random() * (app.renderer.width - 50) + 25;
        this.yTarget = Math.random() * (app.renderer.height - 50) + 25;

        sprite.x = xSpawn;
        sprite.y = ySpawn;
    }

    update() {
        this.life_time += app.ticker.deltaMS / 1000;

        if (Math.abs(this.character.x - this.sprite.x) < this.character.height / 2 && Math.abs(this.character.y - this.sprite.y) < this.character.height / 2) {
            app.ticker.stop();
            gg();
        }
        if (!this.isArrived) {


            //deploy to the position
            const xDelta = this.xTarget - this.sprite.x;
            const yDelta = this.yTarget - this.sprite.y;
            const magnitute = Math.sqrt(Math.pow(xDelta, 2) + Math.pow(yDelta, 2));
            this.sprite.x += (xDelta / magnitute) * 5;
            this.sprite.y += (yDelta / magnitute) * 5;
            if (Math.abs(this.xTarget - this.sprite.x) < 10 && Math.abs(this.yTarget - this.sprite.y) < 10) {
                this.isArrived = true;
            }
        } else {
            //we already arrived, so attack
            this.bulletCooldown += 1;
            if (this.bulletCooldown >= 60) {
                this.bulletCooldown = 0;
                const xDelta = this.character.x - this.sprite.x;
                const yDelta = this.character.y - this.sprite.y;
                const rotation = Math.atan2(yDelta, xDelta);
                const bullet = PIXI.Sprite.from('assets/bullet.png'); // TODO change texture
                bullet.x = this.sprite.x;
                bullet.y = this.sprite.y;
                bullet.width = 10;
                bullet.height = 10;
                app.stage.addChild(bullet);
                enemyBullets.push({ sprite: bullet, rotation: rotation });
            }
        }
    }
}

type Bullet = { sprite: PIXI.Sprite, rotation: number };
let allyBullets: Bullet[] = [];
let enemyBullets: Bullet[] = [];
let enemies: Enemy[] = [];
let turretSpawningCooldown: number = -150;

function convertPoint(facePos: number[]): number[] {
    facePos[0] = facePos[0] * app.screen.width / WIDTH0
    facePos[1] = facePos[1] * app.screen.width / WIDTH0
    facePos[2] = facePos[2] * app.screen.height / HEIGHT0
    facePos[3] = facePos[3] * app.screen.height / HEIGHT0
    return facePos
}

function insideBox(x: number, y: number, box: number[]) {
    return x > box[0] && x < box[1] && y > box[2] && y < box[3]
}

function shoot() {
    const bullet = new PIXI.Sprite(PIXI.Texture.WHITE);
    bullet.x = character.x;
    bullet.y = character.y;
    app.stage.addChild(bullet);
    allyBullets.push({ sprite: bullet, rotation: character.rotation + Math.PI });
}

var movable = true;
var bossPos = bossInfo[0].boss_pos;
var facePos = bossInfo[0].face_pos;
var faceFront = false
// Listen for animate update
app.ticker.add((delta) => {
    Keyboard.update();
    Mouse.update();
    const speed = Math.max(character.width, character.height) / 50
    secondsElapsed += app.ticker.deltaMS / 1000;

    let char_hit = false;
    let boss_hit = false;
    // Every second, shoot a bullet
    if (secondsElapsed - lastTick > 1) {
        lastTick += 1;
        shoot();

        if (bossInfo[(lastTick)].boss_pos) {
            new TWEEN.Tween(bossPos)
                .to(convertPoint(bossInfo[(lastTick)].boss_pos), 1000)
                .easing(TWEEN.Easing.Linear.None)
                .start()
        }
        facePos = convertPoint(bossInfo[(lastTick)].face_pos)
        faceFront = bossInfo[(lastTick)].face_front
    }

    // Update bullets

    const newAllyBullets: Bullet[] = [];
    for (const bullet of allyBullets) {
        const newEnemies: Enemy[] = [];

        let hasCollided = false;
        for (const enemy of enemies) {
            if (Math.abs(bullet.sprite.x - enemy.sprite.x) < 50 && Math.abs(bullet.sprite.y - enemy.sprite.y) < 50) {
                if (!hasCollided) {
                    app.stage.removeChild(enemy.sprite);
                    app.stage.removeChild(bullet.sprite);
                }
                hasCollided = true;

            } else {
                newEnemies.push(enemy);
            }
        }
        enemies = newEnemies;
        if (hasCollided) continue;

        bullet.sprite.x += Math.cos(bullet.rotation) * 10;
        bullet.sprite.y += Math.sin(bullet.rotation) * 10;
        if (!insideBox(bullet.sprite.x, bullet.sprite.y, [0, app.screen.width, 0, app.screen.height])) {
            app.stage.removeChild(bullet.sprite);
        } else if (insideBox(bullet.sprite.x, bullet.sprite.y, bossPos)) {
            boss_hit = true
            app.stage.removeChild(bullet.sprite);
            addScore(speed);
        } else {
            newAllyBullets.push(bullet);
        }
    }
    allyBullets = newAllyBullets;
    //console.log(enemies.length,enemyBullets.length);
    const newEnemyBullets: Bullet[] = [];
    for (const bullet of enemyBullets) {
        char_hit = false;
        if (Math.abs(bullet.sprite.x - character.x) < character.width / 2 && Math.abs(bullet.sprite.y - character.y) < character.height / 2) {
            if (!char_hit) {
                app.stage.removeChild(bullet.sprite);
            }
            char_hit = true;
            addScore(-10);
            character.width *= 1.01;
            character.height *= 1.01;
        }
        // enemyBullets = newEnemyBullets;

        bullet.sprite.x += Math.cos(bullet.rotation) * 10;
        bullet.sprite.y += Math.sin(bullet.rotation) * 10;
        if (bullet.sprite.x > app.screen.width || bullet.sprite.x < 0 || bullet.sprite.y > app.screen.height || bullet.sprite.y < 0) {
            app.stage.removeChild(bullet.sprite);
        } else if (!char_hit) {
            newEnemyBullets.push(bullet);
        }
    }
    enemyBullets = newEnemyBullets;

    const newEmenies: Enemy[] = [];
    for (const enemy of enemies) {
        enemy.update();
        newEmenies.push(enemy);
    }
    enemies = newEmenies;

    // Update boss
    const tick = Math.floor(secondsElapsed);
    // console.log(bossInfo[tick]);
    //const bossPos = bossInfo[tick].boss_pos;
    graphics.clear();

    // Update boss
    if (boss_hit) {
        graphics.beginFill(0xFF0000, 0.2);
    } else {
        graphics.beginFill(0xFFFF00, 0.2);
    }
    graphics.drawRect(
        bossPos[0],
        bossPos[2],
        bossPos[1] - bossPos[0],
        bossPos[3] - bossPos[2]
    );
    graphics.endFill();

    //const facePos = bossInfo[tick].face_pos;
    turretSpawningCooldown += 1;
    if (facePos[0] > 0) {
        if (turretSpawningCooldown >= 300) {
            turretSpawningCooldown = 0;
            const turretSprite: PIXI.Sprite = PIXI.Sprite.from('assets/turret.png');
            turretSprite.width = 100;
            turretSprite.height = 100;
            const turret = new Turret(turretSprite, app, (facePos[0] + facePos[1]) / 2, (facePos[2] + facePos[3]) / 2, character);
            app.stage.addChild(turretSprite);
            enemies.push(turret);
        }


        // if (bossInfo[tick].face_front)
        //     graphics.beginFill(0x00FF000, 0.7);
        // else
        //     graphics.beginFill(0xFF00000, 0.7);
        // graphics.drawRect(
        //     facePos[0],
        //     facePos[2],
        //     facePos[1] - facePos[0],
        //     facePos[3] - facePos[2]
        // );
        // graphics.endFill();
    }

    Keyboard.update();
    if (movable) {
        if (Keyboard.isKeyDown('KeyT')) {
            shoot();
            if (character.x + Math.cos(character.rotation + Math.PI) * speed * 45 > 0 && character.x + Math.cos(character.rotation + Math.PI) * speed * 45 < app.screen.width) {
                if (character.y + Math.sin(character.rotation + Math.PI) * speed * 45 > 0 && character.y + Math.sin(character.rotation + Math.PI) * speed * 45 < app.screen.height) {
                    movable = false;
                    new TWEEN.Tween(character)
                        .to({
                            x: character.x + Math.cos(character.rotation + Math.PI) * speed * 45,
                            y: character.y + Math.sin(character.rotation + Math.PI) * speed * 45,
                        }, 400)
                        .easing(TWEEN.Easing.Linear.None)
                        .start()

                    new TWEEN.Tween(character)
                        .to({
                            width: character.width / 2,
                            height: character.height / 2
                        }, 200)
                        .easing(TWEEN.Easing.Linear.None)
                        .start()
                        .onComplete(() => {
                            shoot();
                            new TWEEN.Tween(character)
                                .to({
                                    width: character.width * 2,
                                    height: character.height * 2
                                }, 200)
                                .easing(TWEEN.Easing.Linear.None)
                                .start()
                                .onComplete(() => {
                                    shoot();
                                    movable = true
                                })
                        })
                }
            }
        }
        if (Keyboard.isKeyDown('KeyA') && character.x >= speed)
            character.x -= speed;
        if (Keyboard.isKeyDown('KeyD') && character.x <= app.screen.width - speed)
            character.x += speed;
        if (Keyboard.isKeyDown('KeyW') && character.y >= speed)
            character.y -= speed;
        if (Keyboard.isKeyDown('KeyS') && character.y <= app.screen.height - speed)
            character.y += speed;

        // if (Keyboard.isKeyDown('ArrowUp')) {
        //     character.width *= 1.02;
        //     character.height *= 1.02;
        // }
        // if (Keyboard.isKeyDown('ArrowDown')) {
        //     character.width /= 1.02;
        //     character.height /= 1.02;
        // }
        if (Keyboard.isKeyDown('ArrowLeft')) {
            character.rotation += 0.1 * delta;
        }
        if (Keyboard.isKeyDown('ArrowRight')) {
            character.rotation -= 0.1 * delta;
        }
    }

    //const x1 = Math.max(character.x - character.width / 2, 0);
    //const y1 = Math.max(character.y - character.height / 2,0);
    //const x2 = Math.min(character.x + character.width / 2, app.screen.width);
    //const y2 = Math.min(character.y + character.height /2, app.screen.height);
    //const area = Math.max(x2 - x1, 0) * Math.max(y2 - y1, 0);
    //const percent = area / (app.screen.width * app.screen.height);
    //console.log(percent);
});


function animate(time: number | undefined) {
    requestAnimationFrame(animate)
    TWEEN.update(time)
}
requestAnimationFrame(animate)