'use strict'

const tiles = document.querySelectorAll('.tile');
const unpresionedTiles = document.querySelectorAll('.unpresioned-tile');
const turnPlayerDisplay = document.querySelector('.turn-player');
const restartButton = document.querySelector('.restart-button')
const resetButton = document.querySelector('.reset-button');
const counters = document.querySelectorAll('.counter')
const counterX = document.querySelector('.counter-x')
const counterO = document.querySelector('.counter-o')

let currentPlayer = 'O';
let turnsPlayed = 0;

const ticTacToe = {
    pos1: '', pos2: '', pos3: '',
    pos4: '', pos5: '', pos6: '',
    pos7: '', pos8: '', pos9: ''
};

const player = () => {
    currentPlayer == 'O' ? currentPlayer = 'X' : currentPlayer = 'O';
    return currentPlayer;
};

const turnPlayed = (tile) => {
    turnPlayerDisplay.innerHTML = `Es el turno del jugador: ${currentPlayer}`;
    tile.innerHTML = player();
    tile.setAttribute('disabled', true);
    tile.classList.replace('tile', 'presioned-tile');
    tile.classList.remove('unpresioned-tile')
    ticTacToe[tile.id] = tile.innerHTML;
}

const restartGame = () => {
    tiles.forEach((tile) => {
        tile.innerHTML = ''
        tile.removeAttribute('disabled')
        tile.classList.remove('animation-win')
        tile.classList.replace('presioned-tile', 'tile');
        tile.classList.add('unpresioned-tile')
    })
    for (let pos in ticTacToe) ticTacToe[pos] = '';
    currentPlayer = 'O';
    turnPlayerDisplay.innerHTML = `Es el turno del jugador: ${currentPlayer}`;
    turnsPlayed = 0;
    player()
}

const resetGame = () => {
    restartGame()
    counters.forEach((counter) => { counter.children[1].innerHTML = '0' })
}

window.addEventListener('DOMContentLoaded', () => {

    turnPlayerDisplay.innerHTML = `Es el turno del jugador: ${currentPlayer}`;
    player();

    tiles.forEach((tile) => {
        tile.addEventListener('click', () => {
            turnPlayed(tile);
            turnsPlayed = turnsPlayed + 1;
            if (turnsPlayed >= 4) {
                if (checkThePlay(currentPlayer)) {
                    turnPlayerDisplay.innerHTML = `Ganó el jugador: ${currentPlayer}`;
                    if (currentPlayer == 'O') {
                        counterO.children[1].innerHTML = parseInt(counterO.children[1].innerHTML) + 1
                    } else {
                        counterX.children[1].innerHTML = parseInt(counterX.children[1].innerHTML) + 1
                    }
                    unpresionedTiles.forEach((tile) => {
                        tile.setAttribute('disabled', true)
                    })
                } else if (!checkThePlay(currentPlayer) && turnsPlayed == 9) {
                    turnPlayerDisplay.innerHTML = 'Sin ganador'
                    tiles.forEach((tile) => {
                            tile.classList.add('animation-nowinner')
                    })
                }
            }
        });
    });
});

restartButton.addEventListener('click', () => {
    restartGame()
})

resetButton.addEventListener('click', () => {
    resetGame()
});

const checkThePlay = (ursula) => {
    if (ticTacToe.pos1 == ursula && ticTacToe.pos2 == ursula && ticTacToe.pos3 == ursula) {
        tiles[0].classList.add('animation-win'); tiles[1].classList.add('animation-win'); tiles[2].classList.add('animation-win');
        return true;
    }
    if (ticTacToe.pos4 == ursula && ticTacToe.pos5 == ursula && ticTacToe.pos6 == ursula) {
        tiles[3].classList.add('animation-win'); tiles[4].classList.add('animation-win'); tiles[5].classList.add('animation-win');
        return true;
    }
    if (ticTacToe.pos7 == ursula && ticTacToe.pos8 == ursula && ticTacToe.pos9 == ursula) {
        tiles[6].classList.add('animation-win'); tiles[7].classList.add('animation-win'); tiles[8].classList.add('animation-win');
        return true;
    }
    if (ticTacToe.pos1 == ursula && ticTacToe.pos4 == ursula && ticTacToe.pos7 == ursula) {
        tiles[0].classList.add('animation-win'); tiles[3].classList.add('animation-win'); tiles[6].classList.add('animation-win');
        return true;
    }
    if (ticTacToe.pos2 == ursula && ticTacToe.pos5 == ursula && ticTacToe.pos8 == ursula) {
        tiles[1].classList.add('animation-win'); tiles[4].classList.add('animation-win'); tiles[7].classList.add('animation-win');
        return true;
    }
    if (ticTacToe.pos3 == ursula && ticTacToe.pos6 == ursula && ticTacToe.pos9 == ursula) {
        tiles[2].classList.add('animation-win'); tiles[5].classList.add('animation-win'); tiles[8].classList.add('animation-win');
        return true;
    }
    if (ticTacToe.pos1 == ursula && ticTacToe.pos5 == ursula && ticTacToe.pos9 == ursula) {
        tiles[0].classList.add('animation-win'); tiles[4].classList.add('animation-win'); tiles[8].classList.add('animation-win');
        return true;
    }
    if (ticTacToe.pos3 == ursula && ticTacToe.pos5 == ursula && ticTacToe.pos7 == ursula) {
        tiles[2].classList.add('animation-win'); tiles[4].classList.add('animation-win'); tiles[6].classList.add('animation-win');
        return true;
    }
};