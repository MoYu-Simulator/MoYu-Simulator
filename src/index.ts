import { app } from './game';
import { videoPlayer} from './video'
import { scorePanel } from './score';
const button = document.createElement("button");
button.innerHTML = "Play";
button.style.cssText=`
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
    document.body.appendChild(scorePanel);
    button.style.visibility = "hidden";
});
document.body.appendChild(button);