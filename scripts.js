let playArea = document.getElementById('#playArea');
const boardSize = 100;

// make the grid
generatePlayArea = () => {
    for (let i = 0; i < boardSize; i++) {
        tempSquare = document.createElement('div');
        tempSquare.className = 'square';
        tempSquare.id = 'sq' + i;
        playArea.appendChild(tempSquare);   
    }
}

generatePlayArea();

// array of tiles
const playAreaChildren = document.getElementById("#playArea").childNodes;

// first element is the tail, last element is the head
let snake = [0, 1, 2];
let head = snake[snake.length-1];
let neck = snake[snake.length-2];
let sideLength = Math.sqrt(boardSize);
let alive = true;
let food = Math.floor(Math.random()*100) % boardSize;

// move right by default
let lastInput = 'KeyD';

let delay = 600;
let startingDelay = 3000;

document.addEventListener("keydown", (e) => {
        if (`${e.code}` == 'KeyW' || `${e.code}` == 'KeyA' || `${e.code}` == 'KeyS' || `${e.code}` == 'KeyD') {
            lastInput = `${e.code}`;
        }
    }
);

toGreen = currentInt => {
    tempSquare = document.getElementById('sq' + currentInt);
    tempSquare.style.backgroundColor = '#65cf65';
}

toRed = currentInt => {
    tempSquare = document.getElementById('sq' + currentInt);
    tempSquare.style.backgroundColor = '#cf6565';
}

bodyCollision = currentInt => {
    if (head == currentInt) {
        alive = false;
    }
}

// main loop that runs the game
startGame = () => {
    console.log("start game");
    let interval = setInterval(() => {
        if (!alive) {
            console.log('dedge');
            clearInterval(interval);
            // init all to black
            for (let x = 0; x < playAreaChildren.length; x++) {
                playAreaChildren[x].style.backgroundColor = '#222222';
            }
            snake.forEach(toRed);
        }
        else {
            // check latest input
            switch (lastInput) {
                case 'KeyW':
                    snake.push(snake[snake.length - 1] - Math.sqrt(boardSize));
                    break;
                case 'KeyA':
                    snake.push(snake[snake.length - 1] - 1);
                    break;
                case 'KeyS':
                    snake.push(snake[snake.length - 1] + Math.sqrt(boardSize));
                    break;
                case 'KeyD':
                    snake.push(snake[snake.length - 1] + 1);
                    break;
            }

            // update head
            head = snake[snake.length-1];
            neck = snake[snake.length-2];

            // food mechanic
            if (head != food) {
                // remove tail
                snake.shift();
            }
            else {
                // spawn the food in a spot not taken up by the snake
                food = Math.floor(Math.random()*100) % boardSize;
            }

            // update board colors
            // init all to black
            for (let x = 0; x < playAreaChildren.length; x++) {
                playAreaChildren[x].style.backgroundColor = '#222222';
            }
            // update green squares
            snake.forEach(toGreen);
            // update food
            document.getElementById('sq' + food).style.backgroundColor = '#cfc165';

            // collision mechanic
            // walls
            if ((head % sideLength == sideLength - 1 && neck % sideLength == 0) ||
                (head % sideLength == 0 && neck % sideLength == sideLength - 1) ||
                (head > boardSize) || (head < 0)) {
                    alive = false;
            }
            
            // collision with snake body
            // can be modified, make an array with all of the possible collisions
            for (let y = 0; y < snake.length - 1; y++) {
                bodyCollision(snake[y]);
            }

            // add mechanic for snake speeding up (use counters that refresh every *delay*)
            console.log(delay);
        }
    }, delay);
    
}