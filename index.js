//Start Screen
const startScreen = document.querySelector(".startScreen");
const characterScreen = document.querySelector(".characterScreen");
const gameScreen = document.querySelector(".gameScreen");
const playBtn = document.querySelector(".playBtn");


//Start Screen
startScreen.classList.remove("hide");
characterScreen.classList.add("hide");
gameScreen.classList.add("hide");

//GO TO SELECTION SCREEN
playBtn.addEventListener("click" , () =>{
    startScreen.classList.add("hide");
    characterScreen.classList.remove("hide");
});



















//AFTER PLAY BUTTON
//Choose Character Page
let selectedPlayers = [];
const chooseText = document.querySelector(".chooseText");
const cards = document.querySelectorAll(".player-card");

cards.forEach( card =>{
    card.addEventListener("click", ()=>{

        const id = card.dataset.id;

        //UN-SELECT if chosen
        const index = selectedPlayers.findIndex( p => p.id === id);

        if(index !== -1){
            selectedPlayers.splice(index,1);
            card.classList.remove("selected");
            updateChooseText();
            return;
        }

        //if already 2 players chosen => no more allow.
        if(selectedPlayers.length === 2) return;

        //select new card
        selectedPlayers.push({
            id: card.dataset.id,
            name: card.dataset.name,
            card: card.dataset.card,
            token: card.dataset.token
        });
        card.classList.add("selected");
        updateChooseText();
    })
})
//Update Text depending on the situation
function updateChooseText(){
    if(selectedPlayers.length === 0){
        chooseText.innerText = "Player 1, choose your character";
    } else if (selectedPlayers.length === 1){
        chooseText.innerText = "Player 2, choose your character";
    } else {
        chooseText.innerText = "Great! Click Start to Play!";
        document.querySelector(".startBtn").classList.remove("hide");
    }

}





//AFTER SETTING BUTTON
const settingsScreen = document.querySelector(".settingsScreen");
const settingsBtn = document.querySelector(".settingBtn");
const backBtn = document.querySelector(".backBtn");

settingsBtn.addEventListener("click", () =>{
    settingsScreen.classList.remove("hide");
});

//Volume
const volumeSlider = document.getElementById("volumeSlider");
const volumeValue = document.getElementById("volumeValue");
const clickSound = document.querySelector(".clickSound");
const winSound = document.querySelector(".winSound");
const drawSound = document.querySelector(".drawSound");
const matchMusic = document.querySelector(".matchMusic");
const menuMusic = document.querySelector(".menuSound");

function applyVolume() {
    let vol = volumeSlider.value / 100;

    clickSound.volume = vol;
    winSound.volume = vol;
    drawSound.volume = vol;
    matchMusic.volume = vol;
    menuMusic.volume = vol;
}
applyVolume();


//saved volume
let savedVolume = localStorage.getItem("volume");

if(savedVolume){
    volumeSlider.value = savedVolume;
    volumeValue.innerText = savedVolume + "%"
} else {
    volumeSlider.value = 100;
    volumeValue.innerText = "100%";
}
applyVolume();

//Change Volume
volumeSlider.addEventListener("input", () => {
    volumeValue.innerText = volumeSlider.value + "%";
    localStorage.setItem("volume", volumeSlider.value);
    applyVolume();
});






let menuStarted = false;

function startMenuMusic(){
    if(menuStarted) return;
    menuStarted = true;

    menuMusic.loop = true;
    menuMusic.currentTime = 0;
    menuMusic.play();
}

document.addEventListener("click" , startMenuMusic, { once: true });



























//Click Sound
function playClick() {
    clickSound.currentTime = 0;
    clickSound.play();
}

const uiButtons = document.querySelectorAll("button:not(.box)");

uiButtons.forEach(btn => {
    btn.addEventListener("click" , playClick);
});






//THEME
const lightBtn = document.getElementById("lightBtn");
const darkBtn = document.getElementById("darkBtn");

//Default - light theme
let savedTheme = localStorage.getItem("theme");

if(savedTheme){
    document.body.classList.add(savedTheme);
} else {
    document.body.classList.add("light-theme");
    localStorage.setItem("theme", "light-theme");
}

//Switch to light
lightBtn.addEventListener("click", () => {
    document.body.classList.remove("dark-theme");
    document.body.classList.add("light-theme");

    localStorage.setItem("theme" , "light-theme");
});

//Switch to dark
darkBtn.addEventListener("click", () => {
    document.body.classList.remove("light-theme");
    document.body.classList.add("dark-theme");

    localStorage.setItem("theme" , "dark-theme");
});

// Active button styles
function updateThemeButtons(){
    if(document.body.classList.contains("light-theme")){
        lightBtn.classList.add("active");
        darkBtn.classList.remove("active");
    } else {
        darkBtn.classList.add("active");
        lightBtn.classList.remove("active")
    }
}
updateThemeButtons();


const bgVideo = document.getElementById("bgVideo");
const bgSource = document.getElementById("bgSource");

function updateBackgroundVideo(){
    if(document.body.classList.contains("dark-theme")){
        bgSource.src = "backgroundBG/Minecraft_Village_Night_Animation.mp4";
    } else {
        bgSource.src = "backgroundBG/Minecraft_Village_Animation_Generation.mp4";
    }
    bgVideo.load();
    bgVideo.play();
}
updateBackgroundVideo();


// Light Button
lightBtn.addEventListener("click" , () => {
    animateThemeChange(() => {
        document.body.classList.remove("dark-theme");
        document.body.classList.add("light-theme");

        localStorage.setItem("theme" , "light-theme");

        updateThemeButtons();
        updateBackgroundVideo();
    });
});

// Dark Button
darkBtn.addEventListener("click" , () => {
    animateThemeChange(() => {
        document.body.classList.remove("light-theme");
        document.body.classList.add("dark-theme");

        localStorage.setItem("theme" , "dark-theme");

        updateThemeButtons();
        updateBackgroundVideo();
    });
});

const transitionOverlay = document.querySelector(".theme-transition");

function animateThemeChange(callback){
    transitionOverlay.classList.add("show");

    setTimeout(() => {
        callback();
        transitionOverlay.classList.remove("show");
    }, 500);
}
















//BACK TO START
backBtn.addEventListener("click", () =>{
    settingsScreen.classList.add("hide");
});

const charBackBtn = document.querySelector(".charBackBtn");

charBackBtn.addEventListener("click", () => {

    // Hide character screen
    characterScreen.classList.add("hide");

    // Show Start Screen
    startScreen.classList.remove("hide");

    // Reset selections
    selectedPlayers = [];
    cards.forEach(c => c.classList.remove("selected"));
    chooseText.innerText = "Player 1, choose your character";

    // Hide Start button on selection screen again
    document.querySelector(".startBtn").classList.add("hide");
});





// INFO SCREEN
const infoScreen = document.querySelector(".infoScreen");
const infoBtn = document.querySelector(".infoBtn");
const infoBackBtn = document.querySelector(".infoBackBtn");


//OPEN INFO
infoBtn.addEventListener("click", () => {
    infoScreen.classList.remove("hide");
});

//BACK
infoBackBtn.addEventListener("click", () => {
    infoScreen.classList.add("hide");
});
























//VS Animation
const vsScreen = document.querySelector(".vs-screen");
const leftBox = document.querySelector(".player-left");
const rightBox = document.querySelector(".player-right");
const startBtn = document.querySelector(".startBtn");

startBtn.addEventListener("click" , () =>{

    matchInProgress = true;

    menuMusic.pause();
    menuMusic.currentTime = 0;

    matchMusic.loop = true;
    matchMusic.currentTime = 0;
    matchMusic.play();

    characterScreen.classList.add("hide");
    startBtn.classList.add("hide");
    vsScreen.classList.remove("hide");
    vsScreen.classList.add("showVS")


    //Player1- LEFT
    leftBox.innerHTML = `<img src="${selectedPlayers[0].card}" alt="">`;

    //Player-2 RIGHT
    rightBox.innerHTML = `<img src="${selectedPlayers[1].card}" alt="">`;


    //After animation => go to game
    setTimeout(() => {
        vsScreen.classList.add("hide");
        vsScreen.classList.remove("showVS");
        gameScreen.classList.remove("hide");
    },2000);
})













//Game Screen
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".resetBtn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector(".msg");



let turnX = true;
let matchInProgress = false;

//Win Patterns
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

//Reset Game Button
const resetGame = () => {

    turnX = true;
    matchInProgress = true;
    enabledBoxes();

    msgContainer.classList.remove("show");
    resetBtn.style.display = "inline-block";

    allowEndPopup = true;
};
const enabledBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerHTML = "";
        box.removeAttribute("data-val");
    }
};







//END MATCH BUTTON
const endMatchBtn = document.querySelector(".endMatchBtn");
const endPopup = document.querySelector(".endPopup");
const cancelEnd = document.querySelector(".cancelEnd");
const confirmEnd = document.querySelector(".confirmEnd");
let allowEndPopup = true;

endMatchBtn.addEventListener("click" , () => {
    if(allowEndPopup) {
    endPopup.classList.remove("hide");
    return;
}
    winSound.pause();
    winSound.currentTime = 0;
    drawSound.pause();
    drawSound.currentTime = 0

    endPopup.classList.add("hide");

    matchMusic.pause();
    matchMusic.currentTime = 0;

    menuMusic.currentTime = 0;
    menuMusic.play();

    resetGame();

    gameScreen.classList.add("hide");
    startScreen.classList.remove("hide");

    resetBtn.textContent = "Reset Game";
    endMatchBtn.textContent = "End Match";


    selectedPlayers = [];
    cards.forEach(c => c.classList.remove("selected"));
    chooseText.innerText = "Player 1, choose your character";

    document.querySelector(".startBtn").classList.add("hide");

    allowEndPopup = true;
});

cancelEnd.addEventListener("click" , () => {
    endPopup.classList.add("hide");
});

confirmEnd.addEventListener("click" , () => {

    winSound.pause();
    winSound.currentTime = 0;
    drawSound.pause();
    drawSound.currentTime = 0;

    matchMusic.pause();
    matchMusic.currentTime = 0;

    menuMusic.currentTime = 0;
    menuMusic.play();

    resetGame();

    endPopup.classList.add("hide");

    gameScreen.classList.add("hide");
    startScreen.classList.remove("hide")

    resetBtn.textContent = "Reset Game";
    endMatchBtn.textContent = "End Match";


    selectedPlayers = [];
    cards.forEach( c => c.classList.remove("selected"));
    chooseText.innerText = "Player 1, choose your character";

    document.querySelector(".startBtn").classList.add("hide");
});











//Play
boxes.forEach((box) => {
    box.addEventListener("click" , () => {
        if(turnX){

            box.innerHTML = `<img src="${selectedPlayers[0].token}" alt="">`;
            box.dataset.val = selectedPlayers[0].id;
            box.classList.add("p1");    
            turnX = false;
            resetBtn.style.display = "inline-block";

        } else {
            box.innerHTML = `<img src="${selectedPlayers[1].token}" alt="">`;
            box.dataset.val = selectedPlayers[1].id;
            box.classList.add("p2");
            turnX = true;
        }
        box.disabled = true;
        checkWinner();
    });
});

//Disable after winner declared
const disabledBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
};


//Congratulations Message
const showWinner = (winner) => {

    matchInProgress = false;

    matchMusic.pause();
    matchMusic.currentTime = 0;

    winSound.currentTime = 0;
    winSound.play();

    let winnerPlayer = selectedPlayers.find(p => p.id === winner);


    msg.innerHTML = `<p>Congratulations, ${winnerPlayer.name} Won! 🎉</p>`;
    msgContainer.classList.remove("hide");
    msgContainer.style.display = "block";
    msgContainer.classList.add("show");
    disabledBoxes();


    resetBtn.textContent = "New Game";
    endMatchBtn.textContent = "Exit";


    allowEndPopup = false;

    resetBtn.onclick = () => {
        winSound.pause();
        winSound.currentTime = 0;

        matchMusic.currentTime = 0;
        matchMusic.play();

        resetGame();

        resetBtn.textContent = "Reset Game";
        endMatchBtn.textContent = "End Match";
    };

};

//Check Winner
const checkWinner = () => {
    let winnerFound = false;

    for (let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].dataset.val || "";
        let pos2Val = boxes[pattern[1]].dataset.val || "";
        let pos3Val = boxes[pattern[2]].dataset.val || "";

        if( pos1Val && pos2Val && pos3Val ) {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                winnerFound = true;
                console.log("Winner" , pos1Val);
                showWinner(pos1Val);
                return;
            }
        }
    }
    //Draw Condition
    let filled = 0;
    boxes.forEach((box) => {
        if (box.dataset.val) filled++;
    });
    if (filled === 9 && !winnerFound) {

        matchInProgress = false;

        msg.innerHTML = "It's a Draw 😎 Try Again!";

        matchMusic.pause();
        matchMusic.currentTime = 0;

        drawSound.currentTime = 0;
        drawSound.play();

        msgContainer.classList.remove("hide");
        msgContainer.style.display = "block";
        msgContainer.classList.add("show");

        resetBtn.style.display = "inline-block";
        resetBtn.textContent = "New Game";

        endMatchBtn.textContent = "Exit";
        allowEndPopup = true;

        disabledBoxes();
    };
};

resetBtn.addEventListener("click" , resetGame);

