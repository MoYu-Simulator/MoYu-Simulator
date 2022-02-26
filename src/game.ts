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

// create a new Sprite from an image path
const character = PIXI.Sprite.from('assets/mascot.gif');

// center the sprite's anchor point
character.anchor.set(0.5);

// move the sprite to the center of the screen
character.x = app.screen.width / 2;
character.y = app.screen.height / 2;

app.stage.addChild(character);

// Listen for animate update
app.ticker.add((delta) => {
    Keyboard.update();
    Mouse.update();

    const speed = 5 * delta;
    if (Keyboard.isKeyDown('ArrowLeft', 'KeyA'))
        character.x -= speed;
    if (Keyboard.isKeyDown('ArrowRight', 'KeyD'))
        character.x += speed;
    if (Keyboard.isKeyDown('ArrowUp', 'KeyW'))
        character.y -= speed;
    if (Keyboard.isKeyDown('ArrowDown', 'KeyS'))
        character.y += speed;

    if (Mouse.isButtonDown(Mouse.Button.LEFT)) {
        character.rotation += 0.1 * delta;
    }

    if (Mouse.isButtonDown(Mouse.Button.RIGHT)) {
        character.rotation -= 0.1 * delta;
    }
});
