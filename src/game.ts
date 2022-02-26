import * as PIXI from 'pixi.js';

const Keyboard = require('pixi.js-keyboard');
const Mouse = require('pixi.js-mouse');

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

const boss = function (n: number) {
    return { x1: 0.1 * n, y1: 0, x2: 100 + 0.1 * n, y2: 200 };
};

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
