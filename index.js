window.onload = () => {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    const boxW = 10;
    const boxH = 10;   
    let snake = []; 
    let direction = "right";
    let score = 0;
    generateFood(); 

    // draw a single 'unit' of the snake of dimention boxW * boxH
    function drawBox(x, y, colour) {
        context.fillStyle = colour;
        context.fillRect(x*boxW, y*boxH, boxW, boxH);
    
        context.fillStyle = "#000";
        context.strokeRect(x*boxW, y*boxH, boxW, boxH);
    }

    // create an initial snake array that has 4 default cells
    function initSnakeArray() {
        const  len = 4;
        for (let i = len - 1; i >= 0; i--) {
            snake.push({
                x: i,
                y: 0
            });
        }
    }

    function getDirection(e) {
        if (e.keyCode == 37 && direction != "right") {
            direction = "left";
        } else if (e.keyCode == 38 && direction != "down") {
            direction = "up";
        } else if (e.keyCode == 39 && direction != "left") {
            direction = "right";
        } else if (e.keyCode == 40 && direction != "up") {
            direction = "down"; 
        }
    }

    // get the current direction
    document.addEventListener("keydown", getDirection);

    // generate new food
    function generateFood() {
        food = {
            x: Math.floor(Math.random() * Math.floor(canvas.width/boxW)),
            y: Math.floor(Math.random() * Math.floor(canvas.height/boxH))
        }
    }

    // draw food
    function drawFood(x, y) {
        drawBox(x, y, "red");
    }

    // check if snake collides with itself
    function checkCollision(x, y, snake) {
        for (let i = 0; i < snake.length; i++) {
            if (x == snake[i].x && y == snake[i].y) {
                return true;
            }
        }
        return false;
    }

    // draw the score
    function drawScore(x) {
        context.fillStyle = "yellow";
        context.font = "10px Verdana"
        context.fillText("Score: " + x, 5, canvas.height - 5);
    }
   
    // render out all the boxes in the snake array
    function drawSnake() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < snake.length; i++) {
            let x = snake[i].x;
            let y = snake[i].y;
            drawBox(x, y, "white");
        }

        // draw food
        drawFood(food.x, food.y);
        
        // snake head co-ordinates
        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        if (direction == "left") snakeX--;
        else if (direction == "up") snakeY--;
        else if (direction == "right") snakeX++;
        else if (direction == "down") snakeY++;

        // Relead game if snake hits the wall
        if (snakeX < 0 || snakeX >= canvas.width/boxW ||
            snakeY < 0 || snakeY >= canvas.height/boxH || 
            checkCollision(snakeX, snakeY, snake)) {
            location.reload();
        }

        // if the snake eats the food
        let newHead;
        if (snakeX == food.x && snakeY == food.y) {
            // do not remove the tail
            generateFood();
            // create a new snake head based on previous head's direction
            newHead = {
                x: snakeX,
                y: snakeY
            }
            score++;  
        } else {
            // remove snake tail
            snake.pop();
            newHead = {
                x: snakeX,
                y: snakeY
            }  
        }

        // add new head
        snake.unshift(newHead);
        drawScore(score);
    }

    initSnakeArray();
    drawSnake(score);
    setInterval(drawSnake, 100);
};
