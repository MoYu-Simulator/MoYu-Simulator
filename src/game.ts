import * as PIXI from 'pixi.js';
import * as bossInfo from './lec_sample.json';

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

// Listen for animate update
app.ticker.add((delta) => {
    Keyboard.update();
    Mouse.update();

    secondsElapsed += app.ticker.deltaMS / 1000;
    // Every second, shoot a bullet
    if (secondsElapsed - lastTick > 1) {
        lastTick++;

        const bullet = new PIXI.Sprite(PIXI.Texture.WHITE);
        bullet.x = character.x;
        bullet.y = character.y;
        app.stage.addChild(bullet);
        allyBullets.push({ sprite: bullet, rotation: character.rotation + Math.PI });
    }

    // Update bullets
    const newAllyBullets: Bullet[] = [];
    for (const bullet of allyBullets) {
        bullet.sprite.x += Math.cos(bullet.rotation) * 10;
        bullet.sprite.y += Math.sin(bullet.rotation) * 10;
        if (bullet.sprite.x > app.screen.width || bullet.sprite.x < 0 || bullet.sprite.y > app.screen.height || bullet.sprite.y < 0) {
            app.stage.removeChild(bullet.sprite);
        } else {
            newAllyBullets.push(bullet);
        }
    }
    allyBullets = newAllyBullets;

    // Update boss
    const tick = Math.floor(secondsElapsed);
    console.log(bossInfo[tick]);
    const bossPos = bossInfo[tick].boss_pos;
    graphics.clear();
    graphics.beginFill(0xFF0000, 0.5);
    graphics.drawRect(
        bossPos[0] * app.screen.width / WIDTH0,
        bossPos[2] * app.screen.height / HEIGHT0,
        (bossPos[1] - bossPos[0]) * app.screen.width / WIDTH0,
        (bossPos[3] - bossPos[2]) * app.screen.height / HEIGHT0,
    );
    graphics.endFill();

    const facePos = bossInfo[tick].face_pos;
    if (facePos[0] != -1) {
        if (bossInfo[tick].face_front)
            graphics.beginFill(0x00FF000, 0.7);
        else
            graphics.beginFill(0xFF00000, 0.7);
        graphics.drawRect(
            facePos[0] * app.screen.width / WIDTH0,
            facePos[2] * app.screen.height / HEIGHT0,
            (facePos[1] - facePos[0]) * app.screen.width / WIDTH0,
            (facePos[3] - facePos[2]) * app.screen.height / HEIGHT0,
        );
        graphics.endFill();
    }


    const speed = 5 * delta;
    if (Keyboard.isKeyDown('ArrowLeft', 'KeyA'))
        character.x -= speed;
    if (Keyboard.isKeyDown('ArrowRight', 'KeyD'))
        character.x += speed;
    if (Keyboard.isKeyDown('ArrowUp', 'KeyW'))
        character.y -= speed;
    if (Keyboard.isKeyDown('ArrowDown', 'KeyS'))
        character.y += speed;
});
