import * as PIXI from 'pixi.js';
import * as TWEEN from '@tweenjs/tween.js'
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
character.width /= 2;
character.height /= 2;
character.play();
// move the sprite to the center of the screen
character.x = app.screen.width / 2;
character.y = app.screen.height / 2;

app.stage.addChild(character);


var movable = true;
// Listen for animate update
app.ticker.add((delta) => {
    const speed = 5 * delta;
    Keyboard.update();
    if(movable){
        if (Keyboard.isKeyDown('KeyT')){
            console.log('T')
            movable=false;
            new TWEEN.Tween(character)
            .to({
                x: character.x + Math.cos(character.rotation + Math.PI) * 350,
                y: character.y + Math.sin(character.rotation + Math.PI) * 350,
            },400)
            .easing(TWEEN.Easing.Linear.None)
            .start()

            new TWEEN.Tween(character)
                .to({
                    width: character.width / 2,
                    height: character.height / 2
                },200)
                .easing(TWEEN.Easing.Linear.None)
                .start()
                .onComplete(()=>{
                    new TWEEN.Tween(character)
                        .to({
                            width: character.width * 2,
                            height: character.height * 2
                        },200)
                        .easing(TWEEN.Easing.Linear.None)
                        .start()
                        .onComplete(()=>{
                            movable=true
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
        if (Keyboard.isKeyDown('ArrowUp')){
            character.width*=1.02;
            character.height*=1.02;
        }
        if (Keyboard.isKeyDown('ArrowDown')){
            character.width/=1.02;
            character.height/=1.02;
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