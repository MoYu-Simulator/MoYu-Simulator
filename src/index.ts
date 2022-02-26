import * as PIXI from 'pixi.js';
import { HelloWorld } from './scenes/helloWorld';

const load = (app: PIXI.Application) => {
    return new Promise<void>((resolve) => {
        app.loader.add('assets/hello-world.png').load(() => {
            resolve();
        });
    });
};

const main = async () => {
    // Main app
    let app = new PIXI.Application();

    document.body.style.margin = '0';
    app.renderer.view.style.position = 'absolute';
    app.renderer.view.style.display = 'block';

    // View size = windows
    app.renderer.resize(window.innerWidth, window.innerHeight);
    window.addEventListener('resize', (e) => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
    });

    // Load assets
    await load(app);

    // Add video player
    const videoPlayer = document.createElement("video");
    videoPlayer.src = "assets/lec_sample.mp4";
    videoPlayer.controls = true;
    document.body.appendChild(videoPlayer);
    videoPlayer.addEventListener('play', () => {
        document.body.appendChild(app.view);

        app.ticker.start();
    });

    // Set scene
    var scene = new HelloWorld(app);
    app.stage.addChild(scene);
};

main();
