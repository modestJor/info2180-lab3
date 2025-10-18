document.addEventListener('DOMContentLoaded', function() {

    let currentPlayer = 'X'
    let gameboard = ['','','','','','','','','']
    let gameActive = true

    const squares = document.querySelectorAll('#board div');
    const statusDiv = document.getElementById('status');
    const newGamebtn = document.querySelector('.btn');
    
    function startBoard() {
        squares.forEach(square => {
            square.classList.add('square');
        });
    }

    function squareClick(event) {
        const square = event.target;
        const squareIndex = Array.from(squares).indexOf(square);

        if (gameboard[squareIndex] !== '' || !gameActive){
            return;
        }

        gameboard[squareIndex] = currentPlayer;
        square.textContent = currentPlayer;
        square.classList.add(currentPlayer);

        if (checkWinner()) {
            statusDiv.textContent = `Congratulations! ${currentPlayer} is the Winner!`;
            statusDiv.classList.add('you-won');
            gameActive = false
            return;
        }

        if (checkTie()) {
            statusDiv.textContent = "Game ended in a tie";
            gameActive = false
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' :'X';
     }

     function mouseOver(event) {
        const square = event.target;
        if (square.textContent === '' && gameActive) {
            square.classList.add('hover')
        }
     }

     function mouseOut(event) {
        const square = event.target;
        square.classList.remove('hover');
     }

     function checkWinner() {
        const winningComb = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], //rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], //columns
            [0, 4, 8], [2, 4, 6] // diagonals
        ];

        for (let comb of winningComb) {
            const [a, b, c] = comb;
            if (
                gameboard[a] &&
                gameboard[a] === gameboard[b] &&
                gameboard[a] === gameboard[c]
            ) {
                return true;
            }
        }
        return false;
     }

     function checkTie(){
        return gameboard.every(cell => cell !== '');
     }

     function restartGame() {
        gameboard = ['','','','','','','','',''];
        currentPlayer = 'X';
        gameActive = true;

        squares.forEach(square => {
            square.textContent = '';
            square.classList.remove('X', 'O', 'hover');
        });

        statusDiv.textContent = 'Move your mouse over a square and click to play an X or an O.';
        statusDiv.classList.remove('you-won');
    }
    
    
    function EventListeners() {
        
        squares.forEach(square => {
            square.addEventListener('click', squareClick);
            square.addEventListener('mouseover', mouseOver);
            square.addEventListener('mouseout', mouseOut);
        });
        
        
        newGamebtn.addEventListener('click', restartGame);
    }
    
    
    function init() {
        startBoard();
        EventListeners();
    }
    
    init();
});