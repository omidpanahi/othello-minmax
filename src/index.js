
const MinMax = (() => {
  const makeChild = (board, turn) => {
    // console.log("making child" , turn);
    let childs = [];
    // console.log(Game.options(board, turn));
    Game.options(board, turn).forEach(option=> {
      let playedChild = Game.playOn(board, option.row, option.col, turn, true);

      if(playedChild.possible) {
        childs.push({
          coordinates: {
            row: option.row,
            col: option.col
          },
          board: playedChild.newBoard,
          worth: Game.stateWorth(playedChild.newBoard)
        })
      }
    })
    return childs;
  }
  
  const bestMove = (state, depth, bestValue, isMax) => {
    let childs = makeChild(state.board, !isMax) 

    if (depth > 5 || childs.length < 1) {
      bestValue.value = Game.stateWorth(state.board);
      return state;
    } 
    let bestChild = {};
    let bestWorthInChilds = isMax ? -10000 : 10000;
    let bestChildNodeValue = { value: bestWorthInChilds }

    childs.forEach(child => {
      let cv = {};
      let newChild = bestMove(child, depth++,cv, !isMax);
      if(isMax && cv.value > bestChildNodeValue.value) {
        bestChildNodeValue.value = cv.value;
        bestChild = child;

      }
      
      if(!isMax && cv.value < bestChildNodeValue.value) {
        bestChildNodeValue.value = cv.value;
        bestChild = child
      }
    })
    bestValue.value = bestChildNodeValue.value;
    //console.log("best child", bestChild);
    return bestChild;
    
    
  }

  return {
    bestMove,
    makeChild
  }
})()
const Game = (()=> {
  let board = [];
  for(var i=0; i<8; i++) {
    board[i] = new Array(8).fill('');
  }
  board[3][3] = 'w'; 
  board[4][4] = 'w';
  board[3][4] = 'b'; 
  board[4][3] = 'b';
  let isTurn = true;

  const changeTurn = () => {
    isTurn = !isTurn;    
    let turnName = isTurn ? "You" : "Computer";
    UI.updateTurnName(turnName);
  }
  const checkEnded = () => {
    if(options(board, false) < 1 && options(board, true))
      return true
    else
      return false
  }
  const updateBoardFrom = (newArr) => {
    for (var i = 0; i < newArr.length; i++)
      board[i] = newArr[i].slice();
  }
  const stateWorth = aBoard => {
    let whites = 0;
    let blacks = 0;
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        switch (aBoard[i][j]) {
          case "b":
            blacks++;
            if(i==0 || i == 7)
              blacks += 100;
            if(j == 0 || j == 7)
              blacks + 10;
            break;
          case "w":
            whites++;
            if(i==0 || i == 7)
              whites += 100;
            if(j == 0 || j == 7)
              whites + 10;
          default:
            break;
        } 
      }
    }
    return blacks - whites;
  }
  const play = (row,col) => {
    let played;
    if (isTurn) {
      played = playOn(board, row,col,true, true);
    } else {
      let config = {
        board: board
      }
      let bestMove = MinMax.bestMove(config, 3, {}, true);
      //console.log("Best Move:  ", bestMove);
      bestMove = bestMove.coordinates;
      played = playOn(board, bestMove.row,bestMove.col,false,true);  
    }
    
    if (played.possible) {
      updateBoardFrom(played.newBoard);
      UI.updatePoints(calculatePoints(board));


    } else {
      //console.log("wrong play!" , isTurn);

      return
    }

    

    if(options(board, !isTurn).length) {
      changeTurn();
    }
    if ( checkEnded()) {
      let winner = (calculatePoints(board) > 0) ? "You" : "Computer";
      alert(`Game ended! ${winner} won.`);
      return
    } else if (!isTurn) {
        play(10,10)
    }


  }

  const options = (board, turn) => {
    let arr = [];
    for(let i = 0; i < 8; i++) {
      for(let j = 0; j < 8; j++){
        if (board[i][j] === '' && playOn(board, i, j, turn).possible == true) {
          arr.push({
            row: i,
            col: j
          })
        }
      }
    }
    return arr;
  }
  const calculatePoints = board => {
    let whites = 0;
    let blacks = 0;
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        switch (board[i][j]) {
          case "b":
            blacks++;
            break;
          case "w":
            whites++;
          default:
            break;
        } 
      }
    }

    return blacks - whites;
  }
  const playOn = (board, row,col, turn, doPlay = false) => {
    let marker, oppositeMarker;
    if(turn) {
      marker = 'b';
      oppositeMarker = 'w';
    } else {
      marker = 'w';
      oppositeMarker = 'b';
    }
    let moves = [];
    let myBoard = [];

    for (var i = 0; i < board.length; i++)
      myBoard[i] = board[i].slice();


    let downLeft = moveIn(myBoard, row,col, marker, oppositeMarker, doPlay, 1,-1);
    let downCenter = moveIn(myBoard, row,col, marker, oppositeMarker, doPlay, 1,0);
    let downRight = moveIn(myBoard, row,col, marker, oppositeMarker, doPlay, 1,1);
    let left = moveIn(myBoard, row,col, marker, oppositeMarker, doPlay, 0, -1);
    let right = moveIn(myBoard, row,col, marker, oppositeMarker, doPlay, 0, 1);
    let upLeft = moveIn(myBoard, row,col, marker, oppositeMarker, doPlay, -1, -1);
    let upCenter = moveIn(myBoard, row,col, marker, oppositeMarker, doPlay, -1, 0);
    let upRight = moveIn(myBoard, row,col, marker, oppositeMarker, doPlay, -1, 1);
    if(downLeft)
      moves.push(downLeft)
    if(downCenter)
      moves.push(downCenter)
    if(downRight)
      moves.push(downRight)
    if(upCenter)
      moves.push(upCenter)
    if(upLeft)
      moves.push(upLeft)
    if(upRight)
      moves.push(upRight)
    if(left)
      moves.push(left)
    if(right)
      moves.push(right)

    let couldPlay = moves.length > 0 ? true : false;
    return {
      possible: couldPlay,
      newBoard: myBoard
    };
    
  }
  const moveIn = (oldBoard, row,col, marker, oppositeMarker, doPlay, rowStep, colStep) => {
    let nearRow = row + rowStep;
    let nearCol = col + colStep;

    if(nearRow < 0 || nearRow > 7 || nearCol < 0 || nearCol > 7)
      return false;
 
    if (oldBoard[nearRow][nearCol] !== oppositeMarker)
      return false;
    // if (doPlay)
      // console.log(
      //   row, col, "clicked.     by  ", marker,
      //   nearRow, nearCol, "nearcell"
      //   );
    let endRow = nearRow + rowStep;
    let endCol = nearCol + colStep;
    while(endRow >= 0 && endCol >= 0 && endRow <= 7 && endCol <= 7) {
      if(oldBoard[endRow][endCol] === '')
        return false;
      if(oldBoard[endRow][endCol] === marker)  {
          if(doPlay) {
            let i = row;
            let j = col;
            // console.log(endRow,endCol,"until");
            while(!(i == endRow && j == endCol)) {
              oldBoard[i][j] = marker;
              // console.log(i,j,"changed");
              i += rowStep;
              j += colStep;
            }
          }
          return true;
      }
      endRow += rowStep;
      endCol += colStep;
  }

    return false;
  }
  


  const getBoard = () => board;
  return {
    board,
    getBoard,
    isTurn,
    play,
    possibleChoices: playOn,
    options,
    playOn,
    stateWorth
  }
})();
const UI = (()=> {
  const boardEL = document.getElementById('board');
  const cellsEL = document.querySelectorAll('.cell');
  const turnEL = document.getElementById('turnEL');
  const pointEL = document.getElementById('pointEL');

  const updateDisplay = () => {
    for (let i = 0; i < cellsEL.length; i++) {  
      cellsEL[i].className = `cell ${Game.board[cellsEL[i].getAttribute('data-row')][cellsEL[i].id]}`;
      // cellsEL[i].textContent = `${cellsEL[i].getAttribute('data-row')} ${cellsEL[i].id}`;
    }
  }

  const updateTurnName = name => turnEL.textContent = name;
  const updatePoints = point => pointEL.textContent = point;
  const eventListeres = () => {
    cellsEL.forEach(cell => {
      cell.addEventListener('click', e => {
        if(!e.target.classList.contains('w') && !e.target.classList.contains('b')) {
          Game.play(parseInt(e.target.getAttribute('data-row')), parseInt(e.target.id));
          UI.updateDisplay();
  
        }
      })
    });
  }
  return {
    boardEL,
    updateDisplay,
    updateTurnName,
    updatePoints,
    eventListeres
  }
})();

UI.updateDisplay();
UI.eventListeres();
