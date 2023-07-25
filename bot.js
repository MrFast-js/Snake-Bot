var lastMoveLeft = false;
var lastMoveUp = false;
var moves = [];
var lmi = moves.length-1; // last move index
setInterval(function() {
  loop()
  lmi = moves.length-1;
  var right = !doStuff(grid,0);
  var left = !doStuff(-grid,0);
  var up = !doStuff(0,-grid);
  var down = !doStuff(0,grid);
  if(lmi) {
    if(moves[lmi] == 'd' && moves[lmi-1] == 'l' && moves[lmi-2] == 'u' && moves[lmi-3] == 'r' && right && left) {
      moveLeft()
    }
    if(moves[lmi] == 'd' && moves[lmi-1] == 'r' && moves[lmi-2] == 'u' && moves[lmi-3] == 'l' && right && left) {
      moveRight()
    }
    if(moves[lmi] == 'u' && moves[lmi-1] == 'l' && moves[lmi-2] == 'd' && moves[lmi-3] == 'r' && right && left) {
      moveLeft()
    }
    if(moves[lmi] == 'u' && moves[lmi-1] == 'r' && moves[lmi-2] == 'd' && moves[lmi-3] == 'l' && right && left) {
      moveRight()
    }

    if(moves[lmi] == 'r' && moves[lmi-1] == 'd' && moves[lmi-2] == 'l' && moves[lmi-3] == 'u' && up && down) {
      moveDown()
    }
    if(moves[lmi] == 'l' && moves[lmi-1] == 'd' && moves[lmi-2] == 'r' && moves[lmi-3] == 'u' && up && down) {
      moveDown()
    }
    if(moves[lmi] == 'r' && moves[lmi-1] == 'u' && moves[lmi-2] == 'l' && moves[lmi-3] == 'd' && up && down) {
      moveUp()
    }
    if(moves[lmi] == 'l' && moves[lmi-1] == 'u' && moves[lmi-2] == 'r' && moves[lmi-3] == 'd' && up && down) {
      moveUp()
    }
  }

  if(snake.x<apple.x) {
      if(right) {
        moveRight()
      } else {
        if(up && down) {
          if(lastMoveUp) {
            moveUp()
          } else {
            moveDown()
          }
        }
        else if(up) {
          moveUp()
        } else if(down) {
          moveDown()
        }
      }
  }
  if(snake.x>apple.x) {
      if(left) {
        moveLeft()
      } else {
        if(up && down) {
          if(lastMoveUp) {
            moveUp()
          } else {
            moveDown()
          }
        }
        else if(up) {
          moveUp()
        } else if(down) {
          moveDown()
        }
      }
  }
  if(snake.y>apple.y) {
      if(up) {
        moveUp()
      } else {
        if(left && right) {
          if(lastMoveLeft) {
            moveLeft()
          } else {
            moveRight()
          }
        }
        else if(left) {
          moveLeft()
        }
        else if(right) {
          moveRight()
        }
      }
  }
  if(snake.y<apple.y) {
      if(down) {
        moveDown()
      } else {
        if(left && right) {
          if(lastMoveLeft) {
            moveLeft()
          } else {
            moveRight()
          }
        }
        else if(left) {
          moveLeft()
        }
        else if(right) {
          moveRight()
        }
      }
  }
  if(!localStorage.highscore) {
    localStorage.highscore = snake.maxCells;
  }
  if(localStorage.highscore<snake.maxCells) localStorage.highscore = snake.maxCells;
  
  document.getElementById('info').innerText = `UP: ${up}\nDOWN: ${down}\nLEFT: ${left}\nRIGHT: ${right}\n\nSCORE: ${snake.maxCells} \nHIGHSCORE: ${localStorage.highscore}`
},0)


function moveLeft() {
  if(moves[lmi] != 'l' && moves[lmi-1] != 'l')
  moves.push('l')
  lastMoveLeft = true
  snake.dy = 0;
  snake.dx = -grid; 
}

function moveRight() {
  if(moves[lmi] != 'r' && moves[lmi-1] != 'r')
  moves.push('r')
  lastMoveLeft = false
  snake.dy = 0;
  snake.dx = grid;
}

function moveUp() {
  if(moves[lmi] != 'u' && moves[lmi-1] != 'u')
  moves.push('u')
  lastMoveUp = true
  snake.dx = 0;
  snake.dy = -grid; 
}

function moveDown() {
  if(moves[lmi] != 'd' && moves[lmi-1] != 'd')
  moves.push('d')
  lastMoveUp = false
  snake.dx = 0;
  snake.dy = grid;
}