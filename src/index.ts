import * as PIXI from 'pixi.js';
import { app } from './game';
import { videoPlayer } from './video'

const button = document.createElement("button");
button.innerHTML = "Play";
button.style.cssText = `
    position: fixed;
    top: 45%;
    left: 45%;
    width: 10%;
    height: 10%;
    z-index: 3;
`;
button.addEventListener('click', () => {
    videoPlayer.play();
    app.ticker.start();
    button.style.visibility = "hidden";
});
document.body.appendChild(button);