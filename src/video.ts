export const videoPlayer = document.createElement("video");
videoPlayer.src = "assets/lec_sample.mp4";
videoPlayer.controls = false;
videoPlayer.style.width="100%";
videoPlayer.style.height="100%";
videoPlayer.style.cssText=`
    position: fixed;
    top: 0%;
    left: 0%;
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    z-index: 0;
`;
document.body.appendChild(videoPlayer);