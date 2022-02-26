import * as PIXI from 'pixi.js';
const Keyboard = require('pixi.js-keyboard');
const Mouse = require('pixi.js-mouse');
const Graphics = new PIXI.Graphics();

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
character.play();
// move the sprite to the center of the screen
character.x = app.screen.width / 2;
character.y = app.screen.height / 2;

app.stage.addChild(character);
app.stage.addChild(Graphics);

let secondsElapsed = 0;

// Listen for animate update
app.ticker.add((delta) => {
    Keyboard.update();
    Mouse.update();

    secondsElapsed += delta;
    Graphics.lineStyle(2, 0xFEEB77, 1);
    Graphics.drawRect(50, 50, 100, 100);
    Graphics.endFill();

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
