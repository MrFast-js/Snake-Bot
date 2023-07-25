var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

// the canvas width & height, snake x & y, and the apple x & y, all need to be a multiples of the grid size in order for collision detection to work
// (e.g. 16 * 25 = 400)
var grid = 16;
var count = 0;

var snake = {
    x: 160,
    y: 160,

    // snake velocity. moves one grid length every frame in either the x or y direction
    dx: grid,
    dy: 0,

    // keep track of all grids the snake body occupies
    cells: [],

    // length of the snake. grows when eating an apple
    maxCells: 4
};
var snake2 = {
    x: 160,
    y: 160,

    // snake velocity. moves one grid length every frame in either the x or y direction
    dx: grid,
    dy: 0,

    // keep track of all grids the snake body occupies
    cells: [],

    // length of the snake. grows when eating an apple
    maxCells: 4
};
var apple = {
    x: 320,
    y: 320
};

// get random whole numbers in a specific range
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
var snakeSpeed = 8; // updates per second (1-10)
// game loop
function loop() {
    // requestAnimationFrame(loop);
    // slow game loop to 15 fps instead of 60 (60/15 = 4)
    // if(snake.maxCells > 50) snakeSpeed = 7;
  
    count+=0.1
    if (count < 10-snakeSpeed) {
        return;
    }

    count = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);

    // move snake by it's velocity
    snake.x += snake.dx;
    snake.y += snake.dy;

    context.globalAlpha = 1
    context.fillStyle = 'red';
    context.fillRect(apple.x, apple.y, grid - 1, grid - 1);

    // wrap snake position horizontally on edge of screen
    if (snake.x < 0) {
        snake.x = canvas.width - grid;
    } else if (snake.x >= canvas.width) {
        snake.x = 0;
    }

    // wrap snake position vertically on edge of screen
    if (snake.y < 0) {
        snake.y = canvas.height - grid;
    } else if (snake.y >= canvas.height) {
        snake.y = 0;
    }

    // keep track of where snake has been. front of the array is always the head
    snake.cells.unshift({
        x: snake.x,
        y: snake.y
    });

    // remove cells as we move away from them
    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
    }

    // draw apple
    // draw snake one cell at a time
    
    snake.cells.forEach(function(cell, index) {
        context.fillStyle = 'green';
        context.globalAlpha = (((index+1)%2)+1)/2
        if(index == 0) context.fillStyle = 'magenta'
        // drawing 1 px smaller than the grid creates a grid effect in the snake body so you can see how long it is
        context.fillRect(cell.x, cell.y, grid - 1, grid - 1);

        // snake ate apple
        if (cell.x === apple.x && cell.y === apple.y) {
            snake.maxCells++;

            // canvas is 400x400 which is 25x25 grids
            apple.x = getRandomInt(0, 25) * grid;
            apple.y = getRandomInt(0, 25) * grid;
        }

        // check collision with all cells after this one (modified bubble sort)
        for (var i = index + 1; i < snake.cells.length; i++) {
            // snake occupies same space as a body part. reset game
            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                // alert('snake died with '+moves[lmi]+" "+moves[lmi-1]+" "+moves[lmi-2]+" "+moves[lmi-3])
                snake.x = 160;
                snake.y = 160;
                snake.cells = [];
                snake.maxCells = 50;
                snake.dx = grid;
                snake.dy = 0;
                moves = []
                // snakeSpeed = 10
                apple.x = getRandomInt(0, 25) * grid;
                apple.y = getRandomInt(0, 25) * grid;
            }
        }
    });
  // snake2.cells.forEach(function(cell, index) {
  //     if(index == 0) {
  //       context.fillStyle = 'blue'
  //       context.fillRect(cell.x, cell.y, grid - 1, grid - 1);
  //     }
  // })

  // move snake by it's velocity
    
}

// listen to keyboard events to move the snake
document.addEventListener('keydown', function(e) {
    // left arrow key
    if (e.which === 37) {
        apple.x -= grid;
    }
    // up arrow key
    if (e.which === 38) {
        apple.y -= grid;
    }
    // right arrow key
    if (e.which === 39) {
        apple.x += grid;
    }
    // down arrow key
    if (e.which === 40) {
        apple.y += grid;
    }
});

// start the game
requestAnimationFrame(loop);

function doStuff(dx,dy) {
    snake2.x = snake.x;
    snake2.y = snake.y;
    snake2.cells = JSON.parse(JSON.stringify(snake.cells));
  
    var dead = false;
    snake2.cells.forEach(function(cell) {
      if (cell.x == snake2.cells[0].x+dx && cell.y == snake2.cells[0].y+dy) {
        dead = true;
      }
    });
    snake2.x+=dx;
    snake2.y+=dy;
    
    try {
      if(snake2.cells[0].x > 390) dead = true;
      if(snake2.cells[0].y > 400) dead = true;
      if(snake2.cells[0].x < 0) dead = true;
      if(snake2.cells[0].y < 0) dead = true;
    } catch(e) {
      
    }
    return dead;
}