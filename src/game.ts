import * as PIXI from 'pixi.js';
import * as bossInfo from './lec_sample.json';

import * as TWEEN from '@tweenjs/tween.js'
import { addScore } from './score';
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
character.width /= 2;
character.height /= 2;
character.play();
// move the sprite to the center of the screen
character.x = app.screen.width / 2;
character.y = app.screen.height / 2;

app.stage.addChild(character);
app.stage.addChild(graphics);

let secondsElapsed = 0;
let lastTick = 0;

type Bullet = { sprite: PIXI.Sprite, rotation: number };
let allyBullets: Bullet[] = [];


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

function shoot(){
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
    // Every second, shoot a bullet
    if (secondsElapsed - lastTick > 1) {
        lastTick += 1;
        shoot();

        new TWEEN.Tween(bossPos)
            .to(convertPoint(bossInfo[(lastTick)].boss_pos), 1000)
            .easing(TWEEN.Easing.Linear.None)
            .start()
        facePos = convertPoint(bossInfo[(lastTick)].face_pos)
        faceFront = bossInfo[(lastTick)].face_front
    }

    // Update bullets
    const newAllyBullets: Bullet[] = [];
    for (const bullet of allyBullets) {
        bullet.sprite.x += Math.cos(bullet.rotation) * 10;
        bullet.sprite.y += Math.sin(bullet.rotation) * 10;
        if (!insideBox(bullet.sprite.x, bullet.sprite.y, [0, app.screen.width, 0, app.screen.height])) {
            app.stage.removeChild(bullet.sprite);
        } else if(insideBox(bullet.sprite.x, bullet.sprite.y, bossPos)) {
            app.stage.removeChild(bullet.sprite);
            addScore(speed);
        } else {
            newAllyBullets.push(bullet);
        }
    }
    allyBullets = newAllyBullets;

    graphics.clear();

    // Update boss
    graphics.beginFill(0xFF0000, 0.5);
    graphics.drawRect(
        bossPos[0],
        bossPos[2],
        bossPos[1] - bossPos[0],
        bossPos[3] - bossPos[2]
    );
    graphics.endFill();

    console.log(facePos[0])
    if (facePos[0]>0) {
        if (faceFront)
            graphics.beginFill(0x00FF000, 0.7);
        else
            graphics.beginFill(0xFF00000, 0.7);
        graphics.drawRect(
            facePos[0],
            facePos[2],
            facePos[1] - facePos[0],
            facePos[3] - facePos[2]
        );
        graphics.endFill();
    }

    Keyboard.update();
    if (movable) {
        if (Keyboard.isKeyDown('KeyT')) {
            movable = false;
            shoot();
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
        if (Keyboard.isKeyDown('KeyA'))
            character.x -= speed;
        if (Keyboard.isKeyDown('KeyD'))
            character.x += speed;
        if (Keyboard.isKeyDown('KeyW'))
            character.y -= speed;
        if (Keyboard.isKeyDown('KeyS'))
            character.y += speed;
        if (Keyboard.isKeyDown('ArrowUp')) {
            character.width *= 1.02;
            character.height *= 1.02;
        }
        if (Keyboard.isKeyDown('ArrowDown')) {
            character.width /= 1.02;
            character.height /= 1.02;
        }
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