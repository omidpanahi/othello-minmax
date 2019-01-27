/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _minmax__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./minmax */ \"./src/minmax.js\");\n\nconst myMinMax = new _minmax__WEBPACK_IMPORTED_MODULE_0__[\"default\"];\n\nconst Game = (()=> {\n  let board = [];\n  for(var i=0; i<8; i++) {\n    board[i] = new Array(8).fill('');\n  }\n  board[3][3] = 'w'; board[4][4] = 'w';\n  board[3][4] = 'b'; board[4][3] = 'b';\n  board[0][6] = 'w';\n  board[1][6] = 'w';\n  board[1][0] = 'b'; board[1][7] = 'b';\n  board[4][5] = 'w';\n  board[3][6] = 'b';\n  let isTurn = true;\n  const changeTurn = () => {\n    isTurn = !isTurn;\n  }\n  const updateBoardFrom = (newArr) => {\n    for (var i = 0; i < newArr.length; i++)\n      board[i] = newArr[i].slice();\n\n  }\n\n  const play = (row,col) => {\n    let played = possibleChoices(row,col,isTurn, true);\n    \n    if(played.couldPlay) \n      updateBoardFrom(played.myBoard)\n    \n      \n    if ( played.couldPlay && hasPossible(!isTurn))\n      changeTurn();\n\n    if(!isTurn) {\n      console.log(\"ai\");\n      myMinMax.play(board);\n    } else {\n      console.log(\"you\");\n    }\n  }\n  const hasPossible = turn => {\n    let flag = false;\n    for(let i = 0; i < 8; i++) {\n      for(let j = 0; j < 8; j++){\n        let moves = possibleChoices(i, j, turn);\n        \n          if (moves.couldPlay == true) {\n            flag = true;\n          }\n      }\n    }\n    return flag;\n  }\n  const possibleChoices = (row,col, turn, doPlay = false) => {\n    let marker, oppositeMarker;\n    if(turn) {\n      marker = 'b';\n      oppositeMarker = 'w';\n    } else {\n      marker = 'w';\n      oppositeMarker = 'b';\n    }\n    let moves = [];\n    let myBoard = [];\n\n    for (var i = 0; i < board.length; i++)\n      myBoard[i] = board[i].slice();\n\n\n    let downLeft = moveIn(myBoard, row,col, marker, oppositeMarker, doPlay, 1,-1);\n    let downCenter = moveIn(myBoard, row,col, marker, oppositeMarker, doPlay, 1,0);\n    let downRight = moveIn(myBoard, row,col, marker, oppositeMarker, doPlay, 1,1);\n    let left = moveIn(myBoard, row,col, marker, oppositeMarker, doPlay, 0, -1);\n    let right = moveIn(myBoard, row,col, marker, oppositeMarker, doPlay, 0, 1);\n    let upLeft = moveIn(myBoard, row,col, marker, oppositeMarker, doPlay, -1, -1);\n    let upCenter = moveIn(myBoard, row,col, marker, oppositeMarker, doPlay, -1, 0);\n    let upRight = moveIn(myBoard, row,col, marker, oppositeMarker, doPlay, -1, 1);\n    if(downLeft)\n      moves.push(downLeft)\n    if(downCenter)\n      moves.push(downCenter)\n    if(downRight)\n      moves.push(downRight)\n    if(upCenter)\n      moves.push(upCenter)\n    if(upLeft)\n      moves.push(upLeft)\n    if(upRight)\n      moves.push(upRight)\n    if(left)\n      moves.push(left)\n    if(right)\n      moves.push(right)\n\n    let couldPlay = moves.length > 0 ? true : false;\n    return {\n      couldPlay,\n      myBoard\n    };\n    \n  }\n  const moveIn = (oldBoard, row,col, marker, oppositeMarker, doPlay, rowStep, colStep) => {\n   \n    let nearRow = row + rowStep;\n    let nearCol = col + colStep;\n\n    if(nearRow < 0 || nearRow > 7 || nearCol < 0 || nearCol > 7)\n      return false;\n \n    if (oldBoard[nearRow][nearCol] === oppositeMarker) {\n      let endRow = nearRow + rowStep;\n      let endCol = nearCol + colStep;\n     \n\n      while(endRow >= 0 && endCol >= 0 && endRow <= 7 && endCol <= 7) {\n        \n        if(oldBoard[endRow][endCol] === '')\n          return false;\n        \n       \n        if(oldBoard[endRow][endCol] === marker)  {\n            if(doPlay) {\n              let i = row;\n              let j = col;\n              while(!(i == endRow && j == endCol)) {\n                oldBoard[i][j] = marker;\n                i += rowStep;\n                j += colStep;\n              }\n            }\n            \n            \n            return true;\n        }\n        endRow += rowStep;\n        endCol += colStep;\n    \n    }\n  }\n    return false;\n  }\n  \n\n\n  const getBoard = () => board;\n  return {\n    board,\n    getBoard,\n    isTurn,\n    play,\n    possibleChoices\n  }\n})();\nconst UI = (()=> {\n  const boardEL = document.getElementById('board');\n  const cellsEL = document.querySelectorAll('.cell');\n\n  const updateDisplay = () => {\n    for (let i = 0; i < cellsEL.length; i++) {  \n      cellsEL[i].className = `cell ${Game.board[cellsEL[i].getAttribute('data-row')][cellsEL[i].id]}`;\n      cellsEL[i].textContent = `${cellsEL[i].getAttribute('data-row')} ${cellsEL[i].id}`;\n    }\n  }\n\n  const eventListeres = () => {\n    cellsEL.forEach(cell => {\n      cell.addEventListener('click', e => {\n        if(!e.target.classList.contains('w') && !e.target.classList.contains('b')) {\n          Game.play(parseInt(e.target.getAttribute('data-row')), parseInt(e.target.id));\n          UI.updateDisplay();\n  \n        }\n      })\n    });\n  }\n  return {\n    boardEL,\n    updateDisplay,\n    eventListeres\n  }\n})();\n\nUI.updateDisplay();\nUI.eventListeres();\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/minmax.js":
/*!***********************!*\
  !*** ./src/minmax.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return MinMax; });\nclass MinMax {\n  constructor() {\n    this.name = \"hi\";\n  }\n  play() {\n    console.log(\"play\");\n  }\n}\n\n//# sourceURL=webpack:///./src/minmax.js?");

/***/ })

/******/ });