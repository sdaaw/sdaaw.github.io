
/*const youtubeLinks = [
    "https://www.youtube.com/watch?v=DKhF5Cj1z9M", //survivors prototype
    "https://www.youtube.com/watch?v=CPW7nm1uKYs", //MDR
    "https://www.youtube.com/watch?v=EpKO0EfoWns", //KH Menu
    "https://www.youtube.com/watch?v=TuoJmpaUhkg", //MBTI Game
    "https://www.youtube.com/watch?v=7WXNeKgRnvY", //CSGO Skins/Unity
    "https://www.youtube.com/watch?v=oR-MfRspOvk" //CSGO Demos/Unity
];*/

const youtubeLinks = 
[ 
    ["https://www.youtube.com/watch?v=DKhF5Cj1z9M", "Survivors Game"],
    ["https://www.youtube.com/watch?v=CPW7nm1uKYs", "Severance Visual"],
    ["https://www.youtube.com/watch?v=EpKO0EfoWns", "KH Styled Menu"],
    ["https://www.youtube.com/watch?v=TuoJmpaUhkg", "MBTI Game"],
    ["https://www.youtube.com/watch?v=7WXNeKgRnvY", "CSGO Skins/Unity"],
    ["https://www.youtube.com/watch?v=oR-MfRspOvk", "CSGO Demos/Unity"]
]

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.ocean-flow');
    const boxCount = youtubeLinks.length;
    const hueBase = 245;

    // Create boxes
    for (let i = 0; i < boxCount; i++) {
        const box = document.createElement('div');
        box.className = 'float-box';
        const boxText = document.createElement('span');
        boxText.className = 'box-text';
        boxText.textContent = `${youtubeLinks[i][1]}`;
        box.appendChild(boxText);
        // Random properties
        const hue = hueBase + Math.random() * 25;
        const width = 100 + Math.random() * 80;
        const height = 80 + Math.random() * 70;
        const rotation = -15 + Math.random() * 30;
        const offsetY = -10 + Math.random() * 20;
        //const delay = Math.random() * 2;
        const delay = 0;
        const speed = -10 + Math.random() * 10;
        const initialY = offsetY - 15;
        
        // Style the box
        box.style.cssText = `
        --box-color: hsl(${hue}, 80%, 60%);
        --box-width: ${width}px;
        --box-height: ${height}px;
        --initial-rotate: ${rotation}deg;
        --offset-y: ${offsetY}px;
        --delay: ${delay}s;
        --speed: ${speed}deg;
        transform: rotate(${rotation}deg) translateY(${initialY}px);
        opacity: 0.9;
        cursor: pointer;
        `;

        // Click handler
        box.addEventListener('click', () => {
            // Random YouTube link
            const randomLink = youtubeLinks[i][0];
            // Open in new tab
            window.open(randomLink, '_blank');
            
            // Visual feedback
            box.style.transform = `rotate(${rotation + 360}deg) translateY(${initialY}px)`;
            box.style.opacity = '0';
            setTimeout(() => {
                box.style.transition = 'none';
                box.style.transform = `rotate(${rotation}deg) translateY(${initialY}px)`;
                box.style.opacity = '0.9';
                void box.offsetWidth; // Trigger reflow
                box.style.transition = 'all 0.4s ease-out';
            }, 1000);
        });

        container.appendChild(box);
        void box.offsetHeight;
        //box.style.setProperty('--glow-color', `hsla(${hue}, 80%, 70%, 0.7)`);
        box.style.animation = `oceanFloat 8s infinite ease-in-out ${delay}s, gentleRotate 12s infinite ease-in-out ${delay}s`;
    }

    document.querySelector('.header-wrapper').style.opacity = '1';
});

// Update time
function updateTime() {
    const now = new Date();
    document.getElementById('time').textContent = now.toDateString().substring(11, 19);
}
setInterval(updateTime, 1000);
updateTime();

window.addEventListener('DOMContentLoaded', initBoxes);
