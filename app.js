let gameState;
let playerScores;
let activePlayer;
let activeScore;

const newGameButton = document.querySelector('.btn-new');
const rollDiceButton = document.querySelector('.btn-roll');
const holdButton = document.querySelector('.btn-hold');


function showDice() {
    const dices = document.querySelectorAll('.dice');
    for (let i = 0; i < dices.length; i++) {
        dices[i].classList.remove('hidden');
    }
}

function hideDice() {
    const dices = document.querySelectorAll('.dice');
    for (let i = 0; i < dices.length; i++) {
        dices[i].classList.add('hidden');
    }
}

function setCurrentScoreToZero() {
    const currentScores = document.querySelectorAll('.current-score');
    for (let i = 0; i < currentScores.length; i++) {
        currentScores[i].textContent = 0;
    }
}

function initGame() {
    gameState = true;
    playerScores = [0, 0];
    activeScore = 0;

    const totalScores = document.querySelectorAll('.total-score');
    for (let i = 0; i < totalScores.length; i++) {
        totalScores[i].textContent = 0;
    }

    setCurrentScoreToZero();

    const sign = document.querySelector('.sign');
    sign.classList.add('hidden');

    showDice();

    changeActivePlayer();
}

function changeActivePlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    activeScore = 0;

    setCurrentScoreToZero();

    const players = document.querySelectorAll('.name');
    for (let i = 0; i < players.length; i++) {
        players[i].classList.remove('active');
    }
    document.querySelector(`.player${activePlayer + 1}-name`).classList.add('active');

    const totalScores = document.querySelectorAll('.total-score');
    for (let i = 0; i < totalScores.length; i++) {
        totalScores[i].classList.remove('active');
    }
    document.querySelector(`.player${activePlayer + 1}-total-score`).classList.add('active');
}

function rollDice() {
    if (gameState) {
        showDice();
        const dices = document.querySelectorAll('.dice');
        for (let i = 0; i < dices.length; i++) {
            const randInt = Math.floor(Math.random() * 6) + 1;
            dices[i].setAttribute('src', `images/dice-${randInt}.png`);
            }

        for (let i = 0; i < dices.length; i++) {
            const fileName = dices[i].getAttribute('src');
            const start = fileName.indexOf('-') + 1;
            const end = fileName.indexOf('.');
            const diceNumber = parseInt(fileName.slice(start, end));
            activeScore += diceNumber;
            if (diceNumber === 1) {
                changeActivePlayer();
            } else {
                document.querySelector(`.player${activePlayer + 1}-current-score`).textContent = activeScore;
            }
        }
    }
}
 
function hold() {
    if (gameState) {
        const currentPlayer = document.querySelector(`.player${activePlayer + 1}`)
        playerScores[activePlayer] += activeScore;
        currentPlayer.querySelector('.total-score').textContent = playerScores[activePlayer];
        
        if (playerScores[activePlayer] >= 20) {
            gameState = false;
            hideDice();
            const sign = document.querySelector('.sign');
            sign.classList.remove('hidden');
            sign.classList.add('active');
            sign.innerHTML = `<p>🎉🎉🎉🎉🎉</p>
                              <p>Player${activePlayer + 1} Win!</p>
                              <p>🎉🎉🎉🎉🎉</p>`;
        } else {
            changeActivePlayer();
        }
    }
}


newGameButton.addEventListener('click', initGame);
rollDiceButton.addEventListener('click', rollDice);
holdButton.addEventListener('click', hold);

