// Importing necessary functions and variables from other modules
import {
  checkForWinner,
  checkPieceOfOpponent,
  giveDiagonalHighlightIds,
  giveKingMoves,
  giveKnightMoves,
  giveQueenMovements,
  giveXyHighlightIds,
} from "../Helper/commonFcn.js";
import { moveLoger } from "../Helper/logger.js";
import pawnPromotion from "../Helper/modalCreator.js";
import {
  clearAllHighlight,
  clearCaptureHighlight,
  clearHighlightState,
  highlightCapture,
  kingCheckRender,
  pieceArray,
  renderHighlight,
  selfHighlight,
} from "../Rendrer/main.js";
import { globalState, keySquareMapper } from "../index.js";

// Getting the root div element
const ROOT_DIV = document.getElementById("root");

// State variables
let highlight_state = false; // Indicates whether a square is currently highlighted
let moveState = null; // Stores the piece that is currently selected for movement
let selectedSquare = null; // Stores the selected square
let colorTurn = "white"; // Indicates whose turn it is

// Function to handle click events
function clickHandler(e) {
  // Handling click events on images within squares
  if (
    e.target.localName == "img" ||
    e.target.getElementsByTagName("img").length > 0
  ) {
    let clickedId;
    if (e.target.localName == "img") {
      clickedId = e.target.parentNode.id;
    } else {
      clickedId = e.target.id;
    }
    handleSquareClick(clickedId);
  }
  // Handling click events on span elements within squares
  else if (
    e.target.localName == "span" ||
    e.target.getElementsByTagName("span").length > 0
  ) {
    if (e.target.localName == "span") {
      let movePlace = e.target.parentNode.id;
      movePiece(moveState, movePlace);
    } else {
      let movePlace = e.target.id;
      movePiece(moveState, movePlace);
    }
    moveState = null;
    selectedSquare = null;
    clearAllHighlight();
  }
  // Clearing all highlights and resetting selected square if clicked elsewhere on the board
  else {
    clearAllHighlight();
    selectedSquare = null;
    highlight_state = false;
  }
}

// Adding click event listener to the root div
const globalEvent = () => {
  ROOT_DIV.addEventListener("click", clickHandler);
};

// Function to handle click events on squares
const handleSquareClick = (clickedId) => {
  const square = keySquareMapper[clickedId];
  if (square) {
    const pieceType = square.piece.pieceType.toLowerCase();
    const pieceTypeToFunction = {
      bishop: bishopClicked,
      rook: rookClicked,
      queen: queenClicked,
      knight: knightClicked,
      king: kingClicked,
    };

    const clickFunction = pieceTypeToFunction[pieceType];

    if (square.piece.pieceName == "WHITE_PAWN") {
      whitePawnClicked(square.piece, square);
    } else if (square.piece.pieceName == "BLACK_PAWN") {
      blackPawnClicked(square.piece, square);
    } else if (clickFunction) {
      clickFunction(square.piece, square);
    } else {
      console.error(`Unhandled piece type: ${pieceType}`);
    }
  }
};

const whitePawnClicked = (piece, square) => {
  let presentSquare = document.getElementById(square.id);
  //handling capture movements
  if (presentSquare.classList.contains("red")) {
    moveFromXtoY(selectedSquare, square);
    return;
  }

  if (piece.color == colorTurn) {
    if (pieceArray[0] == piece) {
      //if same pawn is clicked
      clearAllHighlight();
      selectedSquare = null;
    } else {
      const currentPos = piece.currentPosition;
      selectedSquare = square;
      pieceArray.pop();
      //highlight clicked element
      selfHighlight(piece);

      // add piece as move state
      moveState = piece;

      //on initial position
      if (currentPos[1] == 2) {
        const highlightSquareIds = [
          `${currentPos[0]}${Number(currentPos[1]) + 1}`,
          `${currentPos[0]}${Number(currentPos[1]) + 2}`,
        ];
        highlightSquarePawn([highlightSquareIds]);
      } else {
        const highlightSquareIds = [
          `${currentPos[0]}${Number(currentPos[1]) + 1}`,
        ];
        highlightSquarePawn([highlightSquareIds]);
      }

      let captureIds = findDiagonalPieces(piece);
      if (captureIds.length > 0) {
        const captureHighlightIds = captureIds;
        highlightCapture(captureHighlightIds);
      }
    }
  }
};

const blackPawnClicked = (piece, square) => {
  let presentSquare = document.getElementById(square.id);
  //handling capture movements
  if (presentSquare.classList.contains("red")) {
    moveFromXtoY(selectedSquare, square);
    return;
  }

  if (piece.color == colorTurn) {
    // if same pawn is clicked
    if (pieceArray[0] == piece) {
      clearAllHighlight();
      selectedSquare = null;
    } else {
      const currentPos = piece.currentPosition;

      selectedSquare = square;
      pieceArray.pop();
      //highlight clicked element
      selfHighlight(piece);

      // add piece as move state
      moveState = piece;

      //on initial position
      if (currentPos[1] == 7) {
        const highlightSquareIds = [
          `${currentPos[0]}${Number(currentPos[1]) - 1}`,
          `${currentPos[0]}${Number(currentPos[1]) - 2}`,
        ];
        highlightSquarePawn([highlightSquareIds]);
      } else {
        const highlightSquareIds = [
          `${currentPos[0]}${Number(currentPos[1]) - 1}`,
        ];
        highlightSquarePawn([highlightSquareIds]);
      }

      let captureIds = findDiagonalPieces(piece);
      if (captureIds.length > 0) {
        const captureHighlightIds = captureIds;
        highlightCapture(captureHighlightIds);
      }
    }
  }
};

const bishopClicked = (piece, square) => {
  let presentSquare = document.getElementById(square.id);
  //handling capture movements
  if (presentSquare.classList.contains("red")) {
    moveFromXtoY(selectedSquare, square);
    return;
  }

  if (piece.color == colorTurn) {
    // if same piece is clicked
    if (pieceArray[0] == piece) {
      clearAllHighlight();
      selectedSquare = null;
    } else {
      const currentPos = piece.currentPosition;

      selectedSquare = square;
      pieceArray.pop();
      //highlight clicked element
      selfHighlight(piece);
      // add piece as move state
      moveState = piece;

      //highlighting moves
      let diagonalHighlightId = giveDiagonalHighlightIds(square.id);
      highlightSquarePawn(diagonalHighlightId);

      //getting capture ids
      let captureIds = [];
      diagonalHighlightId.forEach((diagonal) => {
        for (let squareId of diagonal) {
          let square = keySquareMapper[squareId];
          if (square.piece != null) {
            if (checkPieceOfOpponent(square.id, piece.color)) {
              captureIds.push(square.id);
            }
            break;
          }
        }
      });

      highlightCapture(captureIds);
    }
  }
};

const knightClicked = (piece, square) => {
  let presentSquare = document.getElementById(square.id);
  //handling capture movements
  if (presentSquare.classList.contains("red")) {
    moveFromXtoY(selectedSquare, square);
    return;
  }

  if (piece.color == colorTurn) {
    // if same piece is clicked
    if (pieceArray[0] == piece) {
      clearAllHighlight();
      selectedSquare = null;
    } else {
      const currentPos = piece.currentPosition;

      selectedSquare = square;
      pieceArray.pop();
      //highlight clicked element
      selfHighlight(piece);
      // add piece as move state
      moveState = piece;

      //highlighting moves
      let knightMoveId = giveKnightMoves(square.id);
      highlightSquareKnight(knightMoveId);

      //getting capture ids
      let captureIds = [];
      knightMoveId.forEach((squareId) => {
        let square = keySquareMapper[squareId];
        if (square.piece != null) {
          if (checkPieceOfOpponent(square.id, piece.color)) {
            captureIds.push(squareId);
          }
        }
      });
      highlightCapture(captureIds);
    }
  }
};

const queenClicked = (piece, square) => {
  let presentSquare = document.getElementById(square.id);
  //handling capture movements
  if (presentSquare.classList.contains("red")) {
    moveFromXtoY(selectedSquare, square);
    return;
  }

  if (piece.color == colorTurn) {
    // if same piece is clicked
    if (pieceArray[0] == piece) {
      clearAllHighlight();
      selectedSquare = null;
    } else {
      const currentPos = piece.currentPosition;

      selectedSquare = square;
      pieceArray.pop();
      //highlight clicked element
      selfHighlight(piece);
      // add piece as move state
      moveState = piece;

      //highlighting moves
      let queenMovementsId = giveQueenMovements(square.id);
      highlightSquarePawn(queenMovementsId);

      //getting capture ids
      let captureIds = [];
      queenMovementsId.forEach((line) => {
        for (let squareId of line) {
          let square = keySquareMapper[squareId];
          if (square.piece != null) {
            if (checkPieceOfOpponent(square.id, piece.color)) {
              console.log(square.color);
              captureIds.push(square.id);
            }
            break;
          }
        }
      });
      highlightCapture(captureIds);
    }
  }
};

const rookClicked = (piece, square) => {
  let presentSquare = document.getElementById(square.id);
  //handling capture movements
  if (presentSquare.classList.contains("red")) {
    moveFromXtoY(selectedSquare, square);
    return;
  }

  if (piece.color === colorTurn) {
    // if same piece is clicked
    if (pieceArray[0] == piece) {
      clearAllHighlight();
      selectedSquare = null;
    } else {
      const currentPos = piece.currentPosition;

      selectedSquare = square;
      pieceArray.pop();
      //highlight clicked element
      selfHighlight(piece);
      // add piece as move state
      moveState = piece;
      //highlighting moves
      let xyHighlightIds = giveXyHighlightIds(square.id);
      highlightSquarePawn(xyHighlightIds);

      //getting capture ids
      let captureIds = [];
      xyHighlightIds.forEach((line) => {
        for (let squareId of line) {
          let square = keySquareMapper[squareId];
          if (square.piece != null) {
            if (checkPieceOfOpponent(square.id, piece.color)) {
              console.log(square.color);
              captureIds.push(square.id);
            }
            break;
          }
        }
      });

      highlightCapture(captureIds);
    }
  }
};

const kingClicked = (piece, square) => {
  let presentSquare = document.getElementById(square.id);
  //handling capture movements
  if (presentSquare.classList.contains("red")) {
    moveFromXtoY(selectedSquare, square);
    return;
  }
  if (piece.color === colorTurn) {
    // if same piece is clicked
    if (pieceArray[0] == piece) {
      
      clearAllHighlight();
      selectedSquare = null;
    } else {
      const currentPos = piece.currentPosition;

      selectedSquare = square;
      pieceArray.pop();
      //highlight clicked element
      selfHighlight(piece);
      // add piece as move state
      moveState = piece;

      //highlighting moves
      let kingMoves = giveKingMoves(square.id);
      highlightSquarePawn(kingMoves);

      //getting capture ids
      let captureIds = [];
      kingMoves.forEach((id) => {
        let square = keySquareMapper[id];
        if (square.piece != null) {
          if (checkPieceOfOpponent(square.id, piece.color)) {
            captureIds.push(square.id);
          }
        }
      });
      highlightCapture(captureIds);
    }
  }
};

//to find capture ids for pawns
const findDiagonalPieces = (piece) => {
  const currentPosition = piece.currentPosition;
  const colorMultiplier = piece.color === "white" ? 1 : -1;

  const getDiagonalPosition = (offset) => {
    const rowAscii =
      currentPosition[0].charCodeAt(0) + offset * colorMultiplier;
    const col = Number(currentPosition[1]) + (piece.color === "white" ? 1 : -1);
    return String.fromCharCode(rowAscii) + col;
  };

  const captureId = [];

  const position1 = getDiagonalPosition(-1);
  const position2 = getDiagonalPosition(1);

  if (checkPieceOfOpponent(position1, piece.color)) {
    captureId.push(position1);
  }
  if (checkPieceOfOpponent(position2, piece.color)) {
    captureId.push(position2);
  }

  return captureId;
};

//highlighting for the knight

function highlightSquareKnight(squareIds) {
  if (!highlight_state) {
    setHighlightStateKnight(squareIds, true);
    highlight_state = true;
  } else {
    clearCaptureHighlight();
    clearHighlightState();
    setHighlightStateKnight(squareIds, true);
    highlight_state = true;
  }
}

//highlighting for the pieces

const highlightSquarePawn = (squareIds) => {
  if (!highlight_state) {
    setHighlightState(squareIds, true);
    highlight_state = true;
  } else {
    clearCaptureHighlight();
    clearHighlightState();
    setHighlightState(squareIds, true);
    highlight_state = true;
  }
};

//setting highlight sate for the piecies to move
const setHighlightState = (squareIdsArray, state) => {
  squareIdsArray.forEach((squareIds) => {
    for (let highlight of squareIds) {
      let childList = document.getElementById(highlight).childNodes;
      let hasSpan = false;
      childList.forEach((el) => {
        if (el.nodeName === "IMG") {
          hasSpan = true;
        }
      });
      if (hasSpan) {
        break;
      } else {
        globalState.forEach((row) => {
          const element = row.find((el) => el.id === highlight);
          if (element) element.highlight = state;
        });

        renderHighlight(highlight);
      }
    }
  });
};

//setting highlight sate for the knight to move
function setHighlightStateKnight(squareIds, state) {
  squareIds.forEach((squareId) => {
    let square = keySquareMapper[squareId];
    if (square.piece == null) {
      square.highlight = state;
      renderHighlight(squareId);
    }
  });
}

function changePawn(piece, id) {
  let square = document.getElementById(id);
  console.log(square);
  console.log(piece);
  console.log(piece.img);
  console.log(square.querySelector("img").src);
  square.querySelector("img").src = piece.img;

  let squareObj = keySquareMapper[id];
  squareObj.piece = piece;
  console.log(globalState);
}

function checkPawnPromotion(piece, id) {
  if (piece.pieceType === "Pawn" && (id[1] == 1 || id[1] == 8)) {
    let color = piece.color;
    color = color.charAt(0).toUpperCase() + color.slice(1);
    pawnPromotion(color, changePawn, id);
  }
}
//piece movements
const movePiece = (piece, id) => {
  const flatData = globalState.flat();
  flatData.forEach((el) => {
    if (el.id == piece.currentPosition) {
      el.piece = null;
    }
    if (el.id == id) {
      el.piece = piece;
    }
  });

  let prevPlace = document.getElementById(piece.currentPosition);
  let currentPlace = document.getElementById(id);

  let img = prevPlace.querySelector("img");

  currentPlace.appendChild(img);

  piece.currentPosition = id;

  checkPawnPromotion(piece, id);
  moveLoger(piece.currentPosition, id, piece.pieceName);

  //switching turn of the player
  colorTurn = colorTurn == "white" ? "black" : "white";

  //to check if the king is in checked position after each move
  kingCheckRender(colorTurn);
};

//piece capture movements
function moveFromXtoY(from, to) {
  clearAllHighlight();
  moveLoger(from.id, to.id, from.piece.pieceName);
  selectedSquare = null;
  to.piece = from.piece;
  to.piece.currentPosition = to.id;
  from.piece = null;

  let fromEl = document.getElementById(from.id);
  let toEl = document.getElementById(to.id);
  let img = fromEl.querySelector("img");
  let toImg = toEl.querySelector("img");
  toEl.removeChild(toImg);
  toEl.appendChild(img);

  //switching turn of the player
  colorTurn = colorTurn == "white" ? "black" : "white";

  //to check if the king is in checked position after each move
  kingCheckRender(colorTurn);

  //determining the winner of the game
  let winner = checkForWinner();
  if (winner != null) {
    alert(winner + " Wins!");
    document.getElementById("root").removeEventListener("click", clickHandler);
  }
}

export { findDiagonalPieces, globalEvent };
