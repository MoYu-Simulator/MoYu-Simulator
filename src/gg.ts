export function gg() {
    const audio = new Audio('assets/gg/gg.mp3');
    audio.autoplay=true;
    audio.play();
    (document.getElementsByTagName('video')[0] as HTMLVideoElement).pause();
    setTimeout(() => {
        const banner = document.createElement('img');
        banner.src = 'assets/gg/gg.png';
        banner.style.cssText = `
            position: fixed;
            height: 20%;
            bottom: 0;
            right: 0;
            z-index: 101;
        `;
        document.body.appendChild(banner);

        const filter = document.createElement('div');
        filter.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: yellow;
            opacity: 0.5;
            z-index: 100;
        `;
        document.body.appendChild(filter);
    },1500)
    setTimeout(()=>{
        const banner = document.createElement('img');
        banner.src = 'assets/gg/died.png';
        banner.style.cssText = `
            position: fixed;
            height: 30%;
            left: 35%;
            top: 35%;
            z-index: 101;
            transition: opacity 3s ease-in;
        `;
        document.body.appendChild(banner);
    },2000)
}