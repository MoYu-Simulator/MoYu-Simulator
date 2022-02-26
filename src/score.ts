export const scorePanel = document.createElement('em');
scorePanel.style.cssText = `
    position: fixed;
    top: 0%;
    left: 0%;
    font-size: 2em;
    z-index: 10;
    background-color: rgba(0, 255, 255, 0.8);
`;
scorePanel.innerText="Score: 233";
